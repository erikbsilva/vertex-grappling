'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { setPaymentPaid } from '@/app/admin/payments/actions'
import { PAYMENT_STATUS_LABELS, paymentDisplayStatus, type Payment } from '@/lib/types'

const STATUS_BADGE: Record<string, string> = {
  pago: 'badge-success',
  pendente: 'badge-muted',
  atrasado: 'badge-danger',
}

export function PaymentRow({
  payment,
  studentName,
}: {
  payment: Payment
  studentName: string
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const status = paymentDisplayStatus(payment)
  const isPaid = payment.status === 'pago'

  function toggle() {
    startTransition(async () => {
      await setPaymentPaid(payment.id, !isPaid)
      router.refresh()
    })
  }

  return (
    <tr className="border-b border-navy-400/50 last:border-0">
      <td className="px-6 py-3 font-medium">{studentName}</td>
      <td className="px-6 py-3 text-gray-400">
        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(payment.valor)}
      </td>
      <td className="px-6 py-3 text-gray-400">
        {new Date(payment.vencimento + 'T00:00:00').toLocaleDateString('pt-BR')}
      </td>
      <td className="px-6 py-3">
        <span className={`badge ${STATUS_BADGE[status]}`}>{PAYMENT_STATUS_LABELS[status]}</span>
      </td>
      <td className="px-6 py-3">
        <button onClick={toggle} disabled={isPending} className="btn-secondary px-4 py-2 text-xs">
          {isPaid ? 'Desfazer' : 'Marcar como pago'}
        </button>
      </td>
    </tr>
  )
}
