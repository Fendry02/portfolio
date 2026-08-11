# SEO Improvements — Design

**Date:** 2026-08-11
**Status:** Approved

## Context

The technical SEO layer is already complete and locked by tests: canonicals,
Open Graph and Twitter metadata, `robots.ts`, `sitemap.ts`, a full JSON-LD graph
(`Person`, `WebSite`, `ProfessionalService`, `WebPage`, `Service`, `FAQPage`,
`BreadcrumbList`), `noindex` on utility pages, AVIF/WebP images, and
`scripts/seo-audit.mjs` running the whole contract against a built site. The
2026-07-30 work recorded in `docs/testing/freelance-lyon-seo.tdd.md` closed the
intent, alias and language gaps.

Adding more metadata will not move rankings. The ceiling is elsewhere:

- **Four indexable URLs** (`/`, `/jobs`, and two service pages) can only rank for
  roughly four intents. There is no page for the long-tail queries that actually
  convert.
- **Two offers declared in `serviceOffers` point at `/#offres`** — they appear in
  the `OfferCatalog` structured data with no page behind them.
- **Case-study content is trapped inside a client component**
  (`app/components/case-studies.tsx`) and exists only as a homepage section.
- **Off-page signals are incomplete.** Search Console, Google Business Profile
  and the Malt/LinkedIn profiles are in place; Google reviews and inbound links
  from delivered client sites are not.

Verified while auditing, so not in scope: accordion and case-study copy *is*
present in the server-rendered HTML (the accordion collapses with CSS, it does
not conditionally render), and `/jobs` already declares `<main lang="en">`, so
its language is correctly exposed. No `hreflang` is needed because no French
equivalent of `/jobs` exists.

## Goal

Rank for local commercial intent in Lyon first, and for n8n/automation expertise
nationally second. Content is drafted by Claude from real projects and reviewed
by Benoit before publication.

## Constraints

- Follow the existing patterns in `app/lib/seo.ts`: every page builds metadata
  through `buildPageMetadata` and emits a JSON-LD graph through
  `createJsonLdGraph`.
- Every new indexable route must be added to `scripts/seo-audit.mjs`, which is
  the project's SEO contract, and to `app/sitemap.ts`.
- No duplicated geographic landing pages (`développeur web Villeurbanne`,
  `Lyon 6e`, …). Near-identical geo variants are doorway pages and are
  explicitly penalised by Google.
- Reuse the existing design tokens and section patterns from the current service
  pages. This work adds pages, it does not redesign them.

## Lot 1 — Measurable foundations

### 1.1 Per-route `lastModified`

`siteLastModified` is a single frozen constant (`2026-07-30`), so every sitemap
entry claims the same lie after each deploy.

Deriving dates from git was considered and rejected: Vercel performs a shallow
clone, so `git log -1 -- <path>` is unreliable at build time.

Instead, `app/lib/seo.ts` gains a single route registry holding, per route, its
path and its `lastModified` date. `app/sitemap.ts` maps over that registry
instead of listing routes inline. A unit test in `app/lib/seo.test.ts` asserts
that every route in the registry has a `lastModified` and that the sitemap emits
exactly the registry's routes — so adding a page without dating it fails the
suite.

Updating the date is part of the definition of done whenever a page's content
changes. Google discounts `lastmod` when it judges it inaccurate, which argues
for accuracy over automation.

### 1.2 Heading hierarchy on the homepage

The two "route" cards in `app/page.tsx` use `<h2>` inside a section already
titled by `#offers-heading`. They become `<h3>`. Visual styling is unchanged.

### 1.3 `app/not-found.tsx`

No 404 page exists. Add one with `robots: { index: false, follow: true }`, the
site header and footer, and links to the homepage, the service pages and the
contact anchor.

### 1.4 Field performance measurement

Add `@vercel/speed-insights` to `app/layout.tsx`, gated on `process.env.VERCEL`
like the existing `@vercel/analytics` integration. The site animates heavily on
scroll and there is currently no Core Web Vitals data at all, so INP and LCP
regressions are invisible.

### 1.5 Remove `keywords`

Drop the `seoKeywords` export, the `keywords` field in `buildPageMetadata`, the
`keywords` entry in the root layout metadata, and the per-page keyword arrays.
The `<meta name="keywords">` tag has been ignored by Google since 2009 and the
identical 25-term list on every page carries no signal. Update
`app/lib/seo.test.ts` accordingly.

## Lot 2 — Proof pages

### 2.1 Extract case-study data

Create `app/lib/case-studies.ts` as the single source of truth, exporting a typed
array. Each entry carries: `slug`, `title`, `client`, `scope`, `sector`, `city`,
`challenge`, `solution`, `impact`, `stack`, `image`, `imageAlt`, `href`,
`relatedService`, `publishedAt`.

`app/components/case-studies.tsx` imports from this module instead of declaring
the data inline. `StaticImageData` imports work identically from a shared module,
so the homepage rendering is unchanged.

Initial entries: Petit Nid, Electreau Lyon, Chez Viko.

### 2.2 `/realisations`

`app/realisations/page.tsx` — an index listing every case study with its sector
and the problem it solved, linking to each detail page. JSON-LD: `CollectionPage`
plus an `ItemList` of the case studies, plus `BreadcrumbList`.

### 2.3 `/realisations/[slug]`

