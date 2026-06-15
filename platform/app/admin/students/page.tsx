import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'
import type { Student, StudentStatus } from '@/lib/types'

export default async function StudentsPage({
  searchParams,
}: {
  searchParams: { status?: string }
}) {
  const status: StudentStatus = searchParams.status === 'arquivado' ? 'arquivado' : 'ativo'

  const supabase = createAdminClient()
  const { data: students } = await supabase
    .from('students')
    .select('*')
    .eq('status', status)
    .order('nome') as { data: Student[] | null }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold">Alunos</h1>
        <Link href="/admin/students/new" className="btn-primary">
          Novo aluno
        </Link>
      </div>

      <div className="mt-6 flex gap-2">
        <Link
          href="/admin/students?status=ativo"
          className={`badge ${status === 'ativo' ? 'badge-success' : 'badge-muted'}`}
        >
          Ativos
        </Link>
        <Link
          href="/admin/students?status=arquivado"
          className={`badge ${status === 'arquivado' ? 'badge-warning' : 'badge-muted'}`}
        >
          Arquivados
        </Link>
      </div>

      <div className="card mt-6 overflow-hidden p-0">
        {!students?.length ? (
          <p className="p-6 text-sm text-gray-400">
            {status === 'ativo' ? 'Nenhum aluno ativo ainda.' : 'Nenhum aluno arquivado.'}
          </p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-navy-400 text-gray-400">
              <tr>
                <th className="px-6 py-3 font-medium">Nome</th>
                <th className="px-6 py-3 font-medium">Faixa / Grau</th>
                <th className="px-6 py-3 font-medium">Início</th>
                <th className="px-6 py-3 font-medium">Acesso</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-b border-navy-400/50 last:border-0 hover:bg-navy-300/40">
                  <td className="px-6 py-3">
                    <Link href={`/admin/students/${student.id}`} className="font-medium hover:text-gold">
                      {student.nome}
                    </Link>
                    <p className="text-xs text-gray-500">{student.email}</p>
                  </td>
                  <td className="px-6 py-3">{student.faixa} · {student.grau}</td>
                  <td className="px-6 py-3 text-gray-400">
                    {new Date(student.data_inicio).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-3">
                    {student.user_id ? (
                      <span className="badge badge-success">Ativado</span>
                    ) : (
                      <span className="badge badge-muted">Convite enviado</span>
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
