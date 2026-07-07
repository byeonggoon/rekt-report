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
  visitedCount: number,
): Promise<void> {
  const { error } = await getSupabase()
    .from(CHECKPOINTS)
    .upsert(
      { job_id: jobId, hop, frontier, visited: { count: visitedCount } },
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
