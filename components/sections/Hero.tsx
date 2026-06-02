'use client'

export default function Hero() {
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

      {/* Gold accent line top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sand to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 text-center">
        {/* Eyebrow */}
        <p className="text-sand text-sm font-medium tracking-[0.2em] uppercase mb-8">
          Private Grappling Coaching · Boca Raton, FL
        </p>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
          Train at your own pace.{' '}
          <span className="text-sand">No class, no judgment,</span> no rush.
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-[#A0A0A0] max-w-2xl mx-auto mb-12 leading-relaxed">
          One-on-one grappling lessons for adults who want to start — or
          restart — without the pressure of a group class. You set the pace.
          The mat is yours.
        </p>

        {/* CTA */}
        <button
          onClick={scrollToForm}
          className="inline-flex items-center gap-3 bg-sand text-dark font-semibold text-base px-8 py-4 rounded-none hover:bg-sand-light transition-colors duration-200 tracking-wide"
        >
          I want to know more
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 8H13M13 8L9 4M13 8L9 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Social proof hint */}
        <p className="mt-8 text-[#505050] text-sm">
          Coaching athletes who compete at the highest levels — and adults who
          are just getting started.
        </p>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent" />
    </section>
  )
}
