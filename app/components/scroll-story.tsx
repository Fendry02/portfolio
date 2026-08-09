import { MapPinIcon } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'

import profile from '@/public/profile.jpg'

import RevealWords from './reveal-words'
import type { WordSegment } from './reveal-words'

const headline: readonly WordSegment[] = [
  { text: 'Développeur' },
  { text: 'web' },
  { text: 'freelance' },
  { text: 'à' },
  { text: 'Lyon.', accent: true },
]

const accent = 'var(--brand-blue)'

export default function ScrollStory() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="qclay-hero-story"
      data-qclay-scroll-story
      data-story-steps="3"
    >
      <div className="qclay-hero-story-stage">
        <div className="qclay-hero-story-art" aria-hidden="true">
          <span className="qclay-story-shape qclay-story-shape--blue" />
          <span className="qclay-story-shape qclay-story-shape--mint" />
          <span className="qclay-story-shape qclay-story-shape--violet" />
          <span className="qclay-story-shape qclay-story-shape--light" />
        </div>

        <div className="qclay-story-frame qclay-story-frame--intro mx-auto w-full max-w-6xl px-6 lg:px-10">
          <div className="max-w-3xl">
            <h1
              id="hero-heading"
              className="font-display text-[clamp(3.2rem,8vw,7.2rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-base-content"
            >
              <RevealWords segments={headline} baseDelayMs={80} stepMs={34} />
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-base-content/72 md:text-lg md:leading-8">
              Je conçois des sites, applications et automatisations qui rendent
              votre activité plus claire, plus rapide et plus facile à choisir.
            </p>
            <a
              href="#contact"
              className="interactive mt-8 inline-flex items-center gap-2 rounded-lg bg-[color:var(--brand-blue)] px-5 py-3 text-sm font-medium text-white hover:bg-[color:var(--brand-blue-strong)]"
            >
              Discuter de mon projet
              <span aria-hidden="true">→</span>
            </a>
          </div>
          <p className="qclay-story-scroll-hint mt-12 text-xs font-semibold uppercase tracking-[0.18em] text-base-content/55">
            Faites défiler pour entrer dans le projet
          </p>
        </div>

        <div className="qclay-story-frame qclay-story-frame--build mx-auto grid w-full max-w-6xl items-center gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
          <div>
            <h2 className="font-display max-w-xl text-[clamp(2.8rem,6.2vw,6.2rem)] font-semibold leading-[0.94] tracking-[-0.045em] text-base-content">
              Du cadre au déclic.
            </h2>
            <p className="mt-7 max-w-md text-base leading-7 text-base-content/72 md:text-lg md:leading-8">
              Chaque décision commence par rendre l’essentiel évident : votre
              offre, vos priorités, puis le chemin le plus simple vers l’action.
            </p>
          </div>
          <div className="qclay-story-services grid gap-3 sm:grid-cols-3">
            <div>
              <strong>Site</strong>
              <span>Une présence qui inspire confiance.</span>
            </div>
            <div>
              <strong>App</strong>
              <span>Un outil qui suit votre métier.</span>
            </div>
            <div>
              <strong>Automatisation</strong>
              <span>Du temps rendu à votre équipe.</span>
            </div>
          </div>
        </div>

        <div className="qclay-story-frame qclay-story-frame--impact mx-auto grid w-full max-w-6xl items-center gap-10 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-10">
          <div className="qclay-story-portrait relative mx-auto aspect-square w-full max-w-[18rem]">
            <Image
              src={profile}
              alt="Portrait de Benoit Bruynbroeck, développeur full stack JavaScript"
              fill
              sizes="(max-width: 640px) 288px, 320px"
              className="rounded-[38%_62%_55%_45%/48%_42%_58%_52%] object-cover object-[center_32%]"
            />
            <div className="absolute -right-4 top-6 inline-flex items-center gap-1.5 rounded-full border border-base-content/10 bg-base-100/90 px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-base-content/65 shadow-[0_14px_35px_oklch(20.8%_0.042_265.755/0.12)] backdrop-blur-md">
              <MapPinIcon
                aria-hidden="true"
                size={12}
                weight="regular"
                strokeWidth={1.5}
                color={accent}
              />
              Lyon · France
            </div>
          </div>
          <div>
            <p className="font-display text-[clamp(3.2rem,7.5vw,7.2rem)] font-semibold leading-none tracking-[-0.055em] text-[color:var(--brand-blue)]">
              10<span className="align-top text-[0.45em]">+</span>
            </p>
            <h2 className="font-display mt-4 max-w-xl text-[clamp(2.6rem,5.5vw,5.6rem)] font-semibold leading-[0.94] tracking-[-0.045em] text-base-content">
              ans à transformer des idées en produits utiles.
            </h2>
            <p className="mt-7 max-w-lg text-base leading-7 text-base-content/72 md:text-lg md:leading-8">
              Avec un objectif clair : générer des clients, des revenus ou du
              temps gagné — puis vous laisser la main sur une solution durable.
            </p>
          </div>
        </div>

        <div className="qclay-story-progress" aria-hidden="true">
          <span />
        </div>
      </div>
    </section>
  )
}
