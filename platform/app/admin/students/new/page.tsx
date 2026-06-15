import Link from 'next/link'
import { StudentForm } from '@/components/admin/StudentForm'
import { createStudent } from '../actions'

export default function NewStudentPage() {
  return (
    <div className="max-w-2xl">
      <Link href="/admin/students" className="text-sm text-gray-400 hover:text-white">
        ← Alunos
      </Link>

      <h1 className="mt-2 font-display text-2xl font-bold">Novo aluno</h1>
      <p className="mt-1 text-sm text-gray-400">
        Ao salvar, enviamos um convite por e-mail para o aluno acessar o app.
      </p>

      <div className="card mt-6">
        <StudentForm action={createStudent} submitLabel="Cadastrar aluno" />
      </div>
    </div>
  )
}
