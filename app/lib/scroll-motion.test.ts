import assert from 'node:assert/strict'
import test from 'node:test'

import {
  getPageScrollProgress,
  getScrollStoryProgress,
  getScrollStoryStep,
} from './scroll-motion.ts'

test('maps document scroll to a stable zero-to-one progress value', () => {
  const documentHeight = { scrollHeight: 1800, clientHeight: 600 }

  assert.equal(getPageScrollProgress({ ...documentHeight, scrollTop: 0 }), 0)
  assert.equal(getPageScrollProgress({ ...documentHeight, scrollTop: 600 }), 0.5)
  assert.equal(getPageScrollProgress({ ...documentHeight, scrollTop: 1200 }), 1)
})

test('keeps scene progress stable when the document does not overflow', () => {
  assert.equal(
    getPageScrollProgress({ scrollTop: 10, scrollHeight: 600, clientHeight: 600 }),
    0,
  )
})

test('maps a pinned story from its first to its last frame', () => {
  assert.equal(getScrollStoryProgress({ top: 0, height: 3000 }, 1000), 0)
  assert.equal(getScrollStoryProgress({ top: -1000, height: 3000 }, 1000), 0.5)
  assert.equal(getScrollStoryProgress({ top: -2000, height: 3000 }, 1000), 1)
})

test('selects the current chapter while preserving the final frame', () => {
  assert.equal(getScrollStoryStep(0, 3), 0)
  assert.equal(getScrollStoryStep(0.34, 3), 1)
  assert.equal(getScrollStoryStep(0.7, 3), 2)
  assert.equal(getScrollStoryStep(1, 3), 2)
})
