import { describe, it, expect } from 'vitest';
import { aggregateTransfers } from './aggregate';
import type { AddressTransfer } from '@/lib/trace';

function tf(from: string, to: string, symbol: string, formatted: string, hash: string, ts = 0): AddressTransfer {
  return {
    hash, from, to, value: '0', formattedValue: formatted,
    tokenSymbol: symbol, isNative: symbol === 'ETH', tokenDecimals: 18, timestamp: ts,
  };
}

describe('aggregateTransfers', () => {
  it('sums value and tx count for the same (from,to,token)', () => {
    const out = aggregateTransfers([
      tf('0xA', '0xB', 'ETH', '1.5', '0x1', 10),
      tf('0xA', '0xB', 'ETH', '2.5', '0x2', 20),
    ]);
    expect(out).toHaveLength(1);
    expect(out[0].totalValue).toBeCloseTo(4.0, 9);
    expect(out[0].txCount).toBe(2);
    expect(out[0].allHashes).toEqual(['0x1', '0x2']);
  });

  it('keeps the latest hash/timestamp', () => {
    const out = aggregateTransfers([
      tf('0xA', '0xB', 'ETH', '1', '0xold', 10),
      tf('0xA', '0xB', 'ETH', '1', '0xnew', 99),
    ]);
    expect(out[0].latestHash).toBe('0xnew');
    expect(out[0].latestTimestamp).toBe(99);
  });

  it('separates different tokens and directions', () => {
    const out = aggregateTransfers([
      tf('0xA', '0xB', 'ETH', '1', '0x1'),
      tf('0xA', '0xB', 'USDC', '1', '0x2'),
      tf('0xB', '0xA', 'ETH', '1', '0x3'),
    ]);
    expect(out).toHaveLength(3);
  });

  it('is case-insensitive on addresses when grouping', () => {
    const out = aggregateTransfers([
      tf('0xAbc', '0xDef', 'ETH', '1', '0x1'),
      tf('0xabc', '0xdef', 'ETH', '1', '0x2'),
    ]);
    expect(out).toHaveLength(1);
    expect(out[0].txCount).toBe(2);
  });
});
