import type { StaticImageData } from 'next/image'

import frontend from '@/public/front-end.webp'
import portable from '@/public/portable.webp'
import server from '@/public/server.webp'

export interface SkillItem {
  name: string
  experience: string
}

export interface SkillCategory {
  title: string
  description: string
  icon: StaticImageData
  iconAlt: string
  items: readonly SkillItem[]
}

export const SKILLS: readonly SkillCategory[] = [
  {
    title: 'Frontend',
    description:
      'I like to code things from scratch, and enjoy bringing ideas to life in the browser',
    icon: frontend,
    iconAlt: 'Frontend development icon',
    items: [
      { name: 'VueJS', experience: '2+ years' },
      { name: 'NextJS', experience: '1+ years' },
      { name: 'Tailwind', experience: '2+ years' },
      { name: 'daisyUI', experience: '2+ years' },
      { name: 'Figma', experience: '3+ years' },
    ],
  },
  {
    title: 'Backend',
    description: 'I enjoy develop clean and efficient RESTful API',
    icon: portable,
    iconAlt: 'Backend development icon',
    items: [
      { name: 'NodeJS', experience: '6+ years' },
      { name: 'TypeScript', experience: '5+ years' },
      { name: 'AWS', experience: '4+ years' },
      { name: 'RabbitMQ', experience: '4+ years' },
      { name: 'Datadog', experience: '3+ years' },
    ],
  },
  {
    title: 'Database',
    description:
      'I genuinely care about building efficient database, and love helping beginners to learn it',
    icon: server,
    iconAlt: 'Database development icon',
    items: [
      { name: 'PostgreSQL', experience: '6+ years' },
      { name: 'Oracle', experience: '3+ years' },
      { name: 'MongoDB', experience: '3+ years' },
      { name: 'Redis', experience: '3+ years' },
      { name: 'Objection.js', experience: '6+ years' },
    ],
  },
]
