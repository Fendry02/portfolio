import assert from 'node:assert/strict'
import test from 'node:test'

import { getHeaderScrollState, getScrollStoryStep } from './scroll-motion.ts'

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
  assert.deepEqual(getHeaderScrollState(0, { isHidden: true, anchorY: 420 }), {
    isHidden: false,
    anchorY: 0,
  })
})
