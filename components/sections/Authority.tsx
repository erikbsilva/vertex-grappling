import Image from 'next/image'
import Reveal from '@/components/ui/Reveal'

const credentials = [
  'Black belt in grappling / wrestling',
  'Grappling coach — Vicente Luque (UFC)',
  'Grappling coach — Viviane Araújo (UFC)',
  'Author — "Beyond Technique"',
  'NPF Sports Grappling Coach of the Year',
  'Based in Boca Raton, FL',
]

export default function Authority() {
  return (
    <section className="bg-dark-100 py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left: text */}
          <div>
            <Reveal>
              <p className="text-sand text-sm font-medium tracking-[0.2em] uppercase mb-5">
                Your coach
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-snug">
                Erik Silva
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="text-[#9BA8C8] leading-relaxed mb-6">
                I coach UFC fighters for a living. Vicente Luque, Viviane Araujo.
                That work is demanding and I take it seriously.
              </p>
              <p className="text-[#9BA8C8] leading-relaxed mb-10">
                I also train regular adults who have never competed and never will.
                The principles I use are the same. The pace is different.
                Beginners are not a side project for me. They are part of why
                I wrote the book.
              </p>
            </Reveal>

            <ul className="space-y-3">
              {credentials.map((c, i) => (
                <Reveal key={c} as="li" delay={200 + i * 60} className="flex items-center gap-3 text-[#9BA8C8] text-sm">
                  <span className="w-1.5 h-1.5 bg-sand rounded-full flex-shrink-0" />
                  {c}
                </Reveal>
              ))}
            </ul>
          </div>

          {/* Right: photo + quote */}
          <Reveal direction="right" delay={100}>
            <div className="flex flex-col gap-6">
              {/* Portrait photo */}
              <div className="relative w-full aspect-[6/7] overflow-hidden border border-dark-400">
                <Image
                  src="/img/erik-portrait.webp"
                  alt="Erik Silva, grappling coach"
                  fill
                  className="object-cover object-top"
                />
                {/* Subtle bottom fade */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-dark-100 to-transparent" />
              </div>

              {/* Quote */}
              <div className="relative border border-dark-400 bg-dark-200 p-7">
                <span className="text-sand text-4xl font-bold leading-none select-none block mb-3">
                  "
                </span>
                <blockquote className="text-white text-lg font-medium leading-relaxed mb-4">
                  Technique tells you what to do. Principles tell you why it works.
                  Once you understand the why, you stop needing to memorize anything.
                </blockquote>
                <cite className="text-[#6B7BA8] text-sm not-italic">
                  Erik Silva, <span className="text-sand">Beyond Technique</span>
                </cite>
                <div className="absolute -bottom-2 -right-2 w-full h-full border border-sand/20 -z-10" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
