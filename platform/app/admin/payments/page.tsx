import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'
import { PaymentForm } from '@/components/admin/PaymentForm'
import { PaymentRow } from '@/components/admin/PaymentRow'
import { createPayment } from './actions'
import type { Payment } from '@/lib/types'

type PaymentRowData = Payment & { students: { nome: string } | null }

export default async function PaymentsPage({
  searchParams,
}: {
  searchParams: { status?: string }
}) {
  const filter = searchParams.status === 'pago' || searchParams.status === 'todos' ? searchParams.status : 'pendente'

  const supabase = createAdminClient()

  const { data: students } = await supabase
    .from('students')
    .select('id, nome')
    .eq('status', 'ativo')
    .order('nome') as { data: { id: string; nome: string }[] | null }

  let query = supabase
    .from('payments')
    .select('*, students(nome)')
    .order('vencimento', { ascending: filter === 'pago' ? false : true })

  if (filter !== 'todos') {
    query = query.eq('status', filter)
  }

  const { data: payments } = await query as { data: PaymentRowData[] | null }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Pagamentos</h1>

      <div className="card mt-6">
        {!students?.length ? (
          <p className="text-sm text-gray-400">Cadastre alunos ativos antes de registrar cobranças.</p>
        ) : (
          <PaymentForm action={createPayment} students={students} />
        )}
      </div>

      <div className="mt-6 flex gap-2">
        <Link href="/admin/payments?status=pendente" className={`badge ${filter === 'pendente' ? 'badge-warning' : 'badge-muted'}`}>
          Pendentes
        </Link>
        <Link href="/admin/payments?status=pago" className={`badge ${filter === 'pago' ? 'badge-success' : 'badge-muted'}`}>
          Pagos
        </Link>
        <Link href="/admin/payments?status=todos" className={`badge ${filter === 'todos' ? 'badge-warning' : 'badge-muted'}`}>
          Todos
        </Link>
      </div>

      <div className="card mt-4 overflow-hidden p-0">
        {!payments?.length ? (
          <p className="p-6 text-sm text-gray-400">Nenhuma cobrança encontrada.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-navy-400 text-gray-400">
              <tr>
                <th className="px-6 py-3 font-medium">Aluno</th>
                <th className="px-6 py-3 font-medium">Valor</th>
                <th className="px-6 py-3 font-medium">Vencimento</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <PaymentRow key={payment.id} payment={payment} studentName={payment.students?.nome ?? '—'} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
