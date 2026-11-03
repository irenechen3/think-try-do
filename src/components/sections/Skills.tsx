"use client";

import { SECTION_IDS } from "@/content/site";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CircleScribble } from "@/components/ui/Doodles";

// Small rotations + colour rotation give the chips a pinned-to-the-wall feel.
const CHIP_STYLES = [
  "bg-paper -rotate-2",
  "bg-ember text-paper rotate-1",
  "bg-moss-soft rotate-2",
  "bg-sun -rotate-1",
  "bg-paper rotate-1",
  "bg-moss text-paper -rotate-2",
  "bg-ember-soft rotate-2",
  "bg-paper -rotate-1",
  "bg-sun rotate-1",
  "bg-ink text-paper -rotate-2",
];

export function Skills() {
  const { t } = useI18n();
  const s = t.skills;

  return (
    <section id={SECTION_IDS.skills} data-section="skills" aria-labelledby="skills-title" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="skills-title" eyebrow={s.eyebrow} title={s.headline} align="center" />

        <Reveal as="ul" className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-3 sm:gap-4">
          {s.chips.map((chip, i) => (
            <li
              key={chip}
              className={`rounded-2xl border-[3px] border-ink px-4 py-2.5 font-display text-lg font-extrabold shadow-[3px_3px_0_0_var(--color-ink)] transition-transform hover:rotate-0 sm:px-5 sm:text-2xl ${CHIP_STYLES[i % CHIP_STYLES.length]}`}
            >
              {chip}
            </li>
          ))}
        </Reveal>

        <Reveal className="mt-14 text-center">
          <p className="text-xl text-ink-soft sm:text-2xl">{s.line1}</p>
          <p className="relative mx-auto mt-1 inline-block px-6 py-3 font-display text-3xl font-extrabold sm:text-5xl">
            {s.line2}
            <CircleScribble className="absolute inset-0 h-full w-full text-ember" delay={200} />
          </p>
        </Reveal>
      </div>
    </section>
  );
}
