import { NextResponse, type NextRequest } from "next/server";

/**
 * Owner-only gate for write endpoints (incident registration).
 * Shared-secret via the `x-owner-secret` header — sufficient for a v1 backend where
 * the owner triggers registration; the dashboard read path stays public.
 *
 * Returns a NextResponse to short-circuit on failure, or null when authorized.
 */
export function requireOwner(req: NextRequest): NextResponse | null {
  const secret = process.env.OWNER_SECRET;

  if (!secret) {
    // Never allow unauthenticated writes in production.
    if (process.env.NODE_ENV === "production") {
      console.error("[SECURITY] OWNER_SECRET not set — write operations blocked");
      return NextResponse.json({ error: "owner auth not configured" }, { status: 500 });
    }
    return null; // dev convenience when no secret is configured
  }

  const provided = req.headers.get("x-owner-secret");
  if (!provided || provided !== secret) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  return null;
}
