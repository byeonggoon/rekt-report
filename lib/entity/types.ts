/**
 * Entity taxonomy — ported from chase-chain types/index.ts.
 * Used to classify trace endpoints (CEX / mixer / bridge / etc).
 */

export type EntityCategory =
  | 'cex' // Centralized Exchange
  | 'dex' // Decentralized Exchange
  | 'defi' // DeFi Protocol
  | 'bridge' // Cross-chain Bridge
  | 'mixer' // Mixer/Tumbler (high risk)
  | 'nft' // NFT Marketplace
  | 'staking' // Staking/Liquid Staking
  | 'lending' // Lending Protocol
  | 'wallet' // Known Wallet/EOA
  | 'scam' // Known Scam Address
  | 'sanctioned' // OFAC Sanctioned
  | 'mev' // MEV Bot
  | 'unknown';

export interface EntityInfo {
  name: string;
  category: EntityCategory;
  description?: string;
  website?: string;
}

export interface EntityEntry extends EntityInfo {
  risk?: 'critical' | 'high' | 'medium' | 'low' | 'none';
}
