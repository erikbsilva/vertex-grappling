'use client'

import { useEffect, useState } from 'react'

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
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

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
          <span className="text-sand">Private lessons.</span> No group class.
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
          One-on-one coaching in Boca Raton for adults who want to start
          or get back into grappling. No class to keep up with. No one
          watching you figure things out.
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
            className="inline-flex items-center gap-3 bg-sand text-dark font-semibold text-base px-8 py-4 rounded-none hover:bg-sand-light transition-colors duration-200 tracking-wide"
          >
            I want to know more
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
          className="mt-8 text-[#3D4F7A] text-sm"
          style={{
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.8s ease 1000ms',
          }}
        >
          UFC coaching credits. Now taking private students in Boca Raton.
        </p>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent" />
    </section>
  )
}
