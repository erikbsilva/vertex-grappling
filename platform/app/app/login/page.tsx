import { StudentLoginForm } from './StudentLoginForm'

export default function StudentLoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm text-center">
        <h1 className="font-display text-2xl font-bold">
          Vertex <span className="text-gold">BJJ</span>
        </h1>
        <p className="mt-1 text-sm text-gray-400">
          Acesse com o e-mail que seu coach cadastrou.
        </p>

        <div className="mt-8 text-left">
          <StudentLoginForm />
        </div>
      </div>
    </main>
  )
}
