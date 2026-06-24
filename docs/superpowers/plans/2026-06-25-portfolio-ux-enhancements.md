# Portfolio UX Enhancements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add storytelling geometric visuals to the offers, scroll parallax to the hero, animated contact-form feedback, and a word-by-word reveal on the contact heading — without new dependencies.

**Architecture:** Pure logic (parallax math, visual registry) lives in testable modules under `app/lib/` and `app/components/offer-visuals/`. All motion is CSS keyframes/transitions in `app/styles/animations.css`, driven by classes the existing `QClayMotion` client controller toggles. No new runtime libraries; no React component test harness exists, so visual modules are verified by build + browser screenshots + reduced-motion check.

**Tech Stack:** Next.js 16 (App Router, React 19), TypeScript, Tailwind v4 + DaisyUI, CSS custom properties (OKLch palette), `node --test` for pure-logic unit tests.

## Global Constraints

- No new dependencies. CSS + the existing vanilla-JS `QClayMotion` IntersectionObserver controller only.
- Animate `transform` / `opacity` / `filter` / `clip-path` only. Never animate `width`, `height`, `top`, `left`, `margin`, `padding`, `font-size`.
- Every new motion MUST be disabled in the `@media (prefers-reduced-motion: reduce)` block at the end of `app/styles/animations.css`.
- Reuse existing tokens from `app/styles/global.css` / `animations.css`: easings `--ease-qclay`, `--ease-spring`, `--ease-out`; durations `--duration-fast/base/slow/reveal`; OKLch palette; accent `#2563eb`.
- All `qclay-*` / `qov-*` CSS class naming; PascalCase components; `camelCase` with `use` prefix only for true hooks.
- Pure-logic units get `node --test` tests (`app/**/*.test.ts`, `node:test` + `node:assert/strict`, importing `.ts` with explicit extension). Visual/CSS/SVG units are verified by `npm run build` + browser screenshots at 375 / 768 / 1440 + a reduced-motion pass.
- Run after every task: `npm run format:fix`, `npm run lint`, `npm test`, `npm run build`.
- Commit each task atomically, straight to `main` (no PR — per project convention).

---

### Task 1: Offer visual SVG components + registry

**Files:**
- Create: `app/components/offer-visuals/index.ts`
- Create: `app/components/offer-visuals/SiteWebVisual.tsx`
- Create: `app/components/offer-visuals/AppVisual.tsx`
- Create: `app/components/offer-visuals/AiAuditVisual.tsx`
- Create: `app/components/offer-visuals/FormationVisual.tsx`
- Test: `app/components/offer-visuals/index.test.ts`

**Interfaces:**
- Produces: `OFFER_VISUALS: readonly React.ComponentType[]` (length 4, index-aligned with the `offers` array in `app/page.tsx`) and `step(i: number): React.CSSProperties` (sets the `--qov-i` stagger custom property). Consumed by Task 2.

- [ ] **Step 1: Write the failing test**

```ts
// app/components/offer-visuals/index.test.ts
import test from 'node:test'
import assert from 'node:assert/strict'

import { OFFER_VISUALS, step } from './index.ts'

test('exposes exactly four offer visuals, one per offer', () => {
  assert.equal(OFFER_VISUALS.length, 4)
  OFFER_VISUALS.forEach((Visual) => assert.equal(typeof Visual, 'function'))
})

test('step sets the --qov-i stagger custom property', () => {
  assert.deepEqual(step(2), { '--qov-i': 2 })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — `Cannot find module './index.ts'`.

- [ ] **Step 3: Create the registry + helper**

```ts
// app/components/offer-visuals/index.ts
import type { ComponentType, CSSProperties } from 'react'

import SiteWebVisual from './SiteWebVisual'
import AppVisual from './AppVisual'
import AiAuditVisual from './AiAuditVisual'
import FormationVisual from './FormationVisual'

/** Index-aligned with the `offers` array in app/page.tsx. */
export const OFFER_VISUALS: readonly ComponentType[] = [
  SiteWebVisual,
  AppVisual,
  AiAuditVisual,
  FormationVisual,
]

