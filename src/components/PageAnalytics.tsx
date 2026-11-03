"use client";

import { useEffect } from "react";
import { captureAttribution, track } from "@/lib/analytics";

// Module-level guard so the landing event fires once per page load (StrictMode runs effects twice in dev).
let landed = false;

/** Landing view + one "section_view" per [data-section] the visitor actually reaches. */
export function PageAnalytics() {
  useEffect(() => {
    if (!landed) {
      landed = true;
      captureAttribution();
      const q = new URLSearchParams(window.location.search);
      track("landing_view", {
        utm_source: q.get("utm_source") ?? undefined,
        utm_campaign: q.get("utm_campaign") ?? undefined,
        viewport: window.innerWidth < 640 ? "mobile" : window.innerWidth < 1024 ? "tablet" : "desktop",
      });
    }

    if (!("IntersectionObserver" in window)) return;
    const seen = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const name = (e.target as HTMLElement).dataset.section;
          if (e.isIntersecting && name && !seen.has(name)) {
            seen.add(name);
            track("section_view", { section: name });
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.35 },
    );
    document.querySelectorAll("[data-section]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
