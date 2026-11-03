"use client";

import { useEffect, useState } from "react";
import { SECTION_IDS } from "@/content/site";
import { useI18n } from "@/lib/i18n";
import { track } from "@/lib/analytics";

/**
 * Mobile-only bottom CTA. Appears once the hero is out of view and hides
 * while the signup section is on screen, so it never covers the form.
 */
export function StickyCta() {
  const { t } = useI18n();
  const [pastHero, setPastHero] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById(SECTION_IDS.top);
    const join = document.getElementById(SECTION_IDS.join);
    if (!hero || !join || !("IntersectionObserver" in window)) return;
    const heroIo = new IntersectionObserver(([e]) => setPastHero(!e.isIntersecting), { threshold: 0 });
    const joinIo = new IntersectionObserver(([e]) => setFormVisible(e.isIntersecting), { threshold: 0 });
    heroIo.observe(hero);
    joinIo.observe(join);
    return () => {
      heroIo.disconnect();
      joinIo.disconnect();
    };
  }, []);

  const show = pastHero && !formVisible;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-300 sm:hidden ${
        show ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
      aria-hidden={!show}
    >
      <a
        href={`#${SECTION_IDS.join}`}
        tabIndex={show ? 0 : -1}
        onClick={() => track("cta_click", { cta: "join", placement: "sticky_mobile" })}
        className="flex min-h-14 items-center justify-between rounded-full border-[3px] border-ink bg-ember pr-2 pl-6 font-display text-lg font-bold text-paper shadow-[0_6px_0_0_var(--color-ink)]"
      >
        {t.cta.sticky}
        <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-xl" aria-hidden>
          →
        </span>
      </a>
    </div>
  );
}
