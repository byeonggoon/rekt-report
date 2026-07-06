import type { AddressTransfer, AggregatedTransfer } from '@/lib/trace';

/**
 * Group raw transfers into per-(from, to, token) aggregated edges.
 *
 * The trace engine only consumes `totalValue` (via aggregatedToWeights), so this is a
 * deliberately simpler aggregation than chase-chain's UI-oriented one (no netting /
 * gross split — those are display concerns). `totalValue` is summed in the token's
 * human units (formattedValue), which is what the haircut weights compare.
 */
export function aggregateTransfers(transfers: AddressTransfer[]): AggregatedTransfer[] {
  const groups = new Map<string, AggregatedTransfer>();

  for (const t of transfers) {
    const key = `${t.from.toLowerCase()}->${t.to.toLowerCase()}:${t.tokenSymbol}`;
    const value = Number(t.formattedValue) || 0;
    const existing = groups.get(key);

    if (existing) {
      existing.totalValue += value;
      existing.formattedValue = String(existing.totalValue);
      existing.txCount += 1;
      existing.allHashes.push(t.hash);
      if (t.timestamp > existing.latestTimestamp) {
        existing.latestTimestamp = t.timestamp;
        existing.latestHash = t.hash;
      }
    } else {
      groups.set(key, {
        from: t.from,
        to: t.to,
        tokenSymbol: t.tokenSymbol,
        totalValue: value,
        formattedValue: String(value),
        txCount: 1,
        latestHash: t.hash,
        latestTimestamp: t.timestamp,
        allHashes: [t.hash],
      });
    }
  }

  return [...groups.values()];
}
