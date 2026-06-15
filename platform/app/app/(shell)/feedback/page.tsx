import { createClient } from '@/lib/supabase/server'
import { MarkSeenButton } from '@/components/app/MarkSeenButton'
import type { Feedback } from '@/lib/types'

export default async function StudentFeedbackPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: student } = await supabase
    .from('students')
    .select('id, idioma')
    .eq('user_id', user!.id)
    .single()

  const { data: feedbackEntries } = await supabase
    .from('feedback')
    .select('*')
    .eq('student_id', student!.id)
    .order('created_at', { ascending: false }) as { data: Feedback[] | null }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Feedback do coach</h1>

      {!feedbackEntries?.length ? (
        <div className="card mt-6">
          <p className="text-sm text-gray-400">Você ainda não recebeu feedback.</p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {feedbackEntries.map((entry) => {
            const showTranslated = entry.idioma_traducao === student?.idioma && entry.summary_translated
            const text = showTranslated ? entry.summary_translated : entry.summary_original

            return (
              <div key={entry.id} className="card text-left">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">
                    {new Date(entry.created_at).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                  {!entry.visto_em && <span className="badge badge-success">Novo</span>}
                </div>

                <p className="mt-2 text-sm">{text}</p>

                {entry.audio_url && <audio controls src={entry.audio_url} className="mt-3 w-full" />}

                {!entry.visto_em && <MarkSeenButton feedbackId={entry.id} />}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
