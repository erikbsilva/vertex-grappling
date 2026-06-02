'use client'

const steps = [
  {
    number: '01',
    title: 'Fill out the form',
    description:
      "Tell me a bit about yourself and what you're looking for. Takes less than a minute.",
  },
  {
    number: '02',
    title: 'I reach out directly',
    description:
      "You'll get a message on WhatsApp within 24 hours. We'll talk briefly to understand your goals and answer any questions.",
  },
  {
    number: '03',
    title: 'First session on your terms',
    description:
      "We schedule your first lesson at a time that works for you. No commitment beyond that first session.",
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
          <p className="text-sand text-sm font-medium tracking-[0.2em] uppercase mb-5">
            How it works
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-snug">
            Three steps to your first session.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-px bg-dark md:bg-dark-400">
          {steps.map((step, i) => (
            <div key={step.number} className="bg-dark p-8 md:p-10 relative">
              {/* Step number */}
              <span className="text-5xl font-bold text-[#1A2040] select-none block mb-6">
                {step.number}
              </span>

              {/* Connector line (desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-[3.5rem] right-0 w-px h-8 bg-dark-400" />
              )}

              <h3 className="text-white font-semibold text-lg mb-3">
                {step.title}
              </h3>
              <p className="text-[#6B7BA8] leading-relaxed text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>

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
      </div>
    </section>
  )
}
