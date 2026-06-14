import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { CheckInButton } from '@/components/app/CheckInButton'
import type { Attendance, ClassSession, StudentStats } from '@/lib/types'

export default async function StudentDashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: student } = await supabase
    .from('students')
    .select('id, nome, idioma, faixa, grau')
    .eq('user_id', user!.id)
    .single()

  if (!student?.idioma) {
    redirect('/app/onboarding')
  }

  const today = new Date().toISOString().slice(0, 10)

  const { data: todayClasses } = await supabase
    .from('classes')
    .select('id, data, horario, local, notas, created_at')
    .eq('data', today)
    .order('horario') as { data: ClassSession[] | null }

  const { data: attendanceToday } = await supabase
    .from('attendance')
    .select('*')
    .eq('student_id', student.id)
    .in('class_id', todayClasses?.map((c) => c.id) ?? []) as { data: Attendance[] | null }

  const { data: stats } = await supabase
    .from('student_stats')
    .select('*')
    .eq('student_id', student.id)
    .maybeSingle() as { data: StudentStats | null }

  const { data: unseenFeedback } = await supabase
    .from('feedback')
    .select('id')
    .eq('student_id', student.id)
    .is('visto_em', null)

  return (
    <div className="flex flex-col items-center text-center">
      <p className="text-gray-400">Olá, {student.nome.split(' ')[0]}</p>
      <h1 className="mt-2 font-display text-3xl font-bold">
        Faixa {student.faixa} · Grau {student.grau}
      </h1>

      <div className="card mt-10 grid w-full max-w-sm grid-cols-3 divide-x divide-navy-400 text-center">
        <div>
          <p className="font-display text-2xl font-bold text-gold">{stats?.xp_total ?? 0}</p>
          <p className="mt-1 text-xs text-gray-400">XP total</p>
        </div>
        <div>
          <p className="font-display text-2xl font-bold text-gold">{stats?.streak_atual ?? 0}</p>
          <p className="mt-1 text-xs text-gray-400">Streak</p>
        </div>
        <div>
          <p className="font-display text-2xl font-bold text-gold">{stats?.streak_recorde ?? 0}</p>
          <p className="mt-1 text-xs text-gray-400">Recorde</p>
        </div>
      </div>

      {!todayClasses?.length ? (
        <div className="card mt-6 w-full max-w-sm">
          <p className="text-sm text-gray-400">Nenhuma aula marcada para hoje.</p>
        </div>
      ) : (
        todayClasses.map((classSession) => {
          const attendance = attendanceToday?.find((a) => a.class_id === classSession.id)

          return (
            <div key={classSession.id} className="card mt-6 w-full max-w-sm">
              <p className="text-sm text-gray-400">Aula de hoje</p>
              <p className="mt-1 font-display text-lg font-bold">{classSession.local}</p>
              {classSession.horario && (
                <p className="text-sm text-gray-400">{classSession.horario.slice(0, 5)}</p>
              )}

              {attendance?.presente ? (
                <p className="badge badge-success mt-4">
                  Check-in feito{attendance.xp_awarded ? ` · +${attendance.xp_awarded} XP` : ''}
                </p>
              ) : (
                <CheckInButton classId={classSession.id} />
              )}
            </div>
          )
        })
      )}

      {unseenFeedback?.length ? (
        <Link href="/app/feedback" className="card mt-6 w-full max-w-sm hover:border-gold">
          <p className="text-sm text-gray-400">Novo feedback do coach</p>
          <p className="mt-1 font-display text-lg font-bold text-gold">
            {unseenFeedback.length} {unseenFeedback.length === 1 ? 'mensagem' : 'mensagens'} para ver
          </p>
        </Link>
      ) : (
        <Link href="/app/jornada" className="card mt-6 w-full max-w-sm hover:border-gold">
          <p className="text-sm text-gray-400">Sua jornada</p>
          <p className="mt-1 font-display text-lg font-bold">Ver mapa de faixas e graduações</p>
        </Link>
      )}
    </div>
  )
}
