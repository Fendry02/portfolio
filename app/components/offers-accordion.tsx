'use client'

import {
  CaretDown,
  DeviceMobile,
  GlobeHemisphereWest,
  GraduationCap,
  Robot,
  type Icon,
} from '@phosphor-icons/react'
import { useState } from 'react'

type OfferIcon = 'website' | 'app' | 'automation' | 'training'

type Offer = {
  accent: string
  icon: OfferIcon
  title: string
  desc: string
  detail: string
  bullets: string[]
  examples: string[]
}

const offerIcons: Record<OfferIcon, Icon> = {
  website: GlobeHemisphereWest,
  app: DeviceMobile,
  automation: Robot,
  training: GraduationCap,
}

export default function OffersAccordion({ offers }: { offers: Offer[] }) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="mt-8 flex flex-col gap-4">
      {offers.map((offer, index) => {
        const isOpen = openIndex === index
        const panelId = `offer-panel-${index}`
        const Icon = offerIcons[offer.icon]
        return (
          <div
            key={offer.title}
            style={{ '--accent': offer.accent } as React.CSSProperties}
            className={`qclay-offer group relative overflow-hidden rounded-2xl border bg-base-100 ${
              isOpen ? 'is-open border-base-content/15' : 'border-base-300'
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="qclay-offer-trigger flex w-full items-start gap-4 px-6 py-6 text-left sm:gap-5 sm:px-7"
            >
              <span
                aria-hidden="true"
                className="qclay-offer-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-xl sm:h-14 sm:w-14"
                style={{
                  color: offer.accent,
                  backgroundColor: `color-mix(in oklch, ${offer.accent} 14%, transparent)`,
                }}
              >
                <Icon
                  size={30}
                  weight="regular"
                  strokeWidth={1.5}
                  color="currentColor"
                />
              </span>
              <span className="flex-1">
                <span
                  className="mb-2 inline-flex rounded-md border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.14em]"
                  style={{
                    color: offer.accent,
                    borderColor: `color-mix(in oklch, ${offer.accent} 22%, transparent)`,
                    backgroundColor: `color-mix(in oklch, ${offer.accent} 7%, transparent)`,
                  }}
                >
                  Offre {index + 1}
                </span>
                <span
                  className="block text-xl font-bold leading-tight tracking-tight sm:text-2xl"
                  style={{ color: offer.accent }}
                >
                  {offer.title}
                </span>
                <span className="mt-1.5 block text-sm leading-6 text-base-content/60 sm:text-base">
                  {offer.desc}
                </span>
              </span>
              <span
                aria-hidden="true"
                className={`qclay-offer-chevron flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-transform duration-300 ease-[var(--ease-qclay)] ${
                  isOpen ? 'rotate-180' : ''
                }`}
                style={{ color: offer.accent }}
              >
                <CaretDown
                  size={20}
                  weight="bold"
                  strokeWidth={1.5}
                  color="currentColor"
                />
              </span>
            </button>
            <div
              id={panelId}
              className={`qclay-offer-panel grid transition-[grid-template-rows,opacity,transform] duration-300 ease-[var(--ease-qclay)] ${
                isOpen
                  ? 'grid-rows-[1fr] translate-y-0 opacity-100'
                  : 'grid-rows-[0fr] -translate-y-1 opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-6 pb-7 sm:px-7">
                  <div className="hairline mb-5" />
                  <p className="max-w-2xl text-base leading-7 text-base-content/70 sm:text-lg sm:leading-8">
                    {offer.detail}
                  </p>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {offer.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2.5 text-sm text-base-content/70 sm:text-base"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: offer.accent }}
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  {offer.examples.length > 0 && (
                    <div
                      className="mt-6 rounded-xl border px-4 py-3"
                      style={{
                        borderColor: offer.accent,
                        backgroundColor: `color-mix(in oklch, ${offer.accent} 6%, transparent)`,
                      }}
                    >
                      <p
                        className="text-xs font-semibold uppercase tracking-wide"
                        style={{ color: offer.accent }}
                      >
                        Par exemple
                      </p>
                      <ul className="mt-2 flex flex-col gap-1.5">
                        {offer.examples.map((example) => (
                          <li
                            key={example}
                            className="text-sm italic leading-6 text-base-content/70 sm:text-base"
                          >
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <a
                    href="#contact"
                    className="interactive mt-6 inline-flex items-center gap-1.5 text-sm font-medium"
                    style={{ color: offer.accent }}
                  >
                    Discuter de mon projet
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
