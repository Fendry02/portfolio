# TDD evidence — dependency security remediation

## Source

The task was requested on 2026-07-30 after GitHub Dependabot reported 15
advisories on the default branch. No external implementation plan was
provided. The guarantees below were derived from the repository's npm audit,
test, lint, build and browser verification commands.

## User journeys

1. As the site owner, I want every currently reported npm advisory resolved so
   that the deployed portfolio does not retain a known vulnerable dependency.
2. As a maintainer, I want a repeatable security command so that a future
   advisory fails clearly in local development or CI.
3. As a visitor, I want the dependency upgrades to preserve rendering,
   navigation, generated images and SEO output.

## RED evidence

- Commit: `75a757d` (`test: add failing dependency security audit`)
- `npm run security:audit`: failed with six vulnerable package groups at high
  severity, representing the 15 GitHub advisories.
- Affected package groups: `next`, `postcss`, `sharp`, `brace-expansion`,
  `js-yaml` and `svgo`.

## GREEN evidence

- Commit: `f3a8ecc` (`fix: resolve all dependency vulnerabilities`)
- `npm run security:audit`: `found 0 vulnerabilities`.
- `npm ls --all --json`: no dependency-tree problems.
- `npm test`: 24/24 passing.
- `npm run lint`: passing with ESLint 10.8.0.
- `npm run build`: passing with Next.js 16.2.12; all 18 routes and generated
  images completed.
- `SEO_AUDIT_BASE_URL=http://127.0.0.1:3129
  SEO_SITE_URL=https://www.bbenoit.fr npm run seo:audit`: passing.
- Browser verification at 1440 px and 390 px:
  - homepage and service page returned HTTP 200;
  - navigation to the web-creation service page worked;
  - Open Graph image returned HTTP 200 with `image/png`;
  - no framework overlay, console error, page error, failed response or
    horizontal overflow was detected.

## Dependency changes

- Next.js ecosystem: `16.2.9` to `16.2.12`.
- React and React DOM: `19.2.7` to `19.2.8`.
- PostCSS: `8.5.15` to `8.5.25`.
- Sharp: `0.35.1` to `0.35.3`, also enforced for Next.js through npm
  overrides.
- ESLint: `9.39.4` to `10.8.0`.
- The vulnerable legacy lint dependency chain was replaced by direct use of
  the official Next.js, TypeScript ESLint and React Hooks plugins.
- The lockfile now resolves patched `brace-expansion`, `minimatch`, `js-yaml`
  and `svgo` versions and contains 174 fewer packages.

## Test specification

| # | What is guaranteed | Test or command | Type | Result |
|---|---|---|---|---|
| 1 | The current npm advisory database reports no vulnerable package | `npm run security:audit` | Integration | PASS |
| 2 | The installed dependency graph has no invalid or missing dependency | `npm ls --all --json` | Integration | PASS |
| 3 | Application utilities still satisfy their behavior contracts | `npm test` | Unit | PASS |
| 4 | The upgraded lint stack accepts the codebase | `npm run lint` | Static | PASS |
| 5 | Next.js compiles every route and generated social image with patched Sharp | `npm run build` | Integration | PASS |
| 6 | Public-page metadata, structured data, sitemap and social images remain valid | `scripts/seo-audit.mjs` against the production build | Integration | PASS |
| 7 | Desktop/mobile rendering and navigation work without browser errors | Headless Chromium verification | E2E | PASS |

## Coverage and known gaps

`node --test --experimental-test-coverage "app/**/*.test.ts"` reports:

- Lines: 92.83%
- Branches: 95.65%
- Functions: 87.50%

`npm audit` covers advisories known to npm for the resolved dependency graph;
it is not a general source-code or infrastructure vulnerability scanner. The
`agent-browser` executable was unavailable, so the same browser checks were
performed through Playwright with a local headless Chromium binary.
