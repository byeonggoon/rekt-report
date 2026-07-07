import type { ChainId } from "@/lib/trace";
import { getEvmChain } from "@/lib/chains/evm";

const ETHERSCAN_V2_BASE = "https://api.etherscan.io/v2/api";

// Module cache: `${numericChainId}:${ts}:${closest}` → block number.
const cache = new Map<string, number>();

export interface BlockByTimeOptions {
  apiKey: string;
  closest?: "before" | "after";
  fetchImpl?: typeof fetch;
}

/**
 * Resolve a unix timestamp (seconds) to a block number via Etherscan V2
 * `getblocknobytime`. Returns null on failure so callers can fall back to the
 * full range. Used to window a trace to funds moving after the incident time.
 */
export async function timestampToBlock(
  chainId: ChainId,
  unixSeconds: number,
  opts: BlockByTimeOptions,
): Promise<number | null> {
  const closest = opts.closest ?? "before";
  const { id } = getEvmChain(chainId);
  const key = `${id}:${unixSeconds}:${closest}`;
  const cached = cache.get(key);
  if (cached !== undefined) return cached;

  const fetchImpl = opts.fetchImpl ?? fetch;
  const url =
    `${ETHERSCAN_V2_BASE}?chainid=${id}&module=block&action=getblocknobytime` +
    `&timestamp=${unixSeconds}&closest=${closest}&apikey=${opts.apiKey}`;

  try {
    const res = await fetchImpl(url, { signal: AbortSignal.timeout(10_000) });
    if (!res.ok) return null;
    const data = (await res.json()) as { status?: string; result?: unknown };
    const block = parseInt(String(data?.result), 10);
    if (!Number.isFinite(block) || block <= 0) return null;
    cache.set(key, block);
    return block;
  } catch {
    return null;
  }
}
