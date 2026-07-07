import { isEvmChain } from "@/lib/chains/evm";
import type { HackerAddress } from "@/lib/db";

const EVM_ADDRESS = /^0x[a-fA-F0-9]{40}$/;

export interface IncidentInput {
  name: string;
  description?: string;
  incidentAt: string; // ISO
  hackerAddresses: HackerAddress[];
  depth: number;
  fanout: number;
}

export type ValidateResult =
  | { ok: true; value: IncidentInput }
  | { ok: false; error: string };

/**
 * Validate + normalize an incident-registration payload. Pure — unit-tested.
 * The route layer only handles auth and DB writes.
 */
export function validateIncidentInput(
  body: unknown,
  defaults: { depth: number; fanout: number },
  now: string,
): ValidateResult {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "body must be a JSON object" };
  }
  const b = body as Record<string, unknown>;

  if (typeof b.name !== "string" || !b.name.trim()) {
    return { ok: false, error: "name is required" };
  }
  if (!Array.isArray(b.hackerAddresses) || b.hackerAddresses.length === 0) {
    return { ok: false, error: "hackerAddresses must be a non-empty array" };
  }

  const addrs: HackerAddress[] = [];
  for (const raw of b.hackerAddresses) {
    const h = raw as { address?: unknown; chain?: unknown };
    if (typeof h.address !== "string" || !EVM_ADDRESS.test(h.address)) {
      return { ok: false, error: `invalid EVM address: ${String(h.address)}` };
    }
    if (typeof h.chain !== "string" || !isEvmChain(h.chain)) {
      return { ok: false, error: `unsupported chain: ${String(h.chain)}` };
    }
    addrs.push({ address: h.address, chain: h.chain });
  }

  let incidentAt = now;
  if (b.incidentAt != null) {
    const d = new Date(String(b.incidentAt));
    if (Number.isNaN(d.getTime())) return { ok: false, error: "invalid incidentAt" };
    incidentAt = d.toISOString();
  }

  const depth = typeof b.depth === "number" && b.depth > 0 ? Math.floor(b.depth) : defaults.depth;
  const fanout = typeof b.fanout === "number" && b.fanout > 0 ? Math.floor(b.fanout) : defaults.fanout;

  return {
    ok: true,
    value: {
      name: b.name.trim(),
      description: typeof b.description === "string" ? b.description : undefined,
      incidentAt,
      hackerAddresses: addrs,
      depth,
      fanout,
    },
  };
}
