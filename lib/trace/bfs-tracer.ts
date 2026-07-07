import type {
  ChainId,
  AggregatedTransfer,
  AddressTransfer,
  TaintTraceConfig,
  TaintTraceResult,
  TraceDirection,
  TaintedNode,
  TaintedEdgeData,
  StopReason,
  Dispersion,
  FrontierEntry,
  TraceHooks,
} from './types';
import { DEFAULT_TRACE_CONFIG } from './types';
import { aggregatedToWeights, haircutDistribute } from './haircut';

export interface FetchResult {
  aggregated: AggregatedTransfer[];
  transfers: AddressTransfer[];
}

/**
 * Fetch this address's aggregated transfers + raw transfers.
 * Injected so the engine remains framework-agnostic and testable.
 */
export type FetchAddressTransfersFn = (
  address: string,
  chainId: ChainId,
) => Promise<FetchResult>;

/**
 * Per-branch stop predicate. Decide whether the BFS should stop expanding from this counterparty
 * (the branch is still added as a node, but its outgoing/incoming edges are not followed).
 * Return `null` to continue, or a `StopReason` to halt this branch.
 */
export type ShouldStopAtFn = (counterparty: string, chainId: ChainId) => StopReason | null;

/**
 * N-hop auto-trace with haircut taint propagation and per-branch stop conditions.
 *
 * The origin gets taint = 1.0. Each hop distributes the parent's taint across its children
 * proportionally to transfer value. CEX/mixer counterparties are marked and not expanded
 * further, but neighboring branches keep running until depth/budget exhaustion.
 *
 * Ported from chase-chain lib/taint-engine/bfs-tracer.ts, refactored to level-order
 * (hop-by-hop) so a DB-backed worker can checkpoint after each hop and resume.
 *
 * We keep addresses in their ORIGINAL case throughout BFS because Bitcoin/Solana/Tron
 * addresses are case-sensitive Base58 — `0xabc...`.toLowerCase() is fine for EVM hex,
 * but lowercasing a Solana mint or BTC bech32 address breaks the next fetch call.
 * Only `visited` uses a lowercased key for deduplication.
 */
type FrontierItem = { address: string; chainId: ChainId; depth: number; taint: number };

