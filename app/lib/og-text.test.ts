import assert from 'node:assert/strict'
import test from 'node:test'

import { truncateForCard } from './og-text.ts'

test('truncateForCard keeps short text untouched', () => {
  assert.equal(
    truncateForCard('Prix d’un site vitrine', 40),
    'Prix d’un site vitrine',
  )
})

test('truncateForCard cuts on a word boundary and drops trailing punctuation', () => {
  assert.equal(
    truncateForCard('Contenus, design, développement, SEO et maintenance', 28),
    'Contenus, design…',
  )
})
