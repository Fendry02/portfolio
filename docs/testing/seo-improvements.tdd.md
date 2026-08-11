# TDD evidence — SEO improvements

## Source

Plan: `docs/superpowers/specs/2026-08-11-seo-improvements-design.md`.

The plan was reviewed as untrusted input before implementation. It contained no
unsafe validation or credential-handling instructions. Lots 1, 2 and 3 were
implemented. The user approved publishing the two initial articles on
2026-08-11. Lot 4 remains an off-code follow-up for Benoit.

## User journeys

1. As a search crawler, I want every static indexable route dated and emitted
   from one registry, so that sitemap `lastmod` values stay accurate.
2. As a potential client, I want dedicated pages for custom applications and
   AI training, so that each advertised service has a relevant landing page.
3. As a prospect assessing proof, I want to browse case studies and open a
   detailed page, so that I can understand the context, response and outcome.
4. As a crawler or visitor, I want a noindex 404 page and correct structured
   data on new pages, so that invalid URLs do not pollute the index.
5. As a reader, I want to find practical articles about n8n and websites, so
   that I can evaluate the relevant service before getting in touch.
6. As a feed reader or crawler, I want the RSS feed and sitemap to include each
   published article, so that new content can be discovered reliably.

## RED evidence

`node --test app/lib/seo.test.ts app/lib/case-studies.test.ts` failed as
intended before Lots 1–2 production changes:

- `app/lib/case-studies.ts` did not exist;
- `createStaticSitemapEntries` did not exist in `app/lib/seo.ts`.

The failures exercised the planned missing route registry and case-study data
contracts, rather than unrelated setup failures.

`node --test app/lib/seo.test.ts app/lib/blog.test.ts` then failed as intended
before Lot 3 production changes:

- `app/lib/blog.ts` did not exist;
- `/blog` was absent from the route registry.

## GREEN evidence

- `npm test`: 44 passing, 0 failing.
- `node --test --experimental-test-coverage app/lib/seo.test.ts
app/lib/case-studies.test.ts app/lib/blog.test.ts`: 94.41% lines, 96.15%
  branches and 90.91% functions for the new SEO/data modules.
- `npm run lint`: passing.
- `npm run build`: passing; two service pages, the case-study index and the
  three static case-study pages are generated, along with the blog index and
  its two static articles.
- `SEO_AUDIT_BASE_URL=http://localhost:3001 npm run seo:audit`: passing against
  the production build, including blog metadata, JSON-LD, sitemap and RSS.
- `node /Users/benoit/.agents/skills/impeccable/scripts/detect.mjs --json …`:
  no mechanical frontend findings on the new surfaces.
- A fresh source-level UI review corrected two minor findings (responsive image
  sizing and duplicate article links) and approved the delivery for shipping.

## Test specification

| #   | What is guaranteed                                                                                         | Test or command                | Type        | Result |
| --- | ---------------------------------------------------------------------------------------------------------- | ------------------------------ | ----------- | ------ |
| 1   | Every static indexable route is unique, dated and mapped one-for-one to sitemap entries                    | `app/lib/seo.test.ts`          | Unit        | PASS   |
| 2   | Every offer has a dedicated service route and the local-business schema has geo, area, hours and languages | `app/lib/seo.test.ts`          | Unit        | PASS   |
| 3   | Case studies have unique public slugs and all required detail fields                                       | `app/lib/case-studies.test.ts` | Unit        | PASS   |
| 4   | New services, case-study pages, sitemap entries and JSON-LD render with their expected SEO contract        | `scripts/seo-audit.mjs`        | Integration | PASS   |
| 5   | A missing URL renders 404, remains noindex and keeps links followable                                      | `scripts/seo-audit.mjs`        | Integration | PASS   |
| 6   | All new routes compile and statically generate                                                             | `npm run build`                | Build       | PASS   |
| 7   | MDX frontmatter yields the expected public articles and service links                                      | `app/lib/blog.test.ts`         | Unit        | PASS   |
| 8   | Blog pages, article JSON-LD, RSS and blog sitemap entries meet their public SEO contract                   | `scripts/seo-audit.mjs`        | Integration | PASS   |

## Known gaps and follow-up

- The global `npm run format` check still reports pre-existing formatting in
  unrelated files. All files touched by this delivery pass the targeted
  Prettier check.
- Browser screenshots could not be captured because the in-app browser was not
  available in this environment. The production build, SEO audit and mechanical
  frontend detector passed; visual browser review should happen before release.
- Lot 4 needs Benoit’s external actions: request legitimate Google reviews,
  obtain approval for client attribution links, submit the new URLs in Search
  Console and monitor coverage.
