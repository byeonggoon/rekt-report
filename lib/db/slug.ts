/**
 * Deterministic incident slug from a display name (+ optional year prefix).
 * e.g. slugify("Moonwell Lending Exploit", 2026) → "2026-moonwell-lending-exploit"
 * Pure — unit-tested; no DB access.
 */
export function slugify(name: string, year?: number): string {
  const base = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/g, "");
  if (!base) throw new Error("slugify: name has no slug-able characters");
  return year ? `${year}-${base}` : base;
}

const SAFE_SLUG = /^[a-z0-9][a-z0-9-]*$/;

export function isValidSlug(slug: string): boolean {
  return SAFE_SLUG.test(slug) && slug.length <= 72;
}
