'use client'

import { useInView } from '@/hooks/useInView'

type Props = {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
}

export default function Reveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: Props) {
  const { ref, inView } = useInView()

  const translate = {
    up: 'translateY(28px)',
    left: 'translateX(-24px)',
    right: 'translateX(24px)',
    none: 'none',
  }

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : translate[direction],
        transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}
