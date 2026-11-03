import { en, type Dictionary } from "./en";
import { es } from "./es";

export const LOCALES = ["en", "es"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

/** To add a language: create xx.ts typed as Dictionary, then register it here. */
export const dictionaries: Record<Locale, Dictionary> = { en, es };

export const LOCALE_LABELS: Record<Locale, { short: string; long: string }> = {
  en: { short: "EN", long: "English" },
  es: { short: "ES", long: "Español" },
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

/** Replace {placeholders} in a string: fmt("Step {n}", { n: 2 }). */
export function fmt(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? `{${key}}`));
}

export type { Dictionary };
