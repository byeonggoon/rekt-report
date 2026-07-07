/**
 * rekt-report unattended job runner (CLI trigger).
 *
 *   npm run job -- --address 0x... --chain ethereum --name "Ronin Bridge" [--at 2022-03-23] [--depth 3] [--fanout 5]
 *
 * Registers an incident + trace job, then runs it — persisting a checkpoint and
 * endpoints after each hop. This is the same runTraceJob a GH Actions worker calls.
 */
import { DEFAULT_TRACE_CONFIG } from "@/lib/trace";
import { isEvmChain } from "@/lib/chains/evm";
import { slugify, createIncident, createJob } from "@/lib/db";
import { runTraceJob } from "@/lib/runner";

interface Args {
  address?: string;
  chain: string;
  name?: string;
  at?: string;
  depth: number;
  fanout: number;
}

function parseArgs(argv: string[]): Args {
  const a: Args = { chain: "ethereum", depth: 3, fanout: DEFAULT_TRACE_CONFIG.maxFanoutPerHop };
  for (let i = 0; i < argv.length; i++) {
    switch (argv[i]) {
      case "--address": a.address = argv[++i]; break;
      case "--chain": a.chain = argv[++i]; break;
      case "--name": a.name = argv[++i]; break;
      case "--at": a.at = argv[++i]; break;
      case "--depth": a.depth = Number(argv[++i]); break;
      case "--fanout": a.fanout = Number(argv[++i]); break;
      default: break;
    }
  }
  return a;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.address || !args.name) {
    console.error('Usage: npm run job -- --address 0x... --name "Incident name" [--chain ethereum] [--at ISO] [--depth 3] [--fanout 5]');
    process.exit(1);
  }
  if (!isEvmChain(args.chain)) {
    console.error(`Unsupported chain: ${args.chain}`);
    process.exit(1);
  }

  const incidentAt = args.at ? new Date(args.at).toISOString() : new Date().toISOString();
  const slug = `${slugify(args.name)}-${Date.now().toString(36)}`;

  const incident = await createIncident({
    slug,
    name: args.name,
    hacker_addresses: [{ address: args.address, chain: args.chain }],
    incident_at: incidentAt,
  });
  console.log(`incident  ${incident.id}  (${slug})`);

  const job = await createJob(incident.id, {
    ...DEFAULT_TRACE_CONFIG,
    maxDepth: args.depth,
    maxFanoutPerHop: args.fanout,
  });
  console.log(`job       ${job.id}  running…\n`);

  const result = await runTraceJob(job.id);

  console.log(`\ncompleted — endpoints: ${result.endpointsSaved} | taint coverage: ${(result.coverage * 100).toFixed(1)}%`);
  console.log(`incident_id=${incident.id}`);
}

main().catch((err) => {
  console.error("run-job failed:", err instanceof Error ? err.message : err);
  process.exit(1);
});
