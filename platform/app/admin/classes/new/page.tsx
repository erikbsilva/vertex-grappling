import Link from 'next/link'
import { ClassForm } from '@/components/admin/ClassForm'
import { createClass } from '../actions'

export default function NewClassPage() {
  return (
    <div className="max-w-2xl">
      <Link href="/admin/classes" className="text-sm text-gray-400 hover:text-white">
        ← Aulas
      </Link>

      <h1 className="mt-2 font-display text-2xl font-bold">Nova aula</h1>
      <p className="mt-1 text-sm text-gray-400">
        Depois de criar a aula, você poderá marcar a presença dos alunos.
      </p>

      <div className="card mt-6">
        <ClassForm action={createClass} />
      </div>
    </div>
  )
}
