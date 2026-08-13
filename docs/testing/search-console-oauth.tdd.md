# TDD evidence — Google Search Console OAuth connector

## Source

Journeys and acceptance criteria were derived from the request to connect the
already verified `bbenoit.fr` Search Console property directly, with a
read-only local workflow.

## User journeys

1. As the site owner, I want to authorize only read access to Search Console,
   so that the project can analyze real Google Search performance without
   modifying the property or the site.
2. As the site owner, I want a local refresh token excluded from Git, so that
   the recurring report is secure and does not require repeated sign-in.
3. As the site owner, I want the latest complete 28-day period converted into
   concrete query/page opportunities, so that SEO work has a defensible order.

## RED evidence

`node --test scripts/search-console-lib.test.mjs` failed before implementation
with `ERR_MODULE_NOT_FOUND` for `scripts/search-console-lib.mjs`. The test
target executed and failed only because the OAuth and reporting behavior was
missing.

The first live Search Analytics request also returned
`'BY_PROPERTY' is not a valid aggregation type in the context of the request`.
Google requires `auto` when the request groups by page. A focused test then
failed against the incorrect `byProperty` payload before the request builder
was corrected.

A second focused test failed because the report did not retain top query data
when query/page rows were too sparse to meet an action threshold. The report
now includes its strongest queries as well as its strongest pages.

## GREEN evidence

- `node --test scripts/search-console-lib.test.mjs`: 8 passing, 0 failing.
- `node --test --experimental-test-coverage scripts/search-console-lib.test.mjs`:
  98.77% lines, 96.15% branches and 89.47% functions.
- `npm run seo:gsc:auth`: the owner completed Google consent; a refresh token
  was written at `.search-console/token.json` with filesystem mode `600`.
- `npm run seo:gsc:report`: passed against the live verified domain property
  and wrote an ignored local report for 2026-07-14 through 2026-08-10.
- `npm exec prettier -- --check …`: passed for every new or changed formatted
  file.
- `npm test`, `npm run lint` and `npm run build`: passed after the live report
  and report enrichment.

## Test specification

| #   | What is guaranteed                                                                                                                          | Test or command                                  | Type        | Result |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ----------- | ------ |
| 1   | The Google consent URL asks only for the Search Console read-only scope, with offline access, CSRF state and PKCE protection.               | `scripts/search-console-lib.test.mjs`            | Unit        | PASS   |
| 2   | The report skips the latest three potentially incomplete days and queries an inclusive 28-day period.                                       | `scripts/search-console-lib.test.mjs`            | Unit        | PASS   |
| 3   | Search Analytics requests are scoped to web search, use automatic aggregation when grouping by page and use property aggregation otherwise. | `scripts/search-console-lib.test.mjs`            | Unit        | PASS   |
| 4   | Query/page pairs at positions 11–20 are marked for content and internal-link work.                                                          | `scripts/search-console-lib.test.mjs`            | Unit        | PASS   |
| 5   | Highly visible pages with a low click-through rate are marked for title and meta-description work; weak and dominant rows are excluded.     | `scripts/search-console-lib.test.mjs`            | Unit        | PASS   |
| 6   | The local OAuth flow writes only a protected refresh token and the live report can read the verified domain property.                       | `npm run seo:gsc:auth`, `npm run seo:gsc:report` | Integration | PASS   |
| 7   | The report retains top queries and top pages even when no automatic opportunity meets its threshold.                                        | `scripts/search-console-lib.test.mjs`            | Unit        | PASS   |

## Current data and known gap

The first 28-day report contains 28 homepage impressions, 1 click and a 5.33
average position. Search Console returned only one query row, with one
impression, and no query/page pair met the monitor's action thresholds. The
property is too new for a defensible commercial-keyword optimization decision.

The existing Search Console property remains untouched; the connector uses
`https://www.googleapis.com/auth/webmasters.readonly` only. Collect a further
four to six weeks of data, then rerun `npm run seo:gsc:report` and prioritize
the surfaced query/page pairs.
