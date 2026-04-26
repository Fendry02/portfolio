import type { StaticImageData } from 'next/image'

import technical from '@/public/benefits/technical.webp'
import methodology from '@/public/benefits/methodology.webp'
import communication from '@/public/benefits/communication.webp'

export interface Benefit {
  image: StaticImageData
  imageAlt: string
  title: string
  description: string
}

export const BENEFITS: readonly Benefit[] = [
  {
    image: technical,
    imageAlt: 'Technical expertise illustration',
    title: 'Technical Expertise',
    description:
      'Mastery of modern JavaScript, PostgreSQL, and clean coding practices. I deliver robust, scalable solutions that improve performance.',
  },
  {
    image: methodology,
    imageAlt: 'Methodology illustration',
    title: 'Efficient Methodology',
    description:
      'I follow a structured, functional approach that ensures your project is completed on time and within scope, without compromising on quality. My agile methodology includes daily standups, sprint planning, and continuous integration.',
  },
  {
    image: communication,
    imageAlt: 'Communication illustration',
    title: 'Clear Communication',
    description:
      "I am committed to keeping you informed and involved every step of the way. With 24-hour response time guarantee, weekly progress reports, and transparent project tracking, I ensure 100% visibility into your project's development process.",
  },
]
