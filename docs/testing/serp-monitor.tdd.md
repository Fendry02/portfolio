# TDD evidence — SemScraper SERP monitor

## Source

Journeys and acceptance criteria were derived during this implementation from
the request to use SemScraper's API for the local SEO of `bbenoit.fr`.

## User journeys

1. As the portfolio owner, I want a small, local set of Lyon offer queries, so
   that a regular baseline remains within the available API quota.
2. As the portfolio owner, I want desktop and mobile Google positions tracked
   separately, so that device-specific ranking changes are visible.
3. As the portfolio owner, I want the portfolio's organic rank distinguished
   from its absolute SERP position and its main competitors, so that universal
   search blocks do not make the data misleading.
4. As the portfolio owner, I want the API key and generated reports kept out
   of Git, so that local monitoring does not expose credentials or raw data.

## RED evidence

`node --test scripts/serp-monitor-lib.test.mjs` failed before the implementation
with `ERR_MODULE_NOT_FOUND` for `scripts/serp-monitor-lib.mjs`. The new test
target compiled and ran; the failure was solely the missing SERP-monitor
implementation.

A follow-up test for API payload isolation then failed as intended because the
first implementation included `apiKey`, `maxPolls` and `pollIntervalMs` in the
request body. The implementation now sends only SemScraper's supported
search fields.

## GREEN evidence

- `node --test scripts/serp-monitor-lib.test.mjs`: 8 passing, 0 failing.
- `SEMSCRAPER_DRY_RUN=1 npm run seo:serp`: passed without a key or network
  request; it listed 8 requests for Lyon (four offers × desktop/mobile).
- `npm test`: 52 passing, 0 failing.
- `npm run lint`: passed.

## API account check

The live API key was read from `.env.local` without being displayed. On
2026-08-13, SemScraper returned an application-level `402
insufficient_funds` response for the initial query. The API returned HTTP 200
with the error payload; no query IDs were created and the read-only list of
unretrieved SERPs was empty. The `billing/credit` endpoint then reported a
balance of `0`. The monitor now presents this condition directly instead of
incorrectly reporting missing SERP IDs.

## Test specification

| #   | What is guaranteed                                                                                                            | Test or command                         | Type        | Result |
| --- | ----------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ----------- | ------ |
| 1   | The four offer queries are generated for each chosen device using the France/French/Lyon defaults.                            | `scripts/serp-monitor-lib.test.mjs`     | Unit        | PASS   |
| 2   | API credentials and polling settings are not sent to SemScraper.                                                              | `scripts/serp-monitor-lib.test.mjs`     | Unit        | PASS   |
| 3   | A custom valid search configuration overrides the default SERP options.                                                       | `scripts/serp-monitor-lib.test.mjs`     | Unit        | PASS   |
| 4   | The portfolio's organic position remains distinct from the on-page SERP rank; the first ten organic competitors are retained. | `scripts/serp-monitor-lib.test.mjs`     | Unit        | PASS   |
| 5   | An absent result and both `bbenoit.fr` domain forms are handled correctly.                                                    | `scripts/serp-monitor-lib.test.mjs`     | Unit        | PASS   |
| 6   | The executable can preview every outbound request without a key or API call.                                                  | `SEMSCRAPER_DRY_RUN=1 npm run seo:serp` | Integration | PASS   |
| 7   | A SemScraper application error carried in an HTTP 200 response is shown with its real code and message.                       | `scripts/serp-monitor-lib.test.mjs`     | Unit        | PASS   |

## Coverage and known gaps

`node --test --experimental-test-coverage scripts/serp-monitor-lib.test.mjs`
reports 97.39% line, 81.25% branch and 100% function coverage for
`scripts/serp-monitor-lib.mjs`.

The account must be credited or the free-trial allocation activated in
SemScraper before a live ranking report can be created. Once available,
`npm run seo:serp` will run the eight-query baseline.
