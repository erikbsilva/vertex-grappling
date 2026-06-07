import Reveal from '@/components/ui/Reveal'

export default function Book() {
  return (
    <section className="bg-dark py-20 md:py-28 border-t border-dark-400">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Book cover placeholder */}
          <Reveal direction="left">
            <div className="relative mx-auto md:mx-0 w-56 md:w-72">
              {/* Shadow layers for 3D book effect */}
              <div className="absolute inset-0 translate-x-3 translate-y-3 bg-sand/10 border border-sand/10" />
              <div className="relative bg-dark-100 border border-dark-400 aspect-[2/3] flex flex-col items-center justify-center p-8 text-center">
                <div className="w-8 h-[2px] bg-sand mb-6" />
                <p className="text-sand text-xs font-medium tracking-[0.25em] uppercase mb-4">
                  Erik Silva
                </p>
                <h3 className="text-white text-2xl font-bold leading-tight mb-4">
                  Beyond<br />Technique
                </h3>
                <div className="w-8 h-[1px] bg-sand/40 mb-4" />
                <p className="text-[#6B7BA8] text-xs leading-relaxed">
                  Principles over patterns.<br />Understanding over memorization.
                </p>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-sand/40 to-transparent" />
              </div>
            </div>
          </Reveal>

          {/* Text */}
          <div>
            <Reveal>
              <p className="text-sand text-sm font-medium tracking-[0.2em] uppercase mb-5">
                The book
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-snug">
                Beyond Technique
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="text-[#9BA8C8] leading-relaxed mb-4">
                Most grappling books teach you moves. This one teaches you how to
                think on the mat. Erik wrote it because he kept seeing the same
                problem: students who could perform techniques in drilling but
                froze the moment anything unexpected happened.
              </p>
              <p className="text-[#9BA8C8] leading-relaxed mb-8">
                The book is a framework, not a catalog. It is what he teaches
                in private sessions — the same principles that guide how he
                coaches Vicente Luque before a title fight and how he coaches a
                40-year-old who just started grappling last month.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <a
                href="https://a.co/d/0aGjchZd"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border border-sand text-sand font-semibold text-sm px-7 py-3 hover:bg-sand hover:text-dark transition-colors duration-200 tracking-wide"
              >
                Get the book
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
