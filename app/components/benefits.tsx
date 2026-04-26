import Image from 'next/image'

import { BENEFITS } from '../data/benefits'
import { FadeIn, SectionHeader, Surface } from './ui'

export default function Benefits() {
  return (
    <section className="px-6 md:px-12 py-[var(--space-section)]">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          num="07"
          eyebrow="What you get"
          title={
            <>
              Working <span className="italic text-accent">with me</span>
            </>
          }
        />

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {BENEFITS.map((benefit, idx) => (
            <FadeIn key={benefit.title} delay={(idx * 200) as 0 | 200 | 400}>
              <Surface className="p-8 md:p-10 flex flex-col h-full">
                <div className="size-16 rounded-xl bg-ink-3 hairline grid place-items-center mb-6">
                  <Image
                    src={benefit.image}
                    alt=""
                    width={36}
                    height={36}
                    className="opacity-90"
                  />
                </div>
                <h3 className="font-display text-3xl text-paper">
                  {benefit.title}
                </h3>
                <p className="mt-4 text-paper-dim leading-relaxed">
                  {benefit.description}
                </p>
              </Surface>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
