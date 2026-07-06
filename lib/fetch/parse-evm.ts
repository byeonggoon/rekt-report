import { formatUnits } from 'viem';
import type { ChainId, AddressTransfer } from '@/lib/trace';
import { getEvmChain } from '@/lib/chains/evm';
import type { RawEvmHistory } from './etherscan';

const ZERO = '0x0000000000000000000000000000000000000000';

/**
 * A fake ERC-20 that impersonates the chain's native symbol (e.g. a token literally
 * named "ETH" on Ethereum) is a scam and must be dropped — real native transfers only
 * come from txlist/txlistinternal. Mirrors chase-chain isScamNativeToken.
 */
function isScamNativeToken(tokenSymbol: string, nativeSymbol: string): boolean {
  return tokenSymbol.toUpperCase() === nativeSymbol.toUpperCase();
}

/** Obvious spam token symbols (URLs, airdrop bait). */
function isSpamSymbol(symbol: string): boolean {
  const s = symbol.toUpperCase();
  if (s.length > 15) return true;
  if (/\.(COM|ORG|IO|NET|XYZ|APP|FINANCE|EXCHANGE|CLAIM)/.test(s)) return true;
  if (/CLAIM|AIRDROP|VISIT|REWARD|FREE|BONUS/.test(s)) return true;
  if (s.includes('T.ME') || s.includes('HTTP')) return true;
  return false;
}

/**
 * Convert raw Etherscan history into normalized AddressTransfer[].
 * - normal + internal txs → native transfers (value > 0, no error)
 * - token txs → ERC-20 transfers (spam / fake-native filtered)
 */
export function parseEvmHistory(raw: RawEvmHistory, chainId: ChainId): AddressTransfer[] {
  const { nativeSymbol, nativeDecimals } = getEvmChain(chainId);
  const transfers: AddressTransfer[] = [];

  for (const tx of [...raw.normal, ...raw.internal]) {
    if (tx.isError === '1') continue;
    if (!tx.value || tx.value === '0') continue;
    transfers.push({
      hash: tx.hash,
      from: tx.from,
      to: tx.to,
      value: tx.value,
      formattedValue: formatUnits(BigInt(tx.value), nativeDecimals),
      tokenSymbol: nativeSymbol,
      isNative: true,
      tokenDecimals: nativeDecimals,
      timestamp: Number(tx.timeStamp) || 0,
    });
  }

  for (const tx of raw.token) {
    const symbol = tx.tokenSymbol || '';
    if (!symbol) continue;
    if (isSpamSymbol(symbol)) continue;
    if (isScamNativeToken(symbol, nativeSymbol)) continue;
    if (!tx.value || tx.value === '0') continue;
    const decimals = Number(tx.tokenDecimal) || 18;
    transfers.push({
      hash: tx.hash,
      from: tx.from,
      to: tx.to,
      value: tx.value,
      formattedValue: formatUnits(BigInt(tx.value), decimals),
      tokenSymbol: symbol,
      tokenAddress: tx.contractAddress || ZERO,
      isNative: false,
      tokenDecimals: decimals,
      timestamp: Number(tx.timeStamp) || 0,
    });
  }

  return transfers;
}
