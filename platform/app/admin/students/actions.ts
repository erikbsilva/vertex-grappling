'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import { awardGraduationXp } from '@/lib/gamification'
import { FAIXAS, type StudentStatus } from '@/lib/types'

export type ActionState = { error?: string; success?: boolean } | null

function readStudentFields(formData: FormData) {
  const nome = (formData.get('nome') as string).trim()
  const email = (formData.get('email') as string).trim().toLowerCase()
  const telefone = (formData.get('telefone') as string).trim() || null
  const objetivo = (formData.get('objetivo') as string).trim() || null
  const foto_url = (formData.get('foto_url') as string).trim() || null
  const data_inicio = formData.get('data_inicio') as string
  const faixa = formData.get('faixa') as string
  const grau = Number(formData.get('grau'))

  if (!nome) throw new Error('Nome é obrigatório.')
  if (!email) throw new Error('E-mail é obrigatório.')
  if (!data_inicio) throw new Error('Data de início é obrigatória.')
  if (!FAIXAS.includes(faixa as (typeof FAIXAS)[number])) throw new Error('Faixa inválida.')
  if (!Number.isInteger(grau) || grau < 0 || grau > 4) throw new Error('Grau inválido.')

  return { nome, email, telefone, objetivo, foto_url, data_inicio, faixa, grau }
}

export async function createStudent(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  let fields
  try {
    fields = readStudentFields(formData)
  } catch (e) {
    return { error: (e as Error).message }
  }

  const supabase = createAdminClient()

  const { data: student, error } = await supabase
    .from('students')
    .insert(fields)
    .select('id')
    .single()

  if (error) {
    return { error: error.code === '23505' ? 'Já existe um aluno com esse e-mail.' : error.message }
  }

  // Send the magic-link invite so the student can install the PWA and sign in.
  await supabase.auth.admin.inviteUserByEmail(fields.email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/app`,
  })

  revalidatePath('/admin/students')
  redirect(`/admin/students/${student.id}`)
}

export async function updateStudent(id: string, _prevState: ActionState, formData: FormData): Promise<ActionState> {
  let fields
  try {
    fields = readStudentFields(formData)
  } catch (e) {
    return { error: (e as Error).message }
  }

  const supabase = createAdminClient()
  const { error } = await supabase.from('students').update(fields).eq('id', id)

  if (error) {
    return { error: error.code === '23505' ? 'Já existe um aluno com esse e-mail.' : error.message }
  }

  revalidatePath('/admin/students')
  revalidatePath(`/admin/students/${id}`)
  return { success: true }
}

export async function setStudentStatus(id: string, status: StudentStatus) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('students').update({ status }).eq('id', id)

  if (error) throw new Error(error.message)

  revalidatePath('/admin/students')
  revalidatePath(`/admin/students/${id}`)
}

export async function addGraduation(studentId: string, _prevState: ActionState, formData: FormData): Promise<ActionState> {
  const faixa = formData.get('faixa') as string
  const grau = Number(formData.get('grau'))
  const data = formData.get('data') as string

  if (!FAIXAS.includes(faixa as (typeof FAIXAS)[number])) return { error: 'Faixa inválida.' }
  if (!Number.isInteger(grau) || grau < 0 || grau > 4) return { error: 'Grau inválido.' }
  if (!data) return { error: 'Data é obrigatória.' }

  const supabase = createAdminClient()

  const { data: graduation, error } = await supabase
    .from('graduations')
    .insert({ student_id: studentId, faixa, grau, data })
    .select('id')
    .single()

  if (error) return { error: error.message }

  await supabase.from('students').update({ faixa, grau }).eq('id', studentId)
  await awardGraduationXp(supabase, studentId, graduation.id)

  revalidatePath(`/admin/students/${studentId}`)
  revalidatePath('/admin/students')
  return { success: true }
}

export async function resendInvite(email: string) {
  const supabase = createAdminClient()
  await supabase.auth.admin.inviteUserByEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/app`,
  })
}
