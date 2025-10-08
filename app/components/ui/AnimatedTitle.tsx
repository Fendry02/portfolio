'use client'

import React from 'react'

import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { CSS_CLASSES } from '../../constants'

interface AnimatedTitleProps {
  children: React.ReactNode
  level?: 1 | 2 | 3 | 4 | 5 | 6
  delay?: number
  className?: string
  id?: string
}

export const AnimatedTitle = ({
  children,
  level = 1,
  delay = 0,
  className = '',
  id,
}: AnimatedTitleProps) => {
  const { ref, isVisible } = useScrollAnimation<HTMLHeadingElement>()

  // Get size classes based on level
  const getSizeClasses = (level: number) => {
    switch (level) {
      case 1:
        return 'text-5xl font-bold max-sm:text-3xl'
      case 2:
        return 'text-4xl font-bold max-sm:text-2xl'
      case 3:
        return 'text-3xl font-bold max-sm:text-xl'
      case 4:
        return 'text-2xl font-bold max-sm:text-lg'
      case 5:
        return 'text-xl font-bold max-sm:text-base'
      case 6:
        return 'text-lg font-bold max-sm:text-sm'
      default:
        return 'text-5xl font-bold max-sm:text-3xl'
    }
  }

  // Get delay class
  const getDelayClass = (delay: number) => {
    if (delay === 0) return ''
    if (delay <= 100) return 'delay-100'
    if (delay <= 200) return 'delay-200'
    if (delay <= 300) return 'delay-300'
    if (delay <= 400) return 'delay-400'
    if (delay <= 500) return 'delay-500'
    return 'delay-500'
  }

  const animationClasses = `
    ${CSS_CLASSES.FADE_IN_UP}
    ${getDelayClass(delay)}
    ${isVisible ? CSS_CLASSES.FADE_IN_UP_VISIBLE : CSS_CLASSES.FADE_IN_UP_HIDDEN}
  `

  const sizeClasses = getSizeClasses(level)

  // Render the appropriate heading element
  if (level === 1) {
    return (
      <h1
        ref={ref}
        id={id}
        className={`${sizeClasses} ${animationClasses} ${className}`}
      >
        {children}
      </h1>
    )
  } else if (level === 2) {
    return (
      <h2
        ref={ref}
        id={id}
        className={`${sizeClasses} ${animationClasses} ${className}`}
      >
        {children}
      </h2>
    )
  } else if (level === 3) {
    return (
      <h3
        ref={ref}
        id={id}
        className={`${sizeClasses} ${animationClasses} ${className}`}
      >
        {children}
      </h3>
    )
  } else if (level === 4) {
    return (
      <h4
        ref={ref}
        id={id}
        className={`${sizeClasses} ${animationClasses} ${className}`}
      >
        {children}
      </h4>
    )
  } else if (level === 5) {
    return (
      <h5
        ref={ref}
        id={id}
        className={`${sizeClasses} ${animationClasses} ${className}`}
      >
        {children}
      </h5>
    )
  } else {
    return (
      <h6
        ref={ref}
        id={id}
        className={`${sizeClasses} ${animationClasses} ${className}`}
      >
        {children}
      </h6>
    )
  }
}
