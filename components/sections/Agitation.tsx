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
            You keep waiting for the right time.
          </h2>
        </Reveal>

        <div className="space-y-5 text-[#9BA8C8] text-lg leading-relaxed">
          <Reveal delay={150}>
            <p>
              When you get in better shape. When work settles down.
              When you find a gym that feels right.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p>
              That moment rarely shows up. And the longer you wait, the
              more uncomfortable the idea of walking into a room full of
              strangers becomes.
            </p>
          </Reveal>
          <Reveal delay={250}>
            <p className="text-white font-medium">
              The issue is not your fitness level or your schedule.
              It is the group class format. Private coaching removes that entirely.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
