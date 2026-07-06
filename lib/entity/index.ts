import type { StopReason } from '@/lib/trace';
import type { EntityEntry } from './types';
import { EVM_PROTOCOL_ENTRIES } from './evm-entities';
import { EVM_SCAM_ENTRIES } from './evm-scams';

export type { EntityCategory, EntityInfo, EntityEntry } from './types';

/**
 * EVM entity database (known CEX / DEX / bridge / mixer / scam addresses).
 * Keys are lowercased EVM addresses. Ported from chase-chain entity-risk.
 */
const EVM_ENTITIES: Record<string, EntityEntry> = {
  ...EVM_PROTOCOL_ENTRIES,
  ...EVM_SCAM_ENTRIES,
};

/** Look up a known entity by address (case-insensitive). */
export function getEntity(address: string): EntityEntry | null {
  return EVM_ENTITIES[address.toLowerCase()] ?? null;
}

/**
 * Build a stop predicate for the trace engine.
 * A branch halts when it reaches a CEX (funds leave on-chain visibility) or a
 * mixer (anonymization boundary). Bridges are NOT stopped here — cross-chain
 * continuation is a later phase; for v1 they surface as ordinary endpoints.
 */
export function createStopPredicate() {
  // Chain-agnostic for EVM; the engine's ShouldStopAtFn passes a chainId arg JS ignores here.
  return (counterparty: string): StopReason | null => {
    const entity = getEntity(counterparty);
    if (entity?.category === 'cex') return 'cex';
    if (entity?.category === 'mixer') return 'mixer';
    return null;
  };
}
