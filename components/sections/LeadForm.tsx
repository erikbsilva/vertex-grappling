'use client'

import { useState } from 'react'

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function LeadForm() {
  const [state, setState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [form, setForm] = useState({
    nome: '',
    whatsapp: '',
    email: '',
    ja_treinou: '' as 'yes' | 'no' | '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.ja_treinou) return

    setState('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Something went wrong.')
      }

      setState('success')
    } catch (err: unknown) {
      setState('error')
      setErrorMsg(err instanceof Error ? err.message : 'Please try again.')
    }
  }

  return (
    <section id="lead-form" className="bg-dark py-20 md:py-28">
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sand text-sm font-medium tracking-[0.2em] uppercase mb-5">
            Take the first step
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-snug">
            Book your private lesson.
          </h2>
          <p className="text-[#6B7BA8] leading-relaxed">
            Fill out the form below. I'll reach out on WhatsApp within 24 hours
            to talk through your goals and schedule your first session.
          </p>
        </div>

        {state === 'success' ? (
          <div className="border border-sand/30 bg-dark-100 p-10 text-center">
            <div className="w-12 h-12 border border-sand/40 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M4 10L8 14L16 6"
                  stroke="#C4A46B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="text-white font-semibold text-xl mb-3">
              Got it. I'll be in touch soon.
            </h3>
            <p className="text-[#6B7BA8] text-sm leading-relaxed">
              You'll receive a WhatsApp message within 24 hours. If you have
              any questions in the meantime, reach me at{' '}
              <a
                href="https://instagram.com/erikgrapplingcoach"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sand hover:underline"
              >
                @erikgrapplingcoach
              </a>
              .
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="border border-dark-400 bg-dark-100 p-8 md:p-10 space-y-6"
          >
            {/* Full name */}
            <div>
              <label className="block text-[#9BA8C8] text-sm mb-2" htmlFor="nome">
                Full name <span className="text-sand">*</span>
              </label>
              <input
                id="nome"
                name="nome"
                type="text"
                required
                value={form.nome}
                onChange={handleChange}
                placeholder="John Smith"
                className="w-full bg-dark-200 border border-dark-400 text-white placeholder-[#2D3A5C] px-4 py-3 text-sm focus:outline-none focus:border-sand/60 transition-colors"
              />
            </div>

            {/* WhatsApp */}
            <div>
              <label className="block text-[#9BA8C8] text-sm mb-2" htmlFor="whatsapp">
                WhatsApp <span className="text-sand">*</span>
              </label>
              <input
                id="whatsapp"
                name="whatsapp"
                type="tel"
                required
                value={form.whatsapp}
                onChange={handleChange}
                placeholder="+1 (561) 000-0000"
                className="w-full bg-dark-200 border border-dark-400 text-white placeholder-[#2D3A5C] px-4 py-3 text-sm focus:outline-none focus:border-sand/60 transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-[#9BA8C8] text-sm mb-2" htmlFor="email">
                Email <span className="text-sand">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full bg-dark-200 border border-dark-400 text-white placeholder-[#2D3A5C] px-4 py-3 text-sm focus:outline-none focus:border-sand/60 transition-colors"
              />
            </div>

            {/* Training background */}
            <div>
              <p className="text-[#9BA8C8] text-sm mb-3">
                Have you trained any martial art before?{' '}
                <span className="text-sand">*</span>
              </p>
              <div className="grid grid-cols-2 gap-3">
                {(['yes', 'no'] as const).map((val) => (
                  <label
                    key={val}
                    className={`flex items-center justify-center gap-2 border py-3 cursor-pointer text-sm font-medium transition-colors ${
                      form.ja_treinou === val
                        ? 'border-sand bg-sand/10 text-sand'
                        : 'border-dark-400 text-[#6B7BA8] hover:border-dark-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="ja_treinou"
                      value={val}
                      checked={form.ja_treinou === val}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    {val === 'yes' ? 'Yes, I have' : 'No, never'}
                  </label>
                ))}
              </div>
            </div>

            {/* Error */}
            {state === 'error' && (
              <p className="text-red-400 text-sm">{errorMsg}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={state === 'loading' || !form.ja_treinou}
              className="w-full bg-sand text-dark font-semibold text-sm py-4 hover:bg-sand-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 tracking-wide"
            >
              {state === 'loading' ? 'Sending...' : 'Book my private lesson →'}
            </button>

            <p className="text-[#3D4F7A] text-xs text-center">
              No spam. No hard sell. Just a conversation about whether this is
              right for you.
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
