'use server'

import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/admin'
import { translateFeedback } from '@/lib/ai'

export type ActionState = { error?: string; success?: boolean } | null

export async function createFeedback(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const student_id = formData.get('student_id') as string
  const class_id = (formData.get('class_id') as string) || null
  const audio_url = (formData.get('audio_url') as string).trim() || null
  const summary_original = (formData.get('summary') as string).trim()

  if (!student_id) return { error: 'Selecione um aluno.' }
  if (!summary_original) return { error: 'Escreva o feedback.' }

  const supabase = createAdminClient()

  const { data: student } = await supabase
    .from('students')
    .select('idioma')
    .eq('id', student_id)
    .single()

  let summary_translated: string | null = null
  let idioma_traducao: string | null = null

  if (student?.idioma && student.idioma !== 'pt') {
    const translated = await translateFeedback(summary_original, student.idioma)
    if (translated) {
      summary_translated = translated
      idioma_traducao = student.idioma
    }
  }

  const { error } = await supabase.from('feedback').insert({
    student_id,
    class_id,
    audio_url,
    summary_original,
    summary_translated,
    idioma_traducao,
  })

  if (error) return { error: error.message }

  revalidatePath('/admin/feedback')
  return { success: true }
}
