'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import { WORKS, type Work } from '../data/works'
import { FadeIn, SectionHeader } from './ui'

export default function Works() {
  const [active, setActive] = useState<Work | null>(null)

  return (
    <section id="works" className="px-6 md:px-12 py-[var(--space-section)]">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          num="03"
          eyebrow="Selected work"
          title={
            <>
              Things I&apos;ve <span className="italic text-accent">built</span>
            </>
          }
        />

        <ul className="mt-16 border-t border-line">
          {WORKS.map((work, idx) => (
            <FadeIn
              as="li"
              key={work.id}
              delay={((idx * 100) as 0 | 100 | 200) || 0}
              className="border-b border-line"
            >
              <button
                type="button"
                onClick={() => setActive(work)}
                className="group w-full grid grid-cols-12 items-center gap-4 py-8 md:py-10 text-left px-2 transition-colors"
              >
                <span className="col-span-1 font-mono text-xs text-paper-mute tabular-nums">
                  0{idx + 1}
                </span>
                <span className="col-span-11 md:col-span-5 font-display text-3xl md:text-5xl text-paper relative">
                  <span className="relative inline-block transition-transform duration-500 group-hover:translate-x-2">
                    {work.title}
                  </span>
                </span>
                <span className="hidden md:block md:col-span-3 font-mono text-xs text-paper-mute tracking-widest uppercase">
                  {work.role}
                </span>
                <span className="hidden md:flex md:col-span-3 justify-end items-center gap-3 font-mono text-xs uppercase tracking-widest text-paper-mute group-hover:text-accent transition-colors">
                  Read case
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
                  >
                    →
                  </span>
                </span>
              </button>
            </FadeIn>
          ))}
        </ul>

        <FadeIn className="mt-10">
          <p className="text-paper-mute">
            Want to see more?{' '}
            <a
              href="mailto:bruy.benoit@gmail.com"
              className="text-accent hover:underline underline-offset-4"
            >
              Email me.
            </a>
          </p>
        </FadeIn>
      </div>

      {active && <WorkDialog work={active} onClose={() => setActive(null)} />}
    </section>
  )
}

function WorkDialog({ work, onClose }: { work: Work; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)

  useEffect(() => {
    previouslyFocused.current = document.activeElement as HTMLElement | null

    document.body.style.overflow = 'hidden'
    document.querySelectorAll('main, header, footer').forEach((el) => {
      ;(el as HTMLElement).inert = true
    })

    closeButtonRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || !dialogRef.current) return
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        last.focus()
        e.preventDefault()
      } else if (!e.shiftKey && document.activeElement === last) {
        first.focus()
        e.preventDefault()
      }
    }

    document.addEventListener('keydown', onKey)

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      document.querySelectorAll('main, header, footer').forEach((el) => {
        ;(el as HTMLElement).inert = false
      })
      previouslyFocused.current?.focus()
    }
  }, [onClose])

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${work.id}-title`}
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
    >
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        tabIndex={-1}
        className="absolute inset-0 bg-ink/80 backdrop-blur-sm overlay-in"
      />
      <div className="surface relative pop-in w-full max-w-3xl mx-4 mb-4 md:mb-0 max-h-[88vh] overflow-y-auto">
        <div className="p-8 md:p-12">
          <div className="flex items-start justify-between gap-6 mb-6">
            <div className="flex items-center gap-4">
              <Image
                src={work.image}
                alt=""
                className="rounded-xl size-12 object-cover"
              />
              <div>
                <p className="eyebrow">Case study</p>
                <h3
                  id={`${work.id}-title`}
                  className="font-display text-3xl md:text-4xl text-paper"
                >
                  {work.title}
                </h3>
              </div>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="text-paper-mute hover:text-paper text-2xl leading-none"
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <p className="eyebrow mt-2 text-accent">{work.role}</p>
          <p className="mt-6 text-paper-dim leading-relaxed">
            {work.description}
          </p>
          <dl className="mt-8 grid sm:grid-cols-2 gap-6 text-sm">
            <div>
              <dt className="eyebrow mb-2">Key Achievements</dt>
              <dd className="text-paper">{work.achievements}</dd>
            </div>
            <div>
              <dt className="eyebrow mb-2">Stack</dt>
              <dd className="text-paper font-mono text-xs leading-relaxed">
                {work.stack}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}
