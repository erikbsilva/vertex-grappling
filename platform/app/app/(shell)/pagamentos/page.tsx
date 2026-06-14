import { createClient } from '@/lib/supabase/server'
import { PAYMENT_STATUS_LABELS, paymentDisplayStatus, type Payment } from '@/lib/types'

const STATUS_BADGE: Record<string, string> = {
  pago: 'badge-success',
  pendente: 'badge-muted',
  atrasado: 'badge-danger',
}

export default async function StudentPaymentsPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: student } = await supabase
    .from('students')
    .select('id')
    .eq('user_id', user!.id)
    .single()

  const { data: payments } = await supabase
    .from('payments')
    .select('*')
    .eq('student_id', student!.id)
    .order('vencimento', { ascending: false }) as { data: Payment[] | null }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Pagamentos</h1>

      {!payments?.length ? (
        <div className="card mt-6">
          <p className="text-sm text-gray-400">Nenhuma cobrança registrada ainda.</p>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {payments.map((payment) => {
            const status = paymentDisplayStatus(payment)
            return (
              <div key={payment.id} className="card flex items-center justify-between text-left">
                <div>
                  <p className="font-display text-lg font-bold">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(payment.valor)}
                  </p>
                  <p className="text-xs text-gray-500">
                    Vencimento: {new Date(payment.vencimento + 'T00:00:00').toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <span className={`badge ${STATUS_BADGE[status]}`}>{PAYMENT_STATUS_LABELS[status]}</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
