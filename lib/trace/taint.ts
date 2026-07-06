/**
 * Haircut (proportional) taint math — the exploration-phase convention.
 * All amounts are bigint wei/base-units; ratios are float 0..1.
 *
 * Reporting-phase FIFO attribution is a separate module (v2).
 */

/** Taint ratio of a pool after mixing tainted and clean inflows. */
export function haircutRatio(taintedIn: bigint, totalIn: bigint): number {
  if (totalIn <= 0n) return 0;
  if (taintedIn >= totalIn) return 1;
  // bigint → float via 1e9 fixed-point to avoid precision loss on large wei values
  const SCALE = 1_000_000_000n;
  return Number((taintedIn * SCALE) / totalIn) / 1e9;
}

/** Tainted portion of an outflow from a pool with the given taint ratio. */
export function taintedAmount(outflow: bigint, ratio: number): bigint {
  if (ratio <= 0) return 0n;
  if (ratio >= 1) return outflow;
  const SCALE = 1_000_000_000n;
  return (outflow * BigInt(Math.round(ratio * 1e9))) / SCALE;
}

/** Whether a branch should be pruned during exploration. */
export function shouldPrune(ratio: number, pruneThreshold: number): boolean {
  return ratio < pruneThreshold;
}
