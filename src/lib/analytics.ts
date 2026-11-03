/**
 * GA4-compatible event hooks.
 *
 * - If NEXT_PUBLIC_GA_ID is set, gtag.js is loaded in layout.tsx and events go to GA4.
 * - Otherwise events are pushed to window.dataLayer (harmless; ready for GTM) and
 *   logged to the console in development.
 * - Never send personal data (names, emails, phone numbers, free text) as params.
 */

export type AnalyticsEventName =
  | "landing_view"
  | "cta_click"
  | "section_view"
  | "workshop_view"
  | "workshop_interest_click"
  | "form_start"
  | "form_step_complete"
  | "form_validation_error"
  | "form_complete"
  | "form_submit_error"
  | "faq_open"
  | "language_change"
  | "share_click";

export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

type GtagWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

export function track(name: AnalyticsEventName, params: AnalyticsParams = {}): void {
  if (typeof window === "undefined") return;
  const w = window as GtagWindow;
  const clean = Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined));

  if (typeof w.gtag === "function") {
    w.gtag("event", name, clean);
  } else {
    w.dataLayer = w.dataLayer ?? [];
    w.dataLayer.push({ event: name, ...clean });
  }

  if (process.env.NODE_ENV !== "production") {
    console.debug("[analytics]", name, clean);
  }
}

/** Marketing attribution captured on landing so ad campaigns can be compared. */
export type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  referrer?: string;
};

const ATTR_KEY = "ttd-attribution";

export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    if (window.sessionStorage.getItem(ATTR_KEY)) return;
    const q = new URLSearchParams(window.location.search);
    const attr: Attribution = {
      utm_source: q.get("utm_source") ?? undefined,
      utm_medium: q.get("utm_medium") ?? undefined,
      utm_campaign: q.get("utm_campaign") ?? undefined,
      utm_content: q.get("utm_content") ?? undefined,
      referrer: document.referrer ? new URL(document.referrer).hostname : undefined,
    };
    window.sessionStorage.setItem(ATTR_KEY, JSON.stringify(attr));
  } catch {
    /* storage unavailable */
  }
}

export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.sessionStorage.getItem(ATTR_KEY) ?? "{}") as Attribution;
  } catch {
    return {};
  }
}
