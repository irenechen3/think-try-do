"use client";

import { SECTION_IDS } from "@/content/site";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";
import { Underline } from "@/components/ui/Doodles";

export function Problem() {
  const { t } = useI18n();
  const p = t.problem;

  return (
    <section id={SECTION_IDS.why} data-section="problem" aria-labelledby="problem-title" className="bg-ink text-paper">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1.1fr_1fr] lg:px-8">
        <Reveal>
          <p className="mb-4 inline-flex items-center gap-2 font-display text-sm font-bold tracking-[0.14em] text-sun uppercase">
            <span className="h-[3px] w-6 rounded-full bg-current" aria-hidden />
            {p.eyebrow}
          </p>
          <h2 id="problem-title" className="text-[2.15rem] leading-[1.04] font-extrabold sm:text-5xl lg:text-[3.4rem]">
            {p.headline}
          </h2>
          <p className="mt-8 max-w-lg font-hand text-[1.9rem] leading-tight text-sun sm:text-[2.3rem]">{p.sideNote}</p>
        </Reveal>

        <Reveal delay={120} className="lg:pt-10">
          <p className="text-2xl font-bold sm:text-3xl">{p.lead}</p>
          <p className="mt-3 text-lg text-paper/75">{p.body}</p>
          <ul className="mt-6 space-y-3">
            {p.abilities.map((a, i) => (
              <li key={a} className="flex items-baseline gap-4 border-b border-paper/15 pb-3 text-lg sm:text-xl">
                <span className="font-display text-sm font-bold text-ember tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-lg text-paper/80 sm:text-xl">
            {p.close}{" "}
            <span className="relative inline-block font-display font-extrabold whitespace-nowrap text-paper">
              {p.closeEmphasis}
              <Underline className="absolute -bottom-2 left-0 h-3 w-full text-ember" delay={400} />
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
