import Reveal from '@/components/ui/Reveal'

const testimonials = [
  {
    quote:
      "I'm 42 and I was convinced I was too old and too out of shape to start. Erik had me rolling in the first session. He meets you exactly where you are.",
    name: 'Mark R.',
    context: 'Started at 42, no prior experience',
  },
  {
    quote:
      "I had tried a group class before and quit after two weeks because I felt lost and embarrassed. Private sessions with Erik are completely different. I can actually ask questions.",
    name: 'David L.',
    context: 'Returned after quitting group classes',
  },
  {
    quote:
      "The fact that he coaches UFC fighters made me nervous at first. Turns out that's what makes him a better teacher — he knows exactly what breaks down and why.",
    name: 'Carlos M.',
    context: 'Training for 8 months',
  },
]

export default function Testimonials() {
  return (
    <section className="bg-dark-100 py-20 md:py-28 border-t border-dark-400">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-14">
            <p className="text-sand text-sm font-medium tracking-[0.2em] uppercase mb-5">
              Students
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-snug">
              Regular people. Real results.
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <div className="relative border border-dark-400 bg-dark-200 p-7 h-full flex flex-col">
                <span className="text-sand text-3xl font-bold leading-none select-none mb-4 block">
                  "
                </span>
                <p className="text-[#9BA8C8] leading-relaxed text-sm flex-1 mb-6">
                  {t.quote}
                </p>
                <div className="border-t border-dark-400 pt-4">
                  <p className="text-white text-sm font-semibold">{t.name}</p>
                  <p className="text-[#6B7BA8] text-xs mt-0.5">{t.context}</p>
                </div>
                <div className="absolute -bottom-1.5 -right-1.5 w-full h-full border border-sand/10 -z-10" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
