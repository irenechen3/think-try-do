import "server-only";
import { dictionaries, fmt, type Dictionary } from "@/content/i18n";
import { SITE } from "@/content/site";
import type { WaitlistRow } from "@/lib/waitlist";

/**
 * Sign-up emails, sent through Resend's HTTP API (no SDK dependency).
 *
 * - Parent confirmation, in the language they were viewing the site in.
 * - Team alert to NOTIFY_EMAIL with the family's answers.
 *
 * Both are skipped quietly when RESEND_API_KEY is not set, and a failure
 * never affects the sign-up itself (it is already saved by then).
 */

const FROM = process.env.EMAIL_FROM || "Think Try Go <hello@thinktrygo.com>";

type Email = { to: string; subject: string; html: string; text: string; replyTo?: string };

async function send(email: Email): Promise<void> {
  // Strip whitespace or quotes accidentally pasted into the Vercel setting.
  const key = process.env.RESEND_API_KEY?.trim().replace(/^["']|["']$/g, "");
  if (!key) {
    console.info(`[email] RESEND_API_KEY not set — skipped "${email.subject}"`);
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: [email.to],
      subject: email.subject,
      html: email.html,
      text: email.text,
      ...(email.replyTo ? { reply_to: email.replyTo } : {}),
    }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}: ${(await res.text()).slice(0, 300)}`);
}

export async function sendSignupEmails(row: WaitlistRow, signupNumber: number | null): Promise<void> {
  const results = await Promise.allSettled([sendConfirmation(row), sendTeamAlert(row, signupNumber)]);
  for (const r of results) {
    if (r.status === "rejected") console.error("[email] send failed:", (r.reason as Error).message);
  }
}

/* ------------------------------------------------------------------------- */
/* Formatting helpers                                                        */
/* ------------------------------------------------------------------------- */

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const SITE_HOST = SITE.url.replace(/^https?:\/\//, "");

function formatAges(ages: number[], t: Dictionary): string {
  return [...ages]
    .sort((a, b) => a - b)
    .map((a) => (a <= 3 ? t.form.ageUnder4 : a >= 13 ? t.form.age13plus : String(a)))
    .join(", ");
}

function answers(row: WaitlistRow, t: Dictionary): [string, string][] {
  const o = t.form.options;
  const interests = row.interests.map((i) => o.interests[i]);
  if (row.interest_other) interests.push(`“${row.interest_other}”`);
  return [
    [t.email.labels.ages, formatAges(row.child_ages, t)],
    [t.email.labels.interests, interests.join(", ")],
    [t.email.labels.days, row.preferred_days.map((d) => o.days[d]).join(", ")],
    [t.email.labels.duration, o.durations[row.duration]],
    [t.email.labels.language, o.languages[row.language]],
    [t.email.labels.area, row.location_other || o.locations[row.location]],
  ];
}

/** Brand-styled wrapper. Inline styles only — email clients ignore <style>. */
function layout(preheader: string, inner: string): string {
  return `<!doctype html><html><body style="margin:0;background:#f3ecdf;font-family:Arial,Helvetica,sans-serif;color:#1c1b18">
<span style="display:none;max-height:0;overflow:hidden">${esc(preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3ecdf;padding:24px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fbf7f0;border:3px solid #1c1b18;border-radius:20px">
<tr><td style="padding:28px 28px 8px;font-weight:900;font-size:22px;line-height:0.95;letter-spacing:-0.5px">THINK<br>&nbsp;TRY<br>&nbsp;&nbsp;<span style="color:#e2582b">GO</span></td></tr>
<tr><td style="padding:12px 28px 28px;font-size:16px;line-height:1.55">${inner}</td></tr>
</table></td></tr></table></body></html>`;
}

function summaryTable(rows: [string, string][]): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;margin:8px 0 20px;border-collapse:collapse">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px 8px 0;border-bottom:1px solid #e8dcc6;color:#6f685d;font-size:14px;white-space:nowrap;vertical-align:top">${esc(k)}</td><td style="padding:8px 0;border-bottom:1px solid #e8dcc6;font-weight:bold">${esc(v)}</td></tr>`,
    )
    .join("")}</table>`;
}

/* ------------------------------------------------------------------------- */
/* Parent confirmation                                                       */
/* ------------------------------------------------------------------------- */

async function sendConfirmation(row: WaitlistRow): Promise<void> {
  const t = dictionaries[row.ui_locale];
  const e = t.email;
  const rows = answers(row, t);
  const greeting = fmt(e.greeting, { name: row.parent_first_name });
  const share = fmt(e.share, { url: SITE_HOST });
  const footer = fmt(e.footer, { url: SITE_HOST });

  const html = layout(
    e.preheader,
    `<h1 style="margin:0 0 16px;font-size:30px;line-height:1.1">${esc(e.heading)}</h1>
<p style="margin:0 0 8px;font-weight:bold">${esc(greeting)}</p>
<p style="margin:0 0 20px">${esc(e.body)}</p>
<p style="margin:0;font-weight:bold">${esc(e.summaryTitle)}</p>
${summaryTable(rows)}
<p style="margin:0 0 20px;padding:12px 14px;background:#f7d6c6;border-radius:12px;font-size:14px">${esc(e.notBooking)}</p>
<p style="margin:0 0 20px"><a href="${SITE.url}" style="color:#b8421b;font-weight:bold">${esc(share)}</a></p>
<p style="margin:0 0 24px;white-space:pre-line">${esc(e.signoff)}</p>
<p style="margin:0;color:#6f685d;font-size:12px">${esc(footer)}</p>`,
  );

  const text = [
    e.heading,
    "",
    greeting,
    e.body,
    "",
    `${e.summaryTitle}:`,
    ...rows.map(([k, v]) => `- ${k}: ${v}`),
    "",
    e.notBooking,
    "",
    `${share}: ${SITE.url}`,
    "",
    e.signoff,
    "",
    footer,
  ].join("\n");

  await send({
    to: row.email,
    subject: e.subject,
    html,
    text,
    replyTo: process.env.EMAIL_REPLY_TO || process.env.NOTIFY_EMAIL || undefined,
  });
}

/* ------------------------------------------------------------------------- */
/* Team alert                                                                */
/* ------------------------------------------------------------------------- */

async function sendTeamAlert(row: WaitlistRow, signupNumber: number | null): Promise<void> {
  const to = process.env.NOTIFY_EMAIL;
  if (!to) {
    console.info("[email] NOTIFY_EMAIL not set — skipped team alert");
    return;
  }
  const t = dictionaries.en;
  const ages = formatAges(row.child_ages, t);
  const area = row.location_other || t.form.options.locations[row.location];
  const subject = `New Founding Family${signupNumber ? ` #${signupNumber}` : ""}: ${row.parent_first_name} (kids ${ages}) · ${area}`;

  const rows: [string, string][] = [
    ["Name", row.parent_first_name],
    ["Email", row.email],
    ["WhatsApp", row.whatsapp ?? "—"],
    ...answers(row, t),
    ["Would LOVE to try", row.love_to_try ?? "—"],
    ["Site language", row.ui_locale === "es" ? "Spanish" : "English"],
    ["Came from", [row.utm_source, row.utm_campaign].filter(Boolean).join(" / ") || row.referrer || "direct"],
  ];

  const html = layout(
    subject,
    `<h1 style="margin:0 0 12px;font-size:24px;line-height:1.15">New sign-up${signupNumber ? ` — that's #${signupNumber}!` : "!"}</h1>
${summaryTable(rows)}
<p style="margin:0;color:#6f685d;font-size:13px">Reply to this email to write to ${esc(row.parent_first_name)} directly. All sign-ups are in Supabase → Table Editor → waitlist_signups.</p>`,
  );
  const text = [`New sign-up${signupNumber ? ` #${signupNumber}` : ""}`, "", ...rows.map(([k, v]) => `${k}: ${v}`)].join("\n");

  await send({ to, subject, html, text, replyTo: row.email });
}
