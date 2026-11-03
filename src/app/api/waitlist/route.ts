import { after, NextResponse, type NextRequest } from "next/server";
import { parseSubmission } from "@/lib/waitlist";
import { sendSignupEmails } from "@/lib/email";
import { countSignups, saveSignup } from "@/lib/storage";

export const runtime = "nodejs";

/* Best-effort per-instance rate limit: 8 submissions / 10 minutes per IP. */
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 8;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > LIMIT;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = parseSubmission(body);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: "validation", fields: parsed.errors }, { status: 422 });
  }

  // Honeypot tripped: pretend success so bots don't retry, but store nothing.
  if (parsed.isBot) return NextResponse.json({ ok: true });

  const result = await saveSignup(parsed.row);
  if (!result.ok) {
    console.error("[waitlist] save failed:", result.reason);
    return NextResponse.json({ ok: false, error: "storage" }, { status: 503 });
  }

  // Emails go out after the response, so the parent never waits on them
  // and an email failure can't turn a saved sign-up into an error.
  const row = parsed.row;
  after(async () => sendSignupEmails(row, await countSignups()));

  return NextResponse.json({ ok: true });
}
