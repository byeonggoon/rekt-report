import type { ChainId } from '@/lib/trace';
import { getEvmChain } from '@/lib/chains/evm';

/** Etherscan V2 unified endpoint — one base for every EVM chain, keyed by `chainid`. */
const ETHERSCAN_V2_BASE = 'https://api.etherscan.io/v2/api';

export interface EtherscanNormalTx {
  hash: string;
  from: string;
  to: string;
  value: string;
  timeStamp: string;
  isError: string;
}

export interface EtherscanTokenTx {
  hash: string;
  from: string;
  to: string;
  value: string;
  tokenSymbol: string;
  tokenDecimal: string;
  contractAddress: string;
  timeStamp: string;
}

interface EtherscanEnvelope<T> {
  status: string;
  message: string;
  result: T[] | string;
}

export interface EtherscanFetchOptions {
  apiKey: string;
  limit?: number;
  /** injected for tests — defaults to global fetch */
  fetchImpl?: typeof fetch;
}

const RETRYABLE = new Set([429, 500, 502, 503, 504]);

async function callEtherscan<T>(
  url: string,
  fetchImpl: typeof fetch,
  attempt = 0,
): Promise<T[]> {
  const res = await fetchImpl(url, { signal: AbortSignal.timeout(20_000) });
  if (!res.ok) {
    if (RETRYABLE.has(res.status) && attempt < 2) {
      await new Promise(r => setTimeout(r, 600 * (attempt + 1)));
      return callEtherscan<T>(url, fetchImpl, attempt + 1);
    }
    throw new Error(`Etherscan HTTP ${res.status}`);
  }
  const body = (await res.json()) as EtherscanEnvelope<T>;
  // status "0" with "No transactions found" is a valid empty result, not an error
  if (body.status === '0') {
    if (typeof body.result === 'string') {
      if (/rate limit|max .*rate/i.test(body.result) && attempt < 2) {
        await new Promise(r => setTimeout(r, 600 * (attempt + 1)));
        return callEtherscan<T>(url, fetchImpl, attempt + 1);
      }
      return [];
    }
  }
  return Array.isArray(body.result) ? body.result : [];
}

export interface RawEvmHistory {
  normal: EtherscanNormalTx[];
  internal: EtherscanNormalTx[];
  token: EtherscanTokenTx[];
}

/**
 * Fetch an address's normal + internal + ERC-20 token history for one EVM chain.
 * Token history uses a 4x limit so real transfers aren't buried under spam airdrops
 * (same rationale as chase-chain).
 */
export async function fetchEvmHistory(
  address: string,
  chainId: ChainId,
  opts: EtherscanFetchOptions,
): Promise<RawEvmHistory> {
  const { id } = getEvmChain(chainId);
  const limit = opts.limit ?? 100;
  const fetchImpl = opts.fetchImpl ?? fetch;
  const base = `${ETHERSCAN_V2_BASE}?chainid=${id}`;
  const key = `&apikey=${opts.apiKey}`;
  const addr = encodeURIComponent(address);

  const normalUrl = `${base}&module=account&action=txlist&address=${addr}&page=1&offset=${limit}&sort=desc${key}`;
  const internalUrl = `${base}&module=account&action=txlistinternal&address=${addr}&page=1&offset=${limit}&sort=desc${key}`;
  const tokenUrl = `${base}&module=account&action=tokentx&address=${addr}&page=1&offset=${limit * 4}&sort=desc${key}`;

  const [normal, internal, token] = await Promise.all([
    callEtherscan<EtherscanNormalTx>(normalUrl, fetchImpl),
    callEtherscan<EtherscanNormalTx>(internalUrl, fetchImpl),
    callEtherscan<EtherscanTokenTx>(tokenUrl, fetchImpl),
  ]);

  return { normal, internal, token };
}
