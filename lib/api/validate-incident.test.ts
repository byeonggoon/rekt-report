import { describe, it, expect } from "vitest";
import { validateIncidentInput } from "./validate-incident";

const NOW = "2026-07-06T00:00:00.000Z";
const DEF = { depth: 3, fanout: 10 };
const OK_ADDR = "0x098B716B8Aaf21512996dC57EB0615e2383E2f96";

function ok(body: unknown) {
  const r = validateIncidentInput(body, DEF, NOW);
  if (!r.ok) throw new Error(`expected ok, got: ${r.error}`);
  return r.value;
}

describe("validateIncidentInput", () => {
  it("accepts a well-formed payload", () => {
    const v = ok({
      name: "Ronin Bridge",
      hackerAddresses: [{ address: OK_ADDR, chain: "ethereum" }],
      incidentAt: "2022-03-23T00:00:00Z",
    });
    expect(v.name).toBe("Ronin Bridge");
    expect(v.hackerAddresses[0].chain).toBe("ethereum");
    expect(v.incidentAt).toBe("2022-03-23T00:00:00.000Z");
  });

  it("defaults incidentAt to now and applies default depth/fanout", () => {
    const v = ok({ name: "X", hackerAddresses: [{ address: OK_ADDR, chain: "base" }] });
    expect(v.incidentAt).toBe(NOW);
    expect(v.depth).toBe(3);
    expect(v.fanout).toBe(10);
  });

  it("honors provided depth/fanout", () => {
    const v = ok({ name: "X", hackerAddresses: [{ address: OK_ADDR, chain: "base" }], depth: 5, fanout: 8 });
    expect(v.depth).toBe(5);
    expect(v.fanout).toBe(8);
  });

  function err(body: unknown): string {
    const r = validateIncidentInput(body, DEF, NOW);
    if (r.ok) throw new Error("expected error");
    return r.error;
  }

  it("rejects a missing name", () => {
    expect(err({ hackerAddresses: [{ address: OK_ADDR, chain: "ethereum" }] })).toMatch(/name/);
  });
  it("rejects an empty hackerAddresses array", () => {
    expect(err({ name: "X", hackerAddresses: [] })).toMatch(/non-empty/);
  });
  it("rejects a malformed address", () => {
    expect(err({ name: "X", hackerAddresses: [{ address: "0xnope", chain: "ethereum" }] })).toMatch(/invalid EVM address/);
  });
  it("rejects a non-EVM chain", () => {
    expect(err({ name: "X", hackerAddresses: [{ address: OK_ADDR, chain: "bitcoin" }] })).toMatch(/unsupported chain/);
  });
  it("rejects an unparseable incidentAt", () => {
    expect(err({ name: "X", hackerAddresses: [{ address: OK_ADDR, chain: "ethereum" }], incidentAt: "not-a-date" })).toMatch(/invalid incidentAt/);
  });
  it("rejects a non-object body", () => {
    expect(err("hello")).toMatch(/object/);
  });
});
