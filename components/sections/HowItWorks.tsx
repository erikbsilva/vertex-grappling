'use client'

import Reveal from '@/components/ui/Reveal'

const steps = [
  {
    number: '01',
    title: 'Fill out the form below',
    description:
      "A few basic questions about your background and what you are looking for. Takes about a minute.",
  },
  {
    number: '02',
    title: 'I message you on WhatsApp',
    description:
      "Usually within 24 hours. We have a short conversation to figure out what makes sense for you.",
  },
  {
    number: '03',
    title: 'We schedule your first session',
    description:
      "Pick a time that works. Show up. See how it feels. No long-term commitment required.",
  },
]

export default function HowItWorks() {
  const scrollToForm = () => {
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="bg-dark py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6">
        <div className="max-w-xl mb-16">
          <Reveal>
            <p className="text-sand text-sm font-medium tracking-[0.2em] uppercase mb-5">
              How it works
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-snug">
              Three steps to your first session.
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-px bg-dark md:bg-dark-400">
          {steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 120}>
              <div className="bg-dark p-8 md:p-10 relative h-full">
                <span className="text-5xl font-bold text-[#1A2040] select-none block mb-6">
                  {step.number}
                </span>
                <h3 className="text-white font-semibold text-lg mb-3">
                  {step.title}
                </h3>
                <p className="text-[#6B7BA8] leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-12 text-center">
            <button
              onClick={scrollToForm}
              className="inline-flex items-center gap-3 border border-sand text-sand font-semibold text-sm px-7 py-3.5 hover:bg-sand hover:text-dark transition-colors duration-200 tracking-wide"
            >
              Get started
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
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
        </Reveal>
      </div>
    </section>
  )
}
