'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Hero() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  const scrollToForm = () => {
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark">
      {/* Hero background image */}
      <div className="absolute inset-0">
        <Image
          src="/img/eriksilvagrapplingcoachhero.webp"
          alt="Erik Silva grappling coach"
          fill
          priority
          className="object-cover object-center"
          style={{ opacity: 0.35 }}
        />
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/40 to-dark" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/70 via-transparent to-dark/70" />
      </div>

      {/* Gold accent line top — grows on load */}
      <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden">
        <div
          style={{
            height: '100%',
            background: 'linear-gradient(to right, transparent, #D4A820, transparent)',
            transform: loaded ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'left center',
            transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 text-center">
        {/* Eyebrow */}
        <p
          className="text-sand text-sm font-medium tracking-[0.2em] uppercase mb-8"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'none' : 'translateY(16px)',
            transition: 'opacity 0.7s ease 200ms, transform 0.7s ease 200ms',
          }}
        >
          Private Grappling Coaching · Boca Raton, FL
        </p>

        {/* Headline */}
        <h1
          className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'none' : 'translateY(20px)',
            transition: 'opacity 0.8s ease 400ms, transform 0.8s ease 400ms',
          }}
        >
          Learn grappling on your own terms.{' '}
          <span className="text-sand">Train solo, or with people you trust.</span> Never more than four in the room.
        </h1>

        {/* Subheadline */}
        <p
          className="text-lg md:text-xl text-[#9BA8C8] max-w-2xl mx-auto mb-12 leading-relaxed"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'none' : 'translateY(16px)',
            transition: 'opacity 0.8s ease 600ms, transform 0.8s ease 600ms',
          }}
        >
          Private and small-group coaching in Boca Raton for adults who
          want to start or get back into grappling, on your terms. No
          class to keep up with. No one watching you figure things out.
        </p>

        {/* CTA */}
        <div
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'none' : 'translateY(12px)',
            transition: 'opacity 0.8s ease 800ms, transform 0.8s ease 800ms',
          }}
        >
          <button
            onClick={scrollToForm}
            className="inline-flex items-center gap-3 bg-sand text-dark font-semibold text-base px-8 py-4 rounded-none hover:bg-sand-light transition-colors duration-200 tracking-wide cursor-pointer"
          >
            Schedule my first session
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8H13M13 8L9 4M13 8L9 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Social proof hint */}
        <p
          className="mt-8 text-[#9BA8C8] text-sm"
          style={{
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.8s ease 1000ms',
          }}
        >
          UFC coaching credits. Limited to 8 students at a time, currently accepting applications.
        </p>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent" />
    </section>
  )
}
