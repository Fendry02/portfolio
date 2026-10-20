'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

import { gsap, ScrollTrigger, useGSAP } from '@/app/lib/gsap'
import {
  getHeaderScrollState,
  getScrollStoryStep,
} from '@/app/lib/scroll-motion'
import { choreographSections, countUp } from '@/app/lib/section-motion'

export default function QClayMotion() {
  const pathname = usePathname()

  useGSAP(
    () => {
      const root = document.documentElement
      const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      const header = document.querySelector<HTMLElement>('.qclay-site-header')
      let headerState = { isHidden: false, anchorY: window.scrollY }

      root.classList.add('qclay-motion-ready')
      header?.classList.remove('is-hidden')

      if (reduceMotion) {
        return () => root.classList.remove('qclay-motion-ready')
      }

      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          const nextHeaderState = getHeaderScrollState(
            self.scroll(),
            headerState,
          )

          if (nextHeaderState.isHidden !== headerState.isHidden) {
            header?.classList.toggle('is-hidden', nextHeaderState.isHidden)
          }

          headerState = nextHeaderState
        },
      })

      gsap.utils
        .toArray<HTMLElement>('[data-qclay-scroll-story]')
        .forEach((story) => {
          const stepCount = Number(story.dataset.storySteps ?? 1)
          const figure = story.querySelector<HTMLElement>('[data-motion-count]')
          const count = story.querySelector<HTMLElement>('[data-story-count]')
          let hasCounted = false

          story.dataset.storyStep = '0'
          if (figure) figure.textContent = '0'
          // Only the backdrop shapes read the progress: setting it on their
          // container keeps the per-frame style recalc off the text frames.
          const art =
            story.querySelector<HTMLElement>('.qclay-hero-story-art') ?? story

          gsap.fromTo(
            art,
            { '--qclay-story-progress': 0 },
            {
              '--qclay-story-progress': 1,
              ease: 'none',
              scrollTrigger: {
                trigger: story,
                start: 'top top',
                end: 'bottom bottom',
                scrub: true,
                onUpdate: (self) => {
                  const step = getScrollStoryStep(self.progress, stepCount)

                  if (story.dataset.storyStep !== `${step}`) {
                    story.dataset.storyStep = `${step}`
                    if (count) count.textContent = `${step + 1}`
                  }
                  // The figure counts up once, when its chapter comes on stage.
                  if (figure && !hasCounted && step === stepCount - 1) {
                    hasCounted = true
                    countUp(figure)
                  }
                },
              },
            },
          )
        })

      ScrollTrigger.batch('.qclay-scroll-reveal', {
        start: 'top 88%',
        once: true,
        onEnter: (targets) =>
          targets.forEach((target) => target.classList.add('is-visible')),
      })

      choreographSections()

      return () => {
        root.classList.remove('qclay-motion-ready')
        header?.classList.remove('is-hidden')
      }
    },
    { dependencies: [pathname], revertOnUpdate: true },
  )

  useEffect(() => {
    const canUsePointerEffects = window.matchMedia(
      '(hover: hover) and (pointer: fine)',
    ).matches

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !canUsePointerEffects
    ) {
      return
    }

    const interactiveTargets = Array.from(
      document.querySelectorAll<HTMLElement>('.qclay-tilt, .qclay-hero'),
    )
    let frame = 0

    const updatePointer = (event: MouseEvent | PointerEvent) => {
      if (frame) return

      frame = window.requestAnimationFrame(() => {
        frame = 0

        interactiveTargets.forEach((target) => {
          const rect = target.getBoundingClientRect()
          const x = event.clientX - rect.left
          const y = event.clientY - rect.top

          if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
            return
          }

          const xPercent = (x / rect.width) * 100
          const yPercent = (y / rect.height) * 100
          const tiltX = ((y / rect.height - 0.5) * -5).toFixed(2)
          const tiltY = ((x / rect.width - 0.5) * 5).toFixed(2)

          target.style.setProperty('--spot-x', `${xPercent.toFixed(2)}%`)
          target.style.setProperty('--spot-y', `${yPercent.toFixed(2)}%`)
          target.style.setProperty('--tilt-x', `${tiltX}deg`)
          target.style.setProperty('--tilt-y', `${tiltY}deg`)
        })
      })
    }

    window.addEventListener('pointermove', updatePointer, { passive: true })
    window.addEventListener('mousemove', updatePointer, { passive: true })

    return () => {
      window.removeEventListener('pointermove', updatePointer)
      window.removeEventListener('mousemove', updatePointer)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [pathname])

  return null
}
