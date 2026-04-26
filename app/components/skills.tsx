import Image from 'next/image'

import { SKILLS } from '../data/skills'
import { AnimatedTitle, FadeIn } from './ui'

const ICON_SIZE = 72

const POSITION_CLASSES = [
  'rounded-t-xl border-0 lg:rounded-xl',
  'overflow-auto border-t lg:border-0 lg:rounded-xl',
  'overflow-auto border-t lg:border-0 rounded-b-xl lg:rounded-xl',
] as const

const DELAYS = [0, 200, 400] as const

export default function Skills() {
  return (
    <section id="skills" className="text-center px-16 max-sm:px-8">
      <div className="mx-auto columns-1 lg:columns-3 gap-x-8">
        {SKILLS.map((skill, idx) => (
          <FadeIn
            key={skill.title}
            delay={DELAYS[idx]}
            className={`relative bg-base-100 shadow-lg -top-16 ${POSITION_CLASSES[idx]}`}
          >
            <figure>
              <Image
                src={skill.icon}
                alt={skill.iconAlt}
                height={ICON_SIZE}
                width={ICON_SIZE}
                className="mx-auto pt-8"
              />
            </figure>
            <div className="card-body overflow-auto text-center">
              <AnimatedTitle level={2} className="card-title mx-auto">
                {skill.title}
              </AnimatedTitle>
              <p className="sm:h-24">{skill.description}</p>
              <p className="text-secondary">Technologies & Experience</p>
              <ul className="list-none space-y-2">
                {skill.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex justify-between items-center"
                  >
                    <span>{item.name}</span>
                    <span className="text-sm text-secondary">
                      {item.experience}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
