import Image from 'next/image'

import profile from '@/public/profile.webp'
import { FadeIn } from './ui'

const STACK = [
  'Node.js',
  'TypeScript',
  'PostgreSQL',
  'AWS',
  'Vue.js',
  'Next.js',
] as const

export default function Hero() {
  return (
    <section
      id="home"
      className="relative accent-glow overflow-hidden px-6 md:px-12 pt-24 md:pt-36 pb-32"
    >
      <div className="relative max-w-7xl mx-auto">
        <FadeIn className="flex items-center gap-3 mb-10">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="eyebrow">Open to staff & lead roles · 2026</span>
        </FadeIn>

        <FadeIn delay={100}>
          <h1 className="font-display text-paper text-[length:var(--text-display-xl)] leading-[0.92] tracking-tight">
            Engineering
            <br />
            <span className="italic text-accent">at the speed</span>
            <br />
            of intent.
          </h1>
        </FadeIn>

        <div className="mt-12 grid lg:grid-cols-12 gap-12 items-end">
          <FadeIn delay={300} className="lg:col-span-7 max-w-2xl">
            <p className="text-paper-dim text-lg md:text-xl leading-relaxed">
              I&apos;m{' '}
              <span className="text-paper font-medium">Benoit Bruynbroeck</span>
              , a JavaScript Tech Lead based in France. I architect, ship and
              lead the systems behind ambitious products — quietly, with care.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {STACK.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-xs text-paper-dim border border-line rounded-full px-3 py-1"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#works"
                className="group inline-flex items-center gap-2 bg-accent text-ink font-medium px-5 py-3 rounded-full hover:bg-paper transition-colors"
              >
                See selected work
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-0.5"
                >
                  →
                </span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-paper border border-line hover:border-paper px-5 py-3 rounded-full transition-colors"
              >
                Start a project
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={500} className="lg:col-span-5">
            <figure className="relative ml-auto aspect-[4/5] max-w-[360px]">
              <Image
                src={profile}
                alt="Benoit Bruynbroeck"
                priority
                placeholder="blur"
                className="relative rounded-2xl object-cover"
                sizes="(max-width: 768px) 80vw, 360px"
              />
              <figcaption className="font-mono text-[11px] text-paper-mute tracking-widest uppercase mt-4 flex justify-between">
                <span>FIG. 01</span>
                <span>Benoit Bruynbroeck</span>
              </figcaption>
            </figure>
          </FadeIn>
        </div>
      </div>

      {/* Bottom marker */}
      <div className="absolute bottom-6 left-0 right-0 px-6 md:px-12 max-w-7xl mx-auto flex justify-between font-mono text-[11px] text-paper-mute tracking-widest uppercase">
        <span>EST. 2017</span>
        <span aria-hidden="true">↓ scroll</span>
        <span>BBenoit.fr</span>
      </div>
    </section>
  )
}
