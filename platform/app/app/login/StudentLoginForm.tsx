'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export function StudentLoginForm() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    })

    setLoading(false)
    if (error) {
      setError('Não foi possível enviar o link. Confira o e-mail e tente novamente.')
      return
    }
    setSent(true)
  }

  async function handleGoogle() {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    })
  }

  if (sent) {
    return (
      <div className="card text-center text-sm text-gray-300">
        Enviamos um link de acesso para <span className="text-white">{email}</span>.
        Abra seu e-mail e toque no link para entrar.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <button onClick={handleGoogle} className="btn-secondary w-full">
        Continuar com Google
      </button>

      <div className="flex items-center gap-3 text-xs text-gray-500">
        <div className="h-px flex-1 bg-navy-400" />
        ou
        <div className="h-px flex-1 bg-navy-400" />
      </div>

      <form onSubmit={handleMagicLink} className="space-y-4">
        <div>
          <label className="label" htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {error && <p className="text-sm text-danger">{error}</p>}

        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? 'Enviando...' : 'Receber link de acesso'}
        </button>
      </form>
    </div>
  )
}
