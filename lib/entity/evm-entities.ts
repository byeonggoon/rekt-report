import type { EntityEntry } from './types';

export const EVM_PROTOCOL_ENTRIES: Record<string, EntityEntry> = {
  // === Centralized Exchanges (CEX) — EVM ===
  '0x28c6c06298d514db089934071355e5743bf21d60': { name: 'Binance Hot Wallet', category: 'cex', description: 'Binance exchange hot wallet' },
  '0x21a31ee1afc51d94c2efccaa2092ad1028285549': { name: 'Binance Hot Wallet 2', category: 'cex' },
  '0xdfd5293d8e347dfe59e90efd55b2956a1343963d': { name: 'Binance Hot Wallet 3', category: 'cex' },
  '0x56eddb7aa87536c09ccc2793473599fd21a8b17f': { name: 'Binance Hot Wallet 4', category: 'cex' },
  '0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be': { name: 'Binance Old Wallet', category: 'cex' },
  '0x71660c4005ba85c37ccec55d0c4493e66fe775d3': { name: 'Coinbase Hot Wallet', category: 'cex' },
  '0xa9d1e08c7793af67e9d92fe308d5697fb81d3e43': { name: 'Coinbase Commerce', category: 'cex' },
  '0x503828976d22510aad0201ac7ec88293211d23da': { name: 'Coinbase Wallet 2', category: 'cex' },
  '0xeb2629a2734e272bcc07bda959863f316f4bd4cf': { name: 'Coinbase Wallet 3', category: 'cex' },
  '0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98': { name: 'Bittrex', category: 'cex' },
  '0xe94b5eec1fa96ceecbd33ef5baa8d00e4493f4f3': { name: 'Bitfinex Hot Wallet', category: 'cex' },
  '0x742d35cc6634c0532925a3b844bc9e7595f2bd3e': { name: 'Bitfinex Cold Wallet', category: 'cex' },
  '0x267be1c1d684f78cb4f6a176c4911b741e4ffdc0': { name: 'Kraken', category: 'cex' },
  '0x2910543af39aba0cd09dbb2d50200b3e800a63d2': { name: 'Kraken Hot Wallet', category: 'cex' },
  '0x53d284357ec70ce289d6d64134dfac8e511c8a3d': { name: 'Kraken Cold Wallet', category: 'cex' },
  '0xab5c66752a9e8167967685f1450532fb96d5d24f': { name: 'Huobi', category: 'cex' },
  '0x6cc5f688a315f3dc28a7781717a9a798a59fda7b': { name: 'OKX', category: 'cex' },
  '0x98ec059dc3adfbdd63429227d09cb02ce5730128': { name: 'Gate.io', category: 'cex' },
  '0x1151314c646ce4e0efd76d1af4760ae66a9fe30f': { name: 'Bitfinex MultiSig', category: 'cex' },
  '0xdc76cd25977e0a5ae17155770273ad58648900d3': { name: 'KuCoin', category: 'cex' },
  '0xf16e9b0d03470827a95cdfd0cb8a8a3b46969b91': { name: 'Kucoin Hot Wallet 2', category: 'cex' },
  '0xd551234ae421e3bcba99a0da6d736074f22192ff': { name: 'Binance US', category: 'cex' },
  '0x0d0707963952f2fba59dd06f2b425ace40b492fe': { name: 'Gate.io Hot Wallet', category: 'cex' },
  '0x1c4b70a3968436b9a0a9cf5205c787eb81bb558c': { name: 'Gate.io Hot Wallet 2', category: 'cex' },
  '0x2b5634c42055806a59e9107ed44d43c426e58258': { name: 'KuCoin Hot Wallet 2', category: 'cex' },
  '0xf977814e90da44bfa03b6295a0616a897441acec': { name: 'Binance Hot Wallet 20', category: 'cex' },
  '0x564286362092d8e7936f0549571a803b203aaced': { name: 'Binance 3', category: 'cex' },
  '0x0681d8db095565fe8a346fa0277bffde9c0edbbf': { name: 'Binance 4', category: 'cex' },
  '0xf89d7b9c864f589bbf53a82105107622b35eaa40': { name: 'Bybit Hot Wallet', category: 'cex' },
  '0xa7a93fd0a276fc1c0197a5b5623ed117786eed06': { name: 'Bybit Hot Wallet 2', category: 'cex' },
  '0xee5b5b923ffce93a870b3104b7ca09c3db80047a': { name: 'Bybit Hot Wallet 4', category: 'cex' },
  '0xbaed383ede0e5d9d72430661f3285daa77e9439f': { name: 'Bybit Hot Wallet 6', category: 'cex' },
  '0x1db92e2eebc8e0c075a02bea49a2935bcd2dfcf4': { name: 'Bybit Cold Wallet', category: 'cex' },
  '0xe79388aa6363766e4aa20521acce1c602a9863d8': { name: 'Bybit Deposit', category: 'cex' },
  '0xd24400ae8bfebb18ca49be86258a3c749cf46853': { name: 'Gemini', category: 'cex' },
  '0x17e5545b11b468072283cee1f066a059fb0dbf24': { name: 'Bithumb Hot Wallet', category: 'cex' },
  '0x390de26d772d2e2005c6d1d24afc902bae37a4bb': { name: 'Upbit', category: 'cex' },
  '0xba826fec90cefdf6706858e5fbafcb27a290fbe0': { name: 'Upbit 2', category: 'cex' },
  '0xfe87909462d1f5cf9d91375aa52b6e3151aec311': { name: 'Upbit Deposit', category: 'cex' },
  '0x00bdb5699745f5b860228c8f939abf1b9ae374ed': { name: 'Bitstamp', category: 'cex' },
  '0x0211f3cedbef3143223d3acf0e589747933e8527': { name: 'MEXC', category: 'cex' },
  '0x6262998ced04146fa42253a5c0af90ca02dfd2a3': { name: 'Crypto.com', category: 'cex' },
  '0x46340b20830761efd32832a74d7169b29feb9758': { name: 'Crypto.com 12', category: 'cex' },
  '0x876eabf441b2ee5b5b0554fd502a8e0600950cfa': { name: 'Bitfinex 4', category: 'cex' },
  '0x742d35cc6634c0532925a3b844bc454e4438f44e': { name: 'Bitfinex 5', category: 'cex' },

  '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640': { name: 'Uniswap V3: USDC/ETH', category: 'dex' },

  '0x0280baf5c87cfa44d7d661805cc17db29d7973b7': { name: 'HiFiSwap', category: 'bridge' },
  '0x1616b057f8a89955d4a4f9fd9eb10289ac0e44a1': { name: 'Mixin Hot Wallet', category: 'cex' },

  // === Uniswap V2 — Factories ===
  '0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f': { name: 'Uniswap V2 Factory', category: 'dex' },
  '0x8909dc15e40173ff4699343b6eb8132c65e18ec6': { name: 'Uniswap V2 Factory', category: 'dex' },        // Base, BNB
  '0xf1d7cc64fb4452f05c498126312ebe29f30fbcf9': { name: 'Uniswap V2 Factory', category: 'dex' },        // Arbitrum
  '0x0c3c1c532f1e39edf36be9fe0be1410313e074bf': { name: 'Uniswap V2 Factory', category: 'dex' },        // Optimism
  '0x9e5a52f57b3038f1b8eee45f28b3c1967e22799c': { name: 'Uniswap V2 Factory', category: 'dex' },        // Polygon, Avalanche
  '0x5c346464d33f90babaf70db6388507cc889c1070': { name: 'Uniswap V2 Factory', category: 'dex' },        // Blast
  // === Uniswap V2 — Routers ===
  '0x7a250d5630b4cf539739df2c5dacb4c659f2488d': { name: 'Uniswap V2 Router', category: 'dex' },
  '0x4752ba5dbc23f44d87826276bf6fd6b1c372ad24': { name: 'Uniswap V2 Router', category: 'dex' },         // Base, Arbitrum, Avalanche, BNB
  '0x4a7b5da61326a6379179b40d00f57e5bbdc962c2': { name: 'Uniswap V2 Router', category: 'dex' },         // Optimism
  '0xedf6066a2b290c185783862c7f4776a2c8077ad1': { name: 'Uniswap V2 Router', category: 'dex' },         // Polygon
  '0xbb66eb1c5e875933d44dae661dbd80e5d9b03035': { name: 'Uniswap V2 Router', category: 'dex' },         // Blast

  // === Uniswap V3 — Factories ===
  '0x1f98431c8ad98523631ae4a59f267346ea31f984': { name: 'Uniswap V3 Factory', category: 'dex' },        // Ethereum, Polygon, Arbitrum, Optimism
  '0x33128a8fc17869897dce68ed026d694621f6fdfd': { name: 'Uniswap V3 Factory', category: 'dex' },        // Base
  // === Uniswap V3 — Routers ===
  '0xe592427a0aece92de3edee1f18e0157c05861564': { name: 'Uniswap V3 SwapRouter', category: 'dex' },
  '0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45': { name: 'Uniswap V3 SwapRouter02', category: 'dex' },
  '0x2626664c2603336e57b271c5c0b26f421741e481': { name: 'Uniswap V3 SwapRouter02', category: 'dex' },   // Base
  // === Uniswap V3 — NFT Position Manager ===
  '0xc36442b4a4522e871399cd717abdd847ab11fe88': { name: 'Uniswap V3 Position Manager', category: 'dex' },  // Ethereum, Polygon, Arbitrum, Optimism
  '0x03a520b32c04bf3beef7beb72e919cf822ed34f1': { name: 'Uniswap V3 Position Manager', category: 'dex' },  // Base
  // === Uniswap Universal Router (V3/V4, chain-specific) ===
  '0x3fc91a3afd70395cd496c647d5a6cc9d4b2b7fad': { name: 'Uniswap Universal Router', category: 'dex' },
  '0x6ff5693b99212da76ad316178a184ab56d299b43': { name: 'Uniswap Universal Router', category: 'dex' },  // Base
  '0xa51afafe0263b40edaef0df8781ea9aa03e381a3': { name: 'Uniswap Universal Router', category: 'dex' },  // Arbitrum
  '0x851116d9223fabed8e56c0e6b8ad0c31d98b3507': { name: 'Uniswap Universal Router', category: 'dex' },  // Optimism
  '0x1095692a6237d83c6a72f3f5efedb9a670c49223': { name: 'Uniswap Universal Router', category: 'dex' },  // Polygon
  '0x94b75331ae8d42c1b61065089b7d48fe14aa73b7': { name: 'Uniswap Universal Router', category: 'dex' },  // Avalanche
  '0x1906c1d672b88cd1b9ac7593301ca990f94eae07': { name: 'Uniswap Universal Router', category: 'dex' },  // BNB
  '0xeabbcb3e8e415306207ef514f660a3f820025be3': { name: 'Uniswap Universal Router', category: 'dex' },  // Blast
  '0xcb695bc5d3aa22cad1e6df07801b061a05a0233a': { name: 'Uniswap Universal Router', category: 'dex' },  // Celo
  // === Uniswap Permit2 (same on all chains) ===
  '0x000000000022d473030f116ddee9f6b43ac78ba3': { name: 'Uniswap Permit2', category: 'dex' },

  // === Uniswap V4 — Pool Manager (chain-specific) ===
  '0x000000000004444c5dc75cb358380d2e3de08a90': { name: 'Uniswap V4 Pool Manager', category: 'dex' },   // Ethereum
  '0x498581ff718922c3f8e6a244956af099b2652b2b': { name: 'Uniswap V4 Pool Manager', category: 'dex' },   // Base
  '0x360e68faccca8ca495c1b759fd9eee466db9fb32': { name: 'Uniswap V4 Pool Manager', category: 'dex' },   // Arbitrum
  '0x9a13f98cb987694c9f086b1f5eb990eea8264ec3': { name: 'Uniswap V4 Pool Manager', category: 'dex' },   // Optimism
  '0x67366782805870060151383f4bbff9dab53e5cd6': { name: 'Uniswap V4 Pool Manager', category: 'dex' },   // Polygon
  '0x28e2ea090877bf75740558f6bfb36a5ffee9e9df': { name: 'Uniswap V4 Pool Manager', category: 'dex' },   // BNB
  '0x06380c0e0912312b5150364b9dc4542ba0dbbc85': { name: 'Uniswap V4 Pool Manager', category: 'dex' },   // Avalanche
  '0x1631559198a9e474033433b2958dabc135ab6446': { name: 'Uniswap V4 Pool Manager', category: 'dex' },   // Blast
  // === Uniswap V4 — Universal Router (Ethereum only, others share V3 address) ===
  '0x66a9893cc07d91d95644aedd05d03f95e1dba8af': { name: 'Uniswap V4 Universal Router', category: 'dex' },
  // === Uniswap V4 — Position Manager (chain-specific) ===
  '0xbd216513d74c8cf14cf4747e6aaa6420ff64ee9e': { name: 'Uniswap V4 Position Manager', category: 'dex' },  // Ethereum
  '0x7c5f5a4bbd8fd63184577525326123b519429bdc': { name: 'Uniswap V4 Position Manager', category: 'dex' },  // Base
  '0xd88f38f930b7952f2db2432cb002e7abbf3dd869': { name: 'Uniswap V4 Position Manager', category: 'dex' },  // Arbitrum
  '0x3c3ea4b57a46241e54610e5f022e5c45859a1017': { name: 'Uniswap V4 Position Manager', category: 'dex' },  // Optimism
  '0x1ec2ebf4f37e7363fdfe3551602425af0b3ceef9': { name: 'Uniswap V4 Position Manager', category: 'dex' },  // Polygon
  '0x7a4a5c919ae2541aed11041a1aeee68f1287f95b': { name: 'Uniswap V4 Position Manager', category: 'dex' },  // BNB
  '0xb74b1f14d2754acfcbbe1a221023a5cf50ab8acd': { name: 'Uniswap V4 Position Manager', category: 'dex' },  // Avalanche
  '0x4ad2f4cca2682cbb5b950d660dd458a1d3f1baad': { name: 'Uniswap V4 Position Manager', category: 'dex' },  // Blast
  // === UniswapX ===
  '0x6000da47483062a0d734ba3dc7576ce6a0b645c4': { name: 'UniswapX: Dutch Order Reactor', category: 'dex' },
  '0x00000011f84b9aa48e5f8aa8b9897600006289be': { name: 'UniswapX: Dutch Order Reactor V2', category: 'dex' },
  '0xd9e1ce17f2641f24ae83637ab66a2cca9c378b9f': { name: 'SushiSwap Router', category: 'dex' },
  '0x1111111254eeb25477b68fb85ed929f73a960582': { name: '1inch V5 Router', category: 'dex' },
  '0x111111125421ca6dc452d289314280a0f8842a65': { name: '1inch V6 Router', category: 'dex' },
  '0xdef1c0ded9bec7f1a1670819833240f027b25eff': { name: '0x Exchange Proxy', category: 'dex' },
  '0xe66b31678d6c16e9ebf358268a790b763c133750': { name: '0x Coinbase Wallet Proxy', category: 'dex' },
  // CoW Protocol (CowSwap) — https://docs.cow.fi/category/contracts
  // Core (same address on all supported chains)
  '0x9008d19f58aabd9ed0d60971565aa8510560ab41': { name: 'CoW Protocol Settlement', category: 'dex' },
  '0xc92e8bdf79f0507f65a392b0ab4667716bfe0110': { name: 'CoW Protocol VaultRelayer', category: 'dex' },
  '0x2c4c28ddbdac9c5e7055b4c863b72ea0149d8afe': { name: 'CoW Protocol AllowList', category: 'dex' },
  // Periphery
  '0xba3cb449bd2b4adddbc894d8697f5170800eadec': { name: 'CoW Protocol EthFlow', category: 'dex' },
  '0x40a50cf069e992aa4536211b23f286ef88752187': { name: 'CoW Protocol EthFlow (Legacy)', category: 'dex' },
  '0x60bf78233f48ec42ee3f101b9a05ec7878728006': { name: 'CoW Protocol HooksTrampoline', category: 'dex' },
  '0xfdafc9d1902f4e0b84f65f49f244b32b31013b74': { name: 'CoW Protocol ComposableCoW', category: 'dex' },
  '0xe84dcd8587287b997f51299430a396ad03aaec06': { name: 'CoW Protocol UidGenerator', category: 'dex' },
  // ParaSwap
  '0xdef171fe48cf0115b1d80b88dc8eab59176fee57': { name: 'ParaSwap Augustus V5', category: 'dex' },
  '0x6a000f20005980200259b80c5102003040001068': { name: 'ParaSwap Augustus V6.2', category: 'dex' },
  // Balancer
  '0xba12222222228d8ba445958a75a0704d566bf2c8': { name: 'Balancer Vault V2', category: 'dex' },
  // Curve
  '0x16c6521dff6bab339122a0fe25a9116693265353': { name: 'Curve RouterNG', category: 'dex' },
  // THORChain (see also THORChain section under Bridges)
  '0xd37bbe5744d730a1d98d8dc97c42f0ca46ad7146': { name: 'THORChain Router (Ethereum)', category: 'bridge' },
  // DODO
  '0xa2398842f37465f89540430bdc00219fa9e4d28a': { name: 'DODO Route Proxy', category: 'dex' },
  '0x335ac99bb3e51bdbf22025f092ebc1cf2c5cc619': { name: 'DODO Approve Proxy', category: 'dex' },
  // KyberSwap
  '0x6131b5fae19ea4f9d964eac0408e4408b66337b5': { name: 'KyberSwap Aggregation Router', category: 'dex' },
  // PancakeSwap
  '0x13f4ea83d0bd40e75c8222255bc855a974568dd4': { name: 'PancakeSwap V3 Smart Router', category: 'dex' },
  // MetaMask
  '0x881d40237659c251811cec9c364ef91dc08d300c': { name: 'MetaMask Swap Router', category: 'dex' },
  // Odos
  '0xcf5540fffcdc3d510b18bfca6d2b9987b0772559': { name: 'Odos Router V2', category: 'dex' },
  // OpenOcean
  '0x6352a56caadc4f1e25cd6c75970fa768a3304e64': { name: 'OpenOcean Exchange', category: 'dex' },
  // Bancor
  '0xeef417e1d5cc832e619ae18d2f140de2999dd4fb': { name: 'Bancor Network V3', category: 'dex' },
  // Clipper
  '0x2e9c6dcdca22a5952a88c4b18edb5b54c5155bc9': { name: 'Clipper Exchange', category: 'dex' },
  // Bebop
  '0xbeb09000fa59627dc02bb55448ac1893eaa501a5': { name: 'Bebop: Settlement', category: 'dex' },
  '0xbebebeb035351f58602e0c1c8b59ecbff5d5f47b': { name: 'Bebop: JAM Settlement', category: 'dex' },
  // Balancer V3
  '0xba1333333333a1ba1108e8412f11850a5c319ba9': { name: 'Balancer V3 Vault', category: 'dex' },
  // LI.FI — already in bridge section
  // Socket — already in bridge section
  // Rubic
  '0xd8b19613723215ef8cc80fc35a1428f8e8826940': { name: 'Rubic Exchange', category: 'dex' },
  // AirSwap
  '0x01b28aa66a54c6f2be5c2ef905a2329270cca96f': { name: 'AirSwap V5 Swap', category: 'dex' },
  '0x4572f2554421bd64bef1c22c8a81840e8d496bea': { name: 'AirSwap V2 Swap', category: 'dex' },
  // Hashflow
  '0x6ad3dac99c9a4a480748c566ce7b3503506e3d71': { name: 'Hashflow Router', category: 'dex' },
  // WOOFi
  '0x044c08639bd59beb4f6ec52c0da6cd47283534e8': { name: 'WOOFi Router', category: 'dex' },
  '0x9d1a92e601db0901e69bd810029f2c14bcca3128': { name: 'WOOFi CrossChain Router V2', category: 'dex' },
  // Maverick
  '0xbbf1ee38152e9d8e3470dc47947eaa65dca94913': { name: 'Maverick V1 Router', category: 'dex' },
  // TraderJoe
  '0x9a93a421b74f1c5755b83dd2c211614dc419c44b': { name: 'TraderJoe LB Router', category: 'dex' },
  // Ambient Finance (fka CrocSwap)
  '0xaaaaaaaaa24eeeb8d57d431224f73832bc34f688': { name: 'Ambient Finance CrocSwapDex', category: 'dex' },
  // Pendle
  '0x888888888889758f76e7103c6cbf23abbf58f946': { name: 'Pendle Router V4', category: 'dex' },
  '0x00000000005bbb0ef59571e58418f9a4357b68a0': { name: 'Pendle Router V3', category: 'dex' },
  // KyberSwap (additional)
  '0xdf1a1b60f2d438842916c0adc43748768353ec25': { name: 'KyberSwap Aggregation Router V2', category: 'dex' },
  // Portals.fi
  '0xbf5a7f3629fb325e2a8453d595ab103465f75e62': { name: 'Portals.fi Router', category: 'dex' },
  // Tokenlon
  '0x03f34be1bf910116595db1b11e9d1b2ca5d59659': { name: 'Tokenlon DEX', category: 'dex' },
  // Transit Swap
  '0xb45a2dda996c32e93b8c47098e90ed0e7ab18e39': { name: 'Transit Swap Router', category: 'dex' },
  // XY Finance
  '0x7268bcf71afe37818cb2deb609f62db164131090': { name: 'XY Finance Dispatcher', category: 'dex' },

  // === DeFi Lending ===
  '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9': { name: 'Aave V2 Pool', category: 'lending' },
  '0x87870bca3f3fd6335c3f4ce8392d69350b4fa4e2': { name: 'Aave V3 Pool', category: 'lending' },
  '0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b': { name: 'Compound Comptroller', category: 'lending' },
  '0xc3d688b66703497daa19211eedff47f25384cdc3': { name: 'Compound V3 USDC', category: 'lending' },
  '0xa17581a9e3356d9a858b789d68b4d866e593ae94': { name: 'Compound V3 WETH', category: 'lending' },

  // === Bridges ===
  '0x3ee18b2214aff97000d974cf647e7c347e8fa585': { name: 'Wormhole Bridge', category: 'bridge' },
  '0x40ec5b33f54e0e8a33a975908c5ba1c14e5bbbdf': { name: 'Polygon Bridge', category: 'bridge' },
  '0xa0c68c638235ee32657e8f720a23cec1bfc6c9a8': { name: 'Polygon ERC20 Bridge', category: 'bridge' },
  '0x8315177ab297ba92a06054ce80a67ed4dbd7ed3a': { name: 'Arbitrum Bridge', category: 'bridge' },
  '0x4dbd4fc535ac27206064b68ffcf827b0a60bab3f': { name: 'Arbitrum Delayed Inbox', category: 'bridge' },
  '0x99c9fc46f92e8a1c0dec1b1747d010903e884be1': { name: 'Optimism Bridge', category: 'bridge' },
  '0xbeb5fc579115071764c7423a4f12edde41f106ed': { name: 'Optimism Portal', category: 'bridge' },
  '0x3154cf16ccdb4c6d922629664174b904d80f2c35': { name: 'Base Bridge', category: 'bridge' },
  '0xd19d4b5d358258f05d7b411e21a1460d11b0876f': { name: 'Across Bridge', category: 'bridge' },
  '0x5427fefa711eff984124bfbb1ab6fbf5e3da1820': { name: 'Celer cBridge', category: 'bridge' },
  '0x2796317b0ff8538f253012862c06787adfb8ceb6': { name: 'Stargate Router', category: 'bridge' },
  '0xf70da97812cb96acdf810712aa562db8dfa3dbef': { name: 'Relay Solver', category: 'bridge' },
  // Relay Receivers
  '0xa5f565650890fba1824ee0f21ebbbf660a179934': { name: 'Relay Receiver', category: 'bridge' },
  '0xc56043daac3a26ad451abc7610f04f53cc4412e5': { name: 'Relay Receiver', category: 'bridge' },
  '0x47eb64e17a6d2fd559b608695e6d308cced918dd': { name: 'Relay Receiver', category: 'bridge' },
  '0xf17902d51fdff7bf50aacc78d6bb399baf88b479': { name: 'Relay Receiver', category: 'bridge' },
  '0x7f4babd2c7d35221e72ab67ea72cba99573a0089': { name: 'Relay Receiver', category: 'bridge' },
  '0xd71e5c1d217d12855b37fe60299273aad91d6cec': { name: 'Relay Receiver', category: 'bridge' },
  '0xa06e1351e2fd2d45b5d35633ca7ecf328684a109': { name: 'Relay Receiver', category: 'bridge' },
  '0xebd1e414ebb98522cfd932104ba41fac10a4ef35': { name: 'Relay Receiver', category: 'bridge' },
  '0x00000000aa467eba42a3d604b3d74d63b2b6c6cb': { name: 'Relay Receiver', category: 'bridge' },
  '0xb4528b01af9c92f49435f88890a82b0b0ce90479': { name: 'Relay Receiver', category: 'bridge' },
  '0xac4615ffec9dbf5efe28db0f98f0011e6df0dabd': { name: 'Relay Receiver', category: 'bridge' },
  '0x4d6cb5047925e06d2cd6ca72ca30a413c77e1203': { name: 'Relay Receiver', category: 'bridge' },
  '0xf042fcc6bd5cb48b2862d9f22d3de5b342e94f4c': { name: 'Relay Receiver', category: 'bridge' },
  '0x634e831ce6d460c2cd5067af98d6452eb280e374': { name: 'Relay Receiver', category: 'bridge' },
  '0xf366da269047a06a7275a933c6d653409bd6de5e': { name: 'Relay Receiver', category: 'bridge' },
  '0xbf05bdaff9b80cf511f89069410af2d7b1897471': { name: 'Relay Receiver', category: 'bridge' },
  '0x26ab4e25377dc9ca72ecc8db56f7f11c2e7cd324': { name: 'Relay Receiver', category: 'bridge' },
  '0x9ff28846cd0640ba4aac04d3ebbe651cac5fe609': { name: 'Relay Receiver', category: 'bridge' },
  // Relay ERC20 Routers
  '0xf5042e6ffac5a625d4e7848e0b01373d8eb9e222': { name: 'Relay ERC20 Router', category: 'bridge' },
  '0x113a327221d2c4660684449bfc39bc14ad1aaf38': { name: 'Relay ERC20 Router', category: 'bridge' },
  '0x3ec130b627944cad9b2750300ecb0a695da522b6': { name: 'Relay ERC20 Router', category: 'bridge' },
  '0x9ef6d3c2f60d7b9008d74cab1fc0f899c957c819': { name: 'Relay ERC20 Router', category: 'bridge' },
  '0x8fdceeda2951a9747feaf25311435448bce47b2a': { name: 'Relay ERC20 Router', category: 'bridge' },
  // Relay Depository
  '0x4cd00e387622c35bddb9b4c962c136462338bc31': { name: 'Relay Depository', category: 'bridge' },
  // Relay Approval Proxies
  '0xbbbfd134e9b44bfb5123898ba36b01de7ab93d98': { name: 'Relay Approval Proxy', category: 'bridge' },
  '0xcd740b0e005cb8647f9baf4febedc8753ceef861': { name: 'Relay Approval Proxy', category: 'bridge' },
  '0x58cc3e0aa6cd7bf795832a225179ec2d848ce3e7': { name: 'Relay Approval Proxy', category: 'bridge' },
  '0x8754bc615047de01228a7527b712806a71a8dc9a': { name: 'Relay Approval Proxy', category: 'bridge' },
  '0xaec31c3780521c34ca59dc2eb5fb9ee2e285cebe': { name: 'Relay Approval Proxy', category: 'bridge' },
  // LI.FI — cross-chain aggregator (Diamond on most chains)
  '0x1231deb6f5749ef6ce6943a275a1d3e7486f4eae': { name: 'LI.FI Diamond', category: 'bridge' },
  '0x89c6340b1a1f4b25d36cd8b063d49045caf3f818': { name: 'LI.FI Permit2 Proxy', category: 'bridge' },
  // LI.FI — chain-specific Diamond addresses
  '0x341e94069f53234fe6dabef707ad424830525715': { name: 'LI.FI Diamond (zkSync)', category: 'bridge' },
  '0xde1e598b81620773454588b85d6b5d4eec32573e': { name: 'LI.FI Diamond (Linea)', category: 'bridge' },
  '0x24ca98fb6972f5ee05f0db00595c7f68d9fafd68': { name: 'LI.FI Diamond (Metis)', category: 'bridge' },

  // --- Across Protocol SpokePools ---
  '0x5c7bcd6e7de5423a257d81b442095a1a6ced35c5': { name: 'Across SpokePool (Ethereum)', category: 'bridge' },
  '0x6f26bf09b1c792e3228e5467807a900a503c0281': { name: 'Across SpokePool (Optimism)', category: 'bridge' },
  '0x9295ee1d8c5b022be115a2ad3c30c72e34e7f096': { name: 'Across SpokePool (Polygon)', category: 'bridge' },
  '0xe35e9842fceaca96570b734083f4a58e8f7c5f2a': { name: 'Across SpokePool (Arbitrum)', category: 'bridge' },
  '0x09aea4b2242abc8bb4bb78d537a67a245a7bec64': { name: 'Across SpokePool (Base)', category: 'bridge' },
  '0x7e63a5f1a8f0b4d0934b2f2327daed3f6bb2ee75': { name: 'Across SpokePool (Linea)', category: 'bridge' },
  '0xe0b015e54d54fc84a6cb9b666099c46ade9335ff': { name: 'Across SpokePool (zkSync)', category: 'bridge' },
  '0x3bad7ad0728f9917d1bf08af5782dcbd516cdd96': { name: 'Across SpokePool (Scroll/Mode)', category: 'bridge' },
  '0x2d509190ed0172ba588407d4c2df918f955cc6e1': { name: 'Across SpokePool (Blast)', category: 'bridge' },
  '0x4e8e101924ede233c13e2d8622dc8aed2872d505': { name: 'Across SpokePool (BSC)', category: 'bridge' },
  '0x13fdac9f9b4777705db45291bbff3c972c6d1d97': { name: 'Across SpokePool (Zora)', category: 'bridge' },
  '0x9552a0a6624a23b848060ae5901659cdda1f83f8': { name: 'Across SpokePool (Lisk)', category: 'bridge' },
  '0xc186fa914353c44b2e33ebe05f21846f1048beda': { name: 'Across HubPool (Ethereum)', category: 'bridge' },
  '0x924a9f036260ddd5808007e1aa95f08ed08aa569': { name: 'Across MulticallHandler', category: 'bridge' },
  '0x89415a82d909a7238d69094c3dd1dcc1acbda85c': { name: 'Across SpokePoolPeriphery', category: 'bridge' },

  // --- Stargate V1 Routers ---
  '0x8731d54e9d02c286767d56ac03e8037c07e01e98': { name: 'Stargate Router V1 (Ethereum)', category: 'bridge' },
  '0x4a364f8c717caad9a442737eb7b8a55cc6cf18d8': { name: 'Stargate Router V1 (BSC)', category: 'bridge' },
  '0x45a01e4e04f14f7a4a6702c74187c5f6222033cd': { name: 'Stargate Router V1 (Avalanche/Polygon)', category: 'bridge' },
  '0x53bf833a5d6c4dda888f69c22c88c9f356a41614': { name: 'Stargate Router V1 (Arbitrum)', category: 'bridge' },
  '0xb0d502e938ed5f4df2e681fe6e419ff29631d62b': { name: 'Stargate Router V1 (Optimism)', category: 'bridge' },
  '0x45f1a95a4d3f3836523f5c83673c797f4d4d263b': { name: 'Stargate Router V1 (Base)', category: 'bridge' },

  // --- Stargate V2 Pools ---
  '0x77b2043768d28e9c9ab44e1abfc95944bce57931': { name: 'Stargate V2 Pool Native (Ethereum)', category: 'bridge' },
  '0xc026395860db2d07ee33e05fe50ed7bd583189c7': { name: 'Stargate V2 Pool USDC (Ethereum)', category: 'bridge' },
  '0x933597a323eb81cae705c5bc29985172fd5a3973': { name: 'Stargate V2 Pool USDT (Ethereum)', category: 'bridge' },
  '0xe8cdf27acd73a434d661c84887215f7598e7d0d3': { name: 'Stargate V2 Pool (Optimism/Arbitrum)', category: 'bridge' },
  '0xce8cca271ebc0533920c83d39f417ed6a0abb7d0': { name: 'Stargate V2 Pool (Optimism/Arbitrum)', category: 'bridge' },
  '0x27a16dc786820b16e5c9028b75b99f6f604b5d26': { name: 'Stargate V2 Pool USDC (Base)', category: 'bridge' },
  '0x29e38769f23701a2e4a8ef0492e19da4604be62c': { name: 'Stargate V2 Pool USDT (Polygon)', category: 'bridge' },
  '0x1205f31718499dbf1fca446663b532ef87481fe1': { name: 'Stargate V2 Pool USDC (Polygon/Avalanche)', category: 'bridge' },

  // --- deBridge ---
  '0x43de2d77bf8027e25dbd179b491e8d64f38398aa': { name: 'deBridge Gate', category: 'bridge' },
  '0xef4fb24ad0916217251f553c0596f8edc630eb66': { name: 'deBridge DlnSource', category: 'bridge' },
  '0xe7351fd770a37282b91d153ee690b63579d6dd7f': { name: 'deBridge DlnDestination', category: 'bridge' },

  // --- Hop Protocol L1 Bridges ---
  '0xb8901acb165ed027e32754e0ffe830802919727f': { name: 'Hop ETH Bridge (Ethereum)', category: 'bridge' },
  '0x3666f603cc164936c1b87e207f36beba4ac5f18a': { name: 'Hop USDC Bridge (Ethereum)', category: 'bridge' },
  '0x3e4a3a4796d16c0cd582c382691998f7c06420b6': { name: 'Hop USDT Bridge (Ethereum)', category: 'bridge' },
  '0x3d4cc8a61c7528fd86c55cfe061a78dcba48edd1': { name: 'Hop DAI Bridge (Ethereum)', category: 'bridge' },
  // Hop L2 Wrappers
  '0xc315239cfb05f1e130e7e28e603cea4c014c57f0': { name: 'Hop ETH Wrapper (Polygon)', category: 'bridge' },
  '0x76b22b8c1079a44f1211d867d68b1eda76a635a7': { name: 'Hop USDC Wrapper', category: 'bridge' },
  '0x8741ba6225a6bf91f9d73531a98a89807857a2b3': { name: 'Hop USDT Wrapper (Polygon)', category: 'bridge' },
  '0x884d1aa15f9957e1aeaa86a82a72e49bc2bfcbe3': { name: 'Hop MATIC Wrapper (Polygon)', category: 'bridge' },
  '0x33ceb27b39d2bb7d2e61f7564d3df29344020417': { name: 'Hop ETH Wrapper (Arbitrum)', category: 'bridge' },
  '0xe22d2bedb3eca35e6397e0c6d62857094aa26f52': { name: 'Hop USDC Wrapper (Arbitrum)', category: 'bridge' },
  '0x86ca30bef97fb651b8d866d45503684b90cb3312': { name: 'Hop ETH Wrapper (Optimism)', category: 'bridge' },
  '0x2ad09850b0ca4c7c1b33f5acd6cbabcab5d6e796': { name: 'Hop USDC Wrapper (Optimism)', category: 'bridge' },
  '0x7d269d3e0d61a05a0ba976b7dbf8805bf844af3f': { name: 'Hop USDT Wrapper (Optimism)', category: 'bridge' },
  '0xb3c68a491608952cb1257fc9909a537a0173b63b': { name: 'Hop DAI Wrapper (Optimism)', category: 'bridge' },
  '0x6c928f435d1f3329babb42d69ccf043e3900ecf1': { name: 'Hop DAI Wrapper (Gnosis)', category: 'bridge' },

  // --- Celer cBridge ---
  '0x9d39fc627a6d9d9f8c831c16995b209548cc3401': { name: 'Celer cBridge (Optimism)', category: 'bridge' },
  '0xdd90e5e87a2081dcf0391920868ebc2ffb81a1af': { name: 'Celer cBridge (BSC)', category: 'bridge' },
  '0x88dcdc47d2f83a99cf0000fdf667a468bb958a78': { name: 'Celer cBridge (Polygon)', category: 'bridge' },
  '0x374b8a9f3ec5eb2d97eca84ea27aca45aa1c57ef': { name: 'Celer cBridge (Fantom)', category: 'bridge' },
  '0x7d43aabc515c356145049227cee54b608342c0ad': { name: 'Celer cBridge (Base)', category: 'bridge' },
  '0x1619de6b6b20ed217a58d00f37b9d47c7663feca': { name: 'Celer cBridge (Arbitrum)', category: 'bridge' },
  '0xef3c714c9425a8f3697a9c969dc1af30ba82e5d4': { name: 'Celer cBridge (Avalanche)', category: 'bridge' },
  '0xb37d31b2a74029b5951a2778f959282e2d518595': { name: 'Celer OriginalTokenVault', category: 'bridge' },
  '0x7510792a3b1969f9307f3845ce88e39578f2bae1': { name: 'Celer OriginalTokenVaultV2', category: 'bridge' },

  // --- Synapse Protocol ---
  '0xd123f70ae324d34a9e76b67a27bf77593ba8749f': { name: 'Synapse Bridge (BSC)', category: 'bridge' },
  '0x8f5bbb2bb8c2ee94639e55d5f41de9b4839c1280': { name: 'Synapse Bridge (Polygon)', category: 'bridge' },
  '0x6f4e8eba4d337f874ab57478acc2cb5bacdc19c9': { name: 'Synapse Bridge (Arbitrum)', category: 'bridge' },
  '0xaf41a65f786339e7911f4acdad6bd49426f2dc6b': { name: 'Synapse Bridge (Optimism/Fantom)', category: 'bridge' },
  '0xc05e61d0e7a63d27546389b7ad62fdff5a91aace': { name: 'Synapse Bridge (Avalanche)', category: 'bridge' },
  '0xe27bff97ce92c3e1ff7aa9f86781fdd6d48f5ee9': { name: 'Synapse Bridge (Cronos)', category: 'bridge' },
  '0x7e7a0e201fd38d3adaa9523da6c109a07118c96a': { name: 'Synapse Router', category: 'bridge' },
  '0xd5a597d6e7ddf373a92c8f477daaa673b0902f48': { name: 'Synapse CCTP Router', category: 'bridge' },

  // --- Connext (Everclear) ---
  '0x8898b472c54c31894e3b9bb83cea802a5d0e63c6': { name: 'Connext Diamond (Ethereum)', category: 'bridge' },
  '0x11984dc4465481512eb5b777e44061c158cf2259': { name: 'Connext Diamond (Polygon)', category: 'bridge' },
  '0xee9dec2712cce65174b561151701bf54b99c24c8': { name: 'Connext Diamond (Arbitrum)', category: 'bridge' },
  '0x8f7492de823025b4cfaab1d34c58963f2af5deda': { name: 'Connext Diamond (Optimism)', category: 'bridge' },
  '0xcd401c10afa37d641d2f594852da94c700e4f2ce': { name: 'Connext Diamond (BSC)', category: 'bridge' },
  '0x5bb83e95f63217cda6ae3d181ba580ef377d2109': { name: 'Connext Diamond (Gnosis)', category: 'bridge' },

  // --- Hyperlane Mailbox ---
  '0xc005dc82818d67af737725bd4bf75435d065d239': { name: 'Hyperlane Mailbox (Ethereum)', category: 'bridge' },
  '0x5d934f4e2f797775e53561bb72aca21ba36b96bb': { name: 'Hyperlane Mailbox (Polygon)', category: 'bridge' },
  '0x979ca5202784112f4738403dbec5d0f3b9daabb9': { name: 'Hyperlane Mailbox (Arbitrum)', category: 'bridge' },
  '0xd4c1905bb1d26bc93dac913e13cacc278cdcc80d': { name: 'Hyperlane Mailbox (Optimism)', category: 'bridge' },
  '0x2971b9aec44be4eb673df1b88cdb57b96eefe8a4': { name: 'Hyperlane Mailbox (BSC)', category: 'bridge' },

  // --- Squid Router (Axelar) ---
  '0xce16f69375520ab01377ce7b88f5ba8c48f8d666': { name: 'Squid Router', category: 'bridge' },

  // --- Allbridge Core ---
  '0x609c690e8f7d68a59885c9132e812eebdaaf0c9e': { name: 'Allbridge Core (Ethereum)', category: 'bridge' },
  '0x7775d63836987f444e2f14aa0fa2602204d7d3e0': { name: 'Allbridge Core (Polygon)', category: 'bridge' },
  '0x9ce3447b58d58e8602b7306316a5ff011b92d189': { name: 'Allbridge Core (Arbitrum)', category: 'bridge' },
  '0x97e5bf5068ea6a9604ee25851e6c9780ff50d5ab': { name: 'Allbridge Core (Optimism)', category: 'bridge' },
  '0x3c4fa639c8d7e65c603145adad8bd12f2358312f': { name: 'Allbridge Core (BSC)', category: 'bridge' },

  // --- Multichain/Anyswap (legacy) ---
  '0xba8da9dcf11b50b03fd5284f164ef5cdef910705': { name: 'Multichain Router V6 (Ethereum)', category: 'bridge' },
  '0x72c290f3f13664b024ee611983aa2d5621ebe917': { name: 'Multichain Router V6 (Polygon)', category: 'bridge' },
  '0x650af55d5877f289837c30b94af91538a7504b76': { name: 'Multichain Router V6 (Arbitrum)', category: 'bridge' },
  '0xdc42728b0ea910349ed3c6e1c9dc06b5fb591f98': { name: 'Multichain Router V6 (Optimism)', category: 'bridge' },
  '0xe1d592c3322f1f714ca11f05b6bc0efef1907859': { name: 'Multichain Router V6 (BSC)', category: 'bridge' },

  // --- Socket Gateway ---
  '0x3a23f943181408eac424116af7b7790c94cb97a5': { name: 'Socket Gateway', category: 'bridge' },

  // --- Orbiter Finance ---
  '0x80c67432656d59144ceff962e8faf8926599bcf8': { name: 'Orbiter Bridge 1', category: 'bridge' },
  '0xe4edb277e41dc89ab076a1f049f4a3efa700bce8': { name: 'Orbiter Bridge 2', category: 'bridge' },
  '0x41d3d33156ae7c62c094aae2995003ae63f587b3': { name: 'Orbiter Bridge 5', category: 'bridge' },
  '0xc741900276cd598060b0fe6594fbe977392928f4': { name: 'OrbiterRouterV3 (Ethereum)', category: 'bridge' },
  '0x6a065083886ec63d274b8e1fe19ae2ddf498bfdd': { name: 'OrbiterRouterV3 (Arbitrum)', category: 'bridge' },
  '0x13e46b2a3f8512ed4682a8fb8b560589fe3c2172': { name: 'OrbiterRouterV3 (BSC)', category: 'bridge' },

  // --- Symbiosis Finance ---
  '0xf621fb08bbe51af70e7e0f4ea63496894166ff7f': { name: 'Symbiosis MetaRouter (Ethereum)', category: 'bridge' },
  '0x44487a445a7595446309464a82244b4bd4e325d5': { name: 'Symbiosis MetaRouter (BSC)', category: 'bridge' },
  '0xa260e3732593e4ecf9ddc144fd6c4c5fe7077978': { name: 'Symbiosis MetaRouter (Polygon)', category: 'bridge' },
  '0xf7e96217347667064dee8f20db747b1c7df45dde': { name: 'Symbiosis MetaRouter (Arbitrum)', category: 'bridge' },
  '0x0f91052dc5b4bae53d0fea5dae561a117268f5d2': { name: 'Symbiosis MetaRouter (Optimism)', category: 'bridge' },
  '0x691df9c4561d95a4a726313089c8536dd682b946': { name: 'Symbiosis MetaRouter (Base)', category: 'bridge' },
  '0xff9b21c3bfa4bce9b20b55fed56d102ced48b0f6': { name: 'Symbiosis OnchainSwapV3', category: 'bridge' },

  // --- Mayan Finance ---
  '0xc38e4e6a15593f908255214653d3d947ca1c2338': { name: 'Mayan Swift', category: 'bridge' },
  '0x337685fdab40d39bd02028545a4ffa7d287cc3e2': { name: 'Mayan Forwarder', category: 'bridge' },

  // --- Wormhole TokenBridge (per-chain) ---
  '0x5a58505a96d1dbf8df91cb21b54419fc36e93fde': { name: 'Wormhole TokenBridge (Polygon)', category: 'bridge' },
  '0x0b2402144bb366a632d14b83f244d2e0e21bd39c': { name: 'Wormhole TokenBridge (Arbitrum)', category: 'bridge' },
  '0x1d68124e65fafc907325e3edbf8c4d84499daa8b': { name: 'Wormhole TokenBridge (Optimism)', category: 'bridge' },
  '0xb6f6d86a8f9879a9c87f643768d9efc38c1da6e7': { name: 'Wormhole TokenBridge (BSC)', category: 'bridge' },
  '0x0e082f06ff657d94310cb8ce8b0d9a04541d8052': { name: 'Wormhole TokenBridge (Avalanche)', category: 'bridge' },
  '0x8d2de8d2f73f1f4cab472ac9a881c9b123c79627': { name: 'Wormhole TokenBridge (Base)', category: 'bridge' },

  // --- THORChain / THORSwap ---
  '0xb30ec53f98ff5947ede720d32ac2da7e52a5f56b': { name: 'THORChain Router (BSC)', category: 'bridge' },
  '0x8f66c4ae756bebc49ec8b81966dd8bba9f127549': { name: 'THORChain Router (Avalanche)', category: 'bridge' },
  '0x68208d99746b805a1ae41421950a47b711e35681': { name: 'THORChain Router (Base)', category: 'bridge' },
  '0xc145990e84155416144c532e31f89b840ca8c2ce': { name: 'THORSwap Router', category: 'bridge' },
  '0x3624525075b88b24ecc29ce226b0cec1ffcb6976': { name: 'THORChain Router Legacy', category: 'bridge' },
  '0x42a5ed456650a09dc10ebc6361a7480fdd61f27b': { name: 'THORChain Router Legacy', category: 'bridge' },
  // THORChain Asgard Vaults (active — rotate periodically, same address across ETH/BSC/AVAX/BASE)
  '0x29c2fdd217ff6ab439bddca4f8c7718689f00235': { name: 'THORChain Asgard Vault', category: 'bridge' },
  '0xae7568fa877622e05ffca36fd451eeca923905ac': { name: 'THORChain Asgard Vault', category: 'bridge' },
  '0xe7959c647c3c0501f30a69dd992ccaf310cc7eab': { name: 'THORChain Asgard Vault', category: 'bridge' },
  '0x54eb90bcd8ab035440647cf290e74394201bb933': { name: 'THORChain Asgard Vault', category: 'bridge' },
  '0x773e672863a62349f26f247a7e56e768a6e59aac': { name: 'THORChain Asgard Vault', category: 'bridge' },
  '0x2ebe9a373d7dc04f485bbcad5f8b84b2c7e0a17a': { name: 'THORChain Asgard Vault', category: 'bridge' },
  '0xa5c0102566e045081796d21cc1c781eb79f8995f': { name: 'THORChain Asgard Vault', category: 'bridge' },
  // THORChain Asgard Vault (retired)
  '0x0cc2aea12d4fd98fa181e0ad6fe912f9b150bbca': { name: 'THORChain Asgard Vault (Retired)', category: 'bridge' },

  // === Instant Swap Services ===
  '0xda79e97c5ada3fdb196e7c49194ce5352ba48861': { name: 'Wizard Swap', category: 'mixer', risk: 'high' },

  // === Mixers / Privacy (High Risk) ===
  // Tornado Cash — OFAC designated Aug 2022, delisted Mar 2025 (historically relevant for tracing)
  '0xd90e2f925da726b50c4ed8d0fb90ad053324f31b': { name: 'Tornado Cash Router', category: 'mixer', risk: 'critical' },
  '0x722122df12d4e14e13ac3b6895a86e84145b6967': { name: 'Tornado Cash Proxy', category: 'mixer', risk: 'critical' },
  '0x12d66f87a04a9e220743712ce6d9bb1b5616b8fc': { name: 'Tornado Cash 0.1 ETH', category: 'mixer', risk: 'critical' },
  '0x47ce0c6ed5b0ce3d3a51fdb1c52dc66a7c3c2936': { name: 'Tornado Cash 1 ETH', category: 'mixer', risk: 'critical' },
  '0x910cbd523d972eb0a6f4cae4618ad62622b39dbf': { name: 'Tornado Cash 10 ETH', category: 'mixer', risk: 'critical' },
  '0xa160cdab225685da1d56aa342ad8841c3b53f291': { name: 'Tornado Cash 100 ETH', category: 'mixer', risk: 'critical' },
  // Tornado Cash — additional pool contracts (OFAC Aug 2022)
  '0xd4b88df4d29f5cedd6857912842cff3b20c8cfa3': { name: 'Tornado Cash 100 DAI', category: 'mixer', risk: 'critical' },
  '0xfd8610d20aa15b7b2e3be39b396a1bc3516c7144': { name: 'Tornado Cash 100K DAI', category: 'mixer', risk: 'critical' },
  '0xf60dd140cff0706bae9cd734ac3ae76ad9ebc32a': { name: 'Tornado Cash 500K DAI', category: 'mixer', risk: 'critical' },
  '0x22aaa7720ddd5388a3c0a3333430953c68f1849b': { name: 'Tornado Cash 5K cDAI', category: 'mixer', risk: 'critical' },
  '0xba214c1c1928a32bffe790263e38b4af9bfcd659': { name: 'Tornado Cash 50K cDAI', category: 'mixer', risk: 'critical' },
  '0xb1c8094b234dce6e03f10a5b673c1d8c69739a00': { name: 'Tornado Cash 500K cDAI', category: 'mixer', risk: 'critical' },
  '0x527653ea119f3e6a1f5bd18fbf4714081d7b31ce': { name: 'Tornado Cash 5M cDAI', category: 'mixer', risk: 'critical' },
  '0x58e8dcc13be9780fc42e8723d8ead4cf46943df2': { name: 'Tornado Cash 100 USDC', category: 'mixer', risk: 'critical' },
  '0xd691f27f38b395864ea86cfc7253969b409c362d': { name: 'Tornado Cash 1K USDC', category: 'mixer', risk: 'critical' },
  '0xaeaac358560e11f52454d997aaff2c5731b6f8a6': { name: 'Tornado Cash 100 USDT', category: 'mixer', risk: 'critical' },
  '0x1356c899d8c9467c7f71c195612f8a395abf2f0a': { name: 'Tornado Cash 1K USDT', category: 'mixer', risk: 'critical' },
  '0xa60c772958a3ed56c1f15dd055ba37ac8e523a0d': { name: 'Tornado Cash WBTC', category: 'mixer', risk: 'critical' },
  // Tornado Cash — infrastructure contracts
  '0x8589427373d6d84e98730d7795d8f6f8731fda16': { name: 'Tornado Cash Donation', category: 'mixer', risk: 'critical' },
  '0xdd4c48c0b24039969fc16d1cdf626eab821d3384': { name: 'Tornado Cash Pool', category: 'mixer', risk: 'critical' },
  '0xd96f2b1c14db8458374d9aca76e26c3d18364307': { name: 'Tornado Cash Pool', category: 'mixer', risk: 'critical' },
  '0x4736dcf1b7a3d580672cce6e7c65cd5cc9cfba9d': { name: 'Tornado Cash Pool', category: 'mixer', risk: 'critical' },
  '0x169ad27a470d064dede56a2d3ff727986b15d52b': { name: 'Tornado Cash Governance', category: 'mixer', risk: 'critical' },
  '0x0836222f2b2b24a3f36f98668ed8f0b38d1a872f': { name: 'Tornado Cash Governance', category: 'mixer', risk: 'critical' },
  '0xf67721a2d8f736e75a49fdd7fad2e31d8676542a': { name: 'Tornado Cash Vault', category: 'mixer', risk: 'critical' },
  '0x9ad122c22b14202b4490edaf288fdb3c7cb3ff5e': { name: 'Tornado Cash Mining', category: 'mixer', risk: 'critical' },
  '0x905b63fff465b9ffbf41dea908ceb12478ec7601': { name: 'Tornado Cash Trees', category: 'mixer', risk: 'critical' },
  '0x07687e702b410fa43f4cb4af7fa097918ffd2730': { name: 'Tornado Cash Relayer Registry', category: 'mixer', risk: 'critical' },
  '0x94a1b5cdb22c43faab4abeb5c74999895464ddaf': { name: 'Tornado Cash Staking', category: 'mixer', risk: 'critical' },
  '0xb541fc07bc7619fd4062a54d96268525cbc6ffef': { name: 'TORN Token', category: 'mixer', risk: 'critical' },
  '0x178169b423a011fff22b9e3f3abea13414ddd0f1': { name: 'Tornado Cash Router V2', category: 'mixer', risk: 'critical' },
  '0xbb93e510bbcd0b7beb5a853875f9ec60275cf498': { name: 'Tornado Cash Fee Manager', category: 'mixer', risk: 'critical' },
  '0x2717c5e28cf931547b621a5dddb772ab6a35b701': { name: 'Tornado Cash Instances', category: 'mixer', risk: 'critical' },
  '0x03893a7c7463ae47d46bc7f091665f1893656003': { name: 'Tornado Cash Proxy V2', category: 'mixer', risk: 'critical' },
  '0xca0840578f57fe71599d29375e16783424023357': { name: 'Tornado Cash Nova', category: 'mixer', risk: 'critical' },
  '0x23773e65ed146a459791799d01336db287f25334': { name: 'Tornado Cash Mining V2', category: 'mixer', risk: 'critical' },
  '0xd21be7248e0197ee08e0c20d4a96debdac3d20af': { name: 'Tornado Cash Echoer', category: 'mixer', risk: 'critical' },
  '0x610b717796ad172b316836ac95a2ffad065ceab4': { name: 'Tornado Cash Registry', category: 'mixer', risk: 'critical' },

  // === NFT Marketplaces ===
  '0x00000000006c3852cbef3e08e8df289169ede581': { name: 'OpenSea Seaport', category: 'nft' },
  '0x00000000000000adc04c56bf30ac9d3c0aaf14dc': { name: 'OpenSea Seaport 1.5', category: 'nft' },
  '0x0000000000000068f116a894984e2db1123eb395': { name: 'OpenSea Seaport 1.6', category: 'nft' },
  '0x59728544b08ab483533076417fbbb2fd0b17ce3a': { name: 'LooksRare Exchange', category: 'nft' },
  '0x74312363e45dcaba76c59ec49a7aa8a65a67eed3': { name: 'X2Y2', category: 'nft' },
  '0x00000000000001ad428e4906ae43d8f9852d0dd6': { name: 'Blur Marketplace', category: 'nft' },

  // === Liquid Staking ===
  '0xae7ab96520de3a18e5e111b5eaab095312d7fe84': { name: 'Lido stETH', category: 'staking' },
  '0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0': { name: 'Lido wstETH', category: 'staking' },
  '0xbe9895146f7af43049ca1c1ae358b0541ea49704': { name: 'Coinbase cbETH', category: 'staking' },
  '0xac3e018457b222d93114458476f3e3416abbe38f': { name: 'Frax sfrxETH', category: 'staking' },
  '0x9d65ff81a3c488d585bbfb0bfe3c7707c7917f54': { name: 'SSV Network', category: 'staking' },
  '0x00000000219ab540356cbb839cbe05303d7705fa': { name: 'ETH2 Deposit Contract', category: 'staking' },

  // === DeFi Protocols ===
  '0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7': { name: 'Curve 3pool', category: 'defi' },
  '0xd51a44d3fae010294c616388b506acda1bfaae46': { name: 'Curve Tricrypto2', category: 'defi' },
  '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2': { name: 'WETH', category: 'defi' },
  '0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419': { name: 'Chainlink ETH/USD', category: 'defi' },
  '0xd0b53d9277642d899df5c87a3966a349a798f224': { name: '0xSplits: (W)ETH-USDC Oracle', category: 'defi' },


  // === MEV Bots ===
  '0x000000000000006f6502b7f2bbac8c30a3f67e9a': { name: 'MEV Bot', category: 'mev', risk: 'medium' },
  '0x00000000003b3cc22af3ae1eac0440bcee416b40': { name: 'Flashbots Builder', category: 'mev' },

  // === Market Makers ===
  '0xce84449a8ebec019ac110a4b6662e55d0fd9f228': { name: 'Wintermute', category: 'defi', description: 'Market Maker' },
  '0x00000000ae347930bd1e7b0f35588b92280f9e75': { name: 'Wintermute', category: 'defi', description: 'Market Maker' },
  '0x4f3a120e72c76c22ae802d129f599bfdbc31cb81': { name: 'Wintermute', category: 'defi', description: 'Market Maker' },
  '0xdbf5e9c5206d0db70a90108bf936da60221dc080': { name: 'Wintermute', category: 'defi', description: 'Market Maker' },
  '0x0000006daea1723962647b7e189d311d757fb793': { name: 'Wintermute', category: 'defi', description: 'Market Maker' },
  '0x000002cba8dfb0a86a47a415592835e17fac080a': { name: 'Wintermute', category: 'defi', description: 'Market Maker' },

  // Jump Trading
  '0xf584f8728b874a6a5c7a8d4d387c9aae9172d621': { name: 'Jump Trading', category: 'defi', description: 'Market Maker' },
  '0x9507c04b10486547584c37bcbd931b2a4fee9a41': { name: 'Jump Trading', category: 'defi', description: 'Market Maker' },
  '0xf05e2a70346560d3228c7002194bb7c5dc8fe100': { name: 'Jump Trading', category: 'defi', description: 'Market Maker' },
  '0xe62240a57f0efbf549e278e8058f632af3ea5206': { name: 'Jump Trading', category: 'defi', description: 'Market Maker' },

  // Cumberland
  '0xad6eaa735d9df3d7696fd03984379dae02ed8862': { name: 'Cumberland', category: 'defi', description: 'Market Maker' },
  '0x87b49a99cbce4a9030e67919b776aa97d538adda': { name: 'Cumberland', category: 'defi', description: 'Market Maker' },

  // GSR
  '0xd8d6ffe342210057bf4dcc31da28d006f253cef0': { name: 'GSR', category: 'defi', description: 'Market Maker' },

  // Amber Group
  '0xe11970f2f3de9d637fb786f2d869f8fea44195ac': { name: 'Amber Group', category: 'defi', description: 'Market Maker' },

  // Alameda Research
  '0x84d34f4f83a87596cd3fb6887cff8f17bf5a7b83': { name: 'Alameda Research', category: 'defi', description: 'Market Maker' },
  '0x712d0f306956a6a4b4f9319ad9b9de48c5345996': { name: 'Alameda Research', category: 'defi', description: 'Market Maker' },
  '0x0f4ee9631f4be0a63756515141281a3e2b293bbe': { name: 'Alameda Research', category: 'defi', description: 'Market Maker' },
  '0x477573f212a7bdd5f7c12889bd1ad0aa44fb82aa': { name: 'Alameda Research', category: 'defi', description: 'Market Maker' },
  '0x5d13f4bf21db713e17e04d711e0bf7eaf18540d6': { name: 'Alameda Research', category: 'defi', description: 'Market Maker' },
  '0x964d9d1a532b5a5daeacbac71d46320de313ae9c': { name: 'Alameda Research', category: 'defi', description: 'Market Maker' },
  '0xbefe4f86f189c1c817446b71eb6ac90e3cb68e60': { name: 'Alameda Research', category: 'defi', description: 'Market Maker' },
  '0x60ae578abdfded1fb0555f54148fdd7b400a34ed': { name: 'Alameda Research', category: 'defi', description: 'Market Maker' },
  '0xa726c00cda1f60aaab19bc095d02a46556837f31': { name: 'Alameda Research', category: 'defi', description: 'Market Maker' },
  '0x9695cfaa368718dd6790a6f57b633d83f565893e': { name: 'Alameda Research', category: 'defi', description: 'Market Maker' },

  // DWF Labs
  '0xddacad3b1edee8e2f5b2e84f658202534fcb0374': { name: 'DWF Labs', category: 'defi', description: 'Market Maker' },
  '0xd4b69e8d62c880e9dd55d419d5e07435c3538342': { name: 'DWF Labs', category: 'defi', description: 'Market Maker' },
  '0x53c902a9ef069f3b85e5e71f918c4d582f3063fa': { name: 'DWF Labs', category: 'defi', description: 'Market Maker' },

  // Galaxy Digital
  '0x33566c9d8be6cf0b23795e0d380e112be9d75836': { name: 'Galaxy Digital', category: 'defi', description: 'Market Maker' },
  '0x15abb66ba754f05cbc0165a64a11cded1543de48': { name: 'Galaxy Digital', category: 'defi', description: 'Market Maker' },

  // B2C2
  '0xc333e80ef2dec2805f239e3f1e810612d294f771': { name: 'B2C2', category: 'defi', description: 'Market Maker' },

  // === Stablecoins (contracts) ===
  '0xdac17f958d2ee523a2206206994597c13d831ec7': { name: 'USDT', category: 'defi' },
  '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48': { name: 'USDC', category: 'defi' },
  '0x6b175474e89094c44da98b954eedeac495271d0f': { name: 'DAI', category: 'defi' },
};
