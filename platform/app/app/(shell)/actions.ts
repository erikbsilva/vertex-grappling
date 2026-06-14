'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { applyAttendance } from '@/lib/gamification'

export async function checkIn(classId: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Não autenticado.')

  const { data: student } = await supabase
    .from('students')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (!student) throw new Error('Aluno não encontrado.')

  const admin = createAdminClient()
  await applyAttendance(admin, student.id, classId, true)

  revalidatePath('/app')
}
