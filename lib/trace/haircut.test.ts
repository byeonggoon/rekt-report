import { describe, it, expect } from 'vitest';
import { haircutDistribute, aggregatedToWeights } from './haircut';
import type { AggregatedTransfer } from './types';

function agg(from: string, to: string, totalValue: number): AggregatedTransfer {
  return {
    from,
    to,
    tokenSymbol: 'ETH',
    totalValue,
    formattedValue: String(totalValue),
    txCount: 1,
    latestHash: '0xhash',
    latestTimestamp: 0,
    allHashes: ['0xhash'],
  };
}

describe('haircutDistribute', () => {
  it('splits parent taint proportionally to weight', () => {
    const map = haircutDistribute(1.0, [
      { counterparty: '0xA', weight: 600 },
      { counterparty: '0xB', weight: 300 },
      { counterparty: '0xC', weight: 100 },
    ]);
    expect(map.get('0xa')).toBeCloseTo(0.6, 9);
    expect(map.get('0xb')).toBeCloseTo(0.3, 9);
    expect(map.get('0xc')).toBeCloseTo(0.1, 9);
  });

  it('conserves taint total (haircut never inflates)', () => {
    const map = haircutDistribute(0.5, [
      { counterparty: '0xA', weight: 1 },
      { counterparty: '0xB', weight: 1 },
    ]);
    const sum = [...map.values()].reduce((s, v) => s + v, 0);
    expect(sum).toBeCloseTo(0.5, 9);
  });

  it('sums contributions when the same counterparty appears twice', () => {
    const map = haircutDistribute(1.0, [
      { counterparty: '0xA', weight: 50 },
      { counterparty: '0xa', weight: 50 },
    ]);
    expect(map.size).toBe(1);
    expect(map.get('0xa')).toBeCloseTo(1.0, 9);
  });

  it('returns empty map when total weight is zero', () => {
    const map = haircutDistribute(1.0, [{ counterparty: '0xA', weight: 0 }]);
    expect(map.size).toBe(0);
  });
});

describe('aggregatedToWeights', () => {
  it('backward direction picks the sender as counterparty', () => {
    const w = aggregatedToWeights([agg('0xSender', '0xSelf', 100)], 'backward', '0xSelf');
    expect(w).toHaveLength(1);
    expect(w[0].counterparty).toBe('0xSender');
    expect(w[0].weight).toBe(100);
  });

  it('forward direction picks the recipient as counterparty', () => {
    const w = aggregatedToWeights([agg('0xSelf', '0xRecipient', 100)], 'forward', '0xSelf');
    expect(w[0].counterparty).toBe('0xRecipient');
  });

  it('skips self-loops', () => {
    const w = aggregatedToWeights([agg('0xSelf', '0xSelf', 100)], 'forward', '0xSelf');
    expect(w).toHaveLength(0);
  });

  it('skips non-positive weights', () => {
    const w = aggregatedToWeights([agg('0xA', '0xSelf', 0)], 'backward', '0xSelf');
    expect(w).toHaveLength(0);
  });
});
