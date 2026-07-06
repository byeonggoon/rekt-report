import type { ChainId } from '@/lib/trace';

export interface EvmChainConfig {
  /** Numeric chain id — Etherscan V2 `chainid` param */
  id: number;
  name: string;
  nativeSymbol: string;
  nativeDecimals: number;
}

/**
 * EVM chains covered by the v1 trace engine.
 * Numeric ids sourced from chase-chain lib/chains.ts.
 * Etherscan V2 serves all of these via a single endpoint keyed by `chainid`.
 */
export const EVM_CHAINS: Record<ChainId, EvmChainConfig> = {
  ethereum: { id: 1, name: 'Ethereum', nativeSymbol: 'ETH', nativeDecimals: 18 },
  polygon: { id: 137, name: 'Polygon', nativeSymbol: 'POL', nativeDecimals: 18 },
  arbitrum: { id: 42161, name: 'Arbitrum', nativeSymbol: 'ETH', nativeDecimals: 18 },
  base: { id: 8453, name: 'Base', nativeSymbol: 'ETH', nativeDecimals: 18 },
  bsc: { id: 56, name: 'BNB Chain', nativeSymbol: 'BNB', nativeDecimals: 18 },
  optimism: { id: 10, name: 'Optimism', nativeSymbol: 'ETH', nativeDecimals: 18 },
  avalanche: { id: 43114, name: 'Avalanche', nativeSymbol: 'AVAX', nativeDecimals: 18 },
  linea: { id: 59144, name: 'Linea', nativeSymbol: 'ETH', nativeDecimals: 18 },
  blast: { id: 81457, name: 'Blast', nativeSymbol: 'ETH', nativeDecimals: 18 },
  scroll: { id: 534352, name: 'Scroll', nativeSymbol: 'ETH', nativeDecimals: 18 },
  gnosis: { id: 100, name: 'Gnosis', nativeSymbol: 'xDAI', nativeDecimals: 18 },
  sonic: { id: 146, name: 'Sonic', nativeSymbol: 'S', nativeDecimals: 18 },
  mantle: { id: 5000, name: 'Mantle', nativeSymbol: 'MNT', nativeDecimals: 18 },
  megaeth: { id: 4326, name: 'MegaETH', nativeSymbol: 'ETH', nativeDecimals: 18 },
  plasma: { id: 9745, name: 'Plasma', nativeSymbol: 'XPL', nativeDecimals: 18 },
  stable: { id: 988, name: 'Stable', nativeSymbol: 'USDT', nativeDecimals: 18 },
  katana: { id: 747474, name: 'Katana', nativeSymbol: 'ETH', nativeDecimals: 18 },
  monad: { id: 143, name: 'Monad', nativeSymbol: 'MON', nativeDecimals: 18 },
  berachain: { id: 80094, name: 'Berachain', nativeSymbol: 'BERA', nativeDecimals: 18 },
  abstract: { id: 2741, name: 'Abstract', nativeSymbol: 'ETH', nativeDecimals: 18 },
  unichain: { id: 130, name: 'Unichain', nativeSymbol: 'ETH', nativeDecimals: 18 },
  taiko: { id: 167000, name: 'Taiko', nativeSymbol: 'ETH', nativeDecimals: 18 },
  celo: { id: 42220, name: 'Celo', nativeSymbol: 'CELO', nativeDecimals: 18 },
  world: { id: 480, name: 'World Chain', nativeSymbol: 'ETH', nativeDecimals: 18 },
  sei: { id: 1329, name: 'Sei', nativeSymbol: 'SEI', nativeDecimals: 18 },
  opbnb: { id: 204, name: 'opBNB', nativeSymbol: 'BNB', nativeDecimals: 18 },
  fraxtal: { id: 252, name: 'Fraxtal', nativeSymbol: 'frxETH', nativeDecimals: 18 },
  swellchain: { id: 1923, name: 'Swellchain', nativeSymbol: 'ETH', nativeDecimals: 18 },
  hyperevm: { id: 999, name: 'HyperEVM', nativeSymbol: 'HYPE', nativeDecimals: 18 },
  hypercore: { id: 998, name: 'HyperCore', nativeSymbol: 'HYPE', nativeDecimals: 18 },
  apechain: { id: 33139, name: 'ApeChain', nativeSymbol: 'APE', nativeDecimals: 18 },
  moonbeam: { id: 1284, name: 'Moonbeam', nativeSymbol: 'GLMR', nativeDecimals: 18 },
  moonriver: { id: 1285, name: 'Moonriver', nativeSymbol: 'MOVR', nativeDecimals: 18 },
  bttc: { id: 199, name: 'BitTorrent', nativeSymbol: 'BTT', nativeDecimals: 18 },
};

export function getEvmChain(chainId: ChainId): EvmChainConfig {
  const c = EVM_CHAINS[chainId];
  if (!c) throw new Error(`Unknown EVM chain: ${chainId}`);
  return c;
}

export function isEvmChain(chainId: string): chainId is ChainId {
  return chainId in EVM_CHAINS;
}
