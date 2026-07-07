import { NextResponse, type NextRequest } from "next/server";
import { requireOwner } from "@/lib/auth/owner";
import { validateIncidentInput } from "@/lib/api/validate-incident";
import { DEFAULT_TRACE_CONFIG } from "@/lib/trace";
import { slugify, createIncident, createJob, listIncidents } from "@/lib/db";

export const dynamic = "force-dynamic";

/** Public: list incidents for the dashboard. */
export async function GET() {
  try {
    const incidents = await listIncidents();
    return NextResponse.json(incidents);
  } catch (err) {
    console.error("listIncidents failed:", err);
    return NextResponse.json({ error: "failed to list incidents" }, { status: 500 });
  }
}

/** Owner-only: register an incident + queue a trace job. */
export async function POST(req: NextRequest) {
  const authError = requireOwner(req);
  if (authError) return authError;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  const parsed = validateIncidentInput(
    body,
    { depth: DEFAULT_TRACE_CONFIG.maxDepth, fanout: DEFAULT_TRACE_CONFIG.maxFanoutPerHop },
    new Date().toISOString(),
  );
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }
  const input = parsed.value;

  try {
    const slug = `${slugify(input.name)}-${Date.now().toString(36)}`;
    const incident = await createIncident({
      slug,
      name: input.name,
      description: input.description,
      hacker_addresses: input.hackerAddresses,
      incident_at: input.incidentAt,
    });
    const job = await createJob(incident.id, {
      ...DEFAULT_TRACE_CONFIG,
      maxDepth: input.depth,
      maxFanoutPerHop: input.fanout,
    });
    // Job is created as `queued`; the GH Actions worker picks it up and runs it.
    return NextResponse.json(
      { incidentId: incident.id, jobId: job.id, slug },
      { status: 201 },
    );
  } catch (err) {
    console.error("register incident failed:", err);
    return NextResponse.json({ error: "failed to register incident" }, { status: 500 });
  }
}
