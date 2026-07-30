# TDD evidence — freelance developer SEO in Lyon

## Source

No external plan file was supplied. The journeys and guarantees below were
derived from the SEO diagnosis completed on 2026-07-30.

## User journeys

1. As a person searching for a freelance web developer in Lyon, I want the
   homepage title, main heading and visible introduction to match that intent,
   so that I can identify the service immediately.
2. As a search crawler, I want the `B/B`, `bbenoit` and `bbenoit.fr` aliases to
   point to Benoit Bruynbroeck, so that brand queries resolve to one identity.
3. As a visitor arriving on a service page, I want to see the developer's name,
   freelance role and location in the visible copy, so that the offer has a
   clear author and local context.
4. As a search crawler, I want incomplete utility pages excluded from the index
   and sitemap while their links remain followable, so that they do not occupy
   branded results.
5. As a reader of the English technical profile, I want its content language
   declared as English, so that assistive technology and crawlers interpret it
   correctly.

## RED evidence

- Commit: `f026749` (`test: define freelance Lyon SEO contract`)
- `npm test`: 19 passing, 3 failing.
  - Old generic homepage title.
  - Missing `bbenoit` aliases.
  - Missing noindex metadata support.
- `npm run seo:audit` against production: 11 intended failures.
  - Homepage intent and H1.
  - Visible freelance wording on service pages.
  - English language marker on `/jobs`.
  - Legal/privacy noindex directives and sitemap exclusions.

## GREEN evidence

- Commit: `68fbc02` (`fix: target freelance developer searches in Lyon`)
- `npm test`: 22/22 passing.
- `npm run lint`: passing.
- `npm run build`: passing; all public routes statically generated.
- `SEO_AUDIT_BASE_URL=http://127.0.0.1:3127
  SEO_SITE_URL=https://www.bbenoit.fr npm run seo:audit`: passing.
- Browser verification at 1440 px and 390 px:
  - homepage returned HTTP 200;
  - expected title and H1 rendered;
  - Portfolio navigation and anchor worked;
  - no framework overlay, console error, failed response or horizontal overflow;
  - `/jobs` rendered with `main[lang="en"]`.

## Test specification

| # | What is guaranteed | Test or command | Type | Result |
|---|---|---|---|---|
| 1 | The default title and description target a freelance web developer in Lyon | `app/lib/seo.test.ts` | Unit | PASS |
| 2 | Website JSON-LD exposes the three recognized brand aliases | `app/lib/seo.test.ts` | Unit | PASS |
| 3 | Utility metadata can emit `noindex, follow` with a canonical URL | `app/lib/seo.test.ts` | Unit | PASS |
| 4 | Homepage and service-page HTML contain the intended visible copy | `scripts/seo-audit.mjs` against the production build | Integration | PASS |
| 5 | Canonicals, social metadata and required JSON-LD types remain present | `scripts/seo-audit.mjs` | Integration | PASS |
| 6 | Legal/privacy pages are noindex and absent from the sitemap | `scripts/seo-audit.mjs` | Integration | PASS |
| 7 | Desktop/mobile navigation and page rendering work without browser errors | Headless browser verification | E2E | PASS |

## Coverage and known gaps

`node --test --experimental-test-coverage "app/**/*.test.ts"` reports:

- Lines: 92.49%
- Branches: 95.65%
- Functions: 87.50%

Search Console submission, Google Business Profile configuration, profile
updates and external backlinks require account access or third-party approval
and are intentionally outside the automated test boundary.

