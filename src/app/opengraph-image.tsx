import { ImageResponse } from "next/og";

/**
 * Open Graph / social share image, generated at build time (1200×630).
 * Concept: the stacked THINK / TRY / GO mark on sand, hand-drawn arrow,
 * one-line promise and the three key facts. Swap for a photo version later
 * (see IMAGERY.og in src/content/imagery.ts for the art-direction prompt).
 */

export const alt = "Think Try Go — Real-world adventures for curious kids. Coming to Coronado, Panama. Ages 4–12.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Fetch the brand display font (TTF) from Google Fonts at build time; fall back to the default font. */
async function loadDisplayFont(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@800").then((r) => r.text());
    const url = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)?.[1];
    return url ? await fetch(url).then((r) => r.arrayBuffer()) : null;
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const font = await loadDisplayFont();
  const ink = "#1c1b18";
  const ember = "#e2582b";
  const sand = "#f3ecdf";
  const moss = "#1d6a59";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: sand,
          backgroundImage: `linear-gradient(rgba(28,27,24,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(28,27,24,0.06) 1px, transparent 1px)`,
          backgroundSize: "36px 36px",
          padding: "64px 72px",
          fontFamily: font ? "Bricolage" : "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", fontSize: 168, fontWeight: 900, lineHeight: 0.84, letterSpacing: -8, color: ink }}>
          <span>THINK.</span>
          <span style={{ paddingLeft: 80 }}>TRY.</span>
          <span style={{ paddingLeft: 160, color: ember }}>GO.</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", marginLeft: 56, flex: 1 }}>
          <div style={{ display: "flex", alignSelf: "flex-start", background: moss, color: sand, fontSize: 26, fontWeight: 700, padding: "10px 22px", borderRadius: 999 }}>
            Coming to Coronado, Panama
          </div>
          <svg width="150" height="60" viewBox="0 0 120 40" fill="none">
            <path d="M4 24c18-10 42-14 66-10 13 2 26 6 40 3" stroke={ember} strokeWidth="4" strokeLinecap="round" />
            <path d="M97 7l14 10-15 9" stroke={ember} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div style={{ display: "flex", fontSize: 54, fontWeight: 800, lineHeight: 1.05, color: ink, letterSpacing: -1.5 }}>
            Real-world adventures for curious kids.
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {["Ages 4–12", "Hands-on workshops"].map((f) => (
              <div key={f} style={{ display: "flex", whiteSpace: "nowrap", border: `3px solid ${ink}`, borderRadius: 999, padding: "8px 20px", fontSize: 26, color: ink }}>
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: font ? [{ name: "Bricolage", data: font, weight: 800, style: "normal" }] : undefined,
    },
  );
}
