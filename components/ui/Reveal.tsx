'use client'

import { useEffect, useState } from 'react'
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
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const translate = {
    up: 'translateY(28px)',
    left: 'translateX(-24px)',
    right: 'translateX(24px)',
    none: 'none',
  }

  // If user prefers reduced motion: render immediately, no transform
  if (reducedMotion) {
    return (
      <Tag ref={ref as any} className={className}>
        {children}
      </Tag>
    )
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
