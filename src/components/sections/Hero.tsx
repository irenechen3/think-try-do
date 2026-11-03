"use client";

import { IMAGERY } from "@/content/imagery";
import { SECTION_IDS } from "@/content/site";
import { useI18n } from "@/lib/i18n";
import { CtaLink } from "@/components/ui/CtaLink";
import { PinIcon } from "@/components/ui/Doodles";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { HeroScene } from "@/components/ui/Sketches";

const WORDS = [
  { word: "THINK.", cls: "text-ink", indent: "" },
  { word: "TRY.", cls: "text-ink", indent: "pl-[0.55em]" },
  { word: "GO.", cls: "text-ember", indent: "pl-[1.1em]" },
];

export function Hero() {
  const { t } = useI18n();

  return (
    <section id={SECTION_IDS.top} data-section="hero" className="relative overflow-hidden pt-20 sm:pt-24">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" aria-hidden />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:px-8 lg:pt-6 lg:pb-24">
        <div>
          <p className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-moss px-3.5 py-1.5 text-sm font-semibold text-paper">
            <PinIcon className="h-4 w-4" />
            {t.hero.eyebrow}
          </p>

          {/* The big brand statement (decorative — the h1 below carries the meaning) */}
          <p aria-hidden className="font-display text-[clamp(4.1rem,19vw,8.6rem)] leading-[0.84] font-extrabold tracking-[-0.045em]">
            {WORDS.map((w, i) => (
              <span key={w.word} className={`block animate-rise ${w.cls} ${w.indent}`} style={{ animationDelay: `${120 + i * 220}ms` }}>
                {w.word}
              </span>
            ))}
          </p>

          <h1 className="mt-6 max-w-xl text-[1.75rem] leading-[1.08] font-extrabold sm:text-4xl lg:text-[2.6rem]">
            <span className="sr-only">Think Try Do — </span>
            {t.hero.headline}
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">{t.hero.body}</p>

          <ul className="mt-5 flex flex-wrap gap-2">
            {t.hero.facts.map((f) => (
              <li key={f} className="rounded-full border-2 border-ink/80 px-3 py-1 text-sm font-bold">
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <CtaLink href={`#${SECTION_IDS.join}`} cta="join" placement="hero" className="w-full sm:w-auto">
              {t.cta.primary}
            </CtaLink>
            <CtaLink
              href={`#${SECTION_IDS.adventures}`}
              cta="explore_adventures"
              placement="hero"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              {t.cta.secondary}
            </CtaLink>
          </div>
          <p className="mt-4 max-w-md text-sm text-ink-mute">{t.hero.note}</p>
        </div>

        <div className="draw-now relative">
          <div className="relative rotate-[0.6deg] rounded-[var(--radius-card)] border-[3px] border-ink bg-paper p-3 shadow-[8px_8px_0_0_var(--color-ink)] sm:p-5">
            <div className="bg-grid rounded-[1.1rem]">
              <ImageSlot
                slot={IMAGERY.hero}
                alt={t.hero.imageAlt}
                priority
                className="aspect-[13/11] w-full"
                fallback={<HeroScene notes={t.hero.sketchNotes} className="h-full w-full" />}
              />
            </div>
            <span className="absolute -bottom-4 left-6 rotate-[-3deg] rounded-md bg-sun px-3 py-1 font-display text-sm font-extrabold tracking-wide text-ink shadow-[3px_3px_0_0_var(--color-ink)]">
              {t.hero.facts[0]}
            </span>
          </div>
        </div>
      </div>
      <div className="ruler mx-auto max-w-7xl text-ink" aria-hidden />
    </section>
  );
}
