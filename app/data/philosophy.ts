export interface Pillar {
  emoji: string
  title: string
  description: string
}

export const PILLARS: readonly Pillar[] = [
  {
    emoji: '⚡',
    title: 'Functional Programming',
    description:
      'I embrace functional programming principles: immutability, pure functions, and composition over inheritance. This approach leads to more predictable, testable, and maintainable code that scales beautifully with your business.',
  },
  {
    emoji: '🧹',
    title: 'Clean Code',
    description:
      "Code is read more often than it's written. I prioritize clean, self-documenting code with meaningful names, small functions, and clear structure. This reduces technical debt and makes future maintenance a breeze.",
  },
  {
    emoji: '📈',
    title: 'Scalable Architecture',
    description:
      'I design systems that grow with your business. From microservices to database optimization, I ensure your architecture can handle increased load, new features, and team growth without breaking a sweat.',
  },
]
