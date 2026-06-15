import { createAdminClient } from '@/lib/supabase/admin'

type RankingRow = {
  student_id: string
  xp_total: number
  streak_atual: number
  streak_recorde: number
  students: { nome: string; faixa: string; grau: number } | null
}

export default async function AdminRankingPage() {
  const supabase = createAdminClient()

  const { data: ranking } = await supabase
    .from('student_stats')
    .select('student_id, xp_total, streak_atual, streak_recorde, students!inner(nome, faixa, grau, status)')
    .eq('students.status', 'ativo')
    .order('xp_total', { ascending: false }) as { data: RankingRow[] | null }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Ranking</h1>
      <p className="mt-1 text-sm text-gray-400">Classificação dos alunos ativos por XP total.</p>

      <div className="card mt-6 overflow-hidden p-0">
        {!ranking?.length ? (
          <p className="p-6 text-sm text-gray-400">Nenhum dado de XP registrado ainda.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-navy-400 text-gray-400">
              <tr>
                <th className="px-6 py-3 font-medium">#</th>
                <th className="px-6 py-3 font-medium">Aluno</th>
                <th className="px-6 py-3 font-medium">Faixa</th>
                <th className="px-6 py-3 font-medium">XP</th>
                <th className="px-6 py-3 font-medium">Streak</th>
              </tr>
            </thead>
            <tbody>
              {ranking.map((row, index) => (
                <tr key={row.student_id} className="border-b border-navy-400 last:border-0">
                  <td className="px-6 py-3 font-display font-bold text-gold">{index + 1}</td>
                  <td className="px-6 py-3">{row.students?.nome}</td>
                  <td className="px-6 py-3 text-gray-400">{row.students?.faixa} · Grau {row.students?.grau}</td>
                  <td className="px-6 py-3 font-display font-bold">{row.xp_total}</td>
                  <td className="px-6 py-3 text-gray-400">{row.streak_atual} (recorde {row.streak_recorde})</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
