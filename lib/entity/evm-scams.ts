import type { EntityEntry } from './types';

export const EVM_SCAM_ENTRIES: Record<string, EntityEntry> = {
  // === Known Exploit (standalone) ===
  '0x6c8ec8f14be7c01672d31cfa5f2cefeab2562b50': { name: 'Truebit Exploit', category: 'sanctioned', risk: 'critical' },

  // === Lazarus Group / DPRK (North Korea State-Sponsored) ===
  // OFAC SDN designated — Lazarus Group (ID 27307)
  '0x098b716b8aaf21512996dc57eb0615e2383e2f96': { name: 'Lazarus - Ronin Bridge Exploiter', category: 'sanctioned', risk: 'critical', description: '$625M Mar 2022' },
  '0xa0e1c89ef1a489c9c7de96311ed5ce5d32c20e4b': { name: 'Lazarus (OFAC Sanctioned)', category: 'sanctioned', risk: 'critical' },
  '0x3cffd56b47b7b41c56258d9c7731abadc360e073': { name: 'Lazarus (OFAC Sanctioned)', category: 'sanctioned', risk: 'critical' },
  '0x53b6936513e738f44fb50d2b9476730c0ab3bfc1': { name: 'Lazarus (OFAC Sanctioned)', category: 'sanctioned', risk: 'critical' },
  '0x35fb6f6db4fb05e6a4ce86f2c93691425626d4b1': { name: 'Lazarus (OFAC Sanctioned)', category: 'sanctioned', risk: 'critical' },
  '0xf7b31119c2682c88d88d455dbb9d5932c65cf1be': { name: 'Lazarus (OFAC Sanctioned)', category: 'sanctioned', risk: 'critical' },
  '0x3e37627deaa754090fbfbb8bd226c1ce66d255e9': { name: 'Lazarus (OFAC Sanctioned)', category: 'sanctioned', risk: 'critical' },
  '0x08723392ed15743cc38513c4925f5e6be5c17243': { name: 'Lazarus (OFAC Sanctioned)', category: 'sanctioned', risk: 'critical' },
  // DPRK-linked individuals (OFAC SDN)
  '0x4f47bc496083c727c5fbe3ce9cdf2b0f6496270c': { name: 'OFAC - SIM Hyon Sop (DPRK)', category: 'sanctioned', risk: 'critical' },
  '0x38735f03b30fbc022ddd06abed01f0ca823c6a94': { name: 'OFAC - John Desmond Hanafin (DPRK)', category: 'sanctioned', risk: 'critical' },
  '0x97b1043abd9e6fc31681635166d430a458d14f9c': { name: 'OFAC - KIM Sang Man (DPRK)', category: 'sanctioned', risk: 'critical' },
  '0xb6f5ec1a0a9cd1526536d3f0426c429529471f40': { name: 'OFAC - KIM Sang Man (DPRK)', category: 'sanctioned', risk: 'critical' },
  // FBI-identified Lazarus wallets (OpenSanctions FBI dataset)
  '0x95b6656838a1d852dd1313c659581f36b2afb237': { name: 'Lazarus (FBI Identified)', category: 'sanctioned', risk: 'critical' },
  '0xa26213638f79f2ed98d474cbcb87551da909685e': { name: 'Lazarus (FBI Identified)', category: 'sanctioned', risk: 'critical' },
  '0xbcedc4f3855148df3ea5423ce758bda9f51630aa': { name: 'Lazarus (FBI Identified)', category: 'sanctioned', risk: 'critical' },
  '0xe03a1ae400fa54283d5a1c4f8b89d3ca74afbd62': { name: 'Lazarus (FBI Identified)', category: 'sanctioned', risk: 'critical' },
  '0xff29a52a538f1591235656f71135c24019bf82e5': { name: 'Lazarus (FBI Identified)', category: 'sanctioned', risk: 'critical' },
  // Lazarus — Harmony Horizon Bridge ($100M, Jun 2022) — FBI confirmed
  '0x0d043128146654c7683fbf30ac98d7b2285ded00': { name: 'Lazarus - Horizon Bridge Exploiter', category: 'sanctioned', risk: 'critical', description: '$100M Jun 2022' },
  '0x9e91ae672e7f7330fc6b9bab9c259bd94cd08715': { name: 'Lazarus - Horizon Laundering', category: 'sanctioned', risk: 'critical' },
  '0x58f4baccb411acef70a5f6dd174af7854fc48fa9': { name: 'Lazarus - Horizon Laundering', category: 'sanctioned', risk: 'critical' },
  '0x1ec6f83b55c3f4cefc630442716872ba15f16430': { name: 'Lazarus - Horizon Laundering', category: 'sanctioned', risk: 'critical' },
  '0x4507ac1bdf4ae5e61ffcec3a9aeda312e2505970': { name: 'Lazarus - Horizon Laundering', category: 'sanctioned', risk: 'critical' },
  '0x432a9cb4353bed67ec5351734d4a44c0826847ae': { name: 'Lazarus - Horizon Laundering', category: 'sanctioned', risk: 'critical' },
  '0x8a0858888beeb5d1435ecd3657831699f169c3f4': { name: 'Lazarus - Horizon Laundering', category: 'sanctioned', risk: 'critical' },
  // Lazarus — Stake.com ($41M, Sep 2023) — FBI confirmed
  '0x7d84d78bb9b6044a45fa08b7fe109f2c8648ab4e': { name: 'Lazarus - Stake.com Exploiter', category: 'sanctioned', risk: 'critical' },
  '0x94f1b9b64e2932f6a2db338f616844400cd58e8a': { name: 'Lazarus - Stake.com Hacker', category: 'sanctioned', risk: 'critical' },
  '0xbda83686c90314cfbaaeb18db46723d83fdf0c83': { name: 'Lazarus - Stake.com Hacker', category: 'sanctioned', risk: 'critical' },
  '0xa2e898180d0bc3713025d8590615a832397a8032': { name: 'Lazarus - Stake.com Laundering', category: 'sanctioned', risk: 'critical' },
  '0x0004a76e39d33edfeac7fc3c8d3994f54428a0be': { name: 'Lazarus - Stake.com Laundering', category: 'sanctioned', risk: 'critical' },
  '0xba36735021a9ccd7582ebc7f70164794154ff30e': { name: 'Lazarus - Stake.com Laundering', category: 'sanctioned', risk: 'critical' },
  // Lazarus — Alphapo ($60M, Jul 2023) — FBI attributed
  '0x040a96659fd7118259ebcd547771f6ecb9580d17': { name: 'Lazarus - Alphapo Exploiter', category: 'sanctioned', risk: 'critical', description: '$60M Jul 2023' },
  '0x6d2e8a20b8afa88d92406d315b67822c01e53c38': { name: 'Lazarus - Alphapo Laundering', category: 'sanctioned', risk: 'critical' },
  '0xde374094c837d192b61972172740bdafc4ee16e0': { name: 'Lazarus - Alphapo Laundering', category: 'sanctioned', risk: 'critical' },
  // Lazarus — CoinEx ($54M, Sep 2023)
  '0x75497999432b8701330fb68058bd21918c02ac59': { name: 'Lazarus - CoinEx Exploiter', category: 'sanctioned', risk: 'critical', description: '$54M Sep 2023' },
  '0xce013682eddefaca8c94fe56a43a04212ebe4673': { name: 'Lazarus - CoinEx Hacker', category: 'sanctioned', risk: 'critical' },
  '0x8bf8cd7f001d0584f98f53a3d82ed0ba498cc3de': { name: 'Lazarus - CoinEx Hacker', category: 'sanctioned', risk: 'critical' },
  '0xcc1ae485b617c59a7c577c02cd07078a2bcce454': { name: 'Lazarus - CoinEx Hacker', category: 'sanctioned', risk: 'critical' },
  // Lazarus — WazirX ($234M, Jul 2024)
  '0x27fd43babfbe83a81d14665b1a6fb8030a60c9b4': { name: 'Lazarus - WazirX Exploiter', category: 'sanctioned', risk: 'critical', description: '$234M Jul 2024' },
  // Lazarus — Radiant Capital ($53M, Oct 2024)
  '0x0629b1048298ae9deff0f4100a31967fb3f98962': { name: 'Lazarus - Radiant Capital Exploiter', category: 'sanctioned', risk: 'critical', description: '$53M Oct 2024' },
  // Lazarus — Bybit ($1.5B, Feb 2025) — FBI IC3 PSA confirmed TraderTraitor/Lazarus
  '0x47666fab8bd0ac7003bce3f5c3585383f09486e2': { name: 'Lazarus - Bybit Exploiter', category: 'sanctioned', risk: 'critical', description: '$1.5B Feb 2025' },
  '0xbdd077f651ebe7f7b3ce16fe5f2b025be2969516': { name: 'Lazarus - Bybit Malicious Contract', category: 'sanctioned', risk: 'critical' },
  '0x36ed3c0213565530c35115d93a80f9c04d94e4cb': { name: 'Lazarus - Bybit Exploiter (10K ETH)', category: 'sanctioned', risk: 'critical' },
  // Bybit laundering addresses (FBI IC3 PSA 2025-02-26)
  '0x51e9d833ecae4e8d9be17300aee6d3398c135d': { name: 'Lazarus - Bybit Laundering', category: 'sanctioned', risk: 'critical' },
  '0x96244d83dc15d36847c35209bbdc5bdde9bec3d8': { name: 'Lazarus - Bybit Laundering', category: 'sanctioned', risk: 'critical' },
  '0x83c7678492d623fb98834f0fbcb2e7b7f5af8950': { name: 'Lazarus - Bybit Laundering', category: 'sanctioned', risk: 'critical' },
  '0x83ef5e80fad88288f770152875ab0bb16641a09e': { name: 'Lazarus - Bybit Laundering', category: 'sanctioned', risk: 'critical' },
  '0xaf620e6d32b1c67f3396ef5d2f7d7642dc2e6ce9': { name: 'Lazarus - Bybit Laundering', category: 'sanctioned', risk: 'critical' },
  '0x3a21f4e6bbe527d347ca7c157f4233c935779847': { name: 'Lazarus - Bybit Laundering', category: 'sanctioned', risk: 'critical' },
  '0xfa3fccb897079fd83bfba690e7d47eb402d6c49': { name: 'Lazarus - Bybit Laundering', category: 'sanctioned', risk: 'critical' },
  '0xfc926659dd8808f6e3e0a8d61b20b871f3fa6465': { name: 'Lazarus - Bybit Laundering', category: 'sanctioned', risk: 'critical' },
  '0xb172f7e99452446f18ff49a71bfeeecf0873003b4': { name: 'Lazarus - Bybit Laundering', category: 'sanctioned', risk: 'critical' },
  '0x6d46bd3aff100f23c194e5312f93507978a6dc91': { name: 'Lazarus - Bybit Laundering', category: 'sanctioned', risk: 'critical' },
  '0xf0a16603289eaf35f64077ba3681af41194a1c09': { name: 'Lazarus - Bybit Laundering', category: 'sanctioned', risk: 'critical' },
  '0x23db729908137cb60852f2936d2b5c6de0e1c887': { name: 'Lazarus - Bybit Laundering', category: 'sanctioned', risk: 'critical' },
  '0x40e98feeebad7ddb0f0534ccaa617427ea10187e': { name: 'Lazarus - Bybit Laundering', category: 'sanctioned', risk: 'critical' },
  '0x140c9ab92347734641b1a7c124ffdee58c20c3e3': { name: 'Lazarus - Bybit Laundering', category: 'sanctioned', risk: 'critical' },
  '0x684d4b58dc32af786bf6d572a792ff7a883428b9': { name: 'Lazarus - Bybit Laundering', category: 'sanctioned', risk: 'critical' },
  '0xbc3e5e8c10897a81b63933348f53f2e052f89a7e': { name: 'Lazarus - Bybit Laundering', category: 'sanctioned', risk: 'critical' },
  '0x5af75eab6bec227657fa3e749a8bfd55f02e4b1d': { name: 'Lazarus - Bybit Laundering', category: 'sanctioned', risk: 'critical' },
  '0xbca02b395747d62626a65016f2e64a20bd254a39': { name: 'Lazarus - Bybit Laundering', category: 'sanctioned', risk: 'critical' },
  '0x4c198b3b5f3a4b1aa706dac73d826c2b795ccd67': { name: 'Lazarus - Bybit Laundering', category: 'sanctioned', risk: 'critical' },
  '0xcd7ec020121ead6f99855cbb972df502db5bc63a': { name: 'Lazarus - Bybit Laundering', category: 'sanctioned', risk: 'critical' },
  '0xbde2cc5375fa9e0383309a2ca31213f2d6cabcbd': { name: 'Lazarus - Bybit Laundering', category: 'sanctioned', risk: 'critical' },
  '0xd3c611aed139107dec2294032da3913bc26507fb': { name: 'Lazarus - Bybit Laundering', category: 'sanctioned', risk: 'critical' },
  '0xb72334cb9d0b614d30c4c60e2bd12ff5ed03c305': { name: 'Lazarus - Bybit Laundering', category: 'sanctioned', risk: 'critical' },
  '0x8c7235e1a6eef91b980d0fca083347fbb7ee1806': { name: 'Lazarus - Bybit Laundering', category: 'sanctioned', risk: 'critical' },
  '0x1bb0970508316dc735329752a4581e0a4babc6b4': { name: 'Lazarus - Bybit Laundering', category: 'sanctioned', risk: 'critical' },
  '0x1eb27f136bfe7947f80d6cee3cf0bfdf92b45e57': { name: 'Lazarus - Bybit Laundering', category: 'sanctioned', risk: 'critical' },
  '0xcd1a4a457ca8b0931c3bf81df3cfa227adbdb6e9': { name: 'Lazarus - Bybit Laundering', category: 'sanctioned', risk: 'critical' },
  '0x09278b36863be4ccd3d0c22d643e8062d7a11377': { name: 'Lazarus - Bybit Laundering', category: 'sanctioned', risk: 'critical' },
  '0x660bfcea3a5faf823e8f8bf57dd558db034dea1d': { name: 'Lazarus - Bybit Laundering', category: 'sanctioned', risk: 'critical' },
  '0xe9bc552fdfa54b30296d95f147e3e0280ff7f7e6': { name: 'Lazarus - Bybit Laundering', category: 'sanctioned', risk: 'critical' },
  '0x30a822cdd2782d2b2a12a08526452e885978fa1d': { name: 'Lazarus - Bybit Laundering', category: 'sanctioned', risk: 'critical' },
  '0xb4a862a81abb2f952fca4c6f5510962e18c7f1a2': { name: 'Lazarus - Bybit Laundering', category: 'sanctioned', risk: 'critical' },
  '0x0e8c1e2881f35ef20343264862a242fb749d6b35': { name: 'Lazarus - Bybit Laundering', category: 'sanctioned', risk: 'critical' },
  '0x9271edda0f0f2bb7b1a0c712bdf8dbd0a38d1ab': { name: 'Lazarus - Bybit Laundering', category: 'sanctioned', risk: 'critical' },
  '0xe69753ddfbedbd249e703eb374452e78dae1ae49': { name: 'Lazarus - Bybit Laundering', category: 'sanctioned', risk: 'critical' },
  '0x2290937a4498c96effb87b8371a33d108f8d433f': { name: 'Lazarus - Bybit Laundering', category: 'sanctioned', risk: 'critical' },
  '0x959c4ca19c4532c97a657d82d97accbab70e6fb4': { name: 'Lazarus - Bybit Laundering', category: 'sanctioned', risk: 'critical' },
  '0x52207ec7b1b43aa5db116931a904371ae2c1619e': { name: 'Lazarus - Bybit Laundering', category: 'sanctioned', risk: 'critical' },
  '0x9ef42873ae015aa3da0c4354aef94a18d2b3407b': { name: 'Lazarus - Bybit Laundering', category: 'sanctioned', risk: 'critical' },
  '0x1542368a03ad1f03d96d51b414f4738961cf4443': { name: 'Lazarus - Bybit Laundering', category: 'sanctioned', risk: 'critical' },
  '0x21032176b43d9f7e9410fb37290a78f4fed6044c': { name: 'Lazarus - Bybit Laundering', category: 'sanctioned', risk: 'critical' },
  '0xa4b2fd68593b6f34e51cb9edb66e71c1b4ab449e': { name: 'Lazarus - Bybit Laundering', category: 'sanctioned', risk: 'critical' },
  '0x55cca2f5eb07907696afe4b9db5102bce5feb734': { name: 'Lazarus - Bybit Laundering', category: 'sanctioned', risk: 'critical' },
  '0xa5a023e052243b7cce34cbd4ba20180e8dea6ad6': { name: 'Lazarus - Bybit Laundering', category: 'sanctioned', risk: 'critical' },
  '0xdd90071d52f20e85c89802e5dc1ec0a7b6475f92': { name: 'Lazarus - Bybit Laundering', category: 'sanctioned', risk: 'critical' },
  '0x1512fcb09463a61862b73ec09b9b354af1790268': { name: 'Lazarus - Bybit Laundering', category: 'sanctioned', risk: 'critical' },
  '0xf302572594a68aa8f951fae64ed3ae7da41c72be': { name: 'Lazarus - Bybit Laundering', category: 'sanctioned', risk: 'critical' },
  '0x723a7084028421994d4a7829108d63ab44658315': { name: 'Lazarus - Bybit Laundering', category: 'sanctioned', risk: 'critical' },
  '0xf03afb1c6a11a7e370920ad42e6ee735dbedf0b1': { name: 'Lazarus - Bybit Laundering', category: 'sanctioned', risk: 'critical' },
  '0xeb0baa3a556586192590cad296b1e48df62a8549': { name: 'Lazarus - Bybit Laundering', category: 'sanctioned', risk: 'critical' },
  '0xd5b58cf7813c1edc412367b97876bd400ea5c489': { name: 'Lazarus - Bybit Laundering', category: 'sanctioned', risk: 'critical' },

  // === DeFi Exploiters ===
  '0x935bfb495e33f74d2e9735df1da66ace442ede48': { name: 'Makina Finance Exploiter', category: 'scam', risk: 'critical' },

  // === OFAC Sanctioned Entities ===
  // Garantex (Russian sanctioned exchange)
  '0x7ff9cfad3877f21d41da833e2f775db0569ee3d9': { name: 'Garantex', category: 'sanctioned', risk: 'critical' },
  '0x8dce2aac0de82bdcaf6b4373b79f94331b8e4995': { name: 'Garantex', category: 'sanctioned', risk: 'critical' },
  '0xf4377eda661e04b6dda78969796ed31658d602d4': { name: 'Garantex', category: 'sanctioned', risk: 'critical' },
  '0xb338962b92cd818d6aef0a32a9ecd01212a71f33': { name: 'Garantex', category: 'sanctioned', risk: 'critical' },
  '0x57ec89a0c056163a0314e413320f9b3abe761259': { name: 'Garantex', category: 'sanctioned', risk: 'critical' },
  '0xd8500c631dc32fa18645b7436344a99e4825e10e': { name: 'Garantex', category: 'sanctioned', risk: 'critical' },
  '0x7ced75026204ac29c34bea98905d4c949f27361e': { name: 'Garantex', category: 'sanctioned', risk: 'critical' },
  // SUEX OTC (sanctioned Russian OTC)
  '0x2f389ce8bd8ff92de3402ffce4691d17fc4f6535': { name: 'SUEX OTC', category: 'sanctioned', risk: 'critical' },
  '0x19aa5fe80d33a56d56c78e82ea5e50e5d80b4dff': { name: 'SUEX OTC', category: 'sanctioned', risk: 'critical' },
  '0xe7aa314c77f4233c18c6cc84384a9247c0cf367b': { name: 'SUEX OTC', category: 'sanctioned', risk: 'critical' },
  '0x308ed4b7b49797e1a98d3818bff6fe5385410370': { name: 'SUEX OTC', category: 'sanctioned', risk: 'critical' },
  // Chatex (sanctioned exchange)
  '0x67d40ee1a85bf4a4bb7ffae16de985e8427b6b45': { name: 'Chatex', category: 'sanctioned', risk: 'critical' },
  '0x6f1ca141a28907f78ebaa64fb83a9088b02a8352': { name: 'Chatex', category: 'sanctioned', risk: 'critical' },
  '0x48549a34ae37b12f6a30566245176994e17c6b4a': { name: 'Chatex', category: 'sanctioned', risk: 'critical' },
  '0x5512d943ed1f7c8a43f3435c85f7ab68b30121b0': { name: 'Chatex', category: 'sanctioned', risk: 'critical' },
  '0xc455f7fd3e0e12afd51fba5c106909934d8a0e4a': { name: 'Chatex', category: 'sanctioned', risk: 'critical' },
  // Cryptex (sanctioned exchange)
  '0x0931ca4d13bb4ba75d9b7132ab690265d749a5e7': { name: 'Cryptex', category: 'sanctioned', risk: 'critical' },
  // SecondEye Solution (sanctioned)
  '0x1da5821544e25c636c1417ba96ade4cf6d2f9b5a': { name: 'SecondEye Solution', category: 'sanctioned', risk: 'critical' },
  '0x7db418b5d567a4e0e8c59ad71be1fce48f3e6107': { name: 'SecondEye Solution', category: 'sanctioned', risk: 'critical' },
  '0x72a5843cc08275c8171e582972aa4fda8c397b2a': { name: 'SecondEye Solution', category: 'sanctioned', risk: 'critical' },
  '0x7f19720a857f834887fc9a7bc0a0fbe7fc7f8102': { name: 'SecondEye Solution', category: 'sanctioned', risk: 'critical' },
  // Roman Semenov (Tornado Cash co-founder, OFAC sanctioned)
  '0xdcbeffbecce100cce9e4b153c4e15cb885643193': { name: 'OFAC - Roman Semenov', category: 'sanctioned', risk: 'critical' },
  '0x5f48c2a71b2cc96e3f0ccae4e39318ff0dc375b2': { name: 'OFAC - Roman Semenov', category: 'sanctioned', risk: 'critical' },
  '0x5a7a51bfb49f190e5a6060a5bc6052ac14a3b59f': { name: 'OFAC - Roman Semenov', category: 'sanctioned', risk: 'critical' },
  '0xed6e0a7e4ac94d976eebfb82ccf777a3c6bad921': { name: 'OFAC - Roman Semenov', category: 'sanctioned', risk: 'critical' },
  '0x797d7ae72ebddcdea2a346c1834e04d1f8df102b': { name: 'OFAC - Roman Semenov', category: 'sanctioned', risk: 'critical' },
  '0x931546d9e66836abf687d2bc64b30407bac8c568': { name: 'OFAC - Roman Semenov', category: 'sanctioned', risk: 'critical' },
  '0x43fa21d92141ba9db43052492e0deee5aa5f0a93': { name: 'OFAC - Roman Semenov', category: 'sanctioned', risk: 'critical' },
  '0x6be0ae71e6c41f2f9d0d1a3b8d0f75e6f6a0b46e': { name: 'OFAC - Roman Semenov', category: 'sanctioned', risk: 'critical' },

  // Alex Peijnenburg (Tornado Cash developer, OFAC sanctioned)
  '0x83e5bc4ffa856bb84bb88581f5dd62a433a25e0d': { name: 'OFAC - Alex Peijnenburg (TC Dev)', category: 'sanctioned', risk: 'critical' },
  '0x08b2efdcdb8822efe5ad0eae55517cf5dc544251': { name: 'OFAC - Alex Peijnenburg (TC Dev)', category: 'sanctioned', risk: 'critical' },
  '0x04dba1194ee10112fe6c3207c0687def0e78bacf': { name: 'OFAC - Alex Peijnenburg (TC Dev)', category: 'sanctioned', risk: 'critical' },
  '0x0ee5067b06776a89ccc7dc8ee369984ad7db5e06': { name: 'OFAC - Alex Peijnenburg (TC Dev)', category: 'sanctioned', risk: 'critical' },
  '0x502371699497d08d5339c870851898d6d72521dd': { name: 'OFAC - Alex Peijnenburg (TC Dev)', category: 'sanctioned', risk: 'critical' },
  '0x5a14e72060c11313e38738009254a90968f58f51': { name: 'OFAC - Alex Peijnenburg (TC Dev)', category: 'sanctioned', risk: 'critical' },
  '0xefe301d259f525ca1ba74a7977b80d5b060b3cca': { name: 'OFAC - Alex Peijnenburg (TC Dev)', category: 'sanctioned', risk: 'critical' },
  // Gaza Now (OFAC sanctioned)
  '0xe950dc316b836e4eefb8308bf32bf7c72a1358ff': { name: 'OFAC - Gaza Now', category: 'sanctioned', risk: 'critical' },
  '0x21b8d56bda776bbe68655a16895afd96f5534fed': { name: 'OFAC - Gaza Now', category: 'sanctioned', risk: 'critical' },
  '0x175d44451403edf28469df03a9280c1197adb92c': { name: 'OFAC - Gaza Now', category: 'sanctioned', risk: 'critical' },
  // Russian-linked sanctioned entities
  '0xc2a3829f459b3edd87791c74cd45402ba0a20be3': { name: 'OFAC - Task Force Rusich', category: 'sanctioned', risk: 'critical' },
  '0x3ad9db589d201a710ed237c829c7860ba86510fc': { name: 'OFAC - Task Force Rusich', category: 'sanctioned', risk: 'critical' },
  '0x9f4cda013e354b8fc285bf4b9a60460cee7f7ea9': { name: 'OFAC - Southfront', category: 'sanctioned', risk: 'critical' },
  '0x3cbded43efdaf0fc77b9c55f6fc9988fcc9b757d': { name: 'OFAC - Southfront', category: 'sanctioned', risk: 'critical' },
  '0xf3701f445b6bdafedbca97d1e477357839e4120d': { name: 'OFAC - Kondratiev (LockBit)', category: 'sanctioned', risk: 'critical' },
  // Other OFAC sanctioned individuals
  '0xfec8a60023265364d066a1212fde3930f6ae8da7': { name: 'OFAC - Polyanin (Ransomware)', category: 'sanctioned', risk: 'critical' },
  '0x7f367cc41522ce07553e823bf3be79a889debe1b': { name: 'OFAC - Potekhin, Danil', category: 'sanctioned', risk: 'critical' },
  '0xd882cfc20f52f2599d84b8e8d58c7fb62cfe344b': { name: 'OFAC - Karasavidi, Dmitrii', category: 'sanctioned', risk: 'critical' },
  '0x901bb9583b24d97e995513c6778dc6888ab6870e': { name: 'OFAC - Lifshits, Artem', category: 'sanctioned', risk: 'critical' },
  '0xa7e5d5a720f06526557c513402f2e6b5fa20b008': { name: 'OFAC - Lifshits, Artem', category: 'sanctioned', risk: 'critical' },
  '0x8576acc5c05d6ce88f4e49bf65bdf0c62f91353c': { name: 'OFAC - Andreyev, Anton', category: 'sanctioned', risk: 'critical' },
  '0xe1d865c3d669dcc8c57c8d023140cb204e672ee4': { name: 'OFAC - Wang Yunhe (911 S5 Botnet)', category: 'sanctioned', risk: 'critical' },
  '0x9c2bc757b66f24d60f016b6237f8cdd414a879fa': { name: 'OFAC - Jimenez Castro', category: 'sanctioned', risk: 'critical' },
  '0xd5ed34b52ac4ab84d8fa8a231a3218bbf01ed510': { name: 'OFAC - Funnull Technology', category: 'sanctioned', risk: 'critical' },

  // === Known Hack / Exploit Addresses ===
  // Wormhole Bridge ($320M, Feb 2022)
  '0x629e7da20197a5429d30da36e77d06cdf796b71a': { name: 'Wormhole Exploiter', category: 'scam', risk: 'critical', description: '$320M Feb 2022' },
  // Nomad Bridge ($190M, Aug 2022)
  '0x59abf3837fa962d6853b4cc0a19513aa031fd32b': { name: 'Nomad Bridge Exploiter', category: 'scam', risk: 'critical', description: '$190M Aug 2022' },
  '0x56d8b635a7c88fd1104d23d632af40c1c3aac4e3': { name: 'Nomad Bridge Exploiter 2', category: 'scam', risk: 'critical' },
  '0xbf293d5138a2a1ba407b43672643434c43827179': { name: 'Nomad Bridge Exploiter 3', category: 'scam', risk: 'critical' },
  '0xb5c55f76f90cc528b2609109ca14d8d84593590e': { name: 'Nomad Bridge Exploiter 4', category: 'scam', risk: 'critical' },
  // Wintermute ($160M, Sep 2022)
  '0xe74b28c2eae8679e3ccc3a94d5d0de83ccb84705': { name: 'Wintermute Exploiter', category: 'scam', risk: 'critical', description: '$160M Sep 2022' },
  // BNB Bridge ($568M, Oct 2022)
  '0x489a8756c18c0b8b24ec2a2b9ff3d4d447f79bec': { name: 'BNB Bridge Exploiter', category: 'scam', risk: 'critical', description: '$568M Oct 2022' },
  // Beanstalk ($182M, Apr 2022)
  '0x1c5dcdd006ea78a7e4783f9e6021c32935a10fb4': { name: 'Beanstalk Exploiter', category: 'scam', risk: 'critical', description: '$182M Apr 2022' },
  // Euler Finance ($197M, Mar 2023 — funds returned)
  '0xb2698c2d99ad2c302a95a8db26b08d17a77cedd4': { name: 'Euler Finance Exploiter', category: 'scam', risk: 'critical', description: '$197M Mar 2023' },
  '0xb66cd966670d962c227b3eaba30a872dbfb995db': { name: 'Euler Finance Exploiter 2', category: 'scam', risk: 'critical' },
  '0x5f259d0b76665c337c6104145894f4d1d2758b8c': { name: 'Euler Finance Exploiter 3 (MEV)', category: 'scam', risk: 'critical' },
  // Multichain ($126M, Jul 2023)
  '0x4986e9017ea60e7afcd10d844f85c80912c3863c': { name: 'Multichain Exploiter', category: 'scam', risk: 'critical', description: '$126M Jul 2023' },
  '0xd37448ad7949c4ad8eba5aad1a0afdd3199971d8': { name: 'Multichain Exploiter 2', category: 'scam', risk: 'critical' },
  '0x123edfc3795958147958d68162fd134c6a8c69e0': { name: 'Multichain Exploiter 3', category: 'scam', risk: 'critical' },
  '0xfa2731d0bede684993ab1109db7ecf5bf33e8051': { name: 'Multichain Exploiter 4', category: 'scam', risk: 'critical' },
  '0xa648904b6e812e2d847b87878a9a3f1d74e5af50': { name: 'Multichain Exploiter 5', category: 'scam', risk: 'critical' },
  '0xb5c827fdbbee6f6e9df3a5cb499aedf5927de1b8': { name: 'Multichain Exploiter 6', category: 'scam', risk: 'critical' },
  // Curve Finance / Vyper ($70M, Jul 2023)
  '0xdce5d6b41c32f578f875efffc0d422c57a75d7d8': { name: 'Curve/Alchemix Exploiter', category: 'scam', risk: 'critical', description: '$22M Jul 2023' },
  '0x6ec21d1868743a44318c3c259a6d4953f9978538': { name: 'Curve/JPEGd Exploiter', category: 'scam', risk: 'critical' },
  '0xb1c33b391c2569b737ec387e731e88589e8ec148': { name: 'Curve CRV/ETH Exploiter', category: 'scam', risk: 'critical' },
  // Mixin Network ($200M, Sep 2023)
  '0x52e86988bd07447c596e9b0c7765f8500113104c': { name: 'Mixin Network Exploiter', category: 'scam', risk: 'critical', description: '$200M Sep 2023' },
  '0x3b5fb9d9da3546e9ce6e5aa3cceca14c8d20041e': { name: 'Mixin Network Exploiter 2', category: 'scam', risk: 'critical' },
  // Stake.com ($41M, Sep 2023 — additional address)
  '0xfe3f568d58919b14aff72bd3f14e6f55bec6c4e0': { name: 'Stake.com Exploiter', category: 'scam', risk: 'critical' },
  // KyberSwap ($47M, Nov 2023)
  '0x50275e0b7261559ce1644014d4b78d4aa63be836': { name: 'KyberSwap Exploiter', category: 'scam', risk: 'critical', description: '$47M Nov 2023' },
  '0xc9b826bad20872eb29f9b1d8af4befe8460b50c6': { name: 'KyberSwap Exploiter 2', category: 'scam', risk: 'critical' },
  // Orbit Chain ($81M, Dec 2023)
  '0xb3764761e297d6f121e79c32a65829cd1ddb4d32': { name: 'Orbit Chain Exploiter', category: 'scam', risk: 'critical', description: '$81M Dec 2023' },
  // WazirX ($235M, Jul 2024 — additional address)
  '0x04b21735e93fa3f8df70e2da89e6922616891a88': { name: 'WazirX Exploiter', category: 'scam', risk: 'critical', description: '$235M Jul 2024' },
  // Poly Network ($610M, Aug 2021 — funds returned)
  '0xc8a65fadf0e0ddaf421f28feab69bf6e2e589963': { name: 'PolyNetwork Exploiter', category: 'scam', risk: 'critical', description: '$610M Aug 2021' },
  '0x0d6e286a7cfd25e0c01fee9756765d8033b32c71': { name: 'PolyNetwork Exploiter (BSC)', category: 'scam', risk: 'critical' },
  '0x5dc3603c9d42ff184153a8a9094a73d461663214': { name: 'PolyNetwork Exploiter (Polygon)', category: 'scam', risk: 'critical' },
  // Cream Finance ($136M, Oct 2021)
  '0x24354d31bc9d90f62fe5f2454709c32049cf866b': { name: 'Cream Finance Exploiter', category: 'scam', risk: 'critical', description: '$136M Oct 2021' },
  '0x921760e71fb58dcc8de902ce81453e9e3d7fe253': { name: 'Cream Finance Exploiter 2', category: 'scam', risk: 'critical' },
  '0x70747df6ac244979a2ae9ca1e1a82899d02bbea4': { name: 'Cream Finance Exploiter 3', category: 'scam', risk: 'critical' },
  // BadgerDAO ($120M, Dec 2021)
  '0x1fcdb04d0c5364fbd92c73ca8af9baa72c269107': { name: 'BadgerDAO Exploiter', category: 'scam', risk: 'critical', description: '$120M Dec 2021' },
  // Moonwell Exploit
  '0x6997a8c804642ae2de16d7b8ff09565a5d5658ff': { name: 'Moonwell Exploiter', category: 'scam', risk: 'critical' },
  // Ronin Bridge — additional exploiter wallets
  '0x5d84a732b355ada31a36b33c446e3dee28f51555': { name: 'Ronin Bridge Exploiter 2', category: 'scam', risk: 'critical' },
  '0x29fc9b71492ec63696cf9cd56e9832a42b0dced0': { name: 'Ronin Bridge Exploiter 4', category: 'scam', risk: 'critical' },
  '0x4fe666ecc5263f5dbb34adb8bc1c8cbb9bbcd1cc': { name: 'Ronin Bridge Exploiter 6', category: 'scam', risk: 'critical' },
  '0x5b5082214d62585d686850ab8d9e3f6b6a5c58ff': { name: 'Ronin Bridge Exploiter 7', category: 'scam', risk: 'critical' },
  '0xbc25d57412a04956cdd95af07825c5c1f34d29eb': { name: 'Ronin Bridge Exploiter 8', category: 'scam', risk: 'critical' },
  // Radiant Capital — additional address
  '0x97a05becc2e7891d07f382457cd5d57fd242e4e8': { name: 'Radiant Capital Exploiter 2', category: 'scam', risk: 'critical' },
  // BonqDAO ($120M, Feb 2023)
  '0xcacf2d28b2a5309e099f0c6e8c60ec3ddf656642': { name: 'BonqDAO Exploiter', category: 'scam', risk: 'critical', description: '$120M Feb 2023' },
  // PlayDapp ($290M, Feb 2024)
  '0x6f53e6f92e85c084e10aaf35d4a44dee6a27892d': { name: 'PlayDapp Exploiter', category: 'scam', risk: 'critical', description: '$290M Feb 2024' },
  // Abracadabra Money ($13M, Mar 2025)
  '0x87f585809ce79ae39a5fa0c7c96d0d159eb678c9': { name: 'Abracadabra Exploiter', category: 'scam', risk: 'critical', description: '$13M Mar 2025' },
  // Zoth ($8.4M, Mar 2025)
  '0x3b33c5cd948be5863b72cb3d6e9c0b36e67d01e5': { name: 'Zoth Exploiter', category: 'scam', risk: 'critical', description: '$8.4M Mar 2025' },
  // Holograph ($14M, Jun 2024)
  '0xa198fa5db682a2a828a90b42d3cd938dacc01ade': { name: 'Holograph Exploiter', category: 'scam', risk: 'critical', description: '$14M Jun 2024' },
  // Gala Games ($22M, May 2024)
  '0xe2ca471124b124831e231fb835778840ad100f97': { name: 'Gala Games Exploiter', category: 'scam', risk: 'critical', description: '$22M May 2024' },
  // Sonne Finance ($20M, May 2024)
  '0xae4a7cde7c99fb98b0d5fa414aa40f0300531f43': { name: 'Sonne Finance Exploiter', category: 'scam', risk: 'critical', description: '$20M May 2024' },
  // Munchables ($62M, Mar 2024)
  '0x6e8836f050a315611208a5cd7e228701563d09c5': { name: 'Munchables Exploiter', category: 'scam', risk: 'critical', description: '$62M Mar 2024' },
  // HECO Bridge ($86M, Nov 2023)
  '0xfc146d1caf6ba1d1ce6dcb5b35dcbf895f50b0c4': { name: 'HECO Bridge Exploiter', category: 'scam', risk: 'critical', description: '$86M Nov 2023' },
  // KiloEx ($7.5M, Apr 2025)
  '0x00fac92881556a90fdb19eae9f23640b95b4bcbd': { name: 'KiloEx Exploiter', category: 'scam', risk: 'critical', description: '$7.5M Apr 2025' },
  // BtcTurk ($48M, Aug 2025)
  '0xa041feb3a8297c5689fee180083164a061a17fd6': { name: 'BtcTurk Exploiter', category: 'scam', risk: 'critical', description: '$48M Aug 2025' },
  // CoinDCX ($44M, Jul 2025)
  '0xef0c5b9e0e9643937d75c229648158584a8cd8d2': { name: 'CoinDCX Exploiter', category: 'scam', risk: 'critical', description: '$44M Jul 2025' },
  // Gamma Strategies ($6.2M, Jan 2024)
  '0x5351536145610aa448a8bf85ba97c71caf31909c': { name: 'Gamma Strategies Exploiter', category: 'scam', risk: 'critical', description: '$6.2M Jan 2024' },
  // Seneca Protocol ($6.4M, Feb 2024)
  '0x94641c01a4937f2c8ef930580cf396142a2942dc': { name: 'Seneca Exploiter', category: 'scam', risk: 'critical', description: '$6.4M Feb 2024' },
  // WOOFi ($8.5M, Mar 2024)
  '0x9961190b258897bca7a12b8f37f415e689d281c4': { name: 'WOOFi Exploiter', category: 'scam', risk: 'critical', description: '$8.5M Mar 2024' },
  // Deus Finance ($6.4M, May 2023)
  '0x189cf534de3097c08b6beaf6eb2b9179dab122d1': { name: 'Deus Finance Exploiter', category: 'scam', risk: 'critical', description: '$6.4M May 2023' },
  // Jimbos Protocol ($7.5M, May 2023)
  '0x102be4bccc2696c35fd5f5bfe54c1dfba416a741': { name: 'Jimbos Protocol Exploiter', category: 'scam', risk: 'critical', description: '$7.5M May 2023' },
  // Polter Finance ($12M, Nov 2024)
  '0x511f427cdf0c4e463655856db382e05d79ac44a6': { name: 'Polter Finance Exploiter', category: 'scam', risk: 'critical', description: '$12M Nov 2024' },
  // UXLINK ($41M, Sep 2025)
  '0xafb2423f447d3e16931164c9907b9741aab1723e': { name: 'UXLINK Exploiter', category: 'scam', risk: 'critical', description: '$41M Sep 2025' },
  // GMX V1 ($42M, Jul 2025)
  '0xdf3340a436c27655ba62f8281565c9925c3a5221': { name: 'GMX V1 Exploiter', category: 'scam', risk: 'critical', description: '$42M Jul 2025' },
  // Cork Protocol ($12M, May 2025)
  '0xea6f30e360192bae715599e15e2f765b49e4da98': { name: 'Cork Protocol Exploiter', category: 'scam', risk: 'critical', description: '$12M May 2025' },
  // Bunni v2 ($8.4M, Sep 2025)
  '0x0c3d8fa7762ca5225260039ab2d3990c035b458d': { name: 'Bunni v2 Exploiter', category: 'scam', risk: 'critical', description: '$8.4M Sep 2025' },
  // Resupply ($10M, Jun 2025)
  '0x6d9f6e900ac2ce6770fd9f04f98b7b0fc355e2ea': { name: 'Resupply Exploiter', category: 'scam', risk: 'critical', description: '$10M Jun 2025' },
  // Garden ($10.8M, Oct 2025)
  '0x98bcc6c34a489cefdd9dfa8d792cfefb02ea2d12': { name: 'Garden Exploiter', category: 'scam', risk: 'critical', description: '$10.8M Oct 2025' },
  // Yearn Finance ($9M, Nov 2025)
  '0xa80d3f2022f6bfd0b260bf16d72cad025440c822': { name: 'Yearn Finance Exploiter', category: 'scam', risk: 'critical', description: '$9M Nov 2025' },
  // Balancer ($128M, Nov 2025)
  '0x506d1f9efe24f0d47853adca907eb8d89ae03207': { name: 'Balancer Exploiter', category: 'scam', risk: 'critical', description: '$128M Nov 2025' },
  // SwapNet ($17M, Jan 2026)
  '0x6caad74121bf602e71386505a4687f310e0d833e': { name: 'SwapNet Exploiter', category: 'scam', risk: 'critical', description: '$17M Jan 2026' },
  // WOO X ($14M, Jul 2025)
  '0x87aab7bac1308faf2a0d59da26b8379e18b26355': { name: 'WOO X Exploiter', category: 'scam', risk: 'critical', description: '$14M Jul 2025' },

  // --- Batch-collected exploit addresses (QuillAudits dataset) ---

  // Minterest ($1.46M, Jul 2024)
  '0x618f768af6291705eb13e0b2e96600b3851911d1': { name: 'Minterest Exploiter', category: 'scam', risk: 'critical', description: '$1.46M Jul 2024' },
  // Dough Finance ($1.8M, Jul 2024)
  '0x34611f6bbb0a5f6f8eb48146f4474bff842ae893': { name: 'Dough Finance Exploiter', category: 'scam', risk: 'critical', description: '$1.8M Jul 2024' },
  // Pike Finance ($1.6M, Apr 2024)
  '0x19066f7431df29a0910d287c8822936bb7d89e23': { name: 'Pike Finance Exploiter', category: 'scam', risk: 'critical', description: '$1.6M Apr 2024' },
  // Hedgey Finance ($2M, Apr 2024)
  '0xded2b1a426e1b7d415a40bcad44e98f47181dda2': { name: 'Hedgey Finance Exploiter', category: 'scam', risk: 'critical', description: '$2M Apr 2024' },
  // Unizen ($2.1M, Mar 2024)
  '0xd3f64baa732061f8b3626ee44bab354f854877ac': { name: 'Unizen Exploiter', category: 'scam', risk: 'critical', description: '$2.1M Mar 2024' },
  // Shido ($2.4M, Feb 2024)
  '0x1982358c84da9d0b4b96fc9e8564d132f7d0041f': { name: 'Shido Exploiter', category: 'scam', risk: 'critical', description: '$2.4M Feb 2024' },
  // Concentric Finance ($1.6M, Jan 2024)
  '0x5a58d1a81c73dc5f1d56ba41e413ee5288c65d7f': { name: 'Concentric Finance Exploiter', category: 'scam', risk: 'critical', description: '$1.6M Jan 2024' },
  // Florence Finance ($1.4M, Nov 2023)
  '0xb087269de7ba93d0db2e12ff164d60f0b3675870': { name: 'Florence Finance Exploiter', category: 'scam', risk: 'critical', description: '$1.4M Nov 2023' },
  // Onyx Protocol ($2.1M, Oct 2023)
  '0x085bdff2c522e8637d4154039db8746bb8642bff': { name: 'Onyx Protocol Exploiter', category: 'scam', risk: 'critical', description: '$2.1M Oct 2023' },
  // Fantom Foundation ($7.3M, Oct 2023)
  '0x2f4f1d2c5944dba74e107d1e8e90e7c1475f4001': { name: 'Fantom Foundation Exploiter', category: 'scam', risk: 'critical', description: '$7.3M Oct 2023' },
  // Exactly Protocol ($7.2M, Aug 2023)
  '0xe4f34a72d7c18b6f666d6ca53fbc3790bc9da042': { name: 'Exactly Protocol Exploiter', category: 'scam', risk: 'critical', description: '$7.2M Aug 2023' },
  // Zunami Protocol ($2.1M, Aug 2023)
  '0x5f4c21c9bb73c8b4a296cc256c0cde324db146df': { name: 'Zunami Protocol Exploiter', category: 'scam', risk: 'critical', description: '$2.1M Aug 2023' },
  // Conic Finance ($3.2M, Jul 2023)
  '0x8d67db0b205e32a5dd96145f022fa18aae7dc8aa': { name: 'Conic Finance Exploiter', category: 'scam', risk: 'critical', description: '$3.2M Jul 2023' },
  // Rodeo Finance ($1.7M, Jul 2023)
  '0x2f3788f2396127061c46fc07bd0fcb91faace328': { name: 'Rodeo Finance Exploiter', category: 'scam', risk: 'critical', description: '$1.7M Jul 2023' },
  // Hundred Finance ($6.7M, Apr 2023)
  '0x155da45d374a286d383839b1ef27567a15e67528': { name: 'Hundred Finance Exploiter', category: 'scam', risk: 'critical', description: '$6.7M Apr 2023' },
  // Yearn Finance v2 ($11.5M, Apr 2023)
  '0x5bac20beef31d0eccb369a33514831ed8e9cdfe0': { name: 'Yearn Finance v2 Exploiter', category: 'scam', risk: 'critical', description: '$11.5M Apr 2023' },
  // Tender.fi ($1.6M, Mar 2023)
  '0xff1db040e4f2a44305e28f8de728dabff58f01e1': { name: 'Tender.fi Exploiter', category: 'scam', risk: 'critical', description: '$1.6M Mar 2023' },
  // Hope Finance ($1.9M, Feb 2023)
  '0x4481a3539be6c2dedf7a71b77e93bf44b64a9113': { name: 'Hope Finance Exploiter', category: 'scam', risk: 'critical', description: '$1.9M Feb 2023' },
  // Dexible ($2M, Feb 2023)
  '0x684083f312ac50f538cc4b634d85a2feafaab77a': { name: 'Dexible Exploiter', category: 'scam', risk: 'critical', description: '$2M Feb 2023' },
  // dForce ($3.6M, Feb 2023)
  '0xe0d551017c0111ac11108641771897aa33b2817c': { name: 'dForce Exploiter', category: 'scam', risk: 'critical', description: '$3.6M Feb 2023' },
  // Lodestar Finance ($7M, Dec 2022)
  '0xc29d94386ff784006ff8461c170d1953cc9e2b5c': { name: 'Lodestar Finance Exploiter', category: 'scam', risk: 'critical', description: '$7M Dec 2022' },
  // DFX Finance ($7.6M, Nov 2022)
  '0x14c19962e4a899f29b3dd9ff52ebfb5e4cb9a067': { name: 'DFX Finance Exploiter', category: 'scam', risk: 'critical', description: '$7.6M Nov 2022' },
  // TempleDAO ($2.4M, Oct 2022)
  '0x9c9fb3100a2a521985f0c47de3b4598dafd25b01': { name: 'TempleDAO Exploiter', category: 'scam', risk: 'critical', description: '$2.4M Oct 2022' },
  // Transit Swap ($28.9M, Oct 2022)
  '0x75f2aba6a44580d7be2c4e42885d4a1917bffd46': { name: 'Transit Swap Exploiter', category: 'scam', risk: 'critical', description: '$28.9M Oct 2022' },
  // Audius ($1.1M, Jul 2022)
  '0xa0c7bd318d69424603cbf91e9969870f21b8ab4c': { name: 'Audius Exploiter', category: 'scam', risk: 'critical', description: '$1.1M Jul 2022' },
  // Inverse Finance ($14.5M, Apr 2022)
  '0x7b792e49f640676b3706d666075e903b3a4deec6': { name: 'Inverse Finance Exploiter', category: 'scam', risk: 'critical', description: '$14.5M Apr 2022' },
  // Inverse Finance 2 ($1.26M, Jun 2022)
  '0x8b4c1083cd6aef062298e1fa900df9832c8351b3': { name: 'Inverse Finance Exploiter 2', category: 'scam', risk: 'critical', description: '$1.26M Jun 2022' },
  // Fei Protocol / Rari Capital ($80M, Apr 2022)
  '0x6162759edad730152f0df8115c698a42e666157f': { name: 'Fei/Rari Capital Exploiter', category: 'scam', risk: 'critical', description: '$80M Apr 2022' },
  // Saddle Finance ($10M, Apr 2022)
  '0x63341ba917de90498f3903b199df5699b4a55ac0': { name: 'Saddle Finance Exploiter', category: 'scam', risk: 'critical', description: '$10M Apr 2022' },
  // DEUS Finance v2 ($17.9M, Apr 2022)
  '0x701428525cbac59dae7af833f19d9c3aaa2a37cb': { name: 'DEUS Finance Exploiter 2', category: 'scam', risk: 'critical', description: '$17.9M Apr 2022' },
  // Superfluid ($13M, Feb 2022)
  '0x1574f7f4c9d3aca2ebce918e5d19d18ae853c090': { name: 'Superfluid Exploiter', category: 'scam', risk: 'critical', description: '$13M Feb 2022' },
  // Vulcan Forged ($140M, Dec 2021)
  '0x48ad05a3b73c9e7fac5918857687d6a11d2c73b1': { name: 'Vulcan Forged Exploiter', category: 'scam', risk: 'critical', description: '$140M Dec 2021' },
  // MonoX ($31.4M, Nov 2021)
  '0x8f6a86f3ab015f4d03ddb13abb02710e6d7ab31b': { name: 'MonoX Exploiter', category: 'scam', risk: 'critical', description: '$31.4M Nov 2021' },
  // Indexed Finance ($16M, Oct 2021)
  '0xba5ed1488be60ba2facc6b66c6d6f0befba22ebe': { name: 'Indexed Finance Exploiter', category: 'scam', risk: 'critical', description: '$16M Oct 2021' },
  // DAO Maker ($4M, Sep 2021)
  '0x2708cace7b42302af26f1ab896111d87faeff92f': { name: 'DAO Maker Exploiter', category: 'scam', risk: 'critical', description: '$4M Sep 2021' },
  // Popsicle Finance ($20M, Aug 2021)
  '0xf9e3d08196f76f5078882d98941b71c0884bea52': { name: 'Popsicle Finance Exploiter', category: 'scam', risk: 'critical', description: '$20M Aug 2021' },
  // ChainSwap ($4.4M, Jul 2021)
  '0xeda5066780de29d00dfb54581a707ef6f52d8113': { name: 'ChainSwap Exploiter', category: 'scam', risk: 'critical', description: '$4.4M Jul 2021' },
  // Anyswap ($7.9M, Jul 2021)
  '0x0ae1554860e51844b61ae20823ef1268c3949f7c': { name: 'Anyswap Exploiter', category: 'scam', risk: 'critical', description: '$7.9M Jul 2021' },
  // xToken ($25M, May 2021)
  '0x07e02088d68229300ae503395c6536f09179dc3e': { name: 'xToken Exploiter', category: 'scam', risk: 'critical', description: '$25M May 2021' },
  // Rari Capital ($14M, May 2021)
  '0xcb36b1ee0af68dce5578a487ff2da81282512233': { name: 'Rari Capital Exploiter', category: 'scam', risk: 'critical', description: '$14M May 2021' },
  // Value DeFi ($10M, May 2021)
  '0xef63ad578e75d498d0723e5420fa1962b1d28764': { name: 'Value DeFi Exploiter', category: 'scam', risk: 'critical', description: '$10M May 2021' },
  // EasyFi ($59M, Apr 2021)
  '0x83a2eb63b6cc296529468afa85dbde4a469d8b37': { name: 'EasyFi Exploiter', category: 'scam', risk: 'critical', description: '$59M Apr 2021' },
  // Paid Network ($27.4M, Mar 2021)
  '0x18738290af1aaf96f0acfa945c9c31ab21cd65be': { name: 'Paid Network Exploiter', category: 'scam', risk: 'critical', description: '$27.4M Mar 2021' },
  // Alpha Finance / Cream Finance ($37.5M, Feb 2021)
  '0x905315602ed9a854e325f692ff82f58799beab57': { name: 'Alpha Finance Exploiter', category: 'scam', risk: 'critical', description: '$37.5M Feb 2021' },
  // Cover Protocol ($3M, Dec 2020)
  '0xf05ca010d0bd620cc7c8e96e00855dde2c2943df': { name: 'Cover Protocol Exploiter', category: 'scam', risk: 'critical', description: '$3M Dec 2020' },
  // Pickle Finance ($19.7M, Nov 2020)
  '0xbac8a476b95ec741e56561a66231f92bc88bb3a8': { name: 'Pickle Finance Exploiter', category: 'scam', risk: 'critical', description: '$19.7M Nov 2020' },
  // Origin Protocol ($8M, Nov 2020)
  '0xb77f7bbac3264ae7abc8aedf2ec5f4e7ca079f83': { name: 'Origin Protocol Exploiter', category: 'scam', risk: 'critical', description: '$8M Nov 2020' },
  // Akropolis ($2M, Nov 2020)
  '0x9f26ae5cd245bfeeb5926d61497550f79d9c6c1c': { name: 'Akropolis Exploiter', category: 'scam', risk: 'critical', description: '$2M Nov 2020' },
  // Cheese Bank ($3.3M, Nov 2020)
  '0x02b7165d0916e373f0235056a7e6fccdb82d2255': { name: 'Cheese Bank Exploiter', category: 'scam', risk: 'critical', description: '$3.3M Nov 2020' },
  // Harvest Finance ($21.5M, Oct 2020)
  '0xf224ab004461540778a914ea397c589b677e27bb': { name: 'Harvest Finance Exploiter', category: 'scam', risk: 'critical', description: '$21.5M Oct 2020' },
  // bZx ($8.1M, Sep 2020)
  '0x148426fdc4c8a51b96b4bed827907b5fa6491ad0': { name: 'bZx Exploiter', category: 'scam', risk: 'critical', description: '$8.1M Sep 2020' },
  // Lendf.Me / dForce ($24.7M, Apr 2020)
  '0xa9bf70a420d364e923c74448d9d817d3f2a77822': { name: 'Lendf.Me Exploiter', category: 'scam', risk: 'critical', description: '$24.7M Apr 2020' },
  // Warp Finance ($7.7M, Dec 2020)
  '0xdf8bee861227ffc5eea819c332a1c170ae3dbacb': { name: 'Warp Finance Exploiter', category: 'scam', risk: 'critical', description: '$7.7M Dec 2020' },
  // PancakeBunny ($2.4M, Jul 2021)
  '0xa6021d8c36b2de6ceb4fe281b89d37d2be321431': { name: 'PancakeBunny Exploiter', category: 'scam', risk: 'critical', description: '$2.4M Jul 2021' },

  // === Rugpulls ===
  // Hypervault (HyperEVM)
  '0x79957ce3c826030d642b9ba6f60b896b61588af8': { name: 'Hypervault Deployer (Rugpull)', category: 'scam', risk: 'critical' },

};
