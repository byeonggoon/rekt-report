import { describe, it, expect } from 'vitest';
import { trace } from './bfs-tracer';
import type { AggregatedTransfer, AddressTransfer, ChainId, StopReason, FetchResult, HopDelta, ResumeState } from './index';

/**
 * Build a mock fetch over a static forward-flow graph.
 * `graph[address]` = list of [recipient, value] outgoing edges.
 * The engine is injected with this instead of real RPC.
 */
function mockFetch(graph: Record<string, [string, number][]>) {
  return async (address: string): Promise<FetchResult> => {
    const out = graph[address] ?? [];
    const aggregated: AggregatedTransfer[] = out.map(([to, value], i) => ({
      from: address,
      to,
      tokenSymbol: 'ETH',
      totalValue: value,
      formattedValue: String(value),
      txCount: 1,
      latestHash: `0x${address.slice(2, 6)}-${i}`,
      latestTimestamp: 0,
      allHashes: [`0x${address.slice(2, 6)}-${i}`],
    }));
    const transfers: AddressTransfer[] = aggregated.map(a => ({
      hash: a.latestHash,
      from: a.from,
      to: a.to,
      value: String(a.totalValue),
      formattedValue: a.formattedValue,
      tokenSymbol: 'ETH',
      tokenDecimals: 18,
      isNative: true,
      timestamp: 0,
    }));
    return { aggregated, transfers };
  };
}

const noStop = () => null;
const CHAIN: ChainId = 'ethereum';

