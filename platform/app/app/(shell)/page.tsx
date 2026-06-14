import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function StudentDashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: student } = await supabase
    .from('students')
    .select('nome, idioma, faixa, grau')
    .eq('user_id', user!.id)
    .single()

  if (!student?.idioma) {
    redirect('/app/onboarding')
  }

  return (
    <div className="flex flex-col items-center text-center">
      <p className="text-gray-400">Olá, {student.nome.split(' ')[0]}</p>
      <h1 className="mt-2 font-display text-3xl font-bold">
        Faixa {student.faixa} · Grau {student.grau}
      </h1>

      <div className="card mt-10 w-full max-w-sm">
        <p className="text-sm text-gray-400">
          Seu mapa da jornada, streak, XP e feedback do coach vão aparecer aqui em breve.
        </p>
      </div>
    </div>
  )
}
