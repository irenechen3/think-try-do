# Think Try Do: trial-launch site

A one-page market-validation site for **Think Try Do**, hands-on adventure workshops for kids aged 4–12 in Coronado, Panamá Oeste.

The site explains the concept, collects **Founding Families** waitlist sign-ups, and records demand signals: ages, which adventures, days, duration, language and location. It does **not** claim a venue, dates or pricing. Those fields are `null` until you fill them in.

**Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS 4. It needs no other runtime dependencies (`server-only` is just a build guard). It is ready for Vercel.

---

## Run it locally

You need Node 20 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

- In development, submissions are appended to `.data/waitlist.jsonl`, which is git-ignored. You don't need a database to try the form.
- Analytics events are logged to the browser console as `[analytics] …`.
- Hover over any illustration to see its **PHOTO PROMPT** badge. This only appears in development.
- Add `?lang=es` to the URL to open the page in Spanish. This is handy for Spanish-language ads.

Other commands:

```bash
npm run build
npm start
npm run typecheck
```

---

## Deploy to Vercel

1. Push this folder to a GitHub repo and import it in Vercel. Vercel detects the framework automatically.
2. Set the environment variables (Project → Settings → Environment Variables):

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | yes | Your live URL, e.g. `https://thinktrydo.com`. Used for canonical and Open Graph URLs. |
| `SUPABASE_URL` | yes (prod) | `https://xxxx.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | yes (prod) | Server-only key. It is never sent to the browser. |
| `SUPABASE_TABLE` | no | Defaults to `waitlist_signups`. |
| `NEXT_PUBLIC_GA_ID` | no | GA4 measurement ID (`G-XXXX`). Leave it empty and no analytics script loads. |

If Supabase is **not** configured in production, the form returns a friendly error instead of silently losing a sign-up.

### Set up Supabase (about 5 minutes)

1. Create a free project at supabase.com.
2. Open the SQL editor, paste in [`supabase/schema.sql`](supabase/schema.sql) and run it. This creates:
   - the `waitlist_signups` table, with row-level security on and no public access
   - demand views: `demand_by_interest`, `demand_by_day`, `demand_by_age`, `demand_by_location`, `demand_by_duration`, `demand_by_language`, plus `waitlist_families`, which de-duplicates by email
3. Copy the **Project URL** and **service_role key** (Settings → API) into the Vercel env vars, then redeploy.

The browser never talks to Supabase directly. Every write goes through `POST /api/waitlist`, which validates, normalises, rate-limits and honeypot-checks each submission.

---

## Where things live

```
src/
  app/
    layout.tsx            fonts, SEO metadata, JSON-LD, GA4 loader
    page.tsx              section order
    opengraph-image.tsx   generated 1200×630 social share image
    api/waitlist/route.ts form endpoint
    robots.ts, sitemap.ts, icon.svg
  content/
    site.ts               ★ launch facts (venue, dates, pricing, contacts) + form option IDs
    imagery.ts            ★ image slots + photography / image-generation prompts
    i18n/en.ts            ★ ALL English copy
    i18n/es.ts            ★ ALL Spanish copy (type-checked against en.ts)
    i18n/index.ts         locale registry
  lib/
    waitlist.ts           form schema + validation (shared by browser and server)
    storage.ts            Supabase REST or local-file storage
    analytics.ts          GA4-compatible event hooks + UTM capture
    i18n.tsx              language provider / toggle
  components/
    sections/             one file per page section
    form/                 multi-step waitlist form, success state
    ui/                   wordmark, doodles, sketch illustrations, buttons
supabase/schema.sql
```

### Editing copy

All text is in `src/content/i18n/en.ts` and `es.ts`. Edit them like a document. TypeScript will complain if the Spanish file is missing a key that the English one has.

To add another language, create `xx.ts` typed as `Dictionary`, then register it in `i18n/index.ts`. The header toggle picks it up automatically.

### When things get confirmed

Open `src/content/site.ts`:

```ts
venue: { name: "…", address: "…", mapUrl: "…" },
firstWorkshopDate: "Saturday 6 February 2027",
pricing: "…",
contactEmail: "hello@thinktrydo.com",
instagramUrl: "https://instagram.com/…",
whatsappNumber: "507XXXXXXXX",
```

Contact details appear in the footer automatically once they are set. The venue, date and pricing values are ready for you, but nothing renders them yet. When they are confirmed, update the FAQ answers in the copy files and add a "Next workshop" block. The FAQ wording is written so it stays true until then.

### Swapping illustrations for photos

Every image slot currently shows a hand-drawn workshop sketch. To use a photo:

1. Put the file in `public/images/`, e.g. `public/images/hero.jpg`.
2. Set `src: "/images/hero.jpg"` for that slot in `src/content/imagery.ts`.

Each slot has a detailed `prompt` you can hand to a photographer or an image-generation tool. The shared direction is natural light, real mess, real concentration and diverse kids. There should be no tablets, no classrooms and no posed stock smiles.

The Open Graph image is generated from code in `app/opengraph-image.tsx`. To use a designed or photo version, replace that file with a static `app/opengraph-image.png` at 1200×630.

---

## Analytics events

Events go to GA4 when `NEXT_PUBLIC_GA_ID` is set. Otherwise they are pushed to `window.dataLayer`, so you can add GTM later.

GA4 is configured with IP anonymisation and Google signals and ad personalisation turned off. **No names, emails, phone numbers or free text are ever sent to analytics.**

| Event | When | Key params |
|---|---|---|
| `landing_view` | page load | `utm_source`, `utm_campaign`, `viewport` |
| `section_view` | each section first reaches 35% visibility | `section` |
| `cta_click` | any CTA | `cta`, `placement` (`hero`, `header`, `sticky_mobile`, `final_cta`, …) |
| `workshop_view` | an adventure card is half visible | `adventure` |
| `workshop_interest_click` | "I'd want this" on a card (also pre-ticks the form) | `adventure`, `interest`, `selected` |
| `form_start` | first interaction with the form | `ui_language` |
| `form_step_complete` | each step passed | `step` |
| `form_validation_error` | a step fails validation | `step`, `fields` |
| `form_complete` | successful sign-up | `child_count`, `child_ages`, `youngest_age`, `interests`, `preferred_workshop`, `duration`, `preferred_days`, `language`, `location`, `has_whatsapp` |
| `form_submit_error` | server or network failure | `reason` |
| `faq_open` | an FAQ is expanded | `question_index` |
| `language_change` | EN/ES toggle | `language` |
| `share_click` | share from the success screen | `method` |

UTM parameters from ad links are also saved with each sign-up in Supabase. This lets you compare Facebook, Instagram and WhatsApp campaigns by real sign-ups, not just clicks.

In GA4, register `interests`, `child_ages`, `preferred_days`, `location`, `language`, `placement` and `adventure` as custom dimensions to report on them.

---

## Design notes

- **Palette:** sand `#f3ecdf`, ink `#1c1b18`, ember (terracotta) `#e2582b`, moss `#1d6a59`, plus a sun yellow `#f2b43c` used sparingly. The tokens are in `src/app/globals.css`.
- **Type:** Bricolage Grotesque (display), Inter (body) and Caveat (hand-written notes). All three are self-hosted via `next/font`.
- **Motion:** used sparingly. There is a THINK → TRY → DO rise in the hero, arrows and underlines that draw in, and cards that fade up once on scroll. All of it is disabled under `prefers-reduced-motion`, and content stays visible without JavaScript.
- **Mobile:** designed at 390 px first. Tap targets are at least 48 px. A sticky "Join the list" bar appears after the hero and hides while the form is on screen.
