/**
 * Waitlist data shape + validation, shared by the browser form and the API route
 * so both sides enforce exactly the same rules.
 */

import {
  CHILD_AGE_MAX,
  CHILD_AGE_MIN,
  DAY_IDS,
  DURATION_IDS,
  INTEREST_IDS,
  LANGUAGE_IDS,
  LOCATION_IDS,
  MAX_CHILDREN,
  type DayId,
  type DurationId,
  type InterestId,
  type LanguageId,
  type LocationId,
} from "@/content/site";
import type { Dictionary, Locale } from "@/content/i18n";
import type { Attribution } from "@/lib/analytics";

export type WaitlistInput = {
  childAges: (number | null)[];
  location: LocationId | "";
  locationOther: string;
  interests: InterestId[];
  interestOther: string;
  duration: DurationId | "";
  days: DayId[];
  language: LanguageId | "";
  firstName: string;
  email: string;
  whatsapp: string;
  loveToTry: string;
  consent: boolean;
  /** Honeypot: real people never fill this in. */
  website: string;
  uiLocale: Locale;
  attribution: Attribution;
};

export type ErrorKey = keyof Dictionary["form"]["errors"];
export type FieldName = keyof WaitlistInput;
export type FieldErrors = Partial<Record<FieldName, ErrorKey>>;

export const EMPTY_INPUT: WaitlistInput = {
  childAges: [null],
  location: "",
  locationOther: "",
  interests: [],
  interestOther: "",
  duration: "",
  days: [],
  language: "",
  firstName: "",
  email: "",
  whatsapp: "",
  loveToTry: "",
  consent: false,
  website: "",
  uiLocale: "en",
  attribution: {},
};

/** Fields validated at each form step (0-based). */
export const STEP_FIELDS: FieldName[][] = [
  ["childAges", "location", "locationOther"],
  ["interests", "duration", "days", "language"],
  ["firstName", "email", "whatsapp", "consent"],
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidWhatsapp(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return true; // optional
  if (!/^\+?[\d\s().-]+$/.test(trimmed)) return false;
  const digits = trimmed.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

function validateField(field: FieldName, d: WaitlistInput): ErrorKey | undefined {
  switch (field) {
    case "childAges":
      return d.childAges.some((a) => a !== null) ? undefined : "children";
    case "location":
      return d.location ? undefined : "location";
    case "locationOther":
      return d.location === "other" && !d.locationOther.trim() ? "locationOther" : undefined;
    case "interests":
      return d.interests.length ? undefined : "interests";
    case "duration":
      return d.duration ? undefined : "duration";
    case "days":
      return d.days.length ? undefined : "days";
    case "language":
      return d.language ? undefined : "language";
    case "firstName":
      return d.firstName.trim() ? undefined : "name";
    case "email":
      return EMAIL_RE.test(d.email.trim()) ? undefined : "email";
    case "whatsapp":
      return isValidWhatsapp(d.whatsapp) ? undefined : "whatsapp";
    case "consent":
      return d.consent ? undefined : "consent";
    default:
      return undefined;
  }
}

export function validateFields(fields: FieldName[], d: WaitlistInput): FieldErrors {
  const errors: FieldErrors = {};
  for (const f of fields) {
    const e = validateField(f, d);
    if (e) errors[f] = e;
  }
  return errors;
}

export function validateAll(d: WaitlistInput): FieldErrors {
  return validateFields(STEP_FIELDS.flat(), d);
}

/* ------------------------------------------------------------------------- */
/* Server-side normalisation of untrusted JSON into a database row.          */
/* ------------------------------------------------------------------------- */

export type WaitlistRow = {
  parent_first_name: string;
  email: string;
  whatsapp: string | null;
  child_ages: number[];
  child_count: number;
  location: LocationId;
  location_other: string | null;
  interests: InterestId[];
  interest_other: string | null;
  duration: DurationId;
  preferred_days: DayId[];
  language: LanguageId;
  love_to_try: string | null;
  consent: boolean;
  ui_locale: Locale;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  referrer: string | null;
};

const str = (v: unknown, max: number): string => (typeof v === "string" ? v.trim().slice(0, max) : "");
const opt = (v: unknown, max: number): string | null => str(v, max) || null;
const pick = <T extends string>(v: unknown, allowed: readonly T[]): T | "" =>
  typeof v === "string" && (allowed as readonly string[]).includes(v) ? (v as T) : "";
const pickMany = <T extends string>(v: unknown, allowed: readonly T[]): T[] =>
  Array.isArray(v) ? Array.from(new Set(v.filter((x): x is T => (allowed as readonly string[]).includes(x)))) : [];

export function parseSubmission(
  body: unknown,
): { ok: true; row: WaitlistRow; isBot: boolean } | { ok: false; errors: FieldErrors } {
  const b = (body ?? {}) as Record<string, unknown>;
  const attr = (b.attribution ?? {}) as Record<string, unknown>;

  const childAges = (Array.isArray(b.childAges) ? b.childAges : [])
    .map((a) => (typeof a === "number" && Number.isInteger(a) && a >= CHILD_AGE_MIN && a <= CHILD_AGE_MAX ? a : null))
    .slice(0, MAX_CHILDREN);

  const input: WaitlistInput = {
    childAges,
    location: pick(b.location, LOCATION_IDS),
    locationOther: str(b.locationOther, 80),
    interests: pickMany(b.interests, INTEREST_IDS),
    interestOther: str(b.interestOther, 200),
    duration: pick(b.duration, DURATION_IDS),
    days: pickMany(b.days, DAY_IDS),
    language: pick(b.language, LANGUAGE_IDS),
    firstName: str(b.firstName, 60),
    email: str(b.email, 200).toLowerCase(),
    whatsapp: str(b.whatsapp, 30),
    loveToTry: str(b.loveToTry, 1000),
    consent: b.consent === true,
    website: str(b.website, 200),
    uiLocale: b.uiLocale === "es" ? "es" : "en",
    attribution: {},
  };

  const errors = validateAll(input);
  if (Object.keys(errors).length) return { ok: false, errors };

  const ages = input.childAges.filter((a): a is number => a !== null);
  return {
    ok: true,
    isBot: input.website.length > 0,
    row: {
      parent_first_name: input.firstName,
      email: input.email,
      whatsapp: input.whatsapp || null,
      child_ages: ages,
      child_count: ages.length,
      location: input.location as LocationId,
      location_other: input.location === "other" ? input.locationOther || null : null,
      interests: input.interests,
      interest_other: input.interests.includes("other") ? input.interestOther || null : null,
      duration: input.duration as DurationId,
      preferred_days: input.days,
      language: input.language as LanguageId,
      love_to_try: input.loveToTry || null,
      consent: input.consent,
      ui_locale: input.uiLocale,
      utm_source: opt(attr.utm_source, 100),
      utm_medium: opt(attr.utm_medium, 100),
      utm_campaign: opt(attr.utm_campaign, 100),
      utm_content: opt(attr.utm_content, 100),
      referrer: opt(attr.referrer, 200),
    },
  };
}
