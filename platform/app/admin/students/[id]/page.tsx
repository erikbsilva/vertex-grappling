import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import { StudentForm } from '@/components/admin/StudentForm'
import { StudentActions } from '@/components/admin/StudentActions'
import { updateStudent } from '../actions'
import { IDIOMA_LABELS, type Student } from '@/lib/types'
import type { ActionState } from '../actions'

export default async function StudentDetailPage({ params }: { params: { id: string } }) {
  const supabase = createAdminClient()
  const { data: student } = await supabase
    .from('students')
    .select('*')
    .eq('id', params.id)
    .single() as { data: Student | null }

  if (!student) notFound()

  const boundUpdate = async (prevState: ActionState, formData: FormData) =>
    updateStudent(student.id, prevState, formData)

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
    </div>
  )
}
