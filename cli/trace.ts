/**
 * rekt-trace — headless single-chain EVM fund trace.
 *
 *   npm run trace -- --origin 0x... --chain ethereum --depth 3 --direction forward
 *   npm run trace -- --origin 0x... --json
 *
 * Wires the Phase 1a engine to the Phase 1b Etherscan fetcher and prints an
 * endpoint summary (where the tainted funds ended up).
 */
import { trace, DEFAULT_TRACE_CONFIG, type TraceDirection, type TaintTraceResult } from '@/lib/trace';
import { isEvmChain, getEvmChain } from '@/lib/chains/evm';
import { createEvmFetcher } from '@/lib/fetch/evm-fetcher';
import { createStopPredicate, getEntity } from '@/lib/entity';

interface Args {
  origin?: string;
  chain: string;
  depth: number;
  direction: TraceDirection;
  fanout: number;
  json: boolean;
}

function parseArgs(argv: string[]): Args {
  const args: Args = { chain: 'ethereum', depth: 3, direction: 'forward', fanout: DEFAULT_TRACE_CONFIG.maxFanoutPerHop, json: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    switch (a) {
      case '--origin': args.origin = argv[++i]; break;
      case '--chain': args.chain = argv[++i]; break;
      case '--depth': args.depth = Number(argv[++i]); break;
      case '--direction': args.direction = argv[++i] as TraceDirection; break;
      case '--fanout': args.fanout = Number(argv[++i]); break;
      case '--json': args.json = true; break;
      default: break;
    }
  }
  return args;
}

function pct(x: number): string {
  return `${(x * 100).toFixed(1)}%`;
}

function summarize(result: TaintTraceResult): void {
  console.log(`\nTrace: ${result.origin} (${result.direction})`);
  console.log(`Nodes: ${result.nodes.length} | Edges: ${result.edges.length} | budget hit: ${result.reachedMaxNodes}\n`);

  const byReason: Record<string, number> = {};
  const stopped = result.nodes.filter(n => n.stopReason === 'cex' || n.stopReason === 'mixer');
  for (const n of result.nodes) {
    if (n.stopReason) byReason[n.stopReason] = (byReason[n.stopReason] ?? 0) + n.taintRatio;
  }

  if (stopped.length === 0) {
    console.log('No CEX/mixer endpoints reached within depth/budget.');
  } else {
    console.log('Endpoints (funds reaching a CEX / mixer):');
    stopped
      .sort((a, b) => b.taintRatio - a.taintRatio)
      .slice(0, 20)
      .forEach(n => {
        const e = getEntity(n.address);
        const label = e ? e.name : n.address;
        console.log(`  [${n.stopReason}] ${label}  ${n.address}  taint ${pct(n.taintRatio)}  (hop ${n.depth})`);
      });
  }

  const reachedCex = byReason['cex'] ?? 0;
  const reachedMixer = byReason['mixer'] ?? 0;
  console.log(`\nTaint reaching CEX: ${pct(reachedCex)} | mixer: ${pct(reachedMixer)}`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (!args.origin) {
    console.error('Usage: npm run trace -- --origin 0x... [--chain ethereum] [--depth 3] [--direction forward|backward] [--json]');
    process.exit(1);
  }
  if (!isEvmChain(args.chain)) {
    console.error(`Unsupported chain: ${args.chain}`);
    process.exit(1);
  }
  const apiKey = process.env.ETHERSCAN_API_KEY;
  if (!apiKey) {
    console.error('ETHERSCAN_API_KEY not set (put it in .env.local).');
    process.exit(1);
  }

  const chain = args.chain;
  getEvmChain(chain); // validate early
  const fetcher = createEvmFetcher({ apiKey });
  const stopAt = createStopPredicate();

  const result = await trace(args.origin, chain, args.direction, fetcher, stopAt, {
    maxDepth: args.depth,
    maxFanoutPerHop: args.fanout,
  });

  if (args.json) {
    console.log(JSON.stringify(result, null, 2));
  } else {
    summarize(result);
  }
}

main().catch(err => {
  console.error('trace failed:', err);
  process.exit(1);
});
