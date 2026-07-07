import { trace, type ResumeState } from "@/lib/trace";
import { isEvmChain } from "@/lib/chains/evm";
import { createEvmFetcher } from "@/lib/fetch/evm-fetcher";
import { createStopPredicate } from "@/lib/entity";
import {
  getJob,
  getIncidentById,
  markJobRunning,
  updateJobProgress,
  finishJob,
  setIncidentStatus,
  saveCheckpoint,
  saveEndpoints,
  getLatestCheckpoint,
  getEndpoints,
} from "@/lib/db";
import { endpointsFromHop, coverageFromEndpoints } from "./endpoints";

export interface RunResult {
  endpointsSaved: number;
  coverage: number;
  resumedFromHop: number | null;
}

/** Rebuild resume state from the latest saved checkpoint, if any. */
async function buildResume(jobId: string): Promise<ResumeState | undefined> {
  const cp = await getLatestCheckpoint(jobId);
  if (!cp) return undefined;
  return { frontier: cp.frontier, visited: cp.visited.addresses, startHop: cp.hop + 1 };
}

/**
 * Run (or resume) a trace job unattended: expand hop-by-hop, persisting a checkpoint
 * and this hop's endpoints after each hop, then finalize the job + incident.
 *
 * Persist order per hop is endpoints → progress → checkpoint: if the process dies
 * mid-hop we prefer re-running a hop (possible duplicate rows) over losing evidence.
 */
export async function runTraceJob(jobId: string): Promise<RunResult> {
  const job = await getJob(jobId);
  if (!job) throw new Error(`job not found: ${jobId}`);
  const incident = await getIncidentById(job.incident_id);
  if (!incident) throw new Error(`incident not found: ${job.incident_id}`);

  const seed = incident.hacker_addresses[0];
  if (!seed) throw new Error("incident has no hacker address");
  if (!isEvmChain(seed.chain)) throw new Error(`non-EVM chain not supported yet: ${seed.chain}`);

  const apiKey = process.env.ETHERSCAN_API_KEY;
  if (!apiKey) throw new Error("ETHERSCAN_API_KEY not set");

  await markJobRunning(jobId);
  try {
    const resume = await buildResume(jobId);
    const fetcher = createEvmFetcher({ apiKey });
    const stopAt = createStopPredicate();

    await trace(seed.address, seed.chain, "forward", fetcher, stopAt, job.config, {
      resume,
      onHop: async (delta) => {
        await saveEndpoints(endpointsFromHop(jobId, delta));
        await updateJobProgress(jobId, {
          hop_count: delta.hop + 1,
          visited_count: delta.visited.length,
        });
        await saveCheckpoint(jobId, delta.hop, delta.frontier, delta.visited);
      },
    });

    // Coverage from all persisted endpoints — correct even after a resume.
    const rows = await getEndpoints(jobId);
    const coverage = coverageFromEndpoints(rows);
    await finishJob(jobId, { status: "completed", taint_coverage: coverage });
    await setIncidentStatus(incident.id, "traced");

    return { endpointsSaved: rows.length, coverage, resumedFromHop: resume?.startHop ?? null };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    await finishJob(jobId, { status: "failed", error: msg });
    await setIncidentStatus(incident.id, "failed");
    throw err;
  }
}
