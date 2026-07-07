/**
 * Live round-trip smoke test for the rr_ data layer.
 * Run AFTER applying db/migrations/001_init.sql in the Supabase SQL editor:
 *   node --env-file=.env.local scripts/verify-db.mjs
 * Creates a throwaway incident + job + checkpoint + endpoint, reads them back,
 * then deletes the incident (cascade cleans the rest). No residue.
 */
import { WebSocket as WsWebSocket } from "ws";
if (typeof globalThis.WebSocket === "undefined") globalThis.WebSocket = WsWebSocket;
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing Supabase env");
  process.exit(1);
}
const db = createClient(url, key, { auth: { persistSession: false } });

function ok(msg) {
  console.log(`  ✓ ${msg}`);
}
function fail(where, error) {
  console.error(`  ✗ ${where}: ${error.message}`);
  process.exit(1);
}

const slug = `verify-${Date.now()}`;
let incidentId, jobId;

// 1. incident
{
  const { data, error } = await db
    .from("rr_incidents")
    .insert({
      slug,
      name: "DB verify (throwaway)",
      hacker_addresses: [{ address: "0x0000000000000000000000000000000000000001", chain: "ethereum" }],
      incident_at: new Date().toISOString(),
    })
    .select()
    .single();
  if (error) fail("insert incident", error);
  incidentId = data.id;
  ok(`incident created (${slug})`);
}

// 2. trace job
{
  const { data, error } = await db
    .from("rr_trace_jobs")
    .insert({ incident_id: incidentId, config: { maxDepth: 3, maxFanoutPerHop: 10, maxTotalNewNodes: 100, minWeight: 0 } })
    .select()
    .single();
  if (error) fail("insert job", error);
  jobId = data.id;
  ok("trace job created");
}

// 3. checkpoint (upsert on job_id,hop)
{
  const { error } = await db
    .from("rr_checkpoints")
    .upsert(
      { job_id: jobId, hop: 1, frontier: [{ address: "0xabc", chain: "ethereum", taintRatio: 0.5, depth: 1 }], visited: { count: 3 } },
      { onConflict: "job_id,hop" },
    );
  if (error) fail("upsert checkpoint", error);
  ok("checkpoint saved (resume point)");
}

// 4. endpoint
{
  const { error } = await db.from("rr_endpoints").insert({
    job_id: jobId,
    address: "0xd90e2f925da726b50c4ed8d0fb90ad053324f31b",
    chain: "ethereum",
    type: "mixer",
    entity_name: "Tornado Cash Router",
    tainted_amount: "105000000000000000",
    token_symbol: "ETH",
    taint_ratio: 0.105,
    path_tx_hashes: ["0xhash1", "0xhash2"],
  });
  if (error) fail("insert endpoint", error);
  ok("endpoint saved (Tornado Cash · mixer · 10.5%)");
}

// 5. read back
{
  const { data, error } = await db.from("rr_endpoints").select("*").eq("job_id", jobId).order("taint_ratio", { ascending: false });
  if (error) fail("read endpoints", error);
  ok(`read back ${data.length} endpoint(s), top taint ${(data[0].taint_ratio * 100).toFixed(1)}%`);
}

// 6. cleanup (cascade)
{
  const { error } = await db.from("rr_incidents").delete().eq("id", incidentId);
  if (error) fail("cleanup", error);
  ok("cleaned up (incident + cascade)");
}

console.log("\nAll rr_ tables verified end-to-end. Data layer is live.");
