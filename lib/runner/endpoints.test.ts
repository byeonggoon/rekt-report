import { describe, it, expect } from "vitest";
import { endpointsFromHop, coverageFromEndpoints } from "./endpoints";
import type { HopDelta, TaintedNode, Dispersion } from "@/lib/trace";

const BINANCE_HOT = "0x28c6c06298d514db089934071355e5743bf21d60"; // known CEX in entity DB

function node(over: Partial<TaintedNode>): TaintedNode {
  return {
    address: "0xUNKNOWN",
    chainId: "ethereum",
    depth: 1,
    taintRatio: 0.5,
    expandedBy: "0xORIGIN",
    ...over,
  };
}

function delta(over: Partial<HopDelta>): HopDelta {
  return { hop: 0, newNodes: [], newDispersions: [], frontier: [], visited: [], ...over };
}

describe("endpointsFromHop", () => {
  it("maps a CEX-stopped node to a cex endpoint with its entity name", () => {
    const eps = endpointsFromHop("job1", delta({
      newNodes: [node({ address: BINANCE_HOT, stopReason: "cex", taintRatio: 0.42 })],
    }));
    expect(eps).toHaveLength(1);
    expect(eps[0].type).toBe("cex");
    expect(eps[0].entity_name).toBe("Binance Hot Wallet");
    expect(eps[0].taint_ratio).toBe(0.42);
    expect(eps[0].job_id).toBe("job1");
  });

  it("ignores non-terminal nodes (no stopReason, or depth/dust stops)", () => {
    const eps = endpointsFromHop("job1", delta({
      newNodes: [
        node({ stopReason: undefined }),
        node({ stopReason: "depth" }),
        node({ stopReason: "dust" }),
      ],
    }));
    expect(eps).toHaveLength(0);
  });

  it("maps a dispersion to a dispersed endpoint carrying the untraced taint", () => {
    const d: Dispersion = {
      from: "0xFANOUT",
      chainId: "ethereum",
      keptCount: 10,
      droppedCount: 90,
      dispersedTaint: 0.63,
    };
    const eps = endpointsFromHop("job1", delta({ newDispersions: [d] }));
    expect(eps).toHaveLength(1);
    expect(eps[0].type).toBe("dispersed");
    expect(eps[0].address).toBe("0xFANOUT");
    expect(eps[0].taint_ratio).toBe(0.63);
    expect(eps[0].entity_name).toBeNull();
  });

  it("maps a bridge-stopped node to a bridge-out endpoint", () => {
    const eps = endpointsFromHop("job1", delta({
      newNodes: [node({ address: "0xd37bbe5744d730a1d98d8dc97c42f0ca46ad7146", stopReason: "bridge", taintRatio: 0.3 })],
    }));
    expect(eps).toHaveLength(1);
    expect(eps[0].type).toBe("bridge-out");
    expect(eps[0].entity_name).toBe("THORChain Router (Ethereum)");
  });

  it("emits both node endpoints and dispersions in one hop", () => {
    const eps = endpointsFromHop("job1", delta({
      newNodes: [node({ address: BINANCE_HOT, stopReason: "cex" })],
      newDispersions: [{ from: "0xF", chainId: "ethereum", keptCount: 5, droppedCount: 3, dispersedTaint: 0.1 }],
    }));
    expect(eps.map(e => e.type).sort()).toEqual(["cex", "dispersed"]);
  });
});

describe("coverageFromEndpoints", () => {
  it("sums taint across endpoints", () => {
    expect(coverageFromEndpoints([{ taint_ratio: 0.4 }, { taint_ratio: 0.25 }])).toBeCloseTo(0.65, 9);
  });
  it("caps at 1", () => {
    expect(coverageFromEndpoints([{ taint_ratio: 0.8 }, { taint_ratio: 0.5 }])).toBe(1);
  });
  it("is 0 for no endpoints", () => {
    expect(coverageFromEndpoints([])).toBe(0);
  });
});
