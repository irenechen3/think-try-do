"use client";

import { SECTION_IDS } from "@/content/site";
import { useI18n } from "@/lib/i18n";
import { WaitlistForm } from "@/components/form/WaitlistForm";
import { CheckIcon, PinIcon } from "@/components/ui/Doodles";
import { Reveal } from "@/components/ui/Reveal";

export function Founding() {
  const { t } = useI18n();
  const f = t.founding;

  return (
    <section id={SECTION_IDS.join} data-section="founding_families" aria-labelledby="join-title" className="relative overflow-hidden bg-ember text-paper">
      <div className="bg-grid-light pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:px-8">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <p className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-1.5 text-sm font-semibold">
            <PinIcon className="h-4 w-4 text-sun" />
            {f.eyebrow}
          </p>
          <h2 id="join-title" className="text-[2.3rem] leading-[1.02] font-extrabold sm:text-5xl lg:text-[3.6rem]">
            {f.headline}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-paper/90 sm:text-xl">{f.body}</p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div>
              <p className="font-display font-extrabold">{f.tellUsTitle}</p>
              <ul className="mt-3 space-y-2">
                {f.tellUs.map((x) => (
                  <li key={x} className="flex gap-2.5">
                    <span aria-hidden className="mt-[0.55em] h-2 w-2 shrink-0 rotate-45 bg-sun" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-display font-extrabold">{f.perksTitle}</p>
              <ul className="mt-3 space-y-2">
                {f.perks.map((x) => (
                  <li key={x} className="flex gap-2.5">
                    <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-sun" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-8 inline-block rounded-xl bg-ink/25 px-4 py-3 text-sm font-semibold">{f.honesty}</p>
        </Reveal>

        <div>
          <WaitlistForm />
        </div>
      </div>
    </section>
  );
}
