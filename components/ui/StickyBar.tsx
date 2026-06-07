'use client'

import { useEffect, useState } from 'react'

export default function StickyBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      // Show after scrolling past ~100vh
      setVisible(window.scrollY > window.innerHeight * 0.9)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToForm = () => {
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div
      aria-hidden={!visible}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-4 px-6 py-3 bg-dark/95 backdrop-blur-sm border-b border-dark-400"
      style={{
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      {/* Left: brand */}
      <span className="text-white font-semibold text-sm tracking-wide hidden sm:block">
        Vertex <span className="text-sand">Grappling</span>
      </span>

      {/* Center: scarcity nudge */}
      <p className="text-[#6B7BA8] text-xs sm:text-sm">
        Limited to{' '}
        <span className="text-sand font-medium">8 students</span>{' '}
        — currently accepting applications
      </p>

      {/* Right: CTA */}
      <button
        onClick={scrollToForm}
        className="flex-shrink-0 bg-sand text-dark font-semibold text-xs sm:text-sm px-4 sm:px-6 py-2 hover:bg-amber-400 transition-colors duration-200 cursor-pointer tracking-wide"
      >
        Schedule session
      </button>
    </div>
  )
}
