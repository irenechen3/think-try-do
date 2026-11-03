"use client";

import type { ReactNode } from "react";
import { track } from "@/lib/analytics";

type Variant = "primary" | "secondary" | "light" | "ghost";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-ember text-paper shadow-[0_4px_0_0_var(--color-ember-deep)] hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_var(--color-ember-deep)] active:translate-y-0.5 active:shadow-[0_1px_0_0_var(--color-ember-deep)]",
  secondary:
    "bg-transparent text-ink ring-2 ring-inset ring-ink hover:bg-ink hover:text-paper",
  light:
    "bg-paper text-ink shadow-[0_4px_0_0_rgb(0_0_0/0.35)] hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_rgb(0_0_0/0.35)] active:translate-y-0.5",
  ghost: "text-ink underline decoration-2 underline-offset-4 hover:decoration-ember",
};

type CtaLinkProps = {
  href: string;
  children: ReactNode;
  /** Analytics: which CTA and where on the page it lives. */
  cta: string;
  placement: string;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
};

export function CtaLink({ href, children, cta, placement, variant = "primary", className = "", onClick }: CtaLinkProps) {
  return (
    <a
      href={href}
      onClick={() => {
        track("cta_click", { cta, placement });
        onClick?.();
      }}
      className={`inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full px-6 py-3 text-center font-display text-[1.02rem] font-bold tracking-tight transition-all duration-200 ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
