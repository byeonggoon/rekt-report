import type { HopDelta } from "@/lib/trace";
import { getEntity } from "@/lib/entity";
import type { EndpointRow, NewEndpoint } from "@/lib/db";

/**
 * Map one hop's newly-discovered nodes + dispersions to persistable endpoints.
 * Pure — unit-tested. Saved incrementally per hop so a crash never loses evidence.
 *
 * v1 records the taint RATIO reaching each endpoint (the proportional method); exact
 * amount attribution (FIFO) and full path reconstruction are later layers, hence
 * tainted_amount "0" and empty path_tx_hashes here.
 */
export function endpointsFromHop(jobId: string, delta: HopDelta): NewEndpoint[] {
  const eps: NewEndpoint[] = [];

  for (const n of delta.newNodes) {
    if (n.stopReason !== "cex" && n.stopReason !== "mixer") continue;
    const entity = getEntity(n.address);
    eps.push({
      job_id: jobId,
      address: n.address,
      chain: n.chainId,
      type: n.stopReason, // 'cex' | 'mixer'
      entity_name: entity?.name ?? null,
      tainted_amount: "0",
      token_symbol: "ETH",
      taint_ratio: n.taintRatio,
      path_tx_hashes: [],
    });
  }

  for (const d of delta.newDispersions) {
    eps.push({
      job_id: jobId,
      address: d.from,
      chain: d.chainId,
      type: "dispersed",
      entity_name: null,
      tainted_amount: "0",
      token_symbol: "MIXED",
      taint_ratio: d.dispersedTaint,
      path_tx_hashes: [],
    });
  }

  return eps;
}

/**
 * Total taint accounted at terminal endpoints (CEX + mixer + dispersed), capped at 1.
 * Summed from persisted rows so it stays correct across a resumed run.
 */
export function coverageFromEndpoints(rows: Pick<EndpointRow, "taint_ratio">[]): number {
  const total = rows.reduce((s, r) => s + Number(r.taint_ratio), 0);
  return Math.min(1, total);
}
