import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const caseStudiesSource = readFileSync(
  new URL('./case-studies.tsx', import.meta.url),
  'utf8',
)
const scrollStorySource = readFileSync(
  new URL('./scroll-story.tsx', import.meta.url),
  'utf8',
)
const animationStyles = readFileSync(
  new URL('../styles/animations.css', import.meta.url),
  'utf8',
)

test('the project gallery is not wrapped in a scroll-reveal transform', () => {
  assert.doesNotMatch(
    caseStudiesSource,
    /qclay-flow-projects qclay-scroll-reveal/,
  )
})

test('the project flow does not clip the sticky project stage', () => {
  assert.match(
    animationStyles,
    /\.qclay-flow-projects\s*\{\s*overflow:\s*visible;/,
  )
})

test('the avatar portrait wrapper does not cast a square shadow', () => {
  assert.doesNotMatch(
    animationStyles,
    /\.qclay-story-portrait\s*\{\s*box-shadow:/,
  )
  assert.match(scrollStorySource, /qclay-story-portrait/)
})
