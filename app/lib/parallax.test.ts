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
