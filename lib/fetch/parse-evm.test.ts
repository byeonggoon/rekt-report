import { describe, it, expect } from 'vitest';
import { parseEvmHistory } from './parse-evm';
import type { RawEvmHistory } from './etherscan';

function raw(over: Partial<RawEvmHistory>): RawEvmHistory {
  return { normal: [], internal: [], token: [], ...over };
}

describe('parseEvmHistory', () => {
  it('parses native transfers from normal txs and formats value', () => {
    const out = parseEvmHistory(
      raw({
        normal: [{ hash: '0x1', from: '0xA', to: '0xB', value: '1000000000000000000', timeStamp: '100', isError: '0' }],
      }),
      'ethereum',
    );
    expect(out).toHaveLength(1);
    expect(out[0].isNative).toBe(true);
    expect(out[0].tokenSymbol).toBe('ETH');
    expect(out[0].formattedValue).toBe('1');
  });

  it('drops failed and zero-value native txs', () => {
    const out = parseEvmHistory(
      raw({
        normal: [
          { hash: '0x1', from: '0xA', to: '0xB', value: '1000', timeStamp: '1', isError: '1' },
          { hash: '0x2', from: '0xA', to: '0xB', value: '0', timeStamp: '1', isError: '0' },
        ],
      }),
      'ethereum',
    );
    expect(out).toHaveLength(0);
  });

  it('filters a fake ERC-20 that impersonates the native symbol', () => {
    const out = parseEvmHistory(
      raw({
        token: [{
          hash: '0x1', from: '0xA', to: '0xB', value: '1000000000000000000',
          tokenSymbol: 'ETH', tokenDecimal: '18', contractAddress: '0xscam', timeStamp: '1',
        }],
      }),
      'ethereum',
    );
    expect(out).toHaveLength(0);
  });

  it('filters obvious spam token symbols', () => {
    const out = parseEvmHistory(
      raw({
        token: [{
          hash: '0x1', from: '0xA', to: '0xB', value: '1000000',
          tokenSymbol: 'CLAIM-REWARD.COM', tokenDecimal: '6', contractAddress: '0xspam', timeStamp: '1',
        }],
      }),
      'ethereum',
    );
    expect(out).toHaveLength(0);
  });

  it('parses a legitimate ERC-20 (USDC) with correct decimals', () => {
    const out = parseEvmHistory(
      raw({
        token: [{
          hash: '0x1', from: '0xA', to: '0xB', value: '2500000',
          tokenSymbol: 'USDC', tokenDecimal: '6', contractAddress: '0xusdc', timeStamp: '5',
        }],
      }),
      'ethereum',
    );
    expect(out).toHaveLength(1);
    expect(out[0].tokenSymbol).toBe('USDC');
    expect(out[0].formattedValue).toBe('2.5');
    expect(out[0].isNative).toBe(false);
  });

  it('uses the chain native symbol (BNB on bsc, not ETH)', () => {
    const out = parseEvmHistory(
      raw({
        normal: [{ hash: '0x1', from: '0xA', to: '0xB', value: '1000000000000000000', timeStamp: '1', isError: '0' }],
      }),
      'bsc',
    );
    expect(out[0].tokenSymbol).toBe('BNB');
  });
});
