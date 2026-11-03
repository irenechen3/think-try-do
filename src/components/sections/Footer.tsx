"use client";

import { SITE } from "@/content/site";
import { useI18n } from "@/lib/i18n";
import { Wordmark } from "@/components/ui/Wordmark";

export function Footer() {
  const { t } = useI18n();
  const contacts = [
    SITE.contactEmail ? { href: `mailto:${SITE.contactEmail}`, label: SITE.contactEmail } : null,
    SITE.instagramUrl ? { href: SITE.instagramUrl, label: "Instagram" } : null,
    SITE.whatsappNumber ? { href: `https://wa.me/${SITE.whatsappNumber}`, label: "WhatsApp" } : null,
  ].filter((c): c is { href: string; label: string } => c !== null);

  return (
    <footer className="bg-ink pb-28 text-paper sm:pb-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 pt-14 sm:px-6 md:flex-row md:items-end md:justify-between lg:px-8">
        <div>
          <Wordmark tone="paper" className="text-5xl" />
          <p className="mt-5 max-w-sm font-hand text-2xl text-sun">{t.footer.tagline}</p>
        </div>
        <div className="space-y-2 text-sm text-paper/70 md:text-right">
          <p className="font-semibold text-paper">{t.footer.region}</p>
          {contacts.length ? (
            <p>
              {t.footer.contact}:{" "}
              {contacts.map((c, i) => (
                <span key={c.href}>
                  {i > 0 ? " · " : null}
                  <a href={c.href} className="underline underline-offset-2 hover:text-paper" target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                    {c.label}
                  </a>
                </span>
              ))}
            </p>
          ) : null}
          <p>
            © {new Date().getFullYear()} Think Try Do. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
