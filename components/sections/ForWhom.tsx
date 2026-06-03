'use client'

import Reveal from '@/components/ui/Reveal'

const cards = [
  {
    tag: 'Never trained',
    headline: "You want to try grappling. You just do not want to do it in front of a class.",
    pains: [
      "Afraid of getting hurt by someone more experienced",
      "Do not want to be the person who does not know anything",
      "Not sure if you are in good enough shape to start",
    ],
    result:
      "Your first sessions focus entirely on you. No material to keep up with, no one watching you struggle through the basics.",
  },
  {
    tag: 'Coming back',
    headline: "You trained before. Life got in the way. Now returning feels more complicated than starting.",
    pains: [
      "Skills have faded and that is hard to accept",
      "Do not want to train alongside people who never stopped",
      "Not sure where to pick back up",
    ],
    result:
      "We start from where you actually are, not where you used to be. No comparisons, no pressure to catch up.",
  },
]

export default function ForWhom() {
  return (
    <section className="bg-dark-100 py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6">
        <div className="max-w-xl mb-14">
          <Reveal>
            <p className="text-sand text-sm font-medium tracking-[0.2em] uppercase mb-5">
              Who this is for
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-snug">
              Two different situations. The same solution.
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, i) => (
            <Reveal key={card.tag} delay={i * 120} direction={i === 0 ? 'left' : 'right'}>
              <div className="border border-dark-400 bg-dark-200 p-8 flex flex-col gap-6 h-full">
                <span className="inline-block border border-sand/40 text-sand text-xs font-semibold tracking-[0.15em] uppercase px-3 py-1 self-start">
                  {card.tag}
                </span>

                <h3 className="text-white font-semibold text-xl leading-snug">
                  {card.headline}
                </h3>

                <ul className="space-y-2">
                  {card.pains.map((pain) => (
                    <li key={pain} className="flex items-start gap-3 text-[#6B7BA8] text-sm">
                      <span className="text-sand mt-0.5 flex-shrink-0">—</span>
                      {pain}
                    </li>
                  ))}
                </ul>

                <div className="border-t border-dark-400" />

                <p className="text-[#9BA8C8] text-sm leading-relaxed">
                  {card.result}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
