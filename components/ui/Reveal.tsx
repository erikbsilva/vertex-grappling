'use client'

import { useInView } from '@/hooks/useInView'

type Props = {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
  as?: keyof JSX.IntrinsicElements
}

export default function Reveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  as,
}: Props) {
  const { ref, inView } = useInView()
  const Tag = (as ?? 'div') as React.ElementType

  const translate = {
    up: 'translateY(28px)',
    left: 'translateX(-24px)',
    right: 'translateX(24px)',
    none: 'none',
  }

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : translate[direction],
        transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
      }}
    >
      {children}
    </Tag>
  )
}
