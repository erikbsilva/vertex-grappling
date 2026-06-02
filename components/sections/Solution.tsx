const benefits = [
  {
    icon: '◈',
    title: 'Reasoning under pressure',
    description:
      'Grappling trains your brain to stay calm and think clearly when things get uncomfortable — on and off the mat.',
  },
  {
    icon: '◈',
    title: 'Real self-confidence',
    description:
      'Not the kind you read about — the kind that comes from knowing you can handle difficult situations with your body and your mind.',
  },
  {
    icon: '◈',
    title: 'Coordination & body awareness',
    description:
      'Most adults have never been taught how to move efficiently. Private lessons change that, at whatever pace works for you.',
  },
  {
    icon: '◈',
    title: 'Functional strength & agility',
    description:
      "You'll get stronger doing something that actually makes sense — not isolated exercises for the sake of it.",
  },
]

export default function Solution() {
  return (
    <section className="bg-dark py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-sand text-sm font-medium tracking-[0.2em] uppercase mb-5">
            The method
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-snug">
            Private lessons built around{' '}
            <span className="text-sand">principles</span>, not just moves.
          </h2>
          <p className="text-[#A0A0A0] text-lg leading-relaxed">
            Most martial arts instruction is about memorizing techniques. This
            is different. Every session is designed to help you understand{' '}
            <em>why</em> something works — so you can adapt, problem-solve, and
            actually retain what you learn.
          </p>
          <p className="text-[#A0A0A0] text-lg leading-relaxed mt-4">
            No curriculum to keep up with. No belt to chase. Just you, the
            coach, and a clear purpose for every session.
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="border border-dark-400 bg-dark-100 p-7 hover:border-sand/30 transition-colors duration-300"
            >
              <span className="text-sand text-xl mb-4 block">{b.icon}</span>
              <h3 className="text-white font-semibold text-lg mb-2">
                {b.title}
              </h3>
              <p className="text-[#707070] leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
