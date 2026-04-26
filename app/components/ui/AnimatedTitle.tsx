import React from 'react'

import { FadeIn } from './FadeIn'

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

interface AnimatedTitleProps {
  children: React.ReactNode
  level?: HeadingLevel
  delay?: 0 | 100 | 200 | 300 | 400 | 500 | 600
  className?: string
  id?: string
}

const SIZE_CLASSES: Record<HeadingLevel, string> = {
  1: 'text-5xl font-bold max-sm:text-3xl',
  2: 'text-4xl font-bold max-sm:text-2xl',
  3: 'text-3xl font-bold max-sm:text-xl',
  4: 'text-2xl font-bold max-sm:text-lg',
  5: 'text-xl font-bold max-sm:text-base',
  6: 'text-lg font-bold max-sm:text-sm',
}

export function AnimatedTitle({
  children,
  level = 1,
  delay = 0,
  className = '',
  id,
}: AnimatedTitleProps) {
  const Tag = `h${level}` as const
  return (
    <FadeIn
      as={Tag}
      delay={delay}
      id={id}
      className={`${SIZE_CLASSES[level]} ${className}`}
    >
      {children}
    </FadeIn>
  )
}
