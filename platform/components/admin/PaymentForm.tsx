'use client'

import { useEffect, useRef } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import type { ActionState } from '@/app/admin/payments/actions'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" className="btn-primary" disabled={pending}>
      {pending ? 'Salvando...' : 'Registrar cobrança'}
    </button>
  )
}

export function PaymentForm({
  action,
  students,
}: {
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>
  students: { id: string; nome: string }[]
}) {
  const [state, formAction] = useFormState<ActionState, FormData>(action, null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset()
    }
  }, [state])

  return (
    <form ref={formRef} action={formAction} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label className="label" htmlFor="student_id">Aluno</label>
          <select id="student_id" name="student_id" required className="input" defaultValue="">
            <option value="" disabled>Selecione...</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>{student.nome}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="label" htmlFor="valor">Valor (R$)</label>
          <input id="valor" name="valor" type="number" step="0.01" min="0.01" required className="input" />
        </div>

        <div>
          <label className="label" htmlFor="vencimento">Vencimento</label>
          <input id="vencimento" name="vencimento" type="date" required className="input" />
        </div>
      </div>

      {state?.error && <p className="text-sm text-danger">{state.error}</p>}
      {state?.success && <p className="text-sm text-green-400">Cobrança registrada.</p>}

      <SubmitButton />
    </form>
  )
}
