import type { ChainId, TaintTraceConfig } from "@/lib/trace";

/** Row shapes mirror db/migrations/001_init.sql (snake_case as PostgREST returns them). */

export type IncidentStatus = "registered" | "tracing" | "traced" | "failed";
export type JobStatus = "queued" | "running" | "completed" | "failed";
export type EndpointType = "cex" | "dormant" | "mixer" | "bridge-out" | "pruned" | "dispersed";

export interface HackerAddress {
  address: string;
  chain: ChainId;
}

// ---- incidents ----
export interface IncidentRow {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  hacker_addresses: HackerAddress[];
  incident_at: string;
  status: IncidentStatus;
  created_at: string;
  updated_at: string;
}
export interface NewIncident {
  slug: string;
  name: string;
  description?: string;
  hacker_addresses: HackerAddress[];
  incident_at: string;
}

// ---- trace jobs ----
export interface TraceJobRow {
  id: string;
  incident_id: string;
  status: JobStatus;
  config: TaintTraceConfig;
  hop_count: number;
  visited_count: number;
  taint_coverage: number | null;
  error: string | null;
  started_at: string | null;
  finished_at: string | null;
  created_at: string;
}

// ---- checkpoints (resumability + live progress) ----
export interface FrontierEntry {
  address: string;
  chain: ChainId;
  taintRatio: number;
  depth: number;
}
export interface CheckpointRow {
  id: number;
  job_id: string;
  hop: number;
  frontier: FrontierEntry[];
  visited: { count: number };
  created_at: string;
}

// ---- endpoints ----
export interface EndpointRow {
  id: number;
  job_id: string;
  address: string;
  chain: ChainId;
  type: EndpointType;
  entity_name: string | null;
  tainted_amount: string;
  token_symbol: string;
  taint_ratio: number;
  path_tx_hashes: string[];
  created_at: string;
}
export interface NewEndpoint {
  job_id: string;
  address: string;
  chain: ChainId;
  type: EndpointType;
  entity_name?: string | null;
  tainted_amount: string;
  token_symbol: string;
  taint_ratio: number;
  path_tx_hashes: string[];
}

// ---- evidence ----
export interface EvidenceSummary {
  nodes: number;
  edges: number;
  reachedCex: number;
  reachedMixer: number;
  stillOpen: number;
}
export interface EvidencePackageRow {
  id: string;
  incident_id: string;
  job_id: string;
  pdf_url: string | null;
  methodology: string;
  summary: EvidenceSummary;
  generated_at: string;
}
