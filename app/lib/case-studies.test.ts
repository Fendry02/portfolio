import assert from 'node:assert/strict'
import test from 'node:test'

import { caseStudies, getCaseStudyBySlug } from './case-studies.ts'

test('case studies expose unique, complete routes for proof pages', () => {
  assert.deepEqual(
    caseStudies.map((caseStudy) => caseStudy.slug),
    ['petit-nid', 'electreau-lyon', 'chez-viko'],
  )
  assert.equal(
    new Set(caseStudies.map((caseStudy) => caseStudy.slug)).size,
    caseStudies.length,
  )

  for (const caseStudy of caseStudies) {
    assert.ok(caseStudy.title)
    assert.ok(caseStudy.client)
    assert.ok(caseStudy.sector)
    assert.ok(caseStudy.city)
    assert.ok(caseStudy.challenge)
    assert.ok(caseStudy.solution)
    assert.ok(caseStudy.impact)
    assert.ok(caseStudy.stack.length > 0)
    assert.ok(caseStudy.image)
    assert.ok(caseStudy.imageAlt)
    assert.match(caseStudy.href, /^https:\/\//)
    assert.match(caseStudy.relatedService, /^\/services\//)
    assert.match(caseStudy.publishedAt, /^\d{4}-\d{2}-\d{2}$/)
  }
})

test('case studies can be found by their public slug', () => {
  assert.equal(getCaseStudyBySlug('chez-viko')?.client, 'Chez Viko')
  assert.equal(getCaseStudyBySlug('unknown'), undefined)
})
