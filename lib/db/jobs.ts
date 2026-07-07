import { getSupabase } from "./client";
import type { TaintTraceConfig } from "@/lib/trace";
import type {
  TraceJobRow,
  CheckpointRow,
  FrontierEntry,
  EndpointRow,
  NewEndpoint,
} from "./types";

const JOBS = "rr_trace_jobs";
const CHECKPOINTS = "rr_checkpoints";
const ENDPOINTS = "rr_endpoints";

// ---- jobs ----
export async function createJob(incidentId: string, config: TaintTraceConfig): Promise<TraceJobRow> {
  const { data, error } = await getSupabase()
    .from(JOBS)
    .insert({ incident_id: incidentId, config, status: "queued" })
    .select()
    .single();
  if (error) throw new Error(`createJob: ${error.message}`);
  return data as TraceJobRow;
}

export async function getJob(id: string): Promise<TraceJobRow | null> {
  const { data, error } = await getSupabase().from(JOBS).select("*").eq("id", id).maybeSingle();
  if (error) throw new Error(`getJob: ${error.message}`);
  return (data as TraceJobRow) ?? null;
}

/**
 * Atomically claim the oldest queued job: flip it to `running` only if still `queued`.
 * Returns the claimed job, or null if there are none / another worker won the race.
 */
export async function claimNextQueuedJob(): Promise<TraceJobRow | null> {
  const sb = getSupabase();
  const { data: candidates, error } = await sb
    .from(JOBS)
    .select("id")
    .eq("status", "queued")
    .order("created_at", { ascending: true })
    .limit(1);
  if (error) throw new Error(`claimNextQueuedJob(select): ${error.message}`);
  if (!candidates || candidates.length === 0) return null;

  const { data: claimed, error: e2 } = await sb
    .from(JOBS)
    .update({ status: "running", started_at: new Date().toISOString() })
    .eq("id", candidates[0].id)
    .eq("status", "queued") // conditional — loses the race → no row returned
    .select()
    .maybeSingle();
  if (e2) throw new Error(`claimNextQueuedJob(claim): ${e2.message}`);
  return (claimed as TraceJobRow) ?? null;
}

export async function markJobRunning(id: string): Promise<void> {
  const { error } = await getSupabase()
    .from(JOBS)
    .update({ status: "running", started_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(`markJobRunning: ${error.message}`);
}

export async function updateJobProgress(
  id: string,
  progress: { hop_count: number; visited_count: number; taint_coverage?: number },
): Promise<void> {
  const { error } = await getSupabase().from(JOBS).update(progress).eq("id", id);
  if (error) throw new Error(`updateJobProgress: ${error.message}`);
}

export async function finishJob(
  id: string,
  outcome: { status: "completed" | "failed"; taint_coverage?: number; error?: string },
): Promise<void> {
  const { error } = await getSupabase()
    .from(JOBS)
    .update({ ...outcome, finished_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(`finishJob: ${error.message}`);
}

// ---- checkpoints (resume + live progress) ----
export async function saveCheckpoint(
  jobId: string,
  hop: number,
  frontier: FrontierEntry[],
  visited: string[],
): Promise<void> {
  const { error } = await getSupabase()
    .from(CHECKPOINTS)
    .upsert(
      { job_id: jobId, hop, frontier, visited: { count: visited.length, addresses: visited } },
      { onConflict: "job_id,hop" },
    );
  if (error) throw new Error(`saveCheckpoint: ${error.message}`);
}

/** Latest checkpoint for a job — the resume point after a crash. */
export async function getLatestCheckpoint(jobId: string): Promise<CheckpointRow | null> {
  const { data, error } = await getSupabase()
    .from(CHECKPOINTS)
    .select("*")
    .eq("job_id", jobId)
    .order("hop", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw new Error(`getLatestCheckpoint: ${error.message}`);
  return (data as CheckpointRow) ?? null;
}

// ---- endpoints ----
export async function saveEndpoints(endpoints: NewEndpoint[]): Promise<void> {
  if (endpoints.length === 0) return;
  const { error } = await getSupabase().from(ENDPOINTS).insert(endpoints);
  if (error) throw new Error(`saveEndpoints: ${error.message}`);
}

export async function getEndpoints(jobId: string): Promise<EndpointRow[]> {
  const { data, error } = await getSupabase()
    .from(ENDPOINTS)
    .select("*")
    .eq("job_id", jobId)
    .order("taint_ratio", { ascending: false });
  if (error) throw new Error(`getEndpoints: ${error.message}`);
  return (data as EndpointRow[]) ?? [];
}
