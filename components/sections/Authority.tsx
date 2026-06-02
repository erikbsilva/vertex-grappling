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
                I've spent years coaching athletes who compete at the highest level
                in the UFC — and that work has made me a better teacher for
                everyone who steps on the mat with me, regardless of experience.
              </p>
              <p className="text-[#9BA8C8] leading-relaxed mb-10">
                What I've learned is that the gap between a beginner and an
                advanced practitioner isn't talent — it's exposure to the right
                principles at the right time. That's what private coaching gives
                you.
              </p>
            </Reveal>

            <ul className="space-y-3">
              {credentials.map((c, i) => (
                <Reveal key={c} delay={200 + i * 60}>
                  <li className="flex items-center gap-3 text-[#9BA8C8] text-sm">
                    <span className="w-1.5 h-1.5 bg-sand rounded-full flex-shrink-0" />
                    {c}
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>

          {/* Right: quote block */}
          <Reveal direction="right" delay={100}>
            <div className="relative">
              <div className="border border-dark-400 bg-dark-200 p-8 md:p-10">
                <span className="text-sand text-5xl font-bold leading-none select-none block mb-4">
                  "
                </span>
                <blockquote className="text-white text-xl font-medium leading-relaxed mb-6">
                  Technique is what you do. Principles are why it works. When you
                  understand the why, you stop memorizing and start thinking.
                </blockquote>
                <cite className="text-[#6B7BA8] text-sm not-italic">
                  — Erik Silva, author of{' '}
                  <span className="text-sand">Beyond Technique</span>
                </cite>
              </div>
              <div className="absolute -bottom-3 -right-3 w-full h-full border border-sand/20 -z-10" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
