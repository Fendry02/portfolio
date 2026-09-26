import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import test from 'node:test'

import {
  canAutoplayShowreel,
  getShowreelChapterIndex,
  showreelChapters,
  showreelVideo,
  createShowreelVideoJsonLd,
} from './showreel.ts'
import { absoluteUrl } from './seo.ts'

test('maps playback time to the chapter being watched', () => {
  assert.equal(getShowreelChapterIndex(0), 0)
  assert.equal(getShowreelChapterIndex(7.9), 0)
  assert.equal(getShowreelChapterIndex(8), 1)
  assert.equal(getShowreelChapterIndex(21.99), 2)
  assert.equal(getShowreelChapterIndex(30), showreelChapters.length - 1)
})

test('chapters start in order and stay inside the video', () => {
  showreelChapters.forEach((chapter, index) => {
    assert.ok(chapter.start < showreelVideo.duration)
    if (index > 0) assert.ok(chapter.start > showreelChapters[index - 1].start)
  })
})

test('the video and its poster ship with the site', () => {
  for (const path of [
    showreelVideo.src,
    showreelVideo.poster,
    showreelVideo.portraitSrc,
    showreelVideo.portraitPoster,
  ]) {
    assert.ok(existsSync(new URL(`../../public${path}`, import.meta.url)), path)
  }
})

test('describes the video for search engines with absolute URLs', () => {
  const showreelVideoJsonLd = createShowreelVideoJsonLd(absoluteUrl, 'fr-FR')
  assert.equal(showreelVideoJsonLd['@type'], 'VideoObject')
  assert.equal(showreelVideoJsonLd.duration, 'PT30S')
  assert.equal(
    showreelVideoJsonLd.contentUrl,
    'https://www.bbenoit.fr/video/bbenoit-showreel.mp4',
  )
  assert.equal(
    showreelVideoJsonLd.thumbnailUrl,
    'https://www.bbenoit.fr/video/showreel-poster.jpg',
  )
  assert.equal(
    (showreelVideoJsonLd.hasPart as unknown[]).length,
    showreelChapters.length,
  )
})

test('autoplays only when motion and data are not restricted', () => {
  assert.equal(
    canAutoplayShowreel({ reducedMotion: false, saveData: false }),
    true,
  )
  assert.equal(
    canAutoplayShowreel({ reducedMotion: true, saveData: false }),
    false,
  )
  assert.equal(
    canAutoplayShowreel({ reducedMotion: false, saveData: true }),
    false,
  )
})
