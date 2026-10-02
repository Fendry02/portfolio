import assert from 'node:assert/strict'
import test from 'node:test'

import {
  hasNoIndexDirective,
  readAnchorPaths,
  readMainContent,
} from './seo-audit-lib.mjs'

const siteUrl = 'https://www.bbenoit.fr'

test('contextual links exclude navigation, footer and script content', () => {
  const html = `<header><a href="/services">Services</a></header>
    <main><a href="/services/automatisation-n8n-lyon">n8n</a>
    <script>"<a href='/fake'>Fake</a>"</script></main>
    <footer><a href="/services/formation-ia-lyon">IA</a></footer>`

  assert.deepEqual(
    [...readAnchorPaths(readMainContent(html), siteUrl)],
    ['/services/automatisation-n8n-lyon'],
  )
})

test('external links cannot satisfy an internal linking check', () => {
  const html = `<a href="https://other.fr/services">External</a>
    <a href="mailto:hello@example.fr">Email</a>
    <a data-href="/fake">Not a link</a>
    <a href="http://[invalid">Malformed URL</a>
    <a href="javascript:void(0)">Invalid</a>
    <a href="https://www.bbenoit.fr/blog?source=guide#article">Blog</a>
    <a href="/services">Services</a><a href="#contact">Contact</a>`

  assert.deepEqual(
    [...readAnchorPaths(html, siteUrl)],
    ['/blog', '/services', '/'],
  )
})

test('indexability respects robots, Googlebot and HTTP directives', () => {
  for (const html of [
    '<meta name="robots" content="noindex, follow">',
    '<meta content="none" name="googlebot">',
    '<meta name="robots" content="index"><meta name="googlebot" content="NOINDEX">',
  ]) {
    assert.equal(hasNoIndexDirective(html), true)
  }
  assert.equal(hasNoIndexDirective('', 'googlebot: noindex, follow'), true)
  assert.equal(hasNoIndexDirective('', 'none'), true)
  assert.equal(
    hasNoIndexDirective('<meta name="robots" content="index, follow">'),
    false,
  )
  assert.equal(hasNoIndexDirective('', 'max-image-preview:large'), false)
  assert.equal(hasNoIndexDirective('<p>noindex</p>'), false)
  assert.equal(
    hasNoIndexDirective('<meta data-name="robots" content="noindex">'),
    false,
  )
})

test('a missing main element does not fall back to footer links', () => {
  assert.equal(
    readMainContent('<footer><a href="/services">Services</a></footer>'),
    '',
  )
})
