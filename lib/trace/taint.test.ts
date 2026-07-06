import { describe, it, expect } from 'vitest';
import { haircutRatio, taintedAmount, shouldPrune } from './taint';

describe('haircutRatio', () => {
  it('returns 0 for empty pool', () => {
    expect(haircutRatio(0n, 0n)).toBe(0);
  });

  it('returns 1 when fully tainted', () => {
    expect(haircutRatio(100n, 100n)).toBe(1);
  });

  it('computes proportional ratio', () => {
    expect(haircutRatio(100n, 150n)).toBeCloseTo(0.6667, 3);
  });

  it('keeps precision on wei-scale values', () => {
    const tainted = 12_000_000_000_000_000_000n; // 12 ETH
    const total = 36_000_000_000_000_000_000n; // 36 ETH
    expect(haircutRatio(tainted, total)).toBeCloseTo(1 / 3, 9);
  });

  it('clamps taintedIn above totalIn to 1', () => {
    expect(haircutRatio(200n, 100n)).toBe(1);
  });
});

describe('taintedAmount', () => {
  it('returns full outflow at ratio 1', () => {
    expect(taintedAmount(500n, 1)).toBe(500n);
  });

  it('returns 0 at ratio 0', () => {
    expect(taintedAmount(500n, 0)).toBe(0n);
  });

  it('splits proportionally', () => {
    expect(taintedAmount(1_000_000_000_000n, 0.25)).toBe(250_000_000_000n);
  });
});

describe('shouldPrune', () => {
  it('prunes below threshold', () => {
    expect(shouldPrune(0.005, 0.01)).toBe(true);
  });

  it('keeps at or above threshold', () => {
    expect(shouldPrune(0.01, 0.01)).toBe(false);
  });
});
