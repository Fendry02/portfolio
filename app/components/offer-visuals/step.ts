import type { CSSProperties } from 'react'

/**
 * Stagger index consumed by the `.qov-shape` build-on-expand animation.
 * Pure + JSX-free so it can be unit-tested under `node --test` (which strips
 * types but does not transform JSX).
 */
export function step(i: number): CSSProperties {
  return { ['--qov-i']: i } as CSSProperties
}
