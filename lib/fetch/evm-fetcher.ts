import type { ChainId, FetchAddressTransfersFn, FetchResult } from '@/lib/trace';
import { fetchEvmHistory, type EtherscanFetchOptions } from './etherscan';
import { parseEvmHistory } from './parse-evm';
import { aggregateTransfers } from './aggregate';
import { timestampToBlock } from './block-by-time';

export interface EvmFetcherOptions {
  apiKey: string;
  /** per-address tx limit (default 100; token history uses 4x internally) */
  limit?: number;
  /** Unix seconds: window the trace to funds moving from this time onward (incident replay). */
  sinceTimestamp?: number;
  /** injected for tests — defaults to global fetch */
  fetchImpl?: typeof fetch;
}

/**
 * Build the `FetchAddressTransfersFn` the trace engine needs, backed by Etherscan V2.
 * Etherscan raw history → normalized transfers → aggregated edges.
 *
 * With `sinceTimestamp`, the incident time is resolved to a start block ONCE and applied
 * to every hop, so we follow funds moving after the exploit rather than an address's
 * most-recent (often unrelated) activity.
 */
export function createEvmFetcher(opts: EvmFetcherOptions): FetchAddressTransfersFn {
  let startBlockPromise: Promise<number | null> | null = null;

  return async (address: string, chainId: ChainId): Promise<FetchResult> => {
    let startBlock: number | undefined;
    if (opts.sinceTimestamp != null) {
      if (!startBlockPromise) {
        startBlockPromise = timestampToBlock(chainId, opts.sinceTimestamp, {
          apiKey: opts.apiKey,
          closest: "before",
          fetchImpl: opts.fetchImpl,
        });
      }
      startBlock = (await startBlockPromise) ?? undefined;
    }

    const fetchOpts: EtherscanFetchOptions = {
      apiKey: opts.apiKey,
      limit: opts.limit,
      startBlock,
      fetchImpl: opts.fetchImpl,
    };

    const raw = await fetchEvmHistory(address, chainId, fetchOpts);
    const transfers = parseEvmHistory(raw, chainId);
    const aggregated = aggregateTransfers(transfers);
    return { aggregated, transfers };
  };
}
