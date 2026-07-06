import type { AggregatedTransfer, TraceDirection } from './types';

/**
 * Distribute a parent node's taint across its children using value ratios (haircut method).
 * If multiple inputs point to the same counterparty, their taint contributions are summed.
 *
 * Ported verbatim from chase-chain lib/taint-engine/haircut.ts.
 */
export function haircutDistribute(
  parentTaint: number,
  children: { counterparty: string; weight: number }[],
): Map<string, number> {
  const totalWeight = children.reduce((s, c) => s + c.weight, 0);
  const result = new Map<string, number>();
  if (totalWeight <= 0) return result;
  for (const child of children) {
    const ratio = child.weight / totalWeight;
    const childTaint = parentTaint * ratio;
    const key = child.counterparty.toLowerCase();
    result.set(key, (result.get(key) ?? 0) + childTaint);
  }
  return result;
}

/**
 * Convert aggregated transfers into haircut input.
 * `backward` direction → counterparty is the sender (`from`)
 * `forward`  direction → counterparty is the recipient (`to`)
 * Self-loops (when the address appears on both sides) are skipped.
 */
export function aggregatedToWeights(
  aggregated: AggregatedTransfer[],
  direction: TraceDirection,
  selfAddress: string,
): { counterparty: string; weight: number; aggregated: AggregatedTransfer }[] {
  const selfLower = selfAddress.toLowerCase();
  const result: { counterparty: string; weight: number; aggregated: AggregatedTransfer }[] = [];
  for (const agg of aggregated) {
    const counterparty = direction === 'backward' ? agg.from : agg.to;
    if (counterparty.toLowerCase() === selfLower) continue;
    const weight = agg.totalValue;
    if (weight <= 0) continue;
    result.push({ counterparty, weight, aggregated: agg });
  }
  return result;
}
