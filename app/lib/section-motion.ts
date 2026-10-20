'use client'

import { gsap, ScrollTrigger, SplitText } from '@/app/lib/gsap'

/**
 * Scroll entrances, choreographed by kind of content instead of one fade on
 * every block: headings rise line by line from a mask and pull their lead
 * paragraph in after them, lists arrive row by row, quotes settle, pictures
 * open from a mask.
 *
 * Every entrance fires once, when the element's top reaches 88% of the
 * viewport. Anything already on screen when the page loads is left alone, so
 * nothing painted on the first frame disappears to be animated back in. The
 * hidden states only exist once this script runs, so content stays visible
 * without JavaScript, and the caller skips all of it under reduced motion.
 */

const enterAt = 'top 88%'
const reveal = { duration: 0.8, ease: 'expo.out' } as const

const startsBelowFold = (element: Element) =>
  element.getBoundingClientRect().top >= window.innerHeight

const belowFold = (selector: string) =>
  gsap.utils.toArray<HTMLElement>(selector).filter(startsBelowFold)

function revealHeadings() {
  belowFold('main h1, main h2')
    .filter(
      (heading) =>
        !heading.closest('[data-qclay-scroll-story], .prose') &&
        !heading.querySelector('.qclay-words'),
    )
    .forEach((heading) => {
      const next = heading.nextElementSibling
      const lead = next instanceof HTMLParagraphElement ? next : null
      let hasPlayed = false

      SplitText.create(heading, {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        onSplit: (self) => {
          // A re-split after the entrance (fonts, resize) must not replay it.
          if (hasPlayed) return

          const timeline = gsap.timeline({
            scrollTrigger: { trigger: heading, start: enterAt, once: true },
            onStart: () => {
              hasPlayed = true
            },
          })

          timeline.from(self.lines, {
            yPercent: 110,
            duration: 0.9,
            ease: 'expo.out',
            stagger: 0.09,
          })

          if (lead) {
            timeline.from(lead, { y: 20, autoAlpha: 0, ...reveal }, '-=0.7')
          }

          return timeline
        },
      })
    })
}

function revealGroup(selector: string, hidden: gsap.TweenVars) {
  const items = belowFold(selector)

  if (!items.length) return

  gsap.set(items, { autoAlpha: 0, ...hidden })
  ScrollTrigger.batch(items, {
    start: enterAt,
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        ...reveal,
        stagger: 0.07,
        overwrite: true,
      }),
  })
}

function revealPictures() {
  belowFold('[data-motion="picture"]').forEach((picture) => {
    const radius = getComputedStyle(picture).borderRadius

    gsap.fromTo(
      picture,
      { clipPath: `inset(12% 8% 12% 8% round ${radius})`, scale: 1.04 },
      {
        clipPath: `inset(0% 0% 0% 0% round ${radius})`,
        scale: 1,
        duration: 1.2,
        ease: 'expo.out',
        clearProps: 'clipPath,scale',
        scrollTrigger: { trigger: picture, start: enterAt, once: true },
      },
    )
  })
}

/**
 * The CSS word and stack reveals start on page load. Below the fold they
 * would finish unseen, so rewind them and play them when they enter.
 */
function holdCssReveals() {
  belowFold('.qclay-reveal-stack, .qclay-words').forEach((element) => {
    const animations = element.getAnimations({ subtree: true })

    animations.forEach((animation) => {
      animation.pause()
      animation.currentTime = 0
    })
    ScrollTrigger.create({
      trigger: element,
      start: enterAt,
      once: true,
      onEnter: () => animations.forEach((animation) => animation.play()),
    })
  })
}

export function choreographSections() {
  revealHeadings()
  revealGroup(
    ".qclay-reveal-grid:not([data-motion='settle']) > *, .qclay-reveal-item, .qclay-logo-row > *",
    { y: 24 },
  )
  revealGroup("[data-motion='settle'] > *", { scale: 0.97 })
  revealPictures()
  holdCssReveals()
}

/** Counts a figure up once, from zero to the value it was rendered with. */
export function countUp(element: HTMLElement) {
  const target = Number(element.dataset.motionCount)
  const counter = { value: 0 }

  return gsap.to(counter, {
    value: target,
    duration: 1.1,
    ease: 'expo.out',
    snap: { value: 1 },
    onUpdate: () => {
      element.textContent = `${counter.value}`
    },
  })
}
