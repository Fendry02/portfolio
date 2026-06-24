import test from 'node:test'
import assert from 'node:assert/strict'

import { step } from './step.ts'

test('step sets the --qov-i stagger custom property', () => {
  assert.deepEqual(step(0), { '--qov-i': 0 })
  assert.deepEqual(step(3), { '--qov-i': 3 })
})
