"use client";

import { SECTION_IDS } from "@/content/site";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckIcon, CrossIcon } from "@/components/ui/Doodles";

export function Different() {
  const { t } = useI18n();
  const d = t.different;

  return (
    <section id={SECTION_IDS.different} data-section="different" aria-labelledby="different-title" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="different-title" eyebrow={d.eyebrow} title={d.headline} />

        <div className="mt-12 grid gap-5 md:grid-cols-[1fr_1.35fr]">
          <Reveal className="rounded-[var(--radius-card)] border-[3px] border-ink/25 bg-sand-deep/50 p-6 sm:p-8">
            <p className="font-display text-sm font-extrabold tracking-[0.14em] text-ink-mute uppercase">{d.notLabel}</p>
            <ul className="mt-5 space-y-3">
              {d.not.map((x) => (
                <li key={x} className="flex items-center gap-3 text-xl font-semibold text-ink-mute line-through decoration-ember/70 decoration-[3px]">
                  <CrossIcon className="h-5 w-5 shrink-0 text-ink-mute" />
                  {x}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={140} className="rounded-[var(--radius-card)] border-[3px] border-ink bg-moss p-6 text-paper shadow-[6px_6px_0_0_var(--color-ink)] sm:p-8">
            <p className="font-display text-sm font-extrabold tracking-[0.14em] text-sun uppercase">{d.insteadLabel}</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3">
              {d.instead.map((x) => (
                <li key={x} className="flex items-center gap-3 font-display text-2xl font-extrabold sm:text-3xl">
                  <CheckIcon className="h-6 w-6 shrink-0 text-sun" />
                  {x}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="mt-6 grid gap-5 md:grid-cols-2">
          <figure className="rounded-[var(--radius-card)] bg-paper p-6 sm:p-7">
            <figcaption className="text-xs font-bold tracking-[0.12em] text-ink-mute uppercase">{d.exampleWeakLabel}</figcaption>
            <blockquote className="mt-2 text-xl font-semibold text-ink-mute">{d.exampleWeak}</blockquote>
          </figure>
          <figure className="rounded-[var(--radius-card)] border-[3px] border-ember bg-paper p-6 sm:p-7">
            <figcaption className="text-xs font-bold tracking-[0.12em] text-ember-deep uppercase">{d.exampleStrongLabel}</figcaption>
            <blockquote className="mt-2 text-xl font-bold">{d.exampleStrong}</blockquote>
          </figure>
        </Reveal>

        <Reveal className="mt-12 max-w-3xl">
          <p className="text-xl leading-relaxed text-ink-soft sm:text-2xl">{d.body}</p>
          <p className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">{d.bodyEmphasis}</p>
        </Reveal>
      </div>
    </section>
  );
}
