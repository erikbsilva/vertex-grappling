'use client'

import { useFormState, useFormStatus } from 'react-dom'
import type { ActionState } from '@/app/admin/classes/actions'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" className="btn-primary" disabled={pending}>
      {pending ? 'Salvando...' : 'Criar aula'}
    </button>
  )
}

export function ClassForm({
  action,
}: {
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>
}) {
  const [state, formAction] = useFormState<ActionState, FormData>(action, null)

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
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

        <div>
          <label className="label" htmlFor="horario">Horário</label>
          <input id="horario" name="horario" type="time" className="input" />
        </div>

        <div className="sm:col-span-2">
          <label className="label" htmlFor="local">Local</label>
          <input
            id="local"
            name="local"
            required
            className="input"
            placeholder="Ex: Vertex BJJ - Tatame 1"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="label" htmlFor="notas">Notas</label>
          <textarea id="notas" name="notas" rows={3} className="input" placeholder="Conteúdo planejado, observações..." />
        </div>
      </div>

      {state?.error && <p className="text-sm text-danger">{state.error}</p>}

      <SubmitButton />
    </form>
  )
}
