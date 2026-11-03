/**
 * Hand-drawn marks: arrows, circles, underlines, scribbles.
 * Paths with class "draw-path" animate in when a parent gets "is-visible"
 * (see Reveal) or "draw-now".
 */

type DoodleProps = { className?: string; delay?: number };

const style = (len: number, delay = 0) => ({ "--len": len, "--delay": `${delay}ms` }) as React.CSSProperties;

export function ArrowRight({ className, delay }: DoodleProps) {
  return (
    <svg viewBox="0 0 120 40" fill="none" aria-hidden className={className}>
      <path
        className="draw-path"
        style={style(140, delay)}
        d="M4 24c18-10 42-14 66-10 13 2 26 6 40 3"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        className="draw-path"
        style={style(40, (delay ?? 0) + 700)}
        d="M97 7l14 10-15 9"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowCurl({ className, delay }: DoodleProps) {
  return (
    <svg viewBox="0 0 90 90" fill="none" aria-hidden className={className}>
      <path
        className="draw-path"
        style={style(170, delay)}
        d="M8 10c30-4 52 10 50 30-1 14-18 16-20 6-2-12 18-18 30-4 7 8 9 20 8 34"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        className="draw-path"
        style={style(36, (delay ?? 0) + 800)}
        d="M66 68l10 12 10-13"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CircleScribble({ className, delay }: DoodleProps) {
  return (
    <svg viewBox="0 0 200 80" fill="none" aria-hidden preserveAspectRatio="none" className={className}>
      <path
        className="draw-path"
        style={style(520, delay)}
        d="M150 10C110 2 36 6 14 30c-16 18 12 40 76 42 58 2 102-10 104-32 2-20-42-32-118-28"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function Underline({ className, delay }: DoodleProps) {
  return (
    <svg viewBox="0 0 200 16" fill="none" aria-hidden preserveAspectRatio="none" className={className}>
      <path
        className="draw-path"
        style={style(220, delay)}
        d="M3 11c40-7 96-9 150-6 14 1 28 2 44 4"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden className={className}>
      <path d="M20 3v10M20 27v10M3 20h10M27 20h10M8 8l6 6M26 26l6 6M32 8l-6 6M14 26l-6 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function PinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path d="M12 21s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path d="M4 12.5l5 5L20 6.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CrossIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

export function PlusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}
