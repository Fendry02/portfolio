import assert from 'node:assert/strict'
import test from 'node:test'

import { getActiveProjectIndex } from './project-gallery.ts'

test('selects the most visible project', () => {
  assert.equal(
    getActiveProjectIndex(
      [
        { index: 0, isIntersecting: true, intersectionRatio: 0.32 },
        { index: 1, isIntersecting: true, intersectionRatio: 0.81 },
      ],
      0,
    ),
    1,
  )
})

test('ignores projects that have left the viewport', () => {
  assert.equal(
    getActiveProjectIndex(
      [
        { index: 0, isIntersecting: false, intersectionRatio: 0.9 },
        { index: 1, isIntersecting: true, intersectionRatio: 0.2 },
      ],
      0,
    ),
    1,
  )
})

test('keeps the current project when none are visible', () => {
  assert.equal(
    getActiveProjectIndex(
      [{ index: 2, isIntersecting: false, intersectionRatio: 0 }],
      1,
    ),
    1,
  )
})
