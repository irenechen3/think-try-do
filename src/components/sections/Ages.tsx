"use client";

import { SECTION_IDS } from "@/content/site";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const STYLES = [
  { card: "bg-sun", bar: "w-1/3" },
  { card: "bg-moss-soft", bar: "w-2/3" },
  { card: "bg-ember text-paper", bar: "w-full" },
];

export function Ages() {
  const { t } = useI18n();
  const a = t.ages;

  return (
    <section id={SECTION_IDS.ages} data-section="ages" aria-labelledby="ages-title" className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="ages-title" eyebrow={a.eyebrow} title={a.headline} intro={a.body} />

        <ul className="mt-12 grid gap-5 md:grid-cols-3 md:gap-6">
          {a.groups.map((g, i) => (
            <Reveal as="li" key={g.range} delay={i * 120}>
              <article className={`flex h-full flex-col rounded-[var(--radius-card)] border-[3px] border-ink p-6 shadow-[6px_6px_0_0_var(--color-ink)] sm:p-8 ${STYLES[i].card}`}>
                <p className="font-display text-6xl leading-none font-extrabold tracking-[-0.04em] sm:text-7xl">
                  {g.range}
                  <span className="ml-2 align-middle text-base font-bold tracking-normal opacity-70">{a.yearsLabel}</span>
                </p>
                <h3 className="mt-3 text-2xl font-extrabold">{g.name}</h3>
                {/* challenge-level meter */}
                <div className="mt-4 h-2.5 w-full rounded-full bg-ink/15" aria-hidden>
                  <div className={`h-full rounded-full bg-ink ${STYLES[i].bar}`} />
                </div>
                <ul className="mt-5 space-y-2 text-lg font-medium">
                  {g.points.map((p) => (
                    <li key={p} className="flex gap-2.5">
                      <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-current" />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
