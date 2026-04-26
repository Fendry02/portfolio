'use client'

import React from 'react'

import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { CSS_CLASSES } from '../../constants'

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

interface AnimatedTitleProps {
  children: React.ReactNode
  level?: HeadingLevel
  delay?: number
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

const getDelayClass = (delay: number) => {
  if (delay <= 0) return ''
  if (delay <= 100) return 'delay-100'
  if (delay <= 200) return 'delay-200'
  if (delay <= 300) return 'delay-300'
  if (delay <= 400) return 'delay-400'
  return 'delay-500'
}

export const AnimatedTitle = ({
  children,
  level = 1,
  delay = 0,
  className = '',
  id,
}: AnimatedTitleProps) => {
  const { ref, isVisible } = useScrollAnimation<HTMLHeadingElement>()
  const Tag = `h${level}` as const

  const animationClasses = `
    ${CSS_CLASSES.FADE_IN_UP}
    ${getDelayClass(delay)}
    ${isVisible ? CSS_CLASSES.FADE_IN_UP_VISIBLE : CSS_CLASSES.FADE_IN_UP_HIDDEN}
  `

  return (
    <Tag
      ref={ref}
      id={id}
      className={`${SIZE_CLASSES[level]} ${animationClasses} ${className}`}
    >
      {children}
    </Tag>
  )
}
