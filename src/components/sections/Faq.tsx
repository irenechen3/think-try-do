"use client";

import { SECTION_IDS } from "@/content/site";
import { useI18n } from "@/lib/i18n";
import { track } from "@/lib/analytics";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlusIcon } from "@/components/ui/Doodles";

export function Faq() {
  const { t } = useI18n();

  return (
    <section id={SECTION_IDS.faq} data-section="faq" aria-labelledby="faq-title" className="py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <SectionHeading id="faq-title" eyebrow={t.faq.eyebrow} title={t.faq.headline} />

        <div className="divide-y-2 divide-ink/10 border-y-2 border-ink/10">
          {t.faq.items.map((item, i) => (
            <details
              key={item.q}
              className="group"
              onToggle={(e) => {
                if ((e.currentTarget as HTMLDetailsElement).open) track("faq_open", { question_index: i + 1 });
              }}
            >
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-lg font-extrabold transition hover:text-ember-deep sm:text-xl [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-ink transition-transform duration-300 group-open:rotate-45 group-open:bg-ink group-open:text-paper">
                  <PlusIcon className="h-4 w-4" />
                </span>
              </summary>
              <p className="max-w-2xl pb-6 text-lg leading-relaxed text-ink-soft">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
