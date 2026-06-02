import Reveal from '@/components/ui/Reveal'

export default function Agitation() {
  return (
    <section className="bg-dark-100 py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <Reveal>
          <p className="text-sand text-sm font-medium tracking-[0.2em] uppercase mb-6">
            Sound familiar?
          </p>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 leading-snug">
            The perfect moment never comes.
          </h2>
        </Reveal>

        <div className="space-y-5 text-[#9BA8C8] text-lg leading-relaxed">
          <Reveal delay={150}>
            <p>
              You've been thinking about it for months — maybe years. You'll
              start when you're in better shape. When work slows down. When
              you find the right gym. When you feel ready.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p>
              But none of those conditions ever fully arrive. And every week you
              wait, the idea of walking into a room full of strangers and looking
              like a beginner feels heavier.
            </p>
          </Reveal>
          <Reveal delay={250}>
            <p className="text-white font-medium">
              The problem isn't your schedule or your fitness level. It's the
              environment — and that's exactly what private coaching solves.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
