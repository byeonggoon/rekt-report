import { WebSocket as WsWebSocket } from "ws";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Node < 22 has no global WebSocket. supabase-js eagerly inits its realtime client
// (which we never use) and throws without one. Next.js runtime already provides a
// global WebSocket, so this polyfill only kicks in for the headless CLI / GH Actions worker.
if (typeof globalThis.WebSocket === "undefined") {
  (globalThis as unknown as { WebSocket: unknown }).WebSocket = WsWebSocket;
}

let cached: SupabaseClient | null = null;

/**
 * Server-only Supabase client (service role). Shared instance with chase-chain /
 * stableblacklist; all rekt-report tables are `rr_`-prefixed for isolation.
 */
export function getSupabase(): SupabaseClient {
  if (typeof window !== "undefined") {
    throw new Error("getSupabase is server-only — the service role key must never reach the browser");
  }
  if (cached) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Supabase env not configured (NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY)");
  }

  cached = createClient(url, key, { auth: { persistSession: false } });
  return cached;
}
