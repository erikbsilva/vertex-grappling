import { IDIOMA_LABELS } from '@/lib/types'

const OPENAI_MODEL = 'gpt-4o-mini'

// Translates coach feedback into the student's language using OpenAI.
// Returns null (no translation) if OPENAI_API_KEY isn't configured or the
// request fails — callers fall back to showing the original text.
export async function translateFeedback(text: string, targetIdioma: string): Promise<string | null> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) return null

  const targetLanguage = IDIOMA_LABELS[targetIdioma] ?? targetIdioma

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        temperature: 0.2,
        messages: [
          {
            role: 'system',
            content: `Translate the following jiu-jitsu coaching feedback to ${targetLanguage}. Keep technique names recognizable, keep the tone encouraging, and reply with only the translation.`,
          },
          { role: 'user', content: text },
        ],
      }),
    })

    if (!res.ok) return null

    const data = await res.json()
    const translated = data.choices?.[0]?.message?.content?.trim()
    return translated || null
  } catch {
    return null
  }
}
