import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'
import type { ClassSession } from '@/lib/types'

export default async function ClassesPage() {
  const supabase = createAdminClient()
  const { data: classes } = await supabase
    .from('classes')
    .select('*')
    .order('data', { ascending: false })
    .order('horario', { ascending: false, nullsFirst: false }) as { data: ClassSession[] | null }

  const today = new Date().toISOString().slice(0, 10)

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold">Aulas</h1>
        <Link href="/admin/classes/new" className="btn-primary">
          Nova aula
        </Link>
      </div>

      <div className="card mt-6 overflow-hidden p-0">
        {!classes?.length ? (
          <p className="p-6 text-sm text-gray-400">Nenhuma aula registrada ainda.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-navy-400 text-gray-400">
              <tr>
                <th className="px-6 py-3 font-medium">Data</th>
                <th className="px-6 py-3 font-medium">Horário</th>
                <th className="px-6 py-3 font-medium">Local</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((classSession) => (
                <tr key={classSession.id} className="border-b border-navy-400/50 last:border-0 hover:bg-navy-300/40">
                  <td className="px-6 py-3">
                    <Link href={`/admin/classes/${classSession.id}`} className="font-medium hover:text-gold">
                      {new Date(classSession.data + 'T00:00:00').toLocaleDateString('pt-BR')}
                    </Link>
                    {classSession.data === today && <span className="badge badge-success ml-2">Hoje</span>}
                  </td>
                  <td className="px-6 py-3 text-gray-400">{classSession.horario?.slice(0, 5) ?? '—'}</td>
                  <td className="px-6 py-3 text-gray-400">{classSession.local}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
