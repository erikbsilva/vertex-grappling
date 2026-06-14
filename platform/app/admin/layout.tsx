import Link from 'next/link'
import { SignOutButton } from '@/components/SignOutButton'

const NAV_ITEMS = [
  { href: '/admin/students', label: 'Alunos', enabled: true },
  { href: '/admin/classes', label: 'Aulas', enabled: false },
  { href: '/admin/feedback', label: 'Feedback', enabled: false },
  { href: '/admin/payments', label: 'Pagamentos', enabled: false },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="flex w-56 flex-col border-r border-navy-400 bg-navy-100 px-4 py-6">
        <span className="px-2 font-display text-lg font-bold">
          Vertex <span className="text-gold">BJJ</span>
        </span>
        <p className="px-2 text-xs text-gray-500">Painel do coach</p>

        <nav className="mt-8 flex flex-col gap-1">
          {NAV_ITEMS.map((item) =>
            item.enabled ? (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-2 text-sm font-medium text-gray-300 transition hover:bg-navy-300 hover:text-white"
              >
                {item.label}
              </Link>
            ) : (
              <span
                key={item.href}
                className="cursor-not-allowed rounded-xl px-3 py-2 text-sm font-medium text-gray-600"
                title="Em breve"
              >
                {item.label}
              </span>
            )
          )}
        </nav>

        <div className="mt-auto px-2">
          <SignOutButton redirectTo="/login" />
        </div>
      </aside>

      <main className="flex-1 px-8 py-8">{children}</main>
    </div>
  )
}
