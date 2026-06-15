'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { setAttendance } from '@/app/admin/classes/actions'
import type { Attendance, Student } from '@/lib/types'

export function AttendanceRow({
  classId,
  student,
  attendance,
}: {
  classId: string
  student: Pick<Student, 'id' | 'nome' | 'faixa' | 'grau'>
  attendance: Attendance | null
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function mark(presente: boolean) {
    startTransition(async () => {
      await setAttendance(classId, student.id, presente)
      router.refresh()
    })
  }

  const presente = attendance?.presente

  return (
    <tr className="border-b border-navy-400/50 last:border-0">
      <td className="px-6 py-3">
        <p className="font-medium">{student.nome}</p>
        <p className="text-xs text-gray-500">{student.faixa} · {student.grau}</p>
      </td>
      <td className="px-6 py-3 text-gray-400">
        {attendance?.checkin_at
          ? new Date(attendance.checkin_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
          : '—'}
      </td>
      <td className="px-6 py-3 text-gray-400">
        {attendance?.xp_awarded ? `+${attendance.xp_awarded} XP` : '—'}
      </td>
      <td className="px-6 py-3">
        <div className="flex gap-2">
          <button
            onClick={() => mark(true)}
            disabled={isPending}
            className={`badge ${presente === true ? 'badge-success' : 'badge-muted'}`}
          >
            Presente
          </button>
          <button
            onClick={() => mark(false)}
            disabled={isPending}
            className={`badge ${presente === false ? 'badge-danger' : 'badge-muted'}`}
          >
            Ausente
          </button>
        </div>
      </td>
    </tr>
  )
}
