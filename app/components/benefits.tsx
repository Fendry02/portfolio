import Image from 'next/image'

import { BENEFITS } from '../data/benefits'
import { AnimatedTitle, FadeIn } from './ui'

const DELAYS = [0, 200, 400] as const

export default function Benefits() {
  return (
    <section className="text-center p-16 max-sm:p-8 max-sm:pt-0">
      <AnimatedTitle level={1}>Benefits of working with me</AnimatedTitle>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8 max-w-6xl mx-auto">
        {BENEFITS.map((benefit, idx) => (
          <FadeIn
            key={benefit.title}
            delay={DELAYS[idx]}
            className="card rounded-box place-items-center p-8 shadow-lg flex flex-col"
          >
            <div className="relative w-full aspect-square max-w-[200px] max-h-[200px]">
              <Image
                src={benefit.image}
                alt={benefit.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                className="rounded-2xl object-contain"
              />
            </div>
            <AnimatedTitle level={3} className="py-4 text-secondary">
              {benefit.title}
            </AnimatedTitle>
            <p className="flex-grow">{benefit.description}</p>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