describe('trace (forward haircut BFS)', () => {
  it('propagates taint proportionally across one hop', async () => {
    const fetch = mockFetch({
      '0xORIGIN': [['0xA', 600], ['0xB', 400]],
    });
    const res = await trace('0xORIGIN', CHAIN, 'forward', fetch, noStop, { maxDepth: 1 });

    const a = res.nodes.find(n => n.address === '0xA')!;
    const b = res.nodes.find(n => n.address === '0xB')!;
    expect(a.taintRatio).toBeCloseTo(0.6, 9);
    expect(b.taintRatio).toBeCloseTo(0.4, 9);
    expect(a.depth).toBe(1);
  });

  it('carries taint multiplicatively over two hops', async () => {
    const fetch = mockFetch({
      '0xORIGIN': [['0xA', 1000]], // A gets full taint 1.0
      '0xA': [['0xB', 750], ['0xC', 250]], // B: 0.75, C: 0.25
    });
    const res = await trace('0xORIGIN', CHAIN, 'forward', fetch, noStop, { maxDepth: 2 });
    expect(res.nodes.find(n => n.address === '0xB')!.taintRatio).toBeCloseTo(0.75, 9);
    expect(res.nodes.find(n => n.address === '0xC')!.taintRatio).toBeCloseTo(0.25, 9);
  });

  it('marks a CEX branch and does not expand it', async () => {
    const fetch = mockFetch({
      '0xORIGIN': [['0xCEX', 500], ['0xA', 500]],
      '0xCEX': [['0xDEEP', 500]], // should never be fetched
      '0xA': [['0xB', 500]],
    });
    const stopAtCex = (addr: string): StopReason | null =>
      addr === '0xCEX' ? 'cex' : null;
    const res = await trace('0xORIGIN', CHAIN, 'forward', fetch, stopAtCex, { maxDepth: 3 });

    const cex = res.nodes.find(n => n.address === '0xCEX')!;
    expect(cex.stopReason).toBe('cex');
    // 0xDEEP is behind the CEX and must not appear
    expect(res.nodes.some(n => n.address === '0xDEEP')).toBe(false);
    // sibling branch continued
    expect(res.nodes.some(n => n.address === '0xB')).toBe(true);
  });

  it('prevents cycles: a revisited address emits an edge but is not re-enqueued', async () => {
    const fetch = mockFetch({
      '0xORIGIN': [['0xA', 1000]],
      '0xA': [['0xB', 1000]],
      '0xB': [['0xA', 1000]], // cycle back to A
    });
    const res = await trace('0xORIGIN', CHAIN, 'forward', fetch, noStop, { maxDepth: 5 });
    // A appears once as a node
    expect(res.nodes.filter(n => n.address === '0xA')).toHaveLength(1);
    // the B->A edge still exists
    expect(res.edges.some(e => e.from === '0xB' && e.to === '0xA')).toBe(true);
  });

  it('honors maxFanoutPerHop by following only the top-N by value', async () => {
    const fetch = mockFetch({
      '0xORIGIN': [['0xA', 500], ['0xB', 300], ['0xC', 200], ['0xD', 100]],
    });
    const res = await trace('0xORIGIN', CHAIN, 'forward', fetch, noStop, {
      maxDepth: 1,
      maxFanoutPerHop: 2,
    });
    const addrs = res.nodes.map(n => n.address).sort();
    expect(addrs).toEqual(['0xA', '0xB']); // top 2 by value
  });

  it('gives kept branches their TRUE taint (normalized over all children, not just kept)', async () => {
    const fetch = mockFetch({
      '0xORIGIN': [['0xA', 500], ['0xB', 300], ['0xC', 200], ['0xD', 100]], // total 1100
    });
    const res = await trace('0xORIGIN', CHAIN, 'forward', fetch, noStop, {
      maxDepth: 1,
      maxFanoutPerHop: 2,
    });
    // A/B taint reflects the full denominator (1100), NOT re-normalized over just A+B
    expect(res.nodes.find(n => n.address === '0xA')!.taintRatio).toBeCloseTo(500 / 1100, 9);
    expect(res.nodes.find(n => n.address === '0xB')!.taintRatio).toBeCloseTo(300 / 1100, 9);
  });

  it('records dispersion for the untraced long tail', async () => {
    const fetch = mockFetch({
      '0xORIGIN': [['0xA', 500], ['0xB', 300], ['0xC', 200], ['0xD', 100]], // total 1100
    });
    const res = await trace('0xORIGIN', CHAIN, 'forward', fetch, noStop, {
      maxDepth: 1,
      maxFanoutPerHop: 2,
    });
    expect(res.dispersions).toHaveLength(1);
    const d = res.dispersions[0];
    expect(d.from).toBe('0xORIGIN');
    expect(d.keptCount).toBe(2);
    expect(d.droppedCount).toBe(2); // C, D
    expect(d.dispersedTaint).toBeCloseTo(300 / 1100, 9); // (200+100)/1100
  });

  it('conserves taint: kept + dispersed = parent taint', async () => {
    const fetch = mockFetch({
      '0xORIGIN': [['0xA', 500], ['0xB', 300], ['0xC', 200], ['0xD', 100]],
    });
    const res = await trace('0xORIGIN', CHAIN, 'forward', fetch, noStop, {
      maxDepth: 1,
      maxFanoutPerHop: 2,
    });
    const keptTaint = res.nodes.reduce((s, n) => s + n.taintRatio, 0);
    const dispersedTaint = res.dispersions.reduce((s, d) => s + d.dispersedTaint, 0);
    expect(keptTaint + dispersedTaint).toBeCloseTo(1.0, 9); // no inflation, no loss
  });

  it('records no dispersion when fan-out is within the cap', async () => {
    const fetch = mockFetch({ '0xORIGIN': [['0xA', 600], ['0xB', 400]] });
    const res = await trace('0xORIGIN', CHAIN, 'forward', fetch, noStop, {
      maxDepth: 1,
      maxFanoutPerHop: 10,
    });
    expect(res.dispersions).toHaveLength(0);
  });

  it('stops at maxDepth', async () => {
    const fetch = mockFetch({
      '0xORIGIN': [['0xA', 1000]],
      '0xA': [['0xB', 1000]],
      '0xB': [['0xC', 1000]],
    });
    const res = await trace('0xORIGIN', CHAIN, 'forward', fetch, noStop, { maxDepth: 2 });
    expect(res.nodes.some(n => n.address === '0xC')).toBe(false);
    expect(res.nodes.map(n => n.address).sort()).toEqual(['0xA', '0xB']);
  });

  it('flags reachedMaxNodes when the node budget is exhausted', async () => {
    const fetch = mockFetch({
      '0xORIGIN': [['0xA', 5], ['0xB', 4], ['0xC', 3]],
    });
    const res = await trace('0xORIGIN', CHAIN, 'forward', fetch, noStop, {
      maxDepth: 3,
      maxTotalNewNodes: 2,
    });
    expect(res.reachedMaxNodes).toBe(true);
    expect(res.nodes.length).toBeLessThanOrEqual(2);
  });

  it('skips dust edges below minWeight', async () => {
    const fetch = mockFetch({
      '0xORIGIN': [['0xA', 1000], ['0xDUST', 1]],
    });
    const res = await trace('0xORIGIN', CHAIN, 'forward', fetch, noStop, {
      maxDepth: 1,
      minWeight: 10,
    });
    expect(res.nodes.some(n => n.address === '0xDUST')).toBe(false);
    expect(res.nodes.some(n => n.address === '0xA')).toBe(true);
  });

  it('survives a fetch failure on one branch without aborting the trace', async () => {
    const base = mockFetch({
      '0xORIGIN': [['0xA', 500], ['0xB', 500]],
      '0xB': [['0xC', 500]],
    });
    const flaky = async (address: string): Promise<FetchResult> => {
      if (address === '0xA') throw new Error('rpc timeout');
      return base(address);
    };
    const res = await trace('0xORIGIN', CHAIN, 'forward', flaky, noStop, { maxDepth: 2 });
    // A still recorded as a node (fetch fails only when expanding A's children)
    expect(res.nodes.some(n => n.address === '0xA')).toBe(true);
    // B's downstream still traced
    expect(res.nodes.some(n => n.address === '0xC')).toBe(true);
  });
});

