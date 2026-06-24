# Portfolio UX Enhancements — Design

**Date:** 2026-06-25
**Status:** Approved

## Context

The portfolio (Next.js / React / TS) already has a solid CSS-only motion stack:
IntersectionObserver scroll-reveal (`app/components/qclay-motion.tsx`), fade-in-up,
orbiting circles, marquee, hover glows — all respecting `prefers-reduced-motion`.

This work closes two gaps against the saved reference
[[web-conversion-ui-patterns]] (storytelling illustrations, interactive "alive"
elements, micro-animations): the site is text + photo only, and several surfaces
are passive.

**Out of scope:** projects gallery (dropped by user for now).

**Constraints (non-negotiable):**
- No new dependencies — CSS + existing vanilla-JS IntersectionObserver only.
- Animate `transform` / `opacity` / `clip-path` only (compositor-friendly).
- Full `prefers-reduced-motion` fallback on every module.
- Reuse existing design tokens in `app/styles/global.css` (OKLch palette, easings,
  durations) and the existing `.qclay-scroll-reveal` system.

## Modules

### Module 1 — Geometric offer compositions (build-on-expand)

One abstract animated SVG composition per offer, evoking the service:
- **Site web** → grid/blocks assembling
- **App mobile** → device frame + layers sliding in
- **AI audit** → node network connecting
- **Formation** → progressing steps/chevrons

Behaviour:
- **Collapsed:** accordion stays clean/unchanged (at most a small static glyph).
- **Expanded:** the composition "builds" — shapes enter via `transform`/`opacity`
  with a stagger, tinted `--color-primary` / `--color-secondary`.

Architecture:
- New folder `app/components/offer-visuals/` — one small SVG component per offer
  plus an `index.ts` mapping offer id → component.
- `offers-accordion.tsx` triggers the animation via the existing `is-open` class.
- Keyframes added to `app/styles/animations.css`.

### Module 2 — Hero scroll parallax

Portrait + orbiting circles shift subtly (`translateY` via `transform`) with scroll
progress.

Architecture:
- New hook `app/hooks/useScrollParallax.ts` — rAF-driven, gated by IntersectionObserver
  so work only happens while the hero is visible (no scroll-handler churn).
- Hook drives a CSS custom property (e.g. `--parallax-y`) consumed by the hero styles.
- Existing orbit animations preserved. Disabled under `prefers-reduced-motion`.

### Module 3 — Inline form feedback

Contact form (existing Server Action + Resend) gets animated states:
- Button: idle → spinner (submitting) → green checkmark (success) / red cross (error).
- Status message fades in via `opacity` / `translateY`.

Architecture:
- Handled in the form component via the Server Action state
  (`useFormStatus` / returned action state). No toast, no library.
- Transitions added to `app/styles/animations.css`.

### Module 4 — Section heading text-reveal

Apply the existing `.qclay-scroll-reveal` system to still-static headings
(offers, contact, footer eyebrows).

Architecture:
- Mostly class markup; optionally a "heading" variant of the existing reveal keyframe.
- Low risk — reuses existing machinery.

## Delivery sequence

1 → 4 → 3 → 2 (highest impact to most mechanical). Each module committed atomically,
straight to `main` (no PR — see [[portfolio-merge-to-main]]).

## Testing / verification

- Visual check at breakpoints 375 / 768 / 1440.
- Verify `prefers-reduced-motion` disables all new motion.
- Confirm no layout-bound properties are animated.
- Confirm production build passes.
