import type { ChainId, FetchAddressTransfersFn, FetchResult } from '@/lib/trace';
import { fetchEvmHistory, type EtherscanFetchOptions } from './etherscan';
import { parseEvmHistory } from './parse-evm';
import { aggregateTransfers } from './aggregate';

export interface EvmFetcherOptions {
  apiKey: string;
  /** per-address tx limit (default 100; token history uses 4x internally) */
  limit?: number;
  /** injected for tests — defaults to global fetch */
  fetchImpl?: typeof fetch;
}

/**
 * Build the `FetchAddressTransfersFn` the trace engine needs, backed by Etherscan V2.
 * Etherscan raw history → normalized transfers → aggregated edges.
 */
export function createEvmFetcher(opts: EvmFetcherOptions): FetchAddressTransfersFn {
  const fetchOpts: EtherscanFetchOptions = {
    apiKey: opts.apiKey,
    limit: opts.limit,
    fetchImpl: opts.fetchImpl,
  };

  return async (address: string, chainId: ChainId): Promise<FetchResult> => {
    const raw = await fetchEvmHistory(address, chainId, fetchOpts);
    const transfers = parseEvmHistory(raw, chainId);
    const aggregated = aggregateTransfers(transfers);
    return { aggregated, transfers };
  };
}
