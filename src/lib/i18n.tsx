"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { DEFAULT_LOCALE, dictionaries, isLocale, type Dictionary, type Locale } from "@/content/i18n";
import { track } from "@/lib/analytics";

const STORAGE_KEY = "ttd-locale";

type I18nValue = { locale: Locale; t: Dictionary; setLocale: (l: Locale) => void };

const I18nContext = createContext<I18nValue | null>(null);

/**
 * Client-side language switching. The server always renders English (best for
 * SEO and the first paint); the visitor's choice is restored after hydration.
 * Ad links can force Spanish with ?lang=es.
 */
export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    let initial: Locale | null = null;
    const fromUrl = new URLSearchParams(window.location.search).get("lang");
    if (isLocale(fromUrl)) initial = fromUrl;
    if (!initial) {
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (isLocale(saved)) initial = saved;
      } catch {
        /* storage unavailable */
      }
    }
    if (initial && initial !== DEFAULT_LOCALE) setLocaleState(initial);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    track("language_change", { language: next });
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable */
    }
  }, []);

  const value = useMemo(() => ({ locale, t: dictionaries[locale], setLocale }), [locale, setLocale]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}
