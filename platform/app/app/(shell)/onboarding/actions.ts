'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { IDIOMAS } from '@/lib/types'

export async function setIdioma(formData: FormData) {
  const idioma = formData.get('idioma') as string
  const validValues = IDIOMAS.map((i) => i.value)

  if (!validValues.includes(idioma as (typeof validValues)[number])) {
    throw new Error('Idioma inválido')
  }

  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/app/login')

  await supabase.from('students').update({ idioma }).eq('user_id', user.id)

  redirect('/app')
}
