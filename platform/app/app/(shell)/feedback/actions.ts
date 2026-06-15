'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function markFeedbackSeen(feedbackId: string) {
  const supabase = createClient()
  const { error } = await supabase
    .from('feedback')
    .update({ visto_em: new Date().toISOString() })
    .eq('id', feedbackId)

  if (error) throw new Error(error.message)

  revalidatePath('/app/feedback')
  revalidatePath('/app')
}
