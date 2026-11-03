/**
 * THINK / TRY / GO text treatment.
 * - "stack": three words stacked, small arrows between — the primary mark.
 * - "inline": THINK → TRY → GO for tight horizontal spaces.
 */

type WordmarkProps = {
  variant?: "stack" | "inline";
  className?: string;
  tone?: "ink" | "paper";
};

export function Wordmark({ variant = "stack", className = "", tone = "ink" }: WordmarkProps) {
  const color = tone === "ink" ? "text-ink" : "text-paper";

  if (variant === "inline") {
    return (
      <span className={`inline-flex items-center gap-1.5 font-display font-extrabold tracking-tight ${color} ${className}`}>
        <span>THINK</span>
        <Arrow />
        <span>TRY</span>
        <Arrow />
        <span className="text-ember">GO</span>
      </span>
    );
  }

  return (
    <span className={`inline-flex flex-col font-display leading-[0.82] font-extrabold tracking-[-0.04em] ${color} ${className}`}>
      <span>THINK</span>
      <span className="pl-[0.5em]">TRY</span>
      <span className="pl-[1em] text-ember">GO</span>
    </span>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 16 10" className="h-[0.5em] w-[0.8em] text-ember" aria-hidden fill="none">
      <path d="M1 5h13M10 1l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Compact square logo used in the header. */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`grid place-items-center rounded-[10px] bg-ink px-1.5 py-1 font-display text-[0.6rem] leading-[0.85] font-extrabold tracking-[-0.03em] text-paper ${className}`}
      aria-hidden
    >
      <span className="flex flex-col">
        <span>THINK</span>
        <span className="pl-1">TRY</span>
        <span className="pl-2 text-ember">GO</span>
      </span>
    </span>
  );
}
