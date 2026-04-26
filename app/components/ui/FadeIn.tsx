'use client'

import React from 'react'

import { useScrollAnimation } from '../../hooks/useScrollAnimation'

type FadeInProps<T extends React.ElementType> = {
  as?: T
  delay?: 0 | 100 | 200 | 300 | 400 | 500 | 600
  className?: string
  children: React.ReactNode
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'delay' | 'className' | 'children'>

const DELAY_CLASSES: Record<NonNullable<FadeInProps<'div'>['delay']>, string> = {
  0: '',
  100: 'delay-100',
  200: 'delay-200',
  300: 'delay-300',
  400: 'delay-400',
  500: 'delay-500',
  600: 'delay-700',
}

export function FadeIn<T extends React.ElementType = 'div'>({
  as,
  delay = 0,
  className = '',
  children,
  ...rest
}: FadeInProps<T>) {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>()
  const Tag = (as || 'div') as React.ElementType

  const visibility = isVisible
    ? 'opacity-100 translate-y-0'
    : 'opacity-0 translate-y-8'

  return (
    <Tag
      ref={ref}
      className={`transition-all duration-700 ${DELAY_CLASSES[delay]} ${visibility} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
