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
 * Ported from chase-chain lib/taint-engine/bfs-tracer.ts (framework-agnostic already).
 */
export async function trace(
  origin: string,
  originChainId: ChainId,
  direction: TraceDirection,
  fetchAddressTransfers: FetchAddressTransfersFn,
  shouldStopAt: ShouldStopAtFn,
  configIn?: Partial<TaintTraceConfig>,
): Promise<TaintTraceResult> {
  const config = { ...DEFAULT_TRACE_CONFIG, ...configIn };

  // We keep addresses in their ORIGINAL case throughout BFS because Bitcoin/Solana/Tron
  // addresses are case-sensitive Base58 — `0xabc...`.toLowerCase() is fine for EVM hex,
  // but lowercasing a Solana mint or BTC bech32 address breaks the next fetch call.
  // Only `visited` uses a lowercased key for deduplication.
  type QueueItem = { address: string; chainId: ChainId; depth: number; taint: number; expandedBy: string };
  const queue: QueueItem[] = [{
    address: origin,
    chainId: originChainId,
    depth: 0,
    taint: 1.0,
    expandedBy: origin,
  }];

  const visited = new Set<string>([origin.toLowerCase()]);
  const nodes: TaintedNode[] = [];
  const edges: TaintedEdgeData[] = [];
  let reachedMaxNodes = false;

  while (queue.length > 0) {
    const { address, chainId, depth, taint, expandedBy } = queue.shift()!;

    if (depth >= config.maxDepth) continue;
    if (nodes.length >= config.maxTotalNewNodes) {
      reachedMaxNodes = true;
      break;
    }

    let fetched: FetchResult;
    try {
      fetched = await fetchAddressTransfers(address, chainId);
    } catch (err) {
      console.warn('[trace] fetch failed for', address, err);
      continue;
    }

    // Counterparty weights from aggregated; sort by weight desc, take top-N
    const weights = aggregatedToWeights(fetched.aggregated, direction, address)
      .filter(w => w.weight >= config.minWeight);
    weights.sort((a, b) => b.weight - a.weight);
    const topWeights = weights.slice(0, config.maxFanoutPerHop);

    // Haircut distribution across the selected children
    const taintMap = haircutDistribute(
      taint,
      topWeights.map(w => ({ counterparty: w.counterparty, weight: w.weight })),
    );

    for (const w of topWeights) {
      const childAddr = w.counterparty;                 // original case — needed for next fetch
      const childAddrLower = childAddr.toLowerCase();   // dedup + entity lookup key
      const childTaint = taintMap.get(childAddrLower) ?? 0;

      // Always emit the edge so the user sees the flow
      const txHashes = w.aggregated.allHashes ?? [w.aggregated.latestHash];
      const transfersForEdge = fetched.transfers.filter(t => txHashes.includes(t.hash));
      edges.push({
        from: direction === 'backward' ? childAddr : address,
        to: direction === 'backward' ? address : childAddr,
        chainId,
        aggregated: w.aggregated,
        transfers: transfersForEdge,
      });

      // If already seen, attach an edge but don't enqueue again (cycle prevention)
      if (visited.has(childAddrLower)) continue;
      visited.add(childAddrLower);

      // Per-branch stop decision (CEX, mixer, etc.) — branch is marked but neighboring branches survive
      const stop = shouldStopAt(childAddr, chainId);
      nodes.push({
        address: childAddr,
        chainId,
        depth: depth + 1,
        taintRatio: childTaint,
        expandedBy,
        stopReason: stop ?? undefined,
      });

      if (nodes.length >= config.maxTotalNewNodes) {
        reachedMaxNodes = true;
        break;
      }

      if (stop) continue;                  // marked branch: don't enqueue
      if (depth + 1 >= config.maxDepth) continue;

      queue.push({
        address: childAddr,
        chainId,
        depth: depth + 1,
        taint: childTaint,
        expandedBy: childAddr,
      });
    }

    if (reachedMaxNodes) break;
  }

  return { origin, direction, nodes, edges, reachedMaxNodes };
}
