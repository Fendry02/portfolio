import Image from 'next/image'

import { SKILLS } from '../data/skills'
import { Eyebrow, FadeIn, SectionHeader, Surface } from './ui'

const SPANS = ['md:col-span-7', 'md:col-span-5', 'md:col-span-12'] as const

export default function Skills() {
  return (
    <section
      id="skills"
      className="px-6 md:px-12 py-[var(--space-section)] bg-ink-2/40"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader num="02" eyebrow="Capabilities" title="What I do best" />

        <div className="mt-16 grid md:grid-cols-12 gap-4 md:gap-6">
          {SKILLS.map((skill, idx) => (
            <FadeIn
              key={skill.title}
              delay={(idx * 100) as 0 | 100 | 200}
              className={SPANS[idx]}
            >
              <Surface className="p-8 md:p-10 h-full">
                <div className="flex items-start justify-between gap-6 mb-8">
                  <div>
                    <Eyebrow>Domain · 0{idx + 1}</Eyebrow>
                    <h3 className="font-display text-paper text-4xl md:text-5xl mt-2">
                      {skill.title}
                    </h3>
                  </div>
                  <div className="shrink-0 size-14 rounded-full bg-ink-3 hairline grid place-items-center">
                    <Image
                      src={skill.icon}
                      alt=""
                      height={28}
                      width={28}
                      className="opacity-90"
                    />
                  </div>
                </div>
                <p className="text-paper-dim leading-relaxed mb-8 max-w-md">
                  {skill.description}
                </p>
                <ul className="border-t border-line divide-y divide-line/60">
                  {skill.items.map((item) => (
                    <li
                      key={item.name}
                      className="py-3 flex items-baseline justify-between gap-4"
                    >
                      <span className="text-paper">{item.name}</span>
                      <span
                        className="font-mono text-xs text-paper-mute tabular-nums"
                        aria-label={`${item.experience} of experience`}
                      >
                        {item.experience}
                      </span>
                    </li>
                  ))}
                </ul>
              </Surface>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