export async function trace(
  origin: string,
  originChainId: ChainId,
  direction: TraceDirection,
  fetchAddressTransfers: FetchAddressTransfersFn,
  shouldStopAt: ShouldStopAtFn,
  configIn?: Partial<TaintTraceConfig>,
  hooks?: TraceHooks,
): Promise<TaintTraceResult> {
  const config = { ...DEFAULT_TRACE_CONFIG, ...configIn };

  const nodes: TaintedNode[] = [];
  const edges: TaintedEdgeData[] = [];
  const dispersions: Dispersion[] = [];
  let reachedMaxNodes = false;

  let frontier: FrontierItem[];
  let visited: Set<string>;
  let startHop: number;
  if (hooks?.resume) {
    frontier = hooks.resume.frontier.map(f => ({
      address: f.address,
      chainId: f.chain,
      depth: f.depth,
      taint: f.taintRatio,
    }));
    visited = new Set(hooks.resume.visited);
    startHop = hooks.resume.startHop;
  } else {
    frontier = [{ address: origin, chainId: originChainId, depth: 0, taint: 1.0 }];
    visited = new Set([origin.toLowerCase()]);
    startHop = 0;
  }

  for (let hop = startHop; hop < config.maxDepth; hop++) {
    const nextFrontier: FrontierItem[] = [];
    const hopNodes: TaintedNode[] = [];
    const hopDispersions: Dispersion[] = [];

    for (const item of frontier) {
      if (nodes.length >= config.maxTotalNewNodes) {
        reachedMaxNodes = true;
        break;
      }

      let fetched: FetchResult;
      try {
        fetched = await fetchAddressTransfers(item.address, item.chainId);
      } catch (err) {
        console.warn('[trace] fetch failed for', item.address, err);
        continue;
      }

      // Counterparty weights from aggregated; sort by weight desc, take top-N
      const weights = aggregatedToWeights(fetched.aggregated, direction, item.address)
        .filter(w => w.weight >= config.minWeight);
      weights.sort((a, b) => b.weight - a.weight);
      const topWeights = weights.slice(0, config.maxFanoutPerHop);

      // Haircut over ALL children (not just the kept top-N) so the followed branches
      // receive their TRUE proportional taint. The untraced long tail's share is
      // accounted as dispersion below rather than redistributed onto the survivors.
      const taintMap = haircutDistribute(
        item.taint,
        weights.map(w => ({ counterparty: w.counterparty, weight: w.weight })),
      );

      // Account the fan-out we did not follow (smurfing / dispersion coverage).
      if (weights.length > topWeights.length) {
        const totalWeight = weights.reduce((s, w) => s + w.weight, 0);
        const keptWeight = topWeights.reduce((s, w) => s + w.weight, 0);
        const droppedWeight = totalWeight - keptWeight;
        const disp: Dispersion = {
          from: item.address,
          chainId: item.chainId,
          keptCount: topWeights.length,
          droppedCount: weights.length - topWeights.length,
          dispersedTaint: totalWeight > 0 ? item.taint * (droppedWeight / totalWeight) : 0,
        };
        dispersions.push(disp);
        hopDispersions.push(disp);
      }

      for (const w of topWeights) {
        const childAddr = w.counterparty;                 // original case — needed for next fetch
        const childAddrLower = childAddr.toLowerCase();   // dedup + entity lookup key
        const childTaint = taintMap.get(childAddrLower) ?? 0;

        // Always emit the edge so the user sees the flow
        const txHashes = w.aggregated.allHashes ?? [w.aggregated.latestHash];
        const transfersForEdge = fetched.transfers.filter(t => txHashes.includes(t.hash));
        edges.push({
          from: direction === 'backward' ? childAddr : item.address,
          to: direction === 'backward' ? item.address : childAddr,
          chainId: item.chainId,
          aggregated: w.aggregated,
          transfers: transfersForEdge,
        });

        // If already seen, attach an edge but don't enqueue again (cycle prevention)
        if (visited.has(childAddrLower)) continue;
        visited.add(childAddrLower);

        // Per-branch stop decision (CEX, mixer, etc.) — branch is marked but neighbors survive
        const stop = shouldStopAt(childAddr, item.chainId);
        const node: TaintedNode = {
          address: childAddr,
          chainId: item.chainId,
          depth: item.depth + 1,
          taintRatio: childTaint,
          expandedBy: item.address,
          stopReason: stop ?? undefined,
        };
        nodes.push(node);
        hopNodes.push(node);

        if (nodes.length >= config.maxTotalNewNodes) {
          reachedMaxNodes = true;
          break;
        }

        if (stop) continue;                       // marked branch: don't enqueue
        if (item.depth + 1 >= config.maxDepth) continue;

        nextFrontier.push({
          address: childAddr,
          chainId: item.chainId,
          depth: item.depth + 1,
          taint: childTaint,
        });
      }

      if (reachedMaxNodes) break;
    }

    // Checkpoint boundary: hand the worker this hop's deltas + the resume frontier.
    if (hooks?.onHop) {
      const frontierEntries: FrontierEntry[] = nextFrontier.map(i => ({
        address: i.address,
        chain: i.chainId,
        taintRatio: i.taint,
        depth: i.depth,
      }));
      await hooks.onHop({
        hop,
        newNodes: hopNodes,
        newDispersions: hopDispersions,
        frontier: frontierEntries,
        visited: [...visited],
      });
    }

    if (reachedMaxNodes) break;
    frontier = nextFrontier;
    if (frontier.length === 0) break;
  }

  return { origin, direction, nodes, edges, reachedMaxNodes, dispersions };
}
