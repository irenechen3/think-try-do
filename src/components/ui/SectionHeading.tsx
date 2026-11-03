import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: "ink" | "paper";
  id?: string;
  className?: string;
};

export function SectionHeading({ eyebrow, title, intro, align = "left", tone = "ink", id, className = "" }: SectionHeadingProps) {
  const centered = align === "center";
  const muted = tone === "ink" ? "text-ink-soft" : "text-paper/75";
  return (
    <div className={`${centered ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      <p
        className={`mb-4 inline-flex items-center gap-2 font-display text-sm font-bold tracking-[0.14em] uppercase ${
          tone === "ink" ? "text-ember-deep" : "text-sun"
        }`}
      >
        <span className="h-[3px] w-6 rounded-full bg-current" aria-hidden />
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`text-[2.15rem] leading-[1.02] font-extrabold sm:text-5xl lg:text-[3.6rem] ${tone === "ink" ? "text-ink" : "text-paper"}`}
      >
        {title}
      </h2>
      {intro ? <p className={`mt-5 text-lg leading-relaxed sm:text-xl ${muted}`}>{intro}</p> : null}
    </div>
  );
}
