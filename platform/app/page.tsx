import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="font-display text-4xl font-bold tracking-tight">
        Vertex <span className="text-gold">BJJ</span>
      </h1>
      <p className="mt-3 max-w-sm text-gray-400">
        Acompanhamento de evolução para alunos de jiu-jitsu e grappling.
      </p>

      <div className="mt-10 flex w-full max-w-xs flex-col gap-3">
        <Link href="/app/login" className="btn-primary">
          Área do aluno
        </Link>
        <Link href="/login" className="btn-secondary">
          Área do coach
        </Link>
      </div>
    </main>
  )
}
