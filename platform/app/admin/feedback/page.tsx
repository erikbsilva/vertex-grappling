import { createAdminClient } from '@/lib/supabase/admin'
import { FeedbackForm } from '@/components/admin/FeedbackForm'
import { createFeedback } from './actions'

type FeedbackRow = {
  id: string
  summary_original: string | null
  idioma_traducao: string | null
  visto_em: string | null
  created_at: string
  students: { nome: string } | null
  classes: { data: string; local: string } | null
}

export default async function FeedbackPage() {
  const supabase = createAdminClient()

  const { data: students } = await supabase
    .from('students')
    .select('id, nome')
    .eq('status', 'ativo')
    .order('nome') as { data: { id: string; nome: string }[] | null }

  const { data: classes } = await supabase
    .from('classes')
    .select('id, data, local')
    .order('data', { ascending: false })
    .limit(20) as { data: { id: string; data: string; local: string }[] | null }

  const { data: feedbackEntries } = await supabase
    .from('feedback')
    .select('id, summary_original, idioma_traducao, visto_em, created_at, students(nome), classes(data, local)')
    .order('created_at', { ascending: false })
    .limit(30) as { data: FeedbackRow[] | null }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Feedback</h1>
      <p className="mt-1 text-sm text-gray-400">
        Envie um resumo da aula para o aluno. Se o idioma do aluno for diferente do português e a
        tradução automática estiver configurada, o aluno verá o feedback traduzido.
      </p>

      <div className="card mt-6">
        {!students?.length ? (
          <p className="text-sm text-gray-400">Cadastre alunos ativos antes de enviar feedback.</p>
        ) : (
          <FeedbackForm action={createFeedback} students={students} classes={classes ?? []} />
        )}
      </div>

      <h2 className="mt-10 font-display text-lg font-bold">Histórico recente</h2>
      <div className="card mt-4 overflow-hidden p-0">
        {!feedbackEntries?.length ? (
          <p className="p-6 text-sm text-gray-400">Nenhum feedback enviado ainda.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-navy-400 text-gray-400">
              <tr>
                <th className="px-6 py-3 font-medium">Aluno</th>
                <th className="px-6 py-3 font-medium">Aula</th>
                <th className="px-6 py-3 font-medium">Resumo</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {feedbackEntries.map((entry) => (
                <tr key={entry.id} className="border-b border-navy-400/50 last:border-0">
                  <td className="px-6 py-3 font-medium">{entry.students?.nome ?? '—'}</td>
                  <td className="px-6 py-3 text-gray-400">
                    {entry.classes
                      ? `${new Date(entry.classes.data + 'T00:00:00').toLocaleDateString('pt-BR')} · ${entry.classes.local}`
                      : '—'}
                  </td>
                  <td className="max-w-xs px-6 py-3 text-gray-400">
                    <p className="truncate">{entry.summary_original}</p>
                  </td>
                  <td className="px-6 py-3">
                    {entry.visto_em ? (
                      <span className="badge badge-success">Visto</span>
                    ) : (
                      <span className="badge badge-muted">Não visto</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
