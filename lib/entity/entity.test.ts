import { describe, it, expect } from 'vitest';
import { getEntity, createStopPredicate } from './index';

// Known addresses from the ported chase-chain EVM entity DB
const BINANCE_HOT = '0x28c6c06298d514db089934071355e5743bf21d60';

describe('entity lookup', () => {
  it('resolves a known CEX address (case-insensitive)', () => {
    expect(getEntity(BINANCE_HOT)?.category).toBe('cex');
    expect(getEntity(BINANCE_HOT.toUpperCase())?.category).toBe('cex');
  });

  it('returns null for an unknown address', () => {
    expect(getEntity('0x0000000000000000000000000000000000000001')).toBeNull();
  });
});

describe('createStopPredicate', () => {
  const stop = createStopPredicate();

  it('stops at a CEX', () => {
    expect(stop(BINANCE_HOT)).toBe('cex');
  });

  it('does not stop at an unknown EOA', () => {
    expect(stop('0x0000000000000000000000000000000000000001')).toBeNull();
  });
});
