"use client";

import { useEffect, useRef, useState } from "react";
import { SITE } from "@/content/site";
import { useI18n } from "@/lib/i18n";
import { track } from "@/lib/analytics";
import { CheckIcon, Sparkle } from "@/components/ui/Doodles";

export function SuccessCard() {
  const { t } = useI18n();
  const s = t.form.success;
  const [copied, setCopied] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const shareUrl = typeof window !== "undefined" ? window.location.origin : SITE.url;

  const share = async () => {
    track("share_click", { method: "native_or_copy" });
    const data = { title: "Think Try Do", text: s.shareText, url: shareUrl };
    try {
      if (navigator.share) {
        await navigator.share(data);
        return;
      }
      await navigator.clipboard.writeText(`${s.shareText} ${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* user cancelled */
    }
  };

  return (
    <div
      role="status"
      className="relative overflow-hidden rounded-[var(--radius-card)] border-[3px] border-ink bg-paper p-7 text-center text-ink shadow-[8px_8px_0_0_var(--color-ink)] sm:p-10"
    >
      <Sparkle className="absolute top-6 left-6 h-8 w-8 text-sun" />
      <Sparkle className="absolute right-8 bottom-24 h-6 w-6 text-ember" />
      <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-moss text-paper">
        <CheckIcon className="h-10 w-10" />
      </span>
      <h3 ref={headingRef} tabIndex={-1} className="mt-6 font-display text-4xl font-extrabold tracking-tight focus:outline-none sm:text-5xl">
        {s.title}
      </h3>
      <p className="mx-auto mt-3 max-w-md text-xl font-semibold">{s.body}</p>
      <p className="mx-auto mt-4 max-w-md text-ink-soft">{s.note}</p>

      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={share}
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-ink px-6 font-display font-bold text-paper transition hover:bg-ink-soft"
        >
          {copied ? s.copied : s.share}
        </button>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(`${s.shareText} ${shareUrl}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("share_click", { method: "whatsapp" })}
          className="inline-flex min-h-12 items-center justify-center rounded-full px-6 font-display font-bold text-moss ring-2 ring-moss ring-inset transition hover:bg-moss hover:text-paper"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}
