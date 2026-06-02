'use client'

const cards = [
  {
    tag: 'Never trained',
    headline: "You want to start. You just don't want to start in a room full of strangers.",
    pains: [
      "Worried you'll get hurt",
      "Don't want to look lost in front of a class",
      "Not sure if you're even physically ready",
    ],
    result:
      "You'll learn the foundations with full attention on you — no rushing through material, no one watching you struggle.",
  },
  {
    tag: 'Coming back',
    headline: "You trained before. Stopping was hard. Returning feels harder.",
    pains: [
      "Skills have faded and that's frustrating",
      "Don't want to be judged by people who kept training",
      "Unsure where to pick up without looking like a beginner",
    ],
    result:
      "Private sessions let you rebuild at your own level — no comparisons, no awkwardness, just focused work on what matters to you now.",
  },
]

export default function ForWhom() {
  return (
    <section className="bg-dark-100 py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6">
        <div className="max-w-xl mb-14">
          <p className="text-sand text-sm font-medium tracking-[0.2em] uppercase mb-5">
            Who this is for
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-snug">
            Two different situations. The same solution.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card) => (
            <div
              key={card.tag}
              className="border border-dark-400 bg-dark-200 p-8 flex flex-col gap-6"
            >
              {/* Tag */}
              <span className="inline-block border border-sand/40 text-sand text-xs font-semibold tracking-[0.15em] uppercase px-3 py-1 self-start">
                {card.tag}
              </span>

              {/* Headline */}
              <h3 className="text-white font-semibold text-xl leading-snug">
                {card.headline}
              </h3>

              {/* Pain points */}
              <ul className="space-y-2">
                {card.pains.map((pain) => (
                  <li key={pain} className="flex items-start gap-3 text-[#707070] text-sm">
                    <span className="text-sand mt-0.5 flex-shrink-0">—</span>
                    {pain}
                  </li>
                ))}
              </ul>

              {/* Divider */}
              <div className="border-t border-dark-400" />

              {/* Result */}
              <p className="text-[#C0BDB8] text-sm leading-relaxed">
                {card.result}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
