"use client";

import { IMAGERY } from "@/content/imagery";
import { SECTION_IDS } from "@/content/site";
import { useI18n } from "@/lib/i18n";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Reveal } from "@/components/ui/Reveal";
import { ToolsSketch } from "@/components/ui/Sketches";

export function RealTools() {
  const { t } = useI18n();
  const r = t.tools;

  return (
    <section id={SECTION_IDS.tools} data-section="real_tools" aria-labelledby="tools-title" className="relative overflow-hidden bg-ink text-paper">
      <div className="bg-grid-light pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <p className="mb-4 font-display text-sm font-bold tracking-[0.14em] text-sun uppercase">{r.eyebrow}</p>
          <h2 id="tools-title" className="text-[2.15rem] leading-[1.04] font-extrabold sm:text-5xl">
            {r.headline}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-paper/80 sm:text-xl">{r.body}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {r.materials.map((m) => (
              <li key={m} className="rounded-full border-2 border-paper/25 px-3 py-1.5 text-sm font-semibold">
                {m}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <div className="rotate-[-1deg] rounded-[var(--radius-card)] border-[3px] border-paper/90 bg-paper/5 p-3">
            <ImageSlot
              slot={IMAGERY.tools}
              alt={r.materials.join(", ")}
              className="aspect-[21/16] w-full"
              fallback={<ToolsSketch notes={t.sketches.tools} className="h-full w-full" />}
            />
          </div>
        </Reveal>

        <Reveal className="lg:col-span-2">
          <h3 className="font-display text-xl font-extrabold">{r.safetyTitle}</h3>
          <ul className="mt-5 grid gap-4 sm:grid-cols-3">
            {r.safety.map((s, i) => (
              <li key={s.title} className="rounded-2xl bg-paper/[0.07] p-5 ring-1 ring-paper/15">
                <span className="font-display text-sm font-extrabold text-ember">0{i + 1}</span>
                <p className="mt-1 font-display text-xl font-extrabold">{s.title}</p>
                <p className="mt-1.5 text-paper/75">{s.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-paper/60">{r.footnote}</p>
        </Reveal>
      </div>
    </section>
  );
}
