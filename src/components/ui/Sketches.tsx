/**
 * Workshop-bench sketch illustrations used until real photography exists.
 * Drawn like a maker's notebook: ink lines, a few colour fills, hand notes.
 */

const INK = "var(--color-ink)";
const EMBER = "var(--color-ember)";
const MOSS = "var(--color-moss)";
const SUN = "var(--color-sun)";
const PAPER = "var(--color-paper)";
const SAND = "var(--color-sand-deep)";

const hand = { fontFamily: "var(--font-hand)" } as const;
const stroke = { stroke: INK, strokeWidth: 3, strokeLinecap: "round", strokeLinejoin: "round" } as const;

type Notes = { notes?: string[]; className?: string };

/* ------------------------------------------------------------------------ */

export function HeroScene({ notes = ["more weight?", "steeper?", "try again!"], className }: Notes) {
  // Ramp runs from (40,150) to (470,385); slope angle ≈ 28.6°
  return (
    <svg viewBox="0 0 520 440" className={className} aria-hidden fill="none">
      {/* ground + ruler */}
      <path d="M14 395H506" {...stroke} />
      {Array.from({ length: 25 }, (_, i) => (
        <path key={i} d={`M${20 + i * 20} 395v${i % 5 === 0 ? 12 : 6}`} stroke={INK} strokeWidth="1.6" opacity="0.5" />
      ))}

      {/* crate support */}
      <rect x="26" y="164" width="66" height="231" rx="3" fill={SAND} {...stroke} />
      <path d="M26 240h66M26 318h66M30 168l58 68M30 244l58 70M30 322l58 70" stroke={INK} strokeWidth="2" opacity="0.55" />

      {/* ramp */}
      <path d="M36 146L478 386 470 396 32 160Z" fill="#c98e55" {...stroke} />
      <path d="M60 165l390 212" stroke={INK} strokeWidth="1.4" opacity="0.35" strokeDasharray="10 8" />

      {/* finish flag */}
      <path d="M486 395V318" {...stroke} />
      <path d="M486 320h30v22h-30z" fill={PAPER} {...stroke} strokeWidth={2.2} />
      <path d="M486 320h10v11h-10zM506 320h10v11h-10zM496 331h10v11h-10z" fill={INK} />

      {/* angle arc */}
      <path className="draw-path" style={{ "--len": 80, "--delay": "900ms" } as React.CSSProperties} d="M396 395c-2-18-8-32-18-44" stroke={EMBER} strokeWidth="3" strokeLinecap="round" />
      <text x="316" y="434" fill={EMBER} fontSize="30" style={hand} fontWeight="700">
        {notes[1]}
      </text>

      {/* racer on the slope */}
      <g transform="translate(232 263) rotate(28.6)">
        {/* motion lines */}
        <path d="M-118 -30h40M-128 -18h44M-110 -42h26" stroke={INK} strokeWidth="2.4" strokeLinecap="round" opacity="0.5" />
        {/* body */}
        <path d="M-62 -16v-22c0-6 4-10 10-10h40l14-14h30c8 0 12 6 14 12l12 12c4 4 4 8 4 12v10z" fill={EMBER} {...stroke} />
        <path d="M-2 -48h24l10 12h-34z" fill={PAPER} {...stroke} strokeWidth={2.2} />
        <circle cx="-30" cy="-30" r="9" fill={PAPER} {...stroke} strokeWidth={2.2} />
        <text x="-35" y="-25" fontSize="14" fontWeight="800" fill={INK} style={{ fontFamily: "var(--font-display)" }}>
          7
        </text>
        {/* cargo / weight */}
        <rect x="-50" y="-70" width="28" height="22" rx="3" fill={SUN} {...stroke} strokeWidth={2.4} />
        {/* wheels */}
        <circle cx="-40" cy="-12" r="12" fill={INK} />
        <circle cx="-40" cy="-12" r="4" fill={PAPER} />
        <circle cx="38" cy="-12" r="12" fill={INK} />
        <circle cx="38" cy="-12" r="4" fill={PAPER} />
      </g>

      {/* "more weight?" note + arrow */}
      <text x="148" y="62" fill={INK} fontSize="31" style={hand} fontWeight="700">
        {notes[0]}
      </text>
      <path
        className="draw-path"
        style={{ "--len": 120, "--delay": "600ms" } as React.CSSProperties}
        d="M196 72c-6 30 2 54 10 70"
        stroke={EMBER}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M198 136l9 10 6-13" stroke={EMBER} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

      {/* measurement line */}
      <path d="M330 120h120M330 112v16M450 112v16" stroke={INK} strokeWidth="1.8" opacity="0.6" />
      <text x="358" y="106" fill={INK} opacity="0.7" fontSize="22" style={hand}>
        42 cm
      </text>

      {/* try again loop */}
      <text x="112" y="300" fill={MOSS} fontSize="30" style={hand} fontWeight="700" transform="rotate(-6 112 300)">
        {notes[2]}
      </text>
      <path d="M118 316c-10 16 4 30 20 24 14-6 8-24-4-20" stroke={MOSS} strokeWidth="2.6" strokeLinecap="round" />

      {/* sparkles */}
      <path d="M454 210v18M445 219h18M470 186v10M465 191h10" stroke={SUN} strokeWidth="3.4" strokeLinecap="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------------ */

export function RacerSketch({ notes = ["wheels closer? ↔"], className }: Notes) {
  return (
    <svg viewBox="0 0 400 280" className={className} aria-hidden fill="none">
      <path d="M24 226h352" {...stroke} strokeWidth={2.4} opacity="0.6" />
      {/* dimension line */}
      <path d="M86 58h232M86 50v16M318 50v16" stroke={INK} strokeWidth="1.8" opacity="0.6" />
      <text x="174" y="44" fontSize="22" fill={INK} opacity="0.75" style={hand}>
        18 cm
      </text>
      {/* body */}
      <path d="M80 190v-46c0-10 8-18 18-18h74l30-34h60c14 0 24 10 28 20l22 30c6 8 8 14 8 22v26z" fill={EMBER} {...stroke} />
      <path d="M190 96h48l22 30h-90z" fill={PAPER} {...stroke} strokeWidth={2.4} />
      <path d="M100 152h60" stroke={INK} strokeWidth="2" opacity="0.4" />
      <path d="M104 166h44" stroke={INK} strokeWidth="2" opacity="0.4" />
      {/* wheels — solid + ghost alternatives */}
      <circle cx="122" cy="200" r="26" fill={INK} />
      <circle cx="122" cy="200" r="9" fill={PAPER} />
      <circle cx="282" cy="200" r="26" fill={INK} />
      <circle cx="282" cy="200" r="9" fill={PAPER} />
      <circle cx="160" cy="200" r="26" stroke={MOSS} strokeWidth="2.4" strokeDasharray="6 6" />
      <circle cx="244" cy="200" r="26" stroke={MOSS} strokeWidth="2.4" strokeDasharray="6 6" />
      <text x="120" y="262" fontSize="24" fill={MOSS} style={hand} fontWeight="700">
        {notes[0]}
      </text>
      {/* sawdust */}
      <path d="M318 222l4-3M330 224l3 1M342 220l2-4M60 222l-3-3M48 224l-4 1" stroke="#c98e55" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------------ */

export function RescueSketch({ notes = ["rope? hook? raft?", "no stepping on the island!"], className }: Notes) {
  return (
    <svg viewBox="0 0 400 280" className={className} aria-hidden fill="none">
      {/* water */}
      <path d="M0 110h400v170H0z" fill={MOSS} opacity="0.18" />
      {[130, 160, 196, 232, 262].map((y, i) => (
        <path
          key={y}
          d={`M${10 + (i % 2) * 20} ${y}c12-8 24-8 36 0s24 8 36 0 24-8 36 0`}
          stroke={MOSS}
          strokeWidth="2.6"
          strokeLinecap="round"
          opacity="0.7"
        />
      ))}
      {/* island */}
      <ellipse cx="292" cy="168" rx="78" ry="30" fill={SAND} {...stroke} />
      {/* stranded toy (bear) */}
      <circle cx="292" cy="128" r="18" fill={SUN} {...stroke} strokeWidth={2.6} />
      <circle cx="278" cy="112" r="7" fill={SUN} {...stroke} strokeWidth={2.4} />
      <circle cx="306" cy="112" r="7" fill={SUN} {...stroke} strokeWidth={2.4} />
      <path d="M286 126h1M298 126h1M288 136c3 3 6 3 8 0" stroke={INK} strokeWidth="2.6" strokeLinecap="round" />
      <path d="M278 146c-2 10 4 18 14 18s16-8 14-18" fill={SUN} {...stroke} strokeWidth={2.4} />
      {/* shore */}
      <path d="M0 250c40-30 80-40 120-36v66H0z" fill="#d7c49e" {...stroke} />
      {/* rope line + hook */}
      <path
        className="draw-path"
        style={{ "--len": 260 } as React.CSSProperties}
        d="M84 222c40-70 110-104 176-98"
        stroke={EMBER}
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeDasharray="2 9"
      />
      <path d="M252 116c8-8 20-2 16 8-2 6-10 6-12 2" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      {/* stick */}
      <path d="M40 240l60-30" stroke="#8a5a2b" strokeWidth="7" strokeLinecap="round" />
      {/* notes */}
      <text x="22" y="48" fontSize="28" fill={INK} style={hand} fontWeight="700">
        {notes[0]}
      </text>
      <text x="380" y="262" fontSize="21" fill={EMBER} style={hand} fontWeight="700" textAnchor="end" transform="rotate(-3 380 262)">
        {notes[1]}
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------------ */

export function BridgeSketch({ notes = ["will it hold?", "triangles = strong?"], className }: Notes) {
  return (
    <svg viewBox="0 0 400 280" className={className} aria-hidden fill="none">
      {/* book stacks */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={24 + (i % 2) * 4} y={232 - i * 26} width="88" height="24" rx="3" fill={i === 1 ? MOSS : i === 2 ? SUN : EMBER} {...stroke} strokeWidth={2.4} />
          <rect x={288 - (i % 2) * 4} y={232 - i * 26} width="88" height="24" rx="3" fill={i === 1 ? EMBER : i === 2 ? MOSS : SUN} {...stroke} strokeWidth={2.4} />
        </g>
      ))}
      {/* deck with slight sag */}
      <path d="M96 178c40 10 168 10 208 0v12c-40 10-168 10-208 0z" fill="#c98e55" {...stroke} />
      {/* truss */}
      <path d="M108 190l26 30 26-26 26 30 26-30 26 30 26-30 26 30 22-26" stroke={INK} strokeWidth="2.4" strokeLinejoin="round" opacity="0.8" />
      {/* weights */}
      <rect x="168" y="150" width="64" height="26" rx="4" fill={INK} />
      <rect x="176" y="126" width="48" height="24" rx="4" fill={INK} opacity="0.85" />
      <rect x="184" y="104" width="32" height="22" rx="4" fill={INK} opacity="0.7" />
      <text x="190" y="120" fontSize="13" fill={PAPER} fontWeight="800" style={{ fontFamily: "var(--font-display)" }}>
        +1
      </text>
      {/* sag hint */}
      <path d="M118 232c40 18 124 18 164 0" stroke={EMBER} strokeWidth="2.4" strokeDasharray="6 7" />
      {/* notes */}
      <text x="230" y="70" fontSize="28" fill={INK} style={hand} fontWeight="700">
        {notes[0]}
      </text>
      <path d="M248 80c-14 12-20 22-24 34" stroke={EMBER} strokeWidth="3" strokeLinecap="round" />
      <path d="M216 108l7 9 9-8" stroke={EMBER} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M112 268h176M112 260v16M288 260v16" stroke={INK} strokeWidth="1.8" opacity="0.6" />
      <text x="40" y="70" fontSize="24" fill={MOSS} style={hand} fontWeight="700">
        {notes[1]}
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------------ */

export function MysterySketch({ notes = ["clue #3", "who? when? how?"], className }: Notes) {
  return (
    <svg viewBox="0 0 400 280" className={className} aria-hidden fill="none">
      {/* clue cards */}
      <g transform="rotate(-8 90 90)">
        <rect x="40" y="50" width="104" height="76" rx="6" fill={PAPER} {...stroke} strokeWidth={2.4} />
        <text x="58" y="86" fontSize="26" fill={INK} style={hand} fontWeight="700">
          {notes[0]}
        </text>
        <path d="M58 104h66" stroke={INK} strokeWidth="2" opacity="0.4" />
      </g>
      <g transform="rotate(6 300 70)">
        <rect x="256" y="30" width="96" height="70" rx="6" fill={SUN} {...stroke} strokeWidth={2.4} />
        <text x="290" y="80" fontSize="46" fill={INK} style={{ fontFamily: "var(--font-display)" }} fontWeight="800">
          ?
        </text>
      </g>
      {/* string between pins */}
      <path d="M100 60c60 30 120 30 192 0" stroke={EMBER} strokeWidth="2.4" />
      <circle cx="100" cy="60" r="6" fill={EMBER} {...stroke} strokeWidth={2} />
      <circle cx="292" cy="40" r="6" fill={EMBER} {...stroke} strokeWidth={2} />
      {/* footprints */}
      {[0, 1, 2, 3, 4].map((i) => (
        <ellipse
          key={i}
          cx={60 + i * 52}
          cy={i % 2 ? 236 : 250}
          rx="11"
          ry="17"
          fill={INK}
          opacity={0.25 + i * 0.12}
          transform={`rotate(70 ${60 + i * 52} ${i % 2 ? 236 : 250})`}
        />
      ))}
      {/* magnifier */}
      <circle cx="228" cy="172" r="52" fill={PAPER} fillOpacity="0.5" stroke={INK} strokeWidth="5" />
      <circle cx="228" cy="172" r="40" stroke={MOSS} strokeWidth="2" opacity="0.6" />
      <path d="M266 210l46 46" stroke={INK} strokeWidth="12" strokeLinecap="round" />
      <path d="M266 210l46 46" stroke="#8a5a2b" strokeWidth="6" strokeLinecap="round" />
      <ellipse cx="226" cy="176" rx="12" ry="18" fill={INK} opacity="0.75" transform="rotate(70 226 176)" />
      <text x="30" y="196" fontSize="26" fill={MOSS} style={hand} fontWeight="700">
        {notes[1]}
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------------ */

export function ToolsSketch({ notes = ["real stuff"], className }: Notes) {
  return (
    <svg viewBox="0 0 420 320" className={className} aria-hidden fill="none">
      {/* plywood board */}
      <rect x="14" y="14" width="392" height="292" rx="14" fill="#dcb88a" {...stroke} />
      <path d="M40 60c80 6 200-6 340 4M40 150c120 8 220-4 340 2M40 250c90 4 240-8 340 0" stroke="#b78a55" strokeWidth="2" strokeLinecap="round" />
      {/* hammer */}
      <g transform="rotate(-24 120 110)">
        <rect x="60" y="100" width="130" height="16" rx="6" fill="#8a5a2b" {...stroke} strokeWidth={2.4} />
        <path d="M170 78h34v24h-10v14h-14v-14h-10z" fill={INK} />
      </g>
      {/* saw */}
      <g transform="rotate(8 300 110)">
        <path d="M228 80h120l-10 56H228z" fill="#c9ccd1" {...stroke} strokeWidth={2.4} />
        <path d="M228 136l6 8 6-8 6 8 6-8 6 8 6-8 6 8 6-8 6 8 6-8 6 8 6-8 6 8 6-8 6 8 6-8 6 8" stroke={INK} strokeWidth="1.8" />
        <rect x="200" y="74" width="34" height="56" rx="10" fill={EMBER} {...stroke} strokeWidth={2.4} />
        <rect x="210" y="90" width="14" height="24" rx="5" fill="#dcb88a" />
      </g>
      {/* wheels */}
      {[0, 1].map((i) => (
        <g key={i}>
          <circle cx={74 + i * 52} cy="232" r="22" fill={INK} />
          <circle cx={74 + i * 52} cy="232" r="7" fill="#dcb88a" />
        </g>
      ))}
      {/* rope coil */}
      <path d="M236 230c0-22 40-22 40 0s-56 26-60 0 50-40 72-12c18 24-10 52-44 46" stroke={MOSS} strokeWidth="6" strokeLinecap="round" />
      {/* screws */}
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`rotate(${-30 + i * 25} ${342 + i * 14} ${210 + i * 18})`}>
          <path d={`M${342 + i * 14} ${200 + i * 18}v26`} stroke={INK} strokeWidth="3.4" strokeLinecap="round" />
          <path d={`M${336 + i * 14} ${200 + i * 18}h12`} stroke={INK} strokeWidth="4" strokeLinecap="round" />
        </g>
      ))}
      {/* pencil */}
      <g transform="rotate(-12 160 180)">
        <rect x="120" y="172" width="90" height="12" rx="2" fill={SUN} {...stroke} strokeWidth={2} />
        <path d="M210 172l14 6-14 6z" fill={PAPER} {...stroke} strokeWidth={2} />
      </g>
      <text x="300" y="290" fontSize="24" fill={INK} style={hand} fontWeight="700" opacity="0.8">
        {notes[0]}
      </text>
    </svg>
  );
}
