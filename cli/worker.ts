/**
 * rekt-report trace worker.
 *
 * Claims queued jobs and runs them to completion. Invoked by GitHub Actions
 * (cron + workflow_dispatch) so tracing runs on a Node runner, not a 60s-capped
 * serverless function. Reads Supabase + Etherscan creds from the environment.
 *
 *   npx tsx cli/worker.ts            # CI (env from GH secrets)
 *   npm run worker                   # local (env from .env.local)
 */
import { claimNextQueuedJob } from "@/lib/db";
import { runTraceJob } from "@/lib/runner";

const MAX_JOBS_PER_RUN = 10; // safety cap so one invocation can't loop forever

async function main() {
  let processed = 0;

  while (processed < MAX_JOBS_PER_RUN) {
    const job = await claimNextQueuedJob();
    if (!job) break;

    console.log(`▶ job ${job.id} (incident ${job.incident_id})`);
    try {
      const r = await runTraceJob(job.id);
      console.log(`  ✓ endpoints ${r.endpointsSaved} · coverage ${(r.coverage * 100).toFixed(1)}%`);
    } catch (err) {
      // runTraceJob already marked the job failed; keep draining the queue.
      console.error(`  ✗ ${err instanceof Error ? err.message : String(err)}`);
    }
    processed++;
  }

  console.log(processed === 0 ? "no queued jobs" : `processed ${processed} job(s)`);
}

main().catch((err) => {
  console.error("worker crashed:", err instanceof Error ? err.message : err);
  process.exit(1);
});
