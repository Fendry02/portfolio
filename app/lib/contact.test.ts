import test from 'node:test'
import assert from 'node:assert/strict'

import {
  contactSchema,
  isLikelyBot,
  escapeHtml,
  buildSubject,
  buildHtml,
} from './contact.ts'

const valid = {
  name: 'Marie Dupont',
  email: 'marie@example.com',
  projectType: 'Site vitrine',
  message: 'Bonjour, je voudrais un site pour mon activité.',
}

test('contactSchema accepts valid input', () => {
  assert.equal(contactSchema.safeParse(valid).success, true)
})

test('contactSchema rejects a short name', () => {
  assert.equal(contactSchema.safeParse({ ...valid, name: 'M' }).success, false)
})

test('contactSchema rejects an invalid email', () => {
  assert.equal(
    contactSchema.safeParse({ ...valid, email: 'nope' }).success,
    false,
  )
})

test('contactSchema rejects an unknown project type', () => {
  assert.equal(
    contactSchema.safeParse({ ...valid, projectType: 'Fusée' }).success,
    false,
  )
})

test('contactSchema rejects a too-short message', () => {
  assert.equal(
    contactSchema.safeParse({ ...valid, message: 'court' }).success,
    false,
  )
})

test('isLikelyBot flags a filled honeypot', () => {
  assert.equal(isLikelyBot('http://spam', 5000), true)
})

test('isLikelyBot flags a too-fast submission', () => {
  assert.equal(isLikelyBot('', 800), true)
})

test('isLikelyBot passes a normal submission', () => {
  assert.equal(isLikelyBot('', 5000), false)
})

test('escapeHtml escapes angle brackets and quotes', () => {
  assert.equal(escapeHtml('<script>"&\''), '&lt;script&gt;&quot;&amp;&#39;')
})

test('buildSubject builds a subject with type and name', () => {
  assert.equal(
    buildSubject(valid),
    'Nouveau contact — Site vitrine — Marie Dupont',
  )
})

test('buildHtml escapes user content in the body', () => {
  const html = buildHtml({ ...valid, message: '<b>hi</b>' })
  assert.ok(html.includes('&lt;b&gt;hi&lt;/b&gt;'))
  assert.ok(!html.includes('<b>hi</b>'))
})
