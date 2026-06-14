import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import { StudentForm } from '@/components/admin/StudentForm'
import { StudentActions } from '@/components/admin/StudentActions'
import { GraduationForm } from '@/components/admin/GraduationForm'
import { addGraduation, updateStudent } from '../actions'
import { IDIOMA_LABELS, type Graduation, type Student } from '@/lib/types'
import type { ActionState } from '../actions'

export default async function StudentDetailPage({ params }: { params: { id: string } }) {
  const supabase = createAdminClient()
  const { data: student } = await supabase
    .from('students')
    .select('*')
    .eq('id', params.id)
    .single() as { data: Student | null }

  if (!student) notFound()

  const { data: graduations } = await supabase
    .from('graduations')
    .select('*')
    .eq('student_id', student.id)
    .order('data', { ascending: false }) as { data: Graduation[] | null }

  const boundUpdate = async (prevState: ActionState, formData: FormData) =>
    updateStudent(student.id, prevState, formData)

  const boundAddGraduation = async (prevState: ActionState, formData: FormData) =>
    addGraduation(student.id, prevState, formData)

  return (
    <div className="max-w-2xl">
      <Link href="/admin/students" className="text-sm text-gray-400 hover:text-white">
        ← Alunos
      </Link>

      <div className="mt-2 flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold">{student.nome}</h1>
        {student.status === 'arquivado' && <span className="badge badge-muted">Arquivado</span>}
      </div>

      <div className="card mt-6 flex flex-wrap gap-6 text-sm">
        <div>
          <p className="text-gray-500">Acesso ao app</p>
          <p className="mt-1 font-medium">
            {student.user_id ? 'Ativado' : 'Convite pendente'}
          </p>
        </div>
        <div>
          <p className="text-gray-500">Idioma do aluno</p>
          <p className="mt-1 font-medium">
            {student.idioma ? IDIOMA_LABELS[student.idioma] ?? student.idioma : 'Ainda não escolhido'}
          </p>
        </div>
        <div>
          <p className="text-gray-500">Cadastrado em</p>
          <p className="mt-1 font-medium">
            {new Date(student.created_at).toLocaleDateString('pt-BR')}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <StudentActions student={student} />
      </div>

      <div className="card mt-6">
        <StudentForm action={boundUpdate} defaultValues={student} submitLabel="Salvar alterações" />
      </div>

      <h2 className="mt-10 font-display text-lg font-bold">Graduação</h2>
      <p className="mt-1 text-sm text-gray-400">
        Faixa atual: <span className="font-medium text-white">{student.faixa} · Grau {student.grau}</span>
      </p>

      <div className="card mt-4">
        <GraduationForm action={boundAddGraduation} currentFaixa={student.faixa} currentGrau={student.grau} />
      </div>

      {!!graduations?.length && (
        <div className="card mt-4 overflow-hidden p-0">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-navy-400 text-gray-400">
              <tr>
                <th className="px-6 py-3 font-medium">Data</th>
                <th className="px-6 py-3 font-medium">Faixa</th>
                <th className="px-6 py-3 font-medium">Grau</th>
              </tr>
            </thead>
            <tbody>
              {graduations.map((graduation) => (
                <tr key={graduation.id} className="border-b border-navy-400/50 last:border-0">
                  <td className="px-6 py-3 text-gray-400">
                    {new Date(graduation.data + 'T00:00:00').toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-3">{graduation.faixa}</td>
                  <td className="px-6 py-3">{graduation.grau}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
