/**
 * Trace engine types — ported from chase-chain's lib/taint-engine + lib/address-fetcher.
 * Kept framework-agnostic (no React / Next / xyflow) so the engine runs headless in CI and workers.
 */

/** EVM chains covered by the v1 trace engine (non-EVM Tron/Bitcoin/Solana are a later phase). */
export type ChainId =
  | 'ethereum'
  | 'polygon'
  | 'arbitrum'
  | 'base'
  | 'bsc'
  | 'optimism'
  | 'avalanche'
  | 'linea'
  | 'blast'
  | 'scroll'
  | 'gnosis'
  | 'sonic'
  | 'mantle'
  | 'megaeth'
  | 'plasma'
  | 'stable'
  | 'katana'
  | 'monad'
  | 'berachain'
  | 'abstract'
  | 'unichain'
  | 'taiko'
  | 'celo'
  | 'world'
  | 'sei'
  | 'opbnb'
  | 'fraxtal'
  | 'swellchain'
  | 'hyperevm'
  | 'hypercore'
  | 'apechain'
  | 'moonbeam'
  | 'moonriver'
  | 'bttc';

// ===== Transfer data (from chase-chain lib/address-fetcher/types.ts) =====

export interface AddressTransfer {
  hash: string;
  from: string;
  to: string;
  value: string;
  formattedValue: string;
  tokenSymbol: string;
  tokenAddress?: string;
  tokenDecimals: number;
  isNative: boolean;
  timestamp: number;
}

export interface AggregatedTransfer {
  from: string;
  to: string;
  tokenSymbol: string;
  totalValue: number;
  formattedValue: string;
  txCount: number;
  latestHash: string;
  latestTimestamp: number;
  allHashes: string[];
  // Netting metadata (bidirectional same-token pairs only)
  isNetted?: boolean;
  grossForward?: number;
  grossReverse?: number;
  grossForwardFormatted?: string;
  grossReverseFormatted?: string;
}

// ===== Trace config & result (from chase-chain lib/taint-engine/types.ts) =====

export type TraceDirection = 'backward' | 'forward';

/** Reasons a branch may stop expanding during BFS */
export type StopReason = 'cex' | 'mixer' | 'depth' | 'max-nodes' | 'visited' | 'dust';

export interface TaintTraceConfig {
  /** Maximum hops from origin */
  maxDepth: number;
  /** Top-N counterparties (by value) to follow at each hop */
  maxFanoutPerHop: number;
  /** Total budget of new nodes across the entire trace */
  maxTotalNewNodes: number;
  /** Edges with value below this (in token's native units) are treated as dust and skipped */
  minWeight: number;
}

export const DEFAULT_TRACE_CONFIG: TaintTraceConfig = {
  maxDepth: 3,
  maxFanoutPerHop: 10,
  maxTotalNewNodes: 100,
  minWeight: 0,
};

export interface TaintedNode {
  address: string;
  chainId: ChainId;
  depth: number;
  /** 0..1 — fraction of origin's taint that flowed to this node */
  taintRatio: number;
  /** Lowercased address of the parent that taint flowed from */
  expandedBy: string;
  /** When set, this branch is marked but not expanded further */
  stopReason?: StopReason;
}

export interface TaintedEdgeData {
  from: string;
  to: string;
  chainId: ChainId;
  aggregated: AggregatedTransfer;
  /** Subset of original transfers belonging to this aggregated edge */
  transfers: AddressTransfer[];
}

/**
 * Recorded at a hop where more counterparties existed than maxFanoutPerHop, so the
 * long tail was not followed. Instead of silently dropping it (and inflating the kept
 * branches' taint), we account the untraced share here — the classic smurfing signal.
 */
export interface Dispersion {
  /** The wallet whose outflow fanned out beyond the cap */
  from: string;
  chainId: ChainId;
  /** How many top-value branches were followed */
  keptCount: number;
  /** How many long-tail branches were left untraced */
  droppedCount: number;
  /** 0..1 — taint that flowed to the untraced wallets (accounted, not redistributed) */
  dispersedTaint: number;
}

export interface TaintTraceResult {
  origin: string;
  direction: TraceDirection;
  /** New nodes discovered (excludes origin) */
  nodes: TaintedNode[];
  edges: TaintedEdgeData[];
  /** True when the trace stopped because the total-node budget was hit */
  reachedMaxNodes: boolean;
  /** Fan-out points where the long tail was left untraced (coverage accounting) */
  dispersions: Dispersion[];
}