`app/realisations/[slug]/page.tsx` with `generateStaticParams` over
`app/lib/case-studies.ts` and `generateMetadata` built through
`buildPageMetadata`.

Page structure: H1 naming the client and the sector, then the context, the
blocker, the response, the result, the stack, a screenshot, an outbound link to
the live site, and a CTA to the matching service page.

JSON-LD graph: `Article` (with `author` and `publisher` referencing the existing
Person `@id`), `ImageObject`, and `BreadcrumbList`
(`Accueil` → `Réalisations` → the case study).

### 2.4 Two missing service pages

`app/services/application-web-sur-mesure-lyon/page.tsx` and
`app/services/formation-ia-lyon/page.tsx`, following the structure already
proven by `app/services/creation-site-web-lyon/page.tsx`: hero with H1, problem
framing, deliverables, process, audience, FAQ, CTA.

`serviceRoutes` gains `customAppLyon` and `aiTrainingLyon`; the two
`serviceOffers` entries currently pointing at `/#offres` are repointed at these
routes, so the `OfferCatalog` no longer advertises offers without pages.

### 2.5 Enrich the local business schema

`professionalServiceJsonLd` gains:

- `geo` — `GeoCoordinates` for the registered address (302 rue Garibaldi, 69007
  Lyon);
- `areaServed` — extended with the Métropole de Lyon alongside the existing city
  and country entries;
- `openingHoursSpecification` — Monday to Friday, 09:00–18:00 Europe/Paris.
  Adjust before shipping if these are not the real hours;
- `knowsLanguage` — `fr-FR` and `en`.

Deliberately excluded: `Review` and `AggregateRating` nodes built from the
on-site testimonials. Google does not honour self-serving reviews about the
business publishing them, so they would produce no rich result. Reviews belong
on the Google Business Profile (see Lot 4).

### 2.6 Sitemap, internal linking and audit

- `app/sitemap.ts` covers `/realisations`, the three case-study pages and the two
  new service pages.
- `app/components/footer.tsx` gains a `Réalisations` entry and the two new
  service links.
- Each service page links to the case studies that illustrate it; each case study
  links back to its service page.
- `scripts/seo-audit.mjs` gains a `pages` entry per new route, declaring its
  expected title, canonical, description fragment, visible-copy fragments and
  required JSON-LD types — matching how the existing four pages are asserted.

This takes the site from 4 to 11 indexable URLs, all backed by real work.

## Lot 3 — Blog

`app/blog/` rendering MDX, with `generateStaticParams` over the post files and
`generateMetadata` through `buildPageMetadata`.

- `app/blog/page.tsx` — index with `CollectionPage` and `ItemList`.
- `app/blog/[slug]/page.tsx` — `BlogPosting` JSON-LD with `author` and
  `publisher` referencing the existing Person `@id`, `datePublished`,
  `dateModified` and `BreadcrumbList`.
- `app/blog/rss.xml/route.ts` — RSS feed, referenced from the root layout
  metadata via `alternates.types`.
- `app/sitemap.ts` concatenates the static route registry from Lot 1 with the
  post list derived from the MDX frontmatter, each post using its `dateModified`
  as `lastModified`.

Editorial line — two clusters, each post linking to its service page:

- **n8n and automation**, national reach, the strongest differentiator.
- **Website creation**, local reach, supporting the Lyon service pages.

Claude drafts from real projects; Benoit reviews before publication.

## Lot 4 — Off-code actions (Benoit)

These are outside the automated test boundary but outweigh Lots 2 and 3 combined
for local commercial queries.

1. **Google reviews.** Thibaut Cuny (Electreau Lyon) and Victor Cavrois (Chez
   Viko) already agreed to be quoted publicly on the site. Ask both for a Google
   review on the existing Business Profile, which currently has none. Never
   exchange, buy or manufacture reviews.
2. **Attribution links.** With each client's approval, add a discreet footer
   credit on the delivered sites (Electreau Lyon, Chez Viko, Petit Nid) linking
   to the relevant service or case-study page. Three sites in production
   currently link back to nothing.
3. **Search Console follow-up.** Submit the new URLs and track their indexing
   coverage after each lot ships.

## Testing strategy

Following the project's existing TDD practice, each lot is driven by failing
tests first, with evidence recorded in `docs/testing/`.

| Level | Tool | Covers |
|---|---|---|
| Unit | `app/lib/seo.test.ts`, `app/lib/case-studies.test.ts` | Route registry completeness, `lastModified` per route, sitemap/registry parity, case-study slug uniqueness, metadata builders |
| Integration | `scripts/seo-audit.mjs` | Titles, canonicals, descriptions, visible copy, Open Graph tags and required JSON-LD types on every new route; `noindex` on the 404 page |
| Build | `npm run build` | All new routes statically generated |
| Manual | Rich Results Test, Search Console | `Article`, `Service` and `FAQPage` validity; indexing coverage |

## Sequencing and exit points

Lot 1 ships first because it makes the diagnosis trustworthy before any content
investment. Lot 2 is the main local lever. Lot 3 is the only lot requiring an
ongoing cadence — it can be dropped without leaving anything broken behind, which
is why it is sequenced last. Lot 4 runs in parallel from day one.

## Out of scope

- Duplicated geographic landing pages.
- `Review` / `AggregateRating` schema on self-published testimonials.
- Redesigning existing pages.
- Any change to `/jobs`, whose language and metadata are already correct.
