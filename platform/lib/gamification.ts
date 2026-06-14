import type { createAdminClient } from '@/lib/supabase/admin'

type AdminClient = ReturnType<typeof createAdminClient>

const XP_CHECKIN = 10

// Marks attendance for a (class, student) pair and, the first time a row is
// created for that pair, applies the XP/streak side effects. Later toggles
// (e.g. a coach correcting a mistake) only update the presence flag.
export async function applyAttendance(
  supabase: AdminClient,
  studentId: string,
  classId: string,
  presente: boolean
) {
  const { data: existing } = await supabase
    .from('attendance')
    .select('*')
    .eq('class_id', classId)
    .eq('student_id', studentId)
    .maybeSingle()

  let xp_awarded: number = existing?.xp_awarded ?? 0

  if (!existing) {
    if (presente) {
      xp_awarded = await awardCheckinXp(supabase, studentId, classId)
    } else {
      await recordAbsence(supabase, studentId)
    }
  }

  await supabase.from('attendance').upsert(
    {
      class_id: classId,
      student_id: studentId,
      presente,
      checkin_at: presente ? existing?.checkin_at ?? new Date().toISOString() : existing?.checkin_at ?? null,
      xp_awarded,
    },
    { onConflict: 'class_id,student_id' }
  )

  return xp_awarded
}

async function awardCheckinXp(supabase: AdminClient, studentId: string, classId: string) {
  await supabase.from('xp_transactions').insert({
    student_id: studentId,
    tipo: 'checkin',
    xp: XP_CHECKIN,
    referencia_id: classId,
  })

  const { data: stats } = await supabase
    .from('student_stats')
    .select('*')
    .eq('student_id', studentId)
    .maybeSingle()

  const streak_atual = (stats?.streak_atual ?? 0) + 1

  await supabase.from('student_stats').upsert({
    student_id: studentId,
    xp_total: (stats?.xp_total ?? 0) + XP_CHECKIN,
    streak_atual,
    streak_recorde: Math.max(stats?.streak_recorde ?? 0, streak_atual),
    faltas_consecutivas: 0,
    updated_at: new Date().toISOString(),
  })

  return XP_CHECKIN
}

async function recordAbsence(supabase: AdminClient, studentId: string) {
  const { data: stats } = await supabase
    .from('student_stats')
    .select('*')
    .eq('student_id', studentId)
    .maybeSingle()

  await supabase.from('student_stats').upsert({
    student_id: studentId,
    xp_total: stats?.xp_total ?? 0,
    streak_atual: 0,
    streak_recorde: stats?.streak_recorde ?? 0,
    faltas_consecutivas: (stats?.faltas_consecutivas ?? 0) + 1,
    updated_at: new Date().toISOString(),
  })
}
