import { describe, it, expect } from 'vitest';
import { createEvmFetcher } from './evm-fetcher';

/**
 * Mock the Etherscan V2 HTTP layer: return an envelope based on the `action` in the URL.
 * This exercises the full fetch → parse → aggregate assembly without any network.
 */
function mockEtherscan(byAction: Record<string, unknown[]>): typeof fetch {
  return (async (url: string | URL | Request) => {
    const u = String(url);
    const action = /action=(\w+)/.exec(u)?.[1] ?? '';
    const result = byAction[action] ?? [];
    return {
      ok: true,
      status: 200,
      json: async () => ({ status: result.length ? '1' : '0', message: 'OK', result }),
    } as Response;
  }) as typeof fetch;
}

describe('createEvmFetcher (end-to-end assembly)', () => {
  it('fetches, parses, and aggregates native + token transfers', async () => {
    const fetchImpl = mockEtherscan({
      txlist: [
        { hash: '0x1', from: '0xVICTIM', to: '0xA', value: '1000000000000000000', timeStamp: '10', isError: '0' },
        { hash: '0x2', from: '0xVICTIM', to: '0xA', value: '2000000000000000000', timeStamp: '20', isError: '0' },
      ],
      txlistinternal: [],
      tokentx: [
        { hash: '0x3', from: '0xVICTIM', to: '0xB', value: '5000000', tokenSymbol: 'USDC', tokenDecimal: '6', contractAddress: '0xusdc', timeStamp: '30' },
      ],
    });

    const fetcher = createEvmFetcher({ apiKey: 'test', fetchImpl });
    const { aggregated, transfers } = await fetcher('0xVICTIM', 'ethereum');

    expect(transfers).toHaveLength(3);
    // native VICTIM->A summed into one aggregated edge (1 + 2 = 3 ETH)
    const ethEdge = aggregated.find(a => a.to === '0xA' && a.tokenSymbol === 'ETH')!;
    expect(ethEdge.totalValue).toBeCloseTo(3, 9);
    expect(ethEdge.txCount).toBe(2);
    // USDC edge to B
    const usdcEdge = aggregated.find(a => a.to === '0xB' && a.tokenSymbol === 'USDC')!;
    expect(usdcEdge.totalValue).toBeCloseTo(5, 9);
  });

  it('returns empty result when the address has no history', async () => {
    const fetcher = createEvmFetcher({ apiKey: 'test', fetchImpl: mockEtherscan({}) });
    const { aggregated, transfers } = await fetcher('0xEMPTY', 'ethereum');
    expect(transfers).toHaveLength(0);
    expect(aggregated).toHaveLength(0);
  });

  it('windows the trace when sinceTimestamp is set (block lookup + startblock + asc)', async () => {
    const urls: string[] = [];
    const capture: typeof fetch = (async (url: string | URL | Request) => {
      const u = String(url);
      urls.push(u);
      const action = /action=(\w+)/.exec(u)?.[1] ?? '';
      if (action === 'getblocknobytime') {
        return { ok: true, status: 200, json: async () => ({ status: '1', result: '20500000' }) } as Response;
      }
      return { ok: true, status: 200, json: async () => ({ status: '0', message: 'OK', result: [] }) } as Response;
    }) as typeof fetch;

    const fetcher = createEvmFetcher({ apiKey: 'test', sinceTimestamp: 1_718_841_600, fetchImpl: capture });
    await fetcher('0xVICTIM', 'ethereum');

    // resolved the incident time to a block once
    expect(urls.some(u => u.includes('action=getblocknobytime') && u.includes('timestamp=1718841600'))).toBe(true);
    // tx queries are windowed from that block, earliest-first
    const txlist = urls.find(u => u.includes('action=txlist'))!;
    expect(txlist).toContain('startblock=20500000');
    expect(txlist).toContain('sort=asc');
  });

  it('does NOT window when sinceTimestamp is absent (recent-first, no startblock)', async () => {
    const urls: string[] = [];
    const capture: typeof fetch = (async (url: string | URL | Request) => {
      urls.push(String(url));
      return { ok: true, status: 200, json: async () => ({ status: '0', result: [] }) } as Response;
    }) as typeof fetch;
    const fetcher = createEvmFetcher({ apiKey: 'test', fetchImpl: capture });
    await fetcher('0xADDR', 'ethereum');
    expect(urls.some(u => u.includes('getblocknobytime'))).toBe(false);
    const txlist = urls.find(u => u.includes('action=txlist'))!;
    expect(txlist).toContain('sort=desc');
    expect(txlist).not.toContain('startblock=');
  });
});
