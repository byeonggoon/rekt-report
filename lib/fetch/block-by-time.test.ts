import { describe, it, expect } from "vitest";
import { timestampToBlock } from "./block-by-time";

function mockJson(result: unknown, ok = true): typeof fetch {
  return (async () => ({ ok, status: ok ? 200 : 500, json: async () => ({ status: "1", result }) }) as Response) as typeof fetch;
}

describe("timestampToBlock", () => {
  it("parses the block number from getblocknobytime", async () => {
    const b = await timestampToBlock("ethereum", 1_700_000_000, { apiKey: "k", fetchImpl: mockJson("18500000") });
    expect(b).toBe(18500000);
  });

  it("builds the request with chainid, timestamp, and closest", async () => {
    let seen = "";
    const capture: typeof fetch = (async (url: string) => {
      seen = String(url);
      return { ok: true, status: 200, json: async () => ({ result: "123" }) } as Response;
    }) as typeof fetch;
    await timestampToBlock("bsc", 1_650_000_000, { apiKey: "secret", closest: "after", fetchImpl: capture });
    expect(seen).toContain("chainid=56");
    expect(seen).toContain("action=getblocknobytime");
    expect(seen).toContain("timestamp=1650000000");
    expect(seen).toContain("closest=after");
  });

  it("returns null on a non-numeric result", async () => {
    expect(await timestampToBlock("ethereum", 111, { apiKey: "k", fetchImpl: mockJson("Max rate limit reached") })).toBeNull();
  });

  it("returns null on an HTTP error", async () => {
    expect(await timestampToBlock("ethereum", 222, { apiKey: "k", fetchImpl: mockJson("1", false) })).toBeNull();
  });
});
