import "server-only";
import type { WaitlistRow } from "@/lib/waitlist";

/**
 * Where waitlist submissions go.
 *
 * 1. Supabase (production): set SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY.
 *    Uses the PostgREST endpoint directly — no SDK dependency.
 * 2. Local JSONL file (development only): .data/waitlist.jsonl
 *
 * In production without Supabase configured, saving fails loudly rather than
 * silently dropping a parent's details.
 */

export type StorageResult = { ok: true; backend: "supabase" | "file" } | { ok: false; reason: string };

export async function saveSignup(row: WaitlistRow): Promise<StorageResult> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (url && key) return saveToSupabase(url.replace(/\/$/, ""), key, row);
  if (process.env.NODE_ENV !== "production") return saveToFile(row);
  return { ok: false, reason: "No storage configured: set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY." };
}

async function saveToSupabase(url: string, key: string, row: WaitlistRow): Promise<StorageResult> {
  const table = process.env.SUPABASE_TABLE || "waitlist_signups";
  try {
    const res = await fetch(`${url}/rest/v1/${encodeURIComponent(table)}`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(row),
      cache: "no-store",
    });
    if (!res.ok) {
      return { ok: false, reason: `Supabase responded ${res.status}: ${(await res.text()).slice(0, 300)}` };
    }
    return { ok: true, backend: "supabase" };
  } catch (err) {
    return { ok: false, reason: `Supabase request failed: ${(err as Error).message}` };
  }
}

async function saveToFile(row: WaitlistRow): Promise<StorageResult> {
  const { mkdir, appendFile } = await import("node:fs/promises");
  const path = await import("node:path");
  const dir = path.join(process.cwd(), ".data");
  await mkdir(dir, { recursive: true });
  const record = { id: crypto.randomUUID(), created_at: new Date().toISOString(), ...row };
  await appendFile(path.join(dir, "waitlist.jsonl"), JSON.stringify(record) + "\n", "utf8");
  return { ok: true, backend: "file" };
}
