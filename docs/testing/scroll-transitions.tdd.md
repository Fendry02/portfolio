# Scroll transitions — TDD evidence

## Source

User journey derived during this implementation: as a visitor, I want one
continuous visual scene to evolve with my scroll so that the portfolio feels
like a connected story, not isolated sections moving independently.

## Evidence

| # | What is guaranteed | Test | Result |
| --- | --- | --- | --- |
| 1 | The document position maps continuously from 0 at the top to 1 at the bottom. | `app/lib/scroll-motion.test.ts` | PASS |
| 2 | A non-scrolling document produces a stable scene value of 0. | `app/lib/scroll-motion.test.ts` | PASS |
| 3 | A pinned story maps from its first to last frame as it traverses its scroll range. | `app/lib/scroll-motion.test.ts` | PASS |
| 4 | The final story frame remains selected at exactly 100% progress. | `app/lib/scroll-motion.test.ts` | PASS |
| 5 | The project gallery selects the most visible project. | `app/lib/project-gallery.test.ts` | PASS |
| 6 | A project that leaves the viewport cannot remain selected. | `app/lib/project-gallery.test.ts` | PASS |
| 7 | The active project is preserved between visible project ranges. | `app/lib/project-gallery.test.ts` | PASS |
| 8 | The project gallery does not use a transform-based section reveal. | `app/components/layout-contract.test.ts` | PASS |
| 9 | The project flow does not clip the sticky visual scene. | `app/components/layout-contract.test.ts` | PASS |
| 10 | The avatar wrapper cannot cast a square shadow behind the portrait. | `app/components/layout-contract.test.ts` | PASS |
| 11 | The project scene retains the 16:10 horizontal capture ratio. | `app/components/layout-contract.test.ts` | PASS |
| 12 | The header hides only after deliberate downward travel. | `app/lib/scroll-motion.test.ts` | PASS |
| 13 | The header remains stable when scrolling down and reappears on return. | `app/lib/scroll-motion.test.ts` | PASS |
| 14 | The header is always restored at the top of the page. | `app/lib/scroll-motion.test.ts` | PASS |

## RED → GREEN

- RED: `npm test` failed because the pinned-story progress and step helpers did
  not yet exist.
- RED: `npm test` failed because the project-gallery selection helper did not
  yet exist.
- GREEN: `npm test` passed with 31 tests.
- RED: `npm test` found the gallery still wrapped in a transform-based reveal,
  clipped by its parent, and the avatar wrapper still casting a square shadow.
- GREEN: `node --test app/components/layout-contract.test.ts` passed with 3
  targeted regression tests.
- RED: `node --test app/components/layout-contract.test.ts` showed that the
  project stage forced a tall minimum height instead of the capture ratio.
- GREEN: the same command passed with 4 targeted regression tests after the
  stage adopted the native 16:10 ratio.
- RED: `node --test app/lib/scroll-motion.test.ts` could not import the new
  header-scroll state helper because it had not been implemented.
- GREEN: the same command passed with 7 focused scroll tests once the header
  state machine was added.

## Validation

- `npm test` — PASS (38 tests)
- `npm run lint` — PASS
- `npm run build` — PASS
- `curl http://127.0.0.1:3000/` — PASS (HTTP 200)

No coverage command is configured in `package.json`; the focused unit tests
cover all branches of the pure scroll-motion helper. Browser-level motion is
left to visual review because it depends on compositor rendering and user
preference media queries.

## Home visual system

The homepage now carries the same scene-led visual language from the pinned
opening through client proof, offers, case studies, testimonials and contact.
This is CSS presentation work that preserves the existing links, forms and
content structure; it is covered by the complete test suite, lint and a
production build rather than a separate browser assertion.

The case-study area is now a scroll-led gallery: Intersection Observer chooses
the most visible narrative for the pinned visual scene, while hover and focus
give visitors direct control. The selection rule itself is a pure helper with
focused unit coverage above.

The gallery now keeps the scene visible through the narrative column on desktop:
it is no longer transformed by the generic section reveal or clipped by the
project section. The hero portrait retains its organic image shape without a
square wrapper shadow.

All three project captures are 1440×900 (16:10), and the visual scene now uses
that same horizontal proportion instead of a viewport-driven tall canvas.

The header now uses a small directional hysteresis: it hides after a deliberate
downward read, stays stable through small movements, returns after a measured
upward gesture, and remains visible for reduced-motion visitors.
