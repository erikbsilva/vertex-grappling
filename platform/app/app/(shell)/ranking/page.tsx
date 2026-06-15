import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

type RankingRow = {
  student_id: string
  xp_total: number
  students: { nome: string; faixa: string; grau: number } | null
}

export default async function RankingPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: student } = await supabase
    .from('students')
    .select('id')
    .eq('user_id', user!.id)
    .single()

  const admin = createAdminClient()
  const { data: ranking } = await admin
    .from('student_stats')
    .select('student_id, xp_total, students!inner(nome, faixa, grau, status)')
    .eq('students.status', 'ativo')
    .order('xp_total', { ascending: false }) as { data: RankingRow[] | null }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Ranking</h1>
      <p className="mt-1 text-sm text-gray-400">Classificação por XP total.</p>

      <div className="card mt-6 overflow-hidden p-0">
        {!ranking?.length ? (
          <p className="p-6 text-sm text-gray-400">Nenhum dado de XP registrado ainda.</p>
        ) : (
          <ul>
            {ranking.map((row, index) => {
              const isMe = row.student_id === student?.id
              return (
                <li
                  key={row.student_id}
                  className={`flex items-center justify-between border-b border-navy-400 px-6 py-3 text-sm last:border-0 ${
                    isMe ? 'bg-navy-300' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-display font-bold text-gold">{index + 1}</span>
                    <div>
                      <p className="font-medium">
                        {row.students?.nome} {isMe && <span className="text-xs text-gray-400">(você)</span>}
                      </p>
                      <p className="text-xs text-gray-500">{row.students?.faixa} · Grau {row.students?.grau}</p>
                    </div>
                  </div>
                  <span className="font-display font-bold">{row.xp_total} XP</span>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
