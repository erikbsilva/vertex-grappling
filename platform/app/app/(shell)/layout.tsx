import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { SignOutButton } from '@/components/SignOutButton'

export default async function StudentShellLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/app/login')
  }

  const { data: student } = await supabase
    .from('students')
    .select('id, nome, idioma')
    .eq('user_id', user.id)
    .single()

  if (!student) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display text-2xl font-bold">Acesso ainda não liberado</h1>
        <p className="mt-3 max-w-sm text-gray-400">
          Seu login funcionou, mas seu coach ainda não cadastrou seu perfil de aluno.
          Avise seu coach e tente novamente em breve.
        </p>
        <div className="mt-8">
          <SignOutButton redirectTo="/app/login" />
        </div>
      </main>
    )
  }

  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between border-b border-navy-400 px-6 py-4">
        <span className="font-display font-bold">
          Vertex <span className="text-gold">BJJ</span>
        </span>
        <SignOutButton redirectTo="/app/login" />
      </header>
      <main className="px-6 py-8">{children}</main>
    </div>
  )
}
