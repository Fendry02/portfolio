import React from 'react'

type Delay = 0 | 100 | 200 | 300 | 400 | 500 | 600

type FadeInProps<T extends React.ElementType> = {
  as?: T
  delay?: Delay
  className?: string
  children: React.ReactNode
} & Omit<
  React.ComponentPropsWithoutRef<T>,
  'as' | 'delay' | 'className' | 'children'
>

const RANGE_BY_DELAY: Record<Delay, string> = {
  0: 'entry 0% cover 25%',
  100: 'entry 5% cover 28%',
  200: 'entry 10% cover 30%',
  300: 'entry 14% cover 33%',
  400: 'entry 18% cover 36%',
  500: 'entry 22% cover 38%',
  600: 'entry 26% cover 40%',
}

export function FadeIn<T extends React.ElementType = 'div'>({
  as,
  delay = 0,
  className = '',
  children,
  style,
  ...rest
}: FadeInProps<T>) {
  const Tag = (as || 'div') as React.ElementType
  return (
    <Tag
      className={`fade-up ${className}`}
      style={
        {
          ...(style as object),
          ['--fade-range' as string]: RANGE_BY_DELAY[delay],
        } as React.CSSProperties
      }
      {...rest}
    >
      {children}
    </Tag>
  )
}
