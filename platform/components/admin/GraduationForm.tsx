'use client'

import { useEffect, useRef } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { FAIXAS } from '@/lib/types'
import type { ActionState } from '@/app/admin/students/actions'

const GRAUS = [0, 1, 2, 3, 4]

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" className="btn-primary" disabled={pending}>
      {pending ? 'Salvando...' : 'Registrar graduação'}
    </button>
  )
}

export function GraduationForm({
  action,
  currentFaixa,
  currentGrau,
}: {
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>
  currentFaixa: string
  currentGrau: number
}) {
  const [state, formAction] = useFormState<ActionState, FormData>(action, null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset()
    }
  }, [state])

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="label" htmlFor="faixa">Faixa</label>
          <select id="faixa" name="faixa" className="input" defaultValue={currentFaixa}>
            {FAIXAS.map((faixa) => (
              <option key={faixa} value={faixa}>{faixa}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="label" htmlFor="grau">Grau</label>
          <select id="grau" name="grau" className="input" defaultValue={currentGrau}>
            {GRAUS.map((grau) => (
              <option key={grau} value={grau}>{grau}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="label" htmlFor="data">Data</label>
          <input
            id="data"
            name="data"
            type="date"
            required
            className="input"
            defaultValue={new Date().toISOString().slice(0, 10)}
          />
        </div>
      </div>

      {state?.error && <p className="text-sm text-danger">{state.error}</p>}
      {state?.success && <p className="text-sm text-green-400">Graduação registrada.</p>}

      <SubmitButton />
    </form>
  )
}
