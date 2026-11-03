/**
 * Site-wide facts and editable launch details.
 *
 * Anything that is NOT confirmed yet is `null`. Components check these values
 * and only show them once they are filled in — so adding a venue, dates or
 * contact details later is a one-line change here, never a copy rewrite.
 */

export type Venue = {
  name: string;
  address: string;
  mapUrl?: string;
};

export const SITE = {
  name: "Think Try Do",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  region: "Coronado, Panamá Oeste",
  country: "PA",

  /** Not confirmed yet — leave null until it is. */
  venue: null as Venue | null,
  /** e.g. "Saturday 14 February 2027". Not confirmed yet. */
  firstWorkshopDate: null as string | null,
  /** e.g. "$35 per workshop". Not confirmed yet — do not invent. */
  pricing: null as string | null,

  /** Contact channels. Shown in the footer only when set. */
  contactEmail: null as string | null,
  instagramUrl: null as string | null,
  /** International format without "+", e.g. "50760000000" → wa.me link. */
  whatsappNumber: null as string | null,
} as const;

/* ------------------------------------------------------------------------- */
/* Form option IDs. Stable values that get stored in the database.           */
/* Human labels live in the i18n dictionaries, keyed by these IDs.           */
/* ------------------------------------------------------------------------- */

export const INTEREST_IDS = [
  "woodworking",
  "maker_challenges",
  "problem_solving",
  "outdoor",
  "creative_engineering",
  "mystery",
  "other",
] as const;
export type InterestId = (typeof INTEREST_IDS)[number];

export const DURATION_IDS = ["2h", "2.5h", "3h", "no_preference"] as const;
export type DurationId = (typeof DURATION_IDS)[number];

export const DAY_IDS = [
  "weekday_mornings",
  "weekday_afternoons",
  "saturday",
  "sunday",
  "school_holidays",
] as const;
export type DayId = (typeof DAY_IDS)[number];

export const LANGUAGE_IDS = ["en", "es", "either"] as const;
export type LanguageId = (typeof LANGUAGE_IDS)[number];

export const LOCATION_IDS = ["coronado", "nueva_gorgona", "chame", "san_carlos", "other"] as const;
export type LocationId = (typeof LOCATION_IDS)[number];

/**
 * Child age options. Stored as integers.
 * 3 means "under 4" and 13 means "13 or older".
 */
export const CHILD_AGE_OPTIONS = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] as const;
export const CHILD_AGE_MIN = 3;
export const CHILD_AGE_MAX = 13;
export const MAX_CHILDREN = 6;

export const ADVENTURE_IDS = ["racer", "rescue", "bridge", "mystery"] as const;
export type AdventureId = (typeof ADVENTURE_IDS)[number];

/** Which form interest an adventure card pre-selects when a parent taps "I'd want this". */
export const ADVENTURE_TO_INTEREST: Record<AdventureId, InterestId> = {
  racer: "woodworking",
  rescue: "problem_solving",
  bridge: "creative_engineering",
  mystery: "mystery",
};

/** Section anchors, shared by nav links, CTAs and analytics. */
export const SECTION_IDS = {
  top: "top",
  why: "why",
  how: "how-it-works",
  adventures: "adventures",
  different: "different",
  tools: "real-tools",
  skills: "skills",
  ages: "ages",
  join: "join",
  faq: "faq",
} as const;