describe('trace (backward direction)', () => {
  it('picks senders as counterparties when tracing backward', async () => {
    // graph keyed by address returns that address's edges; for backward we model inflows
    const fetch = async (address: string): Promise<FetchResult> => {
      const inflows: Record<string, [string, number][]> = {
        '0xVICTIM': [['0xHACKER', 1000]], // HACKER -> VICTIM
      };
      const out = inflows[address] ?? [];
      const aggregated: AggregatedTransfer[] = out.map(([from, value], i) => ({
        from,
        to: address,
        tokenSymbol: 'ETH',
        totalValue: value,
        formattedValue: String(value),
        txCount: 1,
        latestHash: `0x${i}`,
        latestTimestamp: 0,
        allHashes: [`0x${i}`],
      }));
      return { aggregated, transfers: [] };
    };
    const res = await trace('0xVICTIM', CHAIN, 'backward', fetch, noStop, { maxDepth: 1 });
    const hacker = res.nodes.find(n => n.address === '0xHACKER')!;
    expect(hacker).toBeDefined();
    expect(hacker.taintRatio).toBeCloseTo(1.0, 9);
  });
});

describe('trace (hop callbacks + resume)', () => {
  it('invokes onHop once per hop with that hop’s new nodes and next frontier', async () => {
    const fetch = mockFetch({
      '0xORIGIN': [['0xA', 1000]],
      '0xA': [['0xB', 1000]],
    });
    const deltas: HopDelta[] = [];
    await trace('0xORIGIN', CHAIN, 'forward', fetch, noStop, { maxDepth: 2 }, {
      onHop: (d) => { deltas.push(d); },
    });
    expect(deltas.map(d => d.hop)).toEqual([0, 1]);
    // hop 0 discovered A and hands [A] forward as the next frontier
    expect(deltas[0].newNodes.map(n => n.address)).toEqual(['0xA']);
    expect(deltas[0].frontier.map(f => f.address)).toEqual(['0xA']);
    // hop 1 discovered B; nothing left to expand
    expect(deltas[1].newNodes.map(n => n.address)).toEqual(['0xB']);
    expect(deltas[1].frontier).toHaveLength(0);
    // visited grows monotonically and includes the origin
    expect(deltas[1].visited).toContain('0xorigin');
    expect(deltas[1].visited.length).toBeGreaterThanOrEqual(deltas[0].visited.length);
  });

  it('resuming from a hop-0 checkpoint yields the same nodes as a full run', async () => {
    const graph: Record<string, [string, number][]> = {
      '0xO': [['0xA', 600], ['0xB', 400]],
      '0xA': [['0xC', 600]],
      '0xB': [['0xD', 400]],
    };

    // Full run captures per-hop deltas; the hop-0 delta is a realistic checkpoint.
    const deltas: HopDelta[] = [];
    const full = await trace('0xO', CHAIN, 'forward', mockFetch(graph), noStop, { maxDepth: 2 }, {
      onHop: (d) => { deltas.push(d); },
    });
    const cp = deltas[0]; // after hop 0: frontier = [A, B]
    expect(cp.frontier.map(f => f.address).sort()).toEqual(['0xA', '0xB']);

    const resume: ResumeState = {
      frontier: cp.frontier,
      visited: cp.visited,
      startHop: cp.hop + 1,
    };

    // Resume from hop 1 to completion; depth-2 nodes must match the full run.
    const resumed = await trace('0xO', CHAIN, 'forward', mockFetch(graph), noStop, { maxDepth: 2 }, { resume });

    const fullDepth2 = full.nodes.filter(n => n.depth === 2).map(n => n.address).sort();
    const resumedDepth2 = resumed.nodes.filter(n => n.depth === 2).map(n => n.address).sort();
    expect(resumedDepth2).toEqual(fullDepth2); // C, D discovered on resume
    // taint preserved across the resume boundary
    const cFull = full.nodes.find(n => n.address === '0xC')!.taintRatio;
    const cResumed = resumed.nodes.find(n => n.address === '0xC')!.taintRatio;
    expect(cResumed).toBeCloseTo(cFull, 9);
  });
});
