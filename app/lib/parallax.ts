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
  // `+ 0` normalises a `-0` result (e.g. rectTop === 0) to `0`.
  return Math.max(-maxPx, Math.min(maxPx, raw)) + 0
}
