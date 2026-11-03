"use client";

import { SECTION_IDS } from "@/content/site";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowRight } from "@/components/ui/Doodles";

const CARD_STYLES = [
  { card: "bg-paper text-ink", num: "bg-ink text-paper", sub: "text-ember-deep" },
  { card: "bg-moss text-paper", num: "bg-paper text-moss", sub: "text-sun" },
  { card: "bg-ember text-paper", num: "bg-ink text-paper", sub: "text-ink" },
];

export function HowItWorks() {
  const { t } = useI18n();

  return (
    <section id={SECTION_IDS.how} data-section="how_it_works" aria-labelledby="how-title" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="how-title" eyebrow={t.how.eyebrow} title={t.how.headline} />

        <ol className="mt-12 grid gap-5 md:grid-cols-3 md:gap-8">
          {t.how.steps.map((step, i) => {
            const s = CARD_STYLES[i];
            return (
              <Reveal as="li" key={step.word} delay={i * 140} className="relative">
                <article
                  className={`flex h-full flex-col rounded-[var(--radius-card)] border-[3px] border-ink p-6 shadow-[6px_6px_0_0_var(--color-ink)] transition-transform duration-300 hover:-translate-y-1 sm:p-8 ${s.card}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full font-display text-sm font-extrabold ${s.num}`}>
                      {i + 1}
                    </span>
                    <span className={`text-right font-hand text-2xl leading-none font-bold ${s.sub}`}>{step.sub}</span>
                  </div>
                  <h3 className="mt-6 text-6xl leading-none font-extrabold tracking-[-0.04em] sm:text-7xl">{step.word}</h3>
                  <ul className="mt-6 space-y-1.5 text-lg leading-snug font-medium">
                    {step.lines.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </article>
                {i < 2 ? (
                  <ArrowRight
                    className="absolute top-1/2 -right-10 z-10 hidden h-8 w-14 -translate-y-1/2 text-ember md:block"
                    delay={300 + i * 300}
                  />
                ) : null}
              </Reveal>
            );
          })}
        </ol>

        <Reveal className="mt-14 text-center">
          <p className="font-display text-4xl font-extrabold tracking-tight sm:text-6xl">{t.how.quote}</p>
          <p className="mt-3 font-hand text-2xl text-ink-soft">{t.how.quoteNote}</p>
        </Reveal>
      </div>
    </section>
  );
}
