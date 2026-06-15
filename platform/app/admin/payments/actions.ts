'use server'

import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/admin'

export type ActionState = { error?: string; success?: boolean } | null

export async function createPayment(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const student_id = formData.get('student_id') as string
  const valor = Number(formData.get('valor'))
  const vencimento = formData.get('vencimento') as string

  if (!student_id) return { error: 'Selecione um aluno.' }
  if (!Number.isFinite(valor) || valor <= 0) return { error: 'Valor inválido.' }
  if (!vencimento) return { error: 'Vencimento é obrigatório.' }

  const supabase = createAdminClient()
  const { error } = await supabase.from('payments').insert({ student_id, valor, vencimento })

  if (error) return { error: error.message }

  revalidatePath('/admin/payments')
  return { success: true }
}

export async function setPaymentPaid(paymentId: string, paid: boolean) {
  const supabase = createAdminClient()
  const { error } = await supabase
    .from('payments')
    .update({
      status: paid ? 'pago' : 'pendente',
      pago_em: paid ? new Date().toISOString().slice(0, 10) : null,
    })
    .eq('id', paymentId)

  if (error) throw new Error(error.message)

  revalidatePath('/admin/payments')
}
