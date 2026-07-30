# TDD evidence — verified legal identity

## Source

The business details were supplied by Benoit Bruynbroeck on 2026-07-30. The
SIREN, SIRET, establishment address and legal nature were cross-checked against
the French public business directory API. The VAT wording follows the
franchise-in-base wording published by the French tax administration.

## User journeys

1. As a visitor, I want complete publisher details on the legal-notice page so
   that I can identify and contact the business.
2. As a mobile visitor, I want to tap the phone number and call the business.
3. As a search crawler, I want the same verified phone and postal address in
   the `ProfessionalService` structured data so that the local business entity
   is consistent.
4. As the site owner, I want the legal page to remain outside acquisition
   search results and the sitemap while its links remain crawlable.

## RED evidence

- Commit: `21e523f` (`test: define verified legal identity contract`)
- `npm test`: 22 passing, 2 failing.
  - The verified legal identity did not exist in the shared site config.
  - The `ProfessionalService` structured data had no phone or full address.
- The integration audit was extended to reject placeholders and require the
  exact visible legal details.

## GREEN evidence

- Commit: `4fdf70c` (`fix: publish verified legal business details`)
- `npm test`: 24/24 passing.
- `npm run lint`: passing.
- `npm run build`: passing; all public routes statically generated.
- `SEO_AUDIT_BASE_URL=http://127.0.0.1:3128
  SEO_SITE_URL=https://www.bbenoit.fr npm run seo:audit`: passing.
- Browser verification at 1440 px and 390 px:
  - legal page and homepage returned HTTP 200;
  - all verified legal fields rendered with no placeholder;
  - the phone link resolved to `tel:+33698481121`;
  - metadata retained `noindex, follow`;
  - JSON-LD exposed the international phone and full postal address;
  - no framework overlay, console error, failed response or horizontal
    overflow was detected.

## Test specification

| # | What is guaranteed | Test or command | Type | Result |
|---|---|---|---|---|
| 1 | Legal status, address, phone, SIREN, SIRET and VAT wording match the verified values | `app/lib/seo.test.ts` | Unit | PASS |
| 2 | The SIREN and SIRET formats are valid and internally consistent | `app/lib/seo.test.ts` | Unit | PASS |
| 3 | `ProfessionalService` JSON-LD publishes the verified phone and full address | `app/lib/seo.test.ts` | Unit | PASS |
| 4 | The legal page contains every required value and no placeholder | `scripts/seo-audit.mjs` against the production build | Integration | PASS |
| 5 | The legal page remains `noindex, follow` and outside the sitemap | `scripts/seo-audit.mjs` | Integration | PASS |
| 6 | Desktop/mobile rendering and the telephone link work without browser errors | Headless browser verification | E2E | PASS |

## Coverage

`node --test --experimental-test-coverage "app/**/*.test.ts"` reports:

- Lines: 92.83%
- Branches: 95.65%
- Functions: 87.50%
