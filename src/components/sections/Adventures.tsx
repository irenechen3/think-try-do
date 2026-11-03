"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { IMAGERY } from "@/content/imagery";
import { ADVENTURE_IDS, ADVENTURE_TO_INTEREST, SECTION_IDS, type AdventureId } from "@/content/site";
import { useI18n } from "@/lib/i18n";
import { track } from "@/lib/analytics";
import { prefillInterest } from "@/lib/prefill";
import { CtaLink } from "@/components/ui/CtaLink";
import { CheckIcon, PlusIcon } from "@/components/ui/Doodles";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BridgeSketch, MysterySketch, RacerSketch, RescueSketch } from "@/components/ui/Sketches";

const VISUALS: Record<AdventureId, { bg: string; tag: string; sketch: (notes: string[]) => ReactNode }> = {
  racer: { bg: "bg-ember-soft", tag: "bg-ember text-paper", sketch: (n) => <RacerSketch notes={n} className="h-full w-full" /> },
  rescue: { bg: "bg-moss-soft", tag: "bg-moss text-paper", sketch: (n) => <RescueSketch notes={n} className="h-full w-full" /> },
  bridge: { bg: "bg-[#f6e3b4]", tag: "bg-sun text-ink", sketch: (n) => <BridgeSketch notes={n} className="h-full w-full" /> },
  mystery: { bg: "bg-sand-deep", tag: "bg-ink text-paper", sketch: (n) => <MysterySketch notes={n} className="h-full w-full" /> },
};

export function Adventures() {
  const { t } = useI18n();
  const a = t.adventures;
  const [picked, setPicked] = useState<Set<AdventureId>>(new Set());

  const toggle = (id: AdventureId) => {
    const next = new Set(picked);
    const selected = !next.has(id);
    if (selected) next.add(id);
    else next.delete(id);
    setPicked(next);
    prefillInterest(ADVENTURE_TO_INTEREST[id], selected);
    track("workshop_interest_click", { adventure: id, interest: ADVENTURE_TO_INTEREST[id], selected });
  };

  return (
    <section id={SECTION_IDS.adventures} data-section="adventures" aria-labelledby="adventures-title" className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="adventures-title" eyebrow={a.eyebrow} title={a.headline} intro={a.body} />

        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:gap-8">
          {ADVENTURE_IDS.map((id, i) => (
            <Reveal as="li" key={id} delay={(i % 2) * 120}>
              <AdventureCard id={id} picked={picked.has(id)} onToggle={() => toggle(id)} />
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-12 flex flex-col gap-6 rounded-[var(--radius-card)] border-[3px] border-dashed border-ink/40 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="font-display text-xl font-extrabold">{a.moreTitle}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {a.more.map((m) => (
                <li key={m} className="rounded-full bg-sand px-3 py-1.5 text-sm font-semibold text-ink-soft">
                  {m}
                </li>
              ))}
            </ul>
          </div>
          <div className="shrink-0 lg:text-right">
            <p className="font-hand text-[1.7rem] leading-tight font-bold text-ember-deep">{a.voteCta}</p>
            <CtaLink href={`#${SECTION_IDS.join}`} cta="vote_first_adventure" placement="adventures" className="mt-3 w-full sm:w-auto">
              {a.voteCtaButton} →
            </CtaLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function AdventureCard({ id, picked, onToggle }: { id: AdventureId; picked: boolean; onToggle: () => void }) {
  const { t } = useI18n();
  const item = t.adventures.items[id];
  const v = VISUALS[id];
  const ref = useRef<HTMLElement>(null);

  // Fire "workshop_view" once when at least half the card has been seen.
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          track("workshop_view", { adventure: id });
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [id]);

  return (
    <article
      ref={ref}
      className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border-[3px] border-ink bg-paper shadow-[6px_6px_0_0_var(--color-ink)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[8px_10px_0_0_var(--color-ink)]"
    >
      <div className={`relative border-b-[3px] border-ink ${v.bg}`}>
        <ImageSlot
          slot={IMAGERY[id]}
          alt={item.imageAlt}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="aspect-[10/7] w-full"
          fallback={<div className="h-full w-full p-4 transition-transform duration-500 group-hover:scale-[1.02]">{v.sketch(t.sketches[id])}</div>}
        />
        <span className={`absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-bold tracking-wide uppercase ${v.tag}`}>{item.family}</span>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="text-2xl leading-tight font-extrabold sm:text-[1.9rem]">{item.title}</h3>
        <p className="mt-2 font-hand text-2xl font-bold text-ember-deep">{item.tagline}</p>
        <p className="mt-3 text-[1.05rem] leading-relaxed text-ink-soft">{item.body}</p>

        <div className="mt-5">
          <p className="text-xs font-bold tracking-[0.12em] text-ink-mute uppercase">{t.adventures.skillsLabel}</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {item.skills.map((s) => (
              <li key={s} className="rounded-full border-2 border-ink/15 px-2.5 py-1 text-sm font-semibold">
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto pt-6">
          <button
            type="button"
            onClick={onToggle}
            aria-pressed={picked}
            className={`inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-5 font-display font-bold transition sm:w-auto ${
              picked ? "bg-moss text-paper" : "bg-ink/[0.06] text-ink ring-2 ring-ink/80 ring-inset hover:bg-ink hover:text-paper"
            }`}
          >
            {picked ? <CheckIcon className="h-5 w-5" /> : <PlusIcon className="h-5 w-5" />}
            {picked ? t.adventures.votedLabel : t.adventures.voteLabel}
          </button>
        </div>
      </div>
    </article>
  );
}
