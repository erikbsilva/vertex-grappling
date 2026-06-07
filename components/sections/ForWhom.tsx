'use client'

import Image from 'next/image'
import Reveal from '@/components/ui/Reveal'

const cards = [
  {
    tag: 'Never trained',
    headline: "You want to try grappling. You just do not want to do it in front of a class.",
    pains: [
      "You worry someone more experienced might hurt you without meaning to",
      "You do not want to be the one person in the room who has no idea what they are doing",
      "You are not even sure you are in good enough shape to start",
    ],
    result:
      "Your first sessions focus entirely on you. No material to keep up with, no one watching you struggle through the basics.",
  },
  {
    tag: 'Coming back',
    headline: "You trained before. Life got in the way. Now returning feels more complicated than starting.",
    pains: [
      "It is hard to admit how much your skills have faded",
      "You do not love the idea of training next to people who never stopped",
      "You honestly do not know where to pick back up",
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

        {/* Context image */}
        <Reveal className="relative w-full h-56 md:h-72 overflow-hidden mb-8 border border-dark-400">
          <Image
            src="/img/for-whom.webp"
            alt="Private grappling lesson"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-100/80 to-transparent" />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, i) => (
            <Reveal key={card.tag} delay={i * 120} direction={i === 0 ? 'left' : 'right'}>
              <div className="border border-dark-400 bg-dark-200 p-8 flex flex-col gap-6 h-full backdrop-blur-sm hover:border-sand/30 transition-colors duration-200">
                <span className="inline-block border border-sand/40 text-sand text-xs font-semibold tracking-[0.15em] uppercase px-3 py-1 self-start">
                  {card.tag}
                </span>

                <h3 className="text-white font-semibold text-xl leading-snug">
                  {card.headline}
                </h3>

                <ul className="space-y-2">
                  {card.pains.map((pain) => (
                    <li key={pain} className="flex items-start gap-3 text-[#6B7BA8] text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-sand/50 mt-1.5 flex-shrink-0" />
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
