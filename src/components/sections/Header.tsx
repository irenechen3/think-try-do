"use client";

import { useEffect, useState } from "react";
import { LOCALES, LOCALE_LABELS } from "@/content/i18n";
import { SECTION_IDS } from "@/content/site";
import { useI18n } from "@/lib/i18n";
import { track } from "@/lib/analytics";
import { LogoMark } from "@/components/ui/Wordmark";

export function Header() {
  const { t, locale, setLocale } = useI18n();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: `#${SECTION_IDS.how}`, label: t.nav.how },
    { href: `#${SECTION_IDS.adventures}`, label: t.nav.adventures },
    { href: `#${SECTION_IDS.ages}`, label: t.nav.ages },
    { href: `#${SECTION_IDS.faq}`, label: t.nav.faq },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        scrolled ? "bg-sand/90 shadow-[0_1px_0_rgb(28_27_24/0.1)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        {t.nav.skip}
      </a>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:h-[4.5rem] sm:px-6 lg:px-8">
        <a href={`#${SECTION_IDS.top}`} className="flex items-center gap-2.5" aria-label="Think Try Go — home">
          <LogoMark className="h-10 w-12" />
          <span className="hidden font-display text-lg font-extrabold tracking-tight min-[420px]:inline">Think Try Go</span>
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="rounded-full px-4 py-2 font-medium text-ink-soft transition hover:bg-ink/5 hover:text-ink">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div role="group" aria-label={t.nav.languageLabel} className="flex rounded-full bg-ink/[0.07] p-1 text-sm font-bold">
            {LOCALES.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLocale(l)}
                aria-pressed={locale === l}
                lang={l}
                title={LOCALE_LABELS[l].long}
                className={`min-h-9 min-w-10 rounded-full px-2.5 transition ${
                  locale === l ? "bg-ink text-paper" : "text-ink-soft hover:text-ink"
                }`}
              >
                {LOCALE_LABELS[l].short}
              </button>
            ))}
          </div>
          <a
            href={`#${SECTION_IDS.join}`}
            onClick={() => track("cta_click", { cta: "join", placement: "header" })}
            className="inline-flex min-h-11 items-center rounded-full bg-ember px-4 font-display text-sm font-bold whitespace-nowrap text-paper transition hover:bg-ember-deep sm:px-5"
          >
            {t.nav.join}
          </a>
        </div>
      </div>
    </header>
  );
}
