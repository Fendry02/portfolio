'use client'

import Lenis from 'lenis'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { gsap, ScrollTrigger } from '@/app/lib/gsap'

/** Matches `scroll-padding-top: 5.5rem` so anchors clear the fixed header. */
const anchorOffset = -88

/**
 * Smooth scrolling with Lenis, driven by the GSAP ticker so ScrollTrigger and
 * Lenis read the same scroll position on the same frame.
 *
 * Lenis keeps native scrolling (no transformed wrapper), so `position: sticky`,
 * `scrollY` listeners and IntersectionObservers keep working unchanged.
 * Visitors who prefer reduced motion get the browser's native scroll.
 */
export default function SmoothScroll() {
  const pathname = usePathname()
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      autoRaf: false,
      anchors: { offset: anchorOffset },
      lerp: 0.14,
    })
    const tick = (time: number) => lenis.raf(time * 1000)

    lenisRef.current = lenis
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  useEffect(() => {
    // Next.js resets the scroll position on navigation; resync Lenis with it.
    lenisRef.current?.scrollTo(window.scrollY, { immediate: true, force: true })
    lenisRef.current?.resize()
    ScrollTrigger.refresh()
  }, [pathname])

  return null
}
