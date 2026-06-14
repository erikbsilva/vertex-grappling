import { Suspense } from 'react'
import { LoginForm } from './LoginForm'

export default function CoachLoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-2xl font-bold">Área do coach</h1>
        <p className="mt-1 text-sm text-gray-400">Entre com seu e-mail e senha.</p>

        <div className="mt-8">
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </main>
  )
}
