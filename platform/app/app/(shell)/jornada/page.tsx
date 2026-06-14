import { createClient } from '@/lib/supabase/server'
import { FAIXAS, type BeltLevel, type Graduation } from '@/lib/types'

const GRAUS = [0, 1, 2, 3, 4]

export default async function JornadaPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: student } = await supabase
    .from('students')
    .select('id, faixa, grau')
    .eq('user_id', user!.id)
    .single()

  const { data: beltLevels } = await supabase
    .from('belt_levels')
    .select('*')
    .order('ordem') as { data: BeltLevel[] | null }

  const { data: graduations } = await supabase
    .from('graduations')
    .select('*')
    .eq('student_id', student!.id)
    .order('data', { ascending: false }) as { data: Graduation[] | null }

  const currentOrdem =
    beltLevels?.find((b) => b.faixa === student?.faixa && b.grau === student?.grau)?.ordem ?? -1

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Jornada</h1>

      <div className="card mt-6">
        <p className="text-sm text-gray-400">Faixa atual</p>
        <p className="mt-1 font-display text-2xl font-bold">
          {student?.faixa} · Grau {student?.grau}
        </p>
      </div>

      <div className="card mt-4 space-y-4">
        {FAIXAS.map((faixa) => (
          <div key={faixa}>
            <p className="text-sm font-medium">{faixa}</p>
            <div className="mt-2 flex gap-2">
              {GRAUS.map((grau) => {
                const ordem = beltLevels?.find((b) => b.faixa === faixa && b.grau === grau)?.ordem ?? -1
                const achieved = ordem !== -1 && ordem <= currentOrdem
                return (
                  <span
                    key={grau}
                    className={`h-3 w-3 rounded-full ${achieved ? 'bg-gold' : 'bg-navy-400'}`}
                  />
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <h2 className="mt-8 font-display text-lg font-bold">Histórico de graduações</h2>
      <div className="card mt-4">
        {!graduations?.length ? (
          <p className="text-sm text-gray-400">Nenhuma graduação registrada ainda.</p>
        ) : (
          <ul className="space-y-3">
            {graduations.map((graduation) => (
              <li key={graduation.id} className="flex items-center justify-between text-sm">
                <span>{graduation.faixa} · Grau {graduation.grau}</span>
                <span className="text-gray-400">
                  {new Date(graduation.data + 'T00:00:00').toLocaleDateString('pt-BR')}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