/** Stagger index consumed by the `.qov-shape` build-on-expand animation. */
export function step(i: number): CSSProperties {
  return { ['--qov-i']: i } as CSSProperties
}
```

- [ ] **Step 4: Create the four SVG components**

Each is server-renderable (no `'use client'`), `aria-hidden`, monochrome via `currentColor` (the container sets the accent color in Task 2), with `.qov-shape` + `step(n)` on every animatable shape.

```tsx
// app/components/offer-visuals/SiteWebVisual.tsx
import { step } from './index'

// Browser window whose content blocks assemble row by row.
export default function SiteWebVisual() {
  return (
    <svg viewBox="0 0 120 80" fill="none" aria-hidden="true" className="qclay-offer-visual">
      <rect className="qov-shape" style={step(0)} x="9" y="11" width="102" height="58" rx="7" stroke="currentColor" strokeWidth="2" />
      <line className="qov-shape" style={step(1)} x1="9" y1="25" x2="111" y2="25" stroke="currentColor" strokeWidth="2" />
      <circle className="qov-shape" style={step(1)} cx="17" cy="18" r="1.8" fill="currentColor" />
      <circle className="qov-shape" style={step(1)} cx="24" cy="18" r="1.8" fill="currentColor" />
      <circle className="qov-shape" style={step(1)} cx="31" cy="18" r="1.8" fill="currentColor" />
      <rect className="qov-shape" style={step(2)} x="18" y="34" width="46" height="6" rx="3" fill="currentColor" />
      <rect className="qov-shape" style={step(3)} x="18" y="45" width="84" height="4" rx="2" fill="currentColor" opacity="0.55" />
      <rect className="qov-shape" style={step(4)} x="18" y="54" width="64" height="4" rx="2" fill="currentColor" opacity="0.4" />
    </svg>
  )
}
```

```tsx
// app/components/offer-visuals/AppVisual.tsx
import { step } from './index'

// Phone frame with UI layers sliding in.
export default function AppVisual() {
  return (
    <svg viewBox="0 0 120 80" fill="none" aria-hidden="true" className="qclay-offer-visual">
      <rect className="qov-shape" style={step(0)} x="44" y="8" width="32" height="64" rx="8" stroke="currentColor" strokeWidth="2" />
      <line className="qov-shape" style={step(0)} x1="55" y1="13" x2="65" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <rect className="qov-shape" style={step(1)} x="50" y="22" width="20" height="12" rx="3" fill="currentColor" opacity="0.5" />
      <rect className="qov-shape" style={step(2)} x="50" y="38" width="20" height="6" rx="3" fill="currentColor" />
      <rect className="qov-shape" style={step(3)} x="50" y="48" width="20" height="6" rx="3" fill="currentColor" opacity="0.55" />
      <circle className="qov-shape" style={step(4)} cx="60" cy="64" r="3" fill="currentColor" />
    </svg>
  )
}
```

```tsx
// app/components/offer-visuals/AiAuditVisual.tsx
import { step } from './index'

// Node network whose links and nodes connect.
export default function AiAuditVisual() {
  return (
    <svg viewBox="0 0 120 80" fill="none" aria-hidden="true" className="qclay-offer-visual">
      <line className="qov-shape" style={step(0)} x1="24" y1="24" x2="60" y2="40" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <line className="qov-shape" style={step(0)} x1="24" y1="56" x2="60" y2="40" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <line className="qov-shape" style={step(1)} x1="60" y1="40" x2="96" y2="24" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <line className="qov-shape" style={step(1)} x1="60" y1="40" x2="96" y2="56" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <circle className="qov-shape" style={step(2)} cx="24" cy="24" r="5" fill="currentColor" />
      <circle className="qov-shape" style={step(2)} cx="24" cy="56" r="5" fill="currentColor" />
      <circle className="qov-shape" style={step(3)} cx="60" cy="40" r="7" fill="currentColor" />
      <circle className="qov-shape" style={step(4)} cx="96" cy="24" r="5" fill="currentColor" opacity="0.7" />
      <circle className="qov-shape" style={step(4)} cx="96" cy="56" r="5" fill="currentColor" opacity="0.7" />
    </svg>
  )
}
```

```tsx
// app/components/offer-visuals/FormationVisual.tsx
import { step } from './index'

