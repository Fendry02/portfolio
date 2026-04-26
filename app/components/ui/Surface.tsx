import React from 'react'

type SurfaceProps<T extends React.ElementType> = {
  as?: T
  className?: string
  hover?: boolean
  children: React.ReactNode
} & Omit<
  React.ComponentPropsWithoutRef<T>,
  'as' | 'className' | 'hover' | 'children'
>

export function Surface<T extends React.ElementType = 'div'>({
  as,
  className = '',
  hover = true,
  children,
  ...rest
}: SurfaceProps<T>) {
  const Tag = (as || 'div') as React.ElementType
  return (
    <Tag
      className={`surface ${
        hover ? 'hover:border-paper-mute transition-colors duration-500' : ''
      } ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
