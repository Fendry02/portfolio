import assert from 'node:assert/strict'
import test from 'node:test'

import {
  getHeaderScrollState,
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

test('hides the header only after deliberate downward travel', () => {
  const initialState = { isHidden: false, anchorY: 0 }

  assert.deepEqual(getHeaderScrollState(96, initialState), initialState)
  assert.deepEqual(getHeaderScrollState(112, initialState), {
    isHidden: true,
    anchorY: 112,
  })
})

test('keeps the header hidden while scrolling down and reveals it on return', () => {
  const hiddenState = { isHidden: true, anchorY: 112 }
  const fartherDown = getHeaderScrollState(420, hiddenState)

  assert.deepEqual(fartherDown, { isHidden: true, anchorY: 420 })
  assert.deepEqual(getHeaderScrollState(410, fartherDown), fartherDown)
  assert.deepEqual(getHeaderScrollState(404, fartherDown), {
    isHidden: false,
    anchorY: 404,
  })
})

test('always restores the header at the top of the document', () => {
  assert.deepEqual(
    getHeaderScrollState(0, { isHidden: true, anchorY: 420 }),
    { isHidden: false, anchorY: 0 },
  )
})
