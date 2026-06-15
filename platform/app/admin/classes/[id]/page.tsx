import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import { AttendanceRow } from '@/components/admin/AttendanceRow'
import type { Attendance, ClassSession, Student } from '@/lib/types'

export default async function ClassDetailPage({ params }: { params: { id: string } }) {
  const supabase = createAdminClient()

  const { data: classSession } = await supabase
    .from('classes')
    .select('*')
    .eq('id', params.id)
    .single() as { data: ClassSession | null }

  if (!classSession) notFound()

  const { data: students } = await supabase
    .from('students')
    .select('id, nome, faixa, grau')
    .eq('status', 'ativo')
    .order('nome') as { data: Pick<Student, 'id' | 'nome' | 'faixa' | 'grau'>[] | null }

  const { data: attendanceRows } = await supabase
    .from('attendance')
    .select('*')
    .eq('class_id', params.id) as { data: Attendance[] | null }

  const attendanceByStudent = new Map(attendanceRows?.map((a) => [a.student_id, a]) ?? [])

  return (
    <div>
      <Link href="/admin/classes" className="text-sm text-gray-400 hover:text-white">
        ← Aulas
      </Link>

      <div className="mt-2">
        <h1 className="font-display text-2xl font-bold">
          {new Date(classSession.data + 'T00:00:00').toLocaleDateString('pt-BR', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
          })}
        </h1>
        <p className="mt-1 text-sm text-gray-400">
          {classSession.horario?.slice(0, 5) ?? 'Horário não definido'} · {classSession.local}
        </p>
        {classSession.notas && <p className="mt-2 text-sm text-gray-400">{classSession.notas}</p>}
      </div>

      <div className="card mt-6 overflow-hidden p-0">
        {!students?.length ? (
          <p className="p-6 text-sm text-gray-400">Nenhum aluno ativo cadastrado.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-navy-400 text-gray-400">
              <tr>
                <th className="px-6 py-3 font-medium">Aluno</th>
                <th className="px-6 py-3 font-medium">Check-in</th>
                <th className="px-6 py-3 font-medium">XP</th>
                <th className="px-6 py-3 font-medium">Presença</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <AttendanceRow
                  key={student.id}
                  classId={classSession.id}
                  student={student}
                  attendance={attendanceByStudent.get(student.id) ?? null}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
