"use client";

import { SECTION_IDS } from "@/content/site";
import { useI18n } from "@/lib/i18n";
import { CtaLink } from "@/components/ui/CtaLink";
import { ArrowRight } from "@/components/ui/Doodles";
import { Reveal } from "@/components/ui/Reveal";

export function FinalCta() {
  const { t } = useI18n();

  return (
    <section data-section="final_cta" aria-labelledby="final-title" className="relative overflow-hidden bg-moss text-paper">
      <div className="bg-grid-light pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 sm:py-28">
        <Reveal>
          <h2 id="final-title" className="text-[2.1rem] leading-[1.05] font-extrabold sm:text-5xl lg:text-6xl">
            {t.final.headline}
          </h2>
        </Reveal>

        <Reveal delay={150} className="mt-10 flex flex-col items-center justify-center gap-1 font-display text-6xl leading-[0.9] font-extrabold tracking-[-0.04em] sm:flex-row sm:gap-4 sm:text-8xl">
          <span>THINK</span>
          <ArrowRight className="hidden h-10 w-20 text-sun sm:block" delay={400} />
          <span>TRY</span>
          <ArrowRight className="hidden h-10 w-20 text-sun sm:block" delay={900} />
          <span className="text-sun">DO</span>
        </Reveal>

        <Reveal delay={250} className="mt-12">
          <CtaLink href={`#${SECTION_IDS.join}`} cta="join" placement="final_cta" variant="light" className="w-full max-w-sm sm:w-auto sm:max-w-none">
            {t.cta.primary}
          </CtaLink>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm font-semibold">
            {t.final.facts.map((fact) => (
              <li key={fact} className="rounded-full border-2 border-paper/40 px-3 py-1">
                {fact}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
