'use client'

import { useEffect } from 'react'

export default function QClayMotion() {
  useEffect(() => {
    const root = document.documentElement
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const canUsePointerEffects = window.matchMedia(
      '(hover: hover) and (pointer: fine)',
    ).matches

    root.classList.add('qclay-motion-ready')

    if (reduceMotion) {
      return () => root.classList.remove('qclay-motion-ready')
    }

    const revealTargets = Array.from(
      document.querySelectorAll<HTMLElement>('.qclay-scroll-reveal'),
    )
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.16 },
    )

    revealTargets.forEach((target) => observer.observe(target))

    if (!canUsePointerEffects) {
      return () => {
        root.classList.remove('qclay-motion-ready')
        observer.disconnect()
      }
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
      root.classList.remove('qclay-motion-ready')
      observer.disconnect()
      window.removeEventListener('pointermove', updatePointer)
      window.removeEventListener('mousemove', updatePointer)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return null
}
