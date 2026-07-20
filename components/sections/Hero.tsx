import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative min-h-dvh flex items-center justify-center overflow-hidden bg-dark">
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
          className="animate-grow-x"
          style={{
            height: '100%',
            background: 'linear-gradient(to right, transparent, #D4A820, transparent)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 sm:py-20 md:py-24 text-center">
        {/* Eyebrow */}
        <p className="animate-fade-up delay-1 text-sand text-sm font-medium tracking-[0.2em] uppercase mb-8">
          Private Grappling Coaching · Boca Raton, FL
        </p>

        {/* Headline */}
        <h1 className="animate-fade-up delay-2 text-3xl sm:text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
          Learn grappling on your own terms.{' '}
          <span className="text-sand">Train solo, or with people you trust.</span> Never more than four in the room.
        </h1>

        {/* Subheadline */}
        <p className="animate-fade-up delay-3 text-lg md:text-xl text-[#9BA8C8] max-w-2xl mx-auto mb-12 leading-relaxed">
          Private and small-group coaching in Boca Raton for adults who
          want to start or get back into grappling, on your terms. No
          class to keep up with. No one watching you figure things out.
        </p>

        {/* CTA */}
        <div className="animate-fade-up delay-4">
          <a
            href="#lead-form"
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
          </a>
        </div>

        {/* Social proof hint */}
        <p className="animate-fade-up delay-5 mt-8 text-[#9BA8C8] text-sm">
          UFC coaching credits. Limited to 8 students at a time, currently accepting applications.
        </p>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent" />
    </section>
  )
}
