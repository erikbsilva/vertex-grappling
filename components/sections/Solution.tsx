import Reveal from '@/components/ui/Reveal'

const benefits = [
  {
    icon: '◈',
    title: 'Thinking under pressure',
    description:
      'Grappling puts you in uncomfortable situations on purpose. Over time, your brain learns to stay calm and work through them. That carries over.',
  },
  {
    icon: '◈',
    title: 'Confidence that is earned',
    description:
      'Not a mindset exercise. You build it by doing hard things in a controlled environment until they stop feeling hard.',
  },
  {
    icon: '◈',
    title: 'Coordination and body control',
    description:
      'Most adults were never taught how to move well. We fix that. Slowly, deliberately, without making you feel stupid about it.',
  },
  {
    icon: '◈',
    title: 'Strength and conditioning',
    description:
      'You will get physically stronger. Not because we add workouts, but because grappling demands it and your body adapts.',
  },
]

export default function Solution() {
  return (
    <section className="bg-dark py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <Reveal>
            <p className="text-sand text-sm font-medium tracking-[0.2em] uppercase mb-5">
              The method
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-snug">
              Coaching built around{' '}
              <span className="text-sand">principles</span>, not just techniques.
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="text-[#9BA8C8] text-lg leading-relaxed">
              Most instruction is about copying moves. These sessions are
              about understanding why they work. That changes how fast
              you learn and how much you actually retain.
            </p>
            <p className="text-[#9BA8C8] text-lg leading-relaxed mt-4">
              No syllabus to follow. No belt to earn. Each session has
              a clear focus and we work at your pace.
            </p>
          </Reveal>
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 80}>
              <div className="border border-dark-400 bg-dark-100 p-7 hover:border-sand/40 transition-colors duration-200 h-full cursor-default">
                <span className="text-sand text-xl mb-4 block">{b.icon}</span>
                <h3 className="text-white font-semibold text-lg mb-2">
                  {b.title}
                </h3>
                <p className="text-[#6B7BA8] leading-relaxed">{b.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
