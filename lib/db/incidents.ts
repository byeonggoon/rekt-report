import { getSupabase } from "./client";
import type { IncidentRow, NewIncident, IncidentStatus } from "./types";

const T = "rr_incidents";

export async function createIncident(inc: NewIncident): Promise<IncidentRow> {
  const { data, error } = await getSupabase().from(T).insert(inc).select().single();
  if (error) throw new Error(`createIncident: ${error.message}`);
  return data as IncidentRow;
}

export async function getIncidentBySlug(slug: string): Promise<IncidentRow | null> {
  const { data, error } = await getSupabase().from(T).select("*").eq("slug", slug).maybeSingle();
  if (error) throw new Error(`getIncidentBySlug: ${error.message}`);
  return (data as IncidentRow) ?? null;
}

export async function listIncidents(): Promise<IncidentRow[]> {
  const { data, error } = await getSupabase()
    .from(T)
    .select("*")
    .order("incident_at", { ascending: false });
  if (error) throw new Error(`listIncidents: ${error.message}`);
  return (data as IncidentRow[]) ?? [];
}

export async function setIncidentStatus(id: string, status: IncidentStatus): Promise<void> {
  const { error } = await getSupabase()
    .from(T)
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(`setIncidentStatus: ${error.message}`);
}
