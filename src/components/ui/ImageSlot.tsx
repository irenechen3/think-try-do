import Image from "next/image";
import type { ReactNode } from "react";
import type { ImageSlot as Slot } from "@/content/imagery";

type ImageSlotProps = {
  slot: Slot;
  alt: string;
  /** Sketch illustration shown until a real photo is supplied. */
  fallback: ReactNode;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * Renders a photo when `slot.src` is set; otherwise a sketch illustration.
 * The art-direction prompt is attached as a data attribute (and shown as a
 * hover badge in development) so it's easy to brief photography later.
 */
export function ImageSlot({ slot, alt, fallback, className = "", sizes = "(min-width: 1024px) 50vw, 100vw", priority }: ImageSlotProps) {
  if (slot.src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={slot.src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }

  return (
    <div className={`group relative ${className}`} data-image-prompt={slot.prompt} role="img" aria-label={alt}>
      {fallback}
      {process.env.NODE_ENV !== "production" ? (
        <span
          title={slot.prompt}
          className="absolute top-3 right-3 z-10 rounded-full bg-ink/80 px-2.5 py-1 text-[0.65rem] font-semibold tracking-wide text-paper opacity-0 transition group-hover:opacity-100"
        >
          PHOTO PROMPT ⓘ
        </span>
      ) : null}
    </div>
  );
}
