'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import { applyAttendance } from '@/lib/gamification'

export type ActionState = { error?: string } | null

export async function createClass(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const data = formData.get('data') as string
  const horario = (formData.get('horario') as string).trim() || null
  const local = (formData.get('local') as string).trim()
  const notas = (formData.get('notas') as string).trim() || null

  if (!data) return { error: 'Data é obrigatória.' }
  if (!local) return { error: 'Local é obrigatório.' }

  const supabase = createAdminClient()
  const { data: created, error } = await supabase
    .from('classes')
    .insert({ data, horario, local, notas })
    .select('id')
    .single()

  if (error) return { error: error.message }

  revalidatePath('/admin/classes')
  redirect(`/admin/classes/${created.id}`)
}

export async function setAttendance(classId: string, studentId: string, presente: boolean) {
  const supabase = createAdminClient()
  await applyAttendance(supabase, studentId, classId, presente)
  revalidatePath(`/admin/classes/${classId}`)
}
