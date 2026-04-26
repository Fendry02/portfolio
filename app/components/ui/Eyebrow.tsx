import React from 'react'

interface EyebrowProps {
  children: React.ReactNode
  className?: string
  as?: 'span' | 'p' | 'div'
}

export function Eyebrow({
  children,
  className = '',
  as: Tag = 'span',
}: EyebrowProps) {
  return <Tag className={`eyebrow ${className}`}>{children}</Tag>
}