// Ascending steps + progress chevron.
export default function FormationVisual() {
  return (
    <svg viewBox="0 0 120 80" fill="none" aria-hidden="true" className="qclay-offer-visual">
      <rect className="qov-shape" style={step(0)} x="20" y="52" width="18" height="16" rx="3" fill="currentColor" opacity="0.45" />
      <rect className="qov-shape" style={step(1)} x="44" y="40" width="18" height="28" rx="3" fill="currentColor" opacity="0.65" />
      <rect className="qov-shape" style={step(2)} x="68" y="26" width="18" height="42" rx="3" fill="currentColor" opacity="0.85" />
      <path className="qov-shape" style={step(3)} d="M22 30 L52 20 L82 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path className="qov-shape" style={step(4)} d="M74 10 L84 9 L83 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm test`
Expected: PASS — both tests green.

- [ ] **Step 6: Format, lint, build**

Run: `npm run format:fix && npm run lint && npm run build`
Expected: all pass (components compile; they are not yet rendered anywhere).

- [ ] **Step 7: Commit**

```bash
git add app/components/offer-visuals/
git commit -m "feat(offers): add geometric SVG visuals + registry for each offer"
```

---

### Task 2: Wire offer visuals into the accordion (build-on-expand)

**Files:**
- Modify: `app/components/offers-accordion.tsx` (add `index`-keyed visual into the expanded panel; lines 81-86 region)
- Modify: `app/styles/animations.css` (add `.qclay-offer-visual` / `.qov-shape` rules + keyframe; extend the reduced-motion block at lines 827-878)
- Verify: browser screenshots (no unit test — presentational/CSS)

**Interfaces:**
- Consumes: `OFFER_VISUALS`, `step` from Task 1.
- Produces: no exported API; renders `OFFER_VISUALS[index]` inside each panel.

- [ ] **Step 1: Render the visual in the expanded panel**

In `app/components/offers-accordion.tsx`, add the import at the top:

```tsx
import { OFFER_VISUALS } from './offer-visuals'
```

Inside the `offers.map((offer, index) => {` body, just after `const panelId = ...`, add:

```tsx
const Visual = OFFER_VISUALS[index]
```

Then, inside the panel content `<div className="px-6 pb-7 sm:px-7">` (currently starts at line 82), insert the visual as the first child, before `<div className="hairline mb-5" />`:

```tsx
<div
  className="qov-frame mb-5 flex items-center justify-center rounded-xl border border-base-300/70 py-5"
  style={{ color: offer.accent }}
>
  {Visual ? <Visual /> : null}
</div>
```

- [ ] **Step 2: Add the build-on-expand CSS**

Append to `app/styles/animations.css` (after the offers block, around line 598):

```css
/* ─── Offer visuals: build when the panel opens ──────────────────────── */
@keyframes qov-build {
  from {
    opacity: 0;
    transform: translate3d(0, 6px, 0) scale(0.92);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
  }
}

.qclay-offer-visual {
  width: clamp(7rem, 22vw, 9rem);
  height: auto;
}

.qov-shape {
  opacity: 0;
  transform-box: fill-box;
  transform-origin: center;
}

.qclay-offer.is-open .qov-shape {
  animation: qov-build 520ms var(--ease-qclay) both;
  animation-delay: calc(140ms + var(--qov-i, 0) * 90ms);
}
```

- [ ] **Step 3: Add reduced-motion fallback**

In the `@media (prefers-reduced-motion: reduce)` block in `app/styles/animations.css`, add `.qov-shape` to the `animation: none` selector list (the group starting at line 828) and to the `opacity: 1` group (line 867), so shapes are simply shown without motion:

```css
  /* add to the existing `animation: none;` selector list */
  .qclay-offer.is-open .qov-shape,
  /* add to the existing `opacity: 1; filter: none;` selector list */
  .qov-shape {
    /* opacity: 1 in the second group; animation: none in the first */
  }
```

(Concretely: append `.qclay-offer.is-open .qov-shape` before the closing `{ animation: none; }` of the first group, and append `.qov-shape` before the closing `{ opacity: 1; filter: none; }` of the last group.)

- [ ] **Step 4: Visual verification**

Run: `npm run dev` (background), then use the browse tool to:
1. Open `http://localhost:3000`, scroll to `#offres`.
2. Click each of the 4 offer headers; screenshot the expanded panel. Expected: a geometric composition in an accent-tinted frame "builds" with a staggered fade/scale.
3. Emulate `prefers-reduced-motion: reduce`, re-open a panel; screenshot. Expected: shapes fully visible, no motion.
4. Screenshot at widths 375 / 768 / 1440. Expected: no overflow; visual scales via `clamp`.

- [ ] **Step 5: Format, lint, build**

Run: `npm run format:fix && npm run lint && npm test && npm run build`
Expected: all pass.

- [ ] **Step 6: Commit**

```bash
git add app/components/offers-accordion.tsx app/styles/animations.css
git commit -m "feat(offers): build-on-expand geometric visual per offer"
```

---

### Task 3: Word-by-word reveal on the contact heading

**Files:**
- Modify: `app/page.tsx` (add `contactHeading` segments near `heroHeadline` at line 172; replace the plain `<h2>` text at lines 340-342)
- Verify: browser screenshot (reuses existing `RevealWords` + `.qclay-word` CSS, already reduced-motion-safe)

**Interfaces:**
- Consumes: existing `RevealWords` component and `WordSegment` type (already imported in `app/page.tsx` at lines 14-15).

- [ ] **Step 1: Define the heading segments**

In `app/page.tsx`, after the `heroHeadline` declaration (ends line 186), add:

```tsx
const contactHeading: readonly WordSegment[] = [
  { text: 'Parlons' },
  { text: 'de' },
  { text: 'votre' },
  { text: 'projet.', accent: true },
]
```

- [ ] **Step 2: Use RevealWords in the contact heading**

Replace lines 340-342:

```tsx
<h2 id="contact-heading" className={`mt-5 ${sectionTitle}`}>
  Parlons de votre projet.
</h2>
```

with:

```tsx
<h2 id="contact-heading" className={`mt-5 ${sectionTitle}`}>
  <RevealWords segments={contactHeading} />
</h2>
```

- [ ] **Step 3: Visual verification**

Run: `npm run dev`, open the site, scroll to `#contact`.
Expected: heading reveals word-by-word with the accent underline on "projet."; the screen-reader-only full phrase is present (the `sr-only` span from `RevealWords`). Under `prefers-reduced-motion`, words are shown statically (handled by existing `.qclay-word` rule in the reduced-motion block, line 867).

- [ ] **Step 4: Format, lint, build**

Run: `npm run format:fix && npm run lint && npm test && npm run build`
Expected: all pass.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx
git commit -m "feat(contact): word-by-word reveal on the contact heading"
```

---

### Task 4: Animated contact-form feedback

**Files:**
- Modify: `app/components/contact-form.tsx` (success card lines 32-47; error message lines 159-163; submit button lines 165-172)
- Modify: `app/styles/animations.css` (add spinner + feedback-in keyframes; extend reduced-motion block)
- Verify: browser screenshots of pending / success / error states

**Interfaces:**
- Consumes: existing `useActionState` state (`state.status`, `pending`) — no signature changes.

- [ ] **Step 1: Add feedback CSS**

Append to `app/styles/animations.css` (before the reduced-motion block):

```css
/* ─── Contact form feedback ──────────────────────────────────────────── */
@keyframes qclay-spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes qclay-feedback-in {
  from {
    opacity: 0;
    transform: translate3d(0, 6px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.qclay-spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid oklch(100% 0 0 / 0.4);
  border-top-color: oklch(100% 0 0);
  border-radius: 9999px;
  animation: qclay-spin 720ms linear infinite;
}

.qclay-feedback-in {
  animation: qclay-feedback-in var(--duration-slow) var(--ease-qclay) both;
}
```

- [ ] **Step 2: Animate the success card**

In `app/components/contact-form.tsx`, add `qclay-feedback-in` to the success card `className` (line 37):

```tsx
className="qclay-feedback-in qclay-subtle-card rounded-xl border border-base-300 bg-base-100 p-8 text-center"
```

- [ ] **Step 3: Animate the error message**

Replace the error `<p>` (lines 160-162) className:

```tsx
<p
  role="alert"
  aria-live="assertive"
  className="qclay-feedback-in text-sm text-red-600"
>
  {state.message}
</p>
```

- [ ] **Step 4: Add a spinner to the submit button**

Replace the button body (lines 169-172) so it shows an animated spinner while pending:

```tsx
{pending ? (
  <>
    <span className="qclay-spinner" aria-hidden="true" />
    Envoi…
  </>
) : (
  <>
    Envoyer le message
    <span aria-hidden="true">→</span>
  </>
)}
```

- [ ] **Step 5: Add reduced-motion fallback**

In the reduced-motion block of `app/styles/animations.css`, add `.qclay-spinner` and `.qclay-feedback-in` to the `animation: none;` group (line 828 region). The spinner stays visible (static ring) and feedback appears without slide.

- [ ] **Step 6: Visual verification**

Run: `npm run dev`. Using the browse tool:
1. Submit empty form → validation errors render (per-field) and the `role="alert"` message fades in. Screenshot.
2. Submit valid data (dev: Resend may fail without key — confirm error path shows the animated `state.status === 'error'` message). Screenshot the spinner during the in-flight request.
3. If a success can be triggered, screenshot the success card entrance.
4. Reduced-motion pass: spinner is a static ring; messages appear without slide.

- [ ] **Step 7: Format, lint, build**

Run: `npm run format:fix && npm run lint && npm test && npm run build`
Expected: all pass.

- [ ] **Step 8: Commit**

```bash
git add app/components/contact-form.tsx app/styles/animations.css
git commit -m "feat(contact): animated submit spinner + success/error feedback"
```

---

### Task 5: Parallax math (pure function + unit test)

**Files:**
- Create: `app/lib/parallax.ts`
- Test: `app/lib/parallax.test.ts`

**Interfaces:**
- Produces: `computeParallaxY(rectTop: number, intensity: number, maxPx: number): number`. Consumed by Task 6.

- [ ] **Step 1: Write the failing test**

```ts
// app/lib/parallax.test.ts
import test from 'node:test'
import assert from 'node:assert/strict'

import { computeParallaxY } from './parallax.ts'

test('returns 0 when the element top is at the viewport top', () => {
  assert.equal(computeParallaxY(0, 0.12, 40), 0)
})

test('moves down as the element scrolls above the viewport top', () => {
  // rectTop = -200 (scrolled 200px past top), intensity 0.12 => 24px, within clamp
  assert.equal(computeParallaxY(-200, 0.12, 40), 24)
})

test('clamps to the max magnitude', () => {
  assert.equal(computeParallaxY(-2000, 0.12, 40), 40)
  assert.equal(computeParallaxY(2000, 0.12, 40), -40)
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — `Cannot find module './parallax.ts'`.

- [ ] **Step 3: Implement the function**

```ts
// app/lib/parallax.ts

/**
 * Vertical parallax offset (px) for an element, from how far its top has
 * scrolled past the viewport top. `rectTop` is the element's
 * getBoundingClientRect().top. `intensity` (0..1) scales the effect; the
 * result is clamped to [-maxPx, maxPx]. Pure + framework-free for testing.
 */
export function computeParallaxY(
  rectTop: number,
  intensity: number,
  maxPx: number,
): number {
  const raw = -rectTop * intensity
  return Math.max(-maxPx, Math.min(maxPx, raw))
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Format, lint, build**

Run: `npm run format:fix && npm run lint && npm run build`
Expected: all pass.

- [ ] **Step 6: Commit**

```bash
git add app/lib/parallax.ts app/lib/parallax.test.ts
git commit -m "feat(hero): add pure computeParallaxY helper with tests"
```

---

### Task 6: Wire hero scroll parallax into QClayMotion

**Files:**
- Modify: `app/components/qclay-motion.tsx` (add a scroll handler driving `--parallax-y` on `.qclay-portrait-wrap`)
- Modify: `app/styles/animations.css` (free the portrait-wrap transform for parallax; add reduced-motion safety)
- Verify: browser screenshots while scrolling

**Interfaces:**
- Consumes: `computeParallaxY` from Task 5.

- [ ] **Step 1: Free the portrait-wrap transform + consume the var**

In `app/styles/animations.css`, the `.qclay-portrait-wrap` rule (lines 419-422) currently uses `qclay-reveal` (which animates `transform`, so it would override parallax). Replace it with an opacity/blur-only entrance and a transform that reads the parallax var:

```css
@keyframes qclay-fade-soft {
  from {
    opacity: 0;
    filter: blur(8px);
  }
  to {
    opacity: 1;
    filter: blur(0);
  }
}

.qclay-portrait-wrap {
  opacity: 0;
  transform: translate3d(0, var(--parallax-y, 0px), 0);
  animation: qclay-fade-soft 860ms var(--ease-qclay) 220ms both;
  will-change: transform;
}
```

(The entrance keyframe no longer declares `transform`, so the inline `transform` with `--parallax-y` is never overridden.)

- [ ] **Step 2: Add the scroll-parallax handler to QClayMotion**

In `app/components/qclay-motion.tsx`, add the import:

```tsx
import { computeParallaxY } from '@/app/lib/parallax'
```

Inside the `useEffect`, after the existing reveal `observer` is set up and BEFORE the `if (!canUsePointerEffects)` early return (so parallax runs even without pointer/hover, but still respects reduced motion via the earlier `if (reduceMotion) return`), add:

```tsx
const PARALLAX_INTENSITY = 0.12
const PARALLAX_MAX_PX = 40
const portrait = document.querySelector<HTMLElement>('.qclay-portrait-wrap')
let parallaxVisible = false
let parallaxFrame = 0

const parallaxObserver = portrait
  ? new IntersectionObserver(
      ([entry]) => {
        parallaxVisible = entry.isIntersecting
      },
      { threshold: 0 },
    )
  : null

const updateParallax = () => {
  if (!portrait || !parallaxVisible || parallaxFrame) return
  parallaxFrame = window.requestAnimationFrame(() => {
    parallaxFrame = 0
    const offset = computeParallaxY(
      portrait.getBoundingClientRect().top,
      PARALLAX_INTENSITY,
      PARALLAX_MAX_PX,
    )
    portrait.style.setProperty('--parallax-y', `${offset.toFixed(1)}px`)
  })
}

if (portrait && parallaxObserver) {
  parallaxObserver.observe(portrait)
  window.addEventListener('scroll', updateParallax, { passive: true })
  updateParallax()
}
```

Then extend BOTH existing cleanup `return` functions (the `if (!canUsePointerEffects)` one near line 39 and the final one near line 81) to also tear down parallax. Add these lines to each cleanup body:

```tsx
parallaxObserver?.disconnect()
window.removeEventListener('scroll', updateParallax)
if (parallaxFrame) window.cancelAnimationFrame(parallaxFrame)
```

(The `if (reduceMotion) return ...` guard at the top already prevents any of this from running under reduced motion, so `--parallax-y` stays at its `0px` default.)

- [ ] **Step 3: Visual verification**

Run: `npm run dev`. Using the browse tool:
1. Open the site at 1440px; scroll the hero out of view slowly; capture 2-3 screenshots at different scroll positions. Expected: the portrait + orbits + stat card drift downward subtly (max ~40px), smoothly, no jank, no layout shift.
2. Confirm the entrance fade still plays on load (opacity/blur), with no upward "snap" conflicting with parallax.
3. Reduced-motion pass: no drift; portrait static.
4. At 375px, confirm no horizontal overflow introduced by the transform.

- [ ] **Step 4: Format, lint, build**

Run: `npm run format:fix && npm run lint && npm test && npm run build`
Expected: all pass.

- [ ] **Step 5: Commit**

```bash
git add app/components/qclay-motion.tsx app/styles/animations.css
git commit -m "feat(hero): subtle scroll parallax on the portrait column"
```

---

## Self-Review

**Spec coverage:**
- Module 1 (geometric offer compositions, build-on-expand) → Tasks 1-2. ✓
- Module 2 (hero scroll parallax) → Tasks 5-6. ✓ Deviation: implemented inside the existing `QClayMotion` controller instead of a new `useScrollParallax` hook, because `app/page.tsx` is a Server Component and `QClayMotion` is the established single client motion controller. Pure math still extracted + unit-tested (`app/lib/parallax.ts`). Documented in Task 6.
- Module 3 (inline form feedback) → Task 4. ✓
- Module 4 (heading text-reveal) → Task 3. ✓ Scope narrowed to the contact `<h2>` (word-by-word parity with the hero) because the offers/contact sections already carry `.qclay-scroll-reveal`; no invented copy. Footer eyebrows intentionally left out (YAGNI).

**Placeholder scan:** No TBD/TODO; every code step contains complete code; reduced-motion changes reference exact line regions and the concrete selectors to extend.

**Type consistency:** `OFFER_VISUALS` / `step` (Task 1) consumed verbatim in Task 2. `computeParallaxY(rectTop, intensity, maxPx)` defined in Task 5, called with the same signature in Task 6. `WordSegment` / `RevealWords` reuse existing exports.

**Constraint check:** All animations use `transform` / `opacity` / `filter` only. Every new motion class is added to the reduced-motion block. No new dependencies.
