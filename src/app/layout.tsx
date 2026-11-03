import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Bricolage_Grotesque, Caveat, Inter } from "next/font/google";
import { en } from "@/content/i18n/en";
import { SITE } from "@/content/site";
import { I18nProvider } from "@/lib/i18n";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const hand = Caveat({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-caveat", display: "swap" });

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: en.meta.title,
  description: en.meta.description,
  applicationName: SITE.name,
  keywords: [
    "kids workshops Coronado",
    "children's activities Panama Oeste",
    "woodworking for kids Panama",
    "maker workshops kids",
    "problem solving activities children",
    "talleres para niños Coronado",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE.name,
    title: en.meta.title,
    description: en.meta.description,
    locale: "en_US",
    alternateLocale: ["es_PA"],
  },
  twitter: {
    card: "summary_large_image",
    title: en.meta.title,
    description: en.meta.description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#f3ecdf",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: SITE.url,
  slogan: "Real-world adventures for curious kids",
  description: en.meta.description,
  areaServed: { "@type": "Place", name: "Coronado, Panamá Oeste, Panama" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${hand.variable}`} suppressHydrationWarning>
      <head>
        {/* Enables reveal-on-scroll styles only when JS runs; content stays visible otherwise. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <I18nProvider>{children}</I18nProvider>

        {GA_ID ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true,allow_google_signals:false,allow_ad_personalization_signals:false});`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
