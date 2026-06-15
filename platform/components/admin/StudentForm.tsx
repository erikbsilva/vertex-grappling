'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { FAIXAS, type Student } from '@/lib/types'
import type { ActionState } from '@/app/admin/students/actions'

const GRAUS = [0, 1, 2, 3, 4]

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus()
  return (
    <button type="submit" className="btn-primary" disabled={pending}>
      {pending ? 'Salvando...' : label}
    </button>
  )
}

export function StudentForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>
  defaultValues?: Partial<Student>
  submitLabel: string
}) {
  const [state, formAction] = useFormState<ActionState, FormData>(action, null)

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="nome">Nome</label>
          <input
            id="nome"
            name="nome"
            required
            className="input"
            defaultValue={defaultValues?.nome}
          />
        </div>

        <div>
          <label className="label" htmlFor="email">E-mail</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="input"
            defaultValue={defaultValues?.email}
          />
        </div>

        <div>
          <label className="label" htmlFor="telefone">Contato (WhatsApp)</label>
          <input
            id="telefone"
            name="telefone"
            className="input"
            defaultValue={defaultValues?.telefone ?? ''}
          />
        </div>

        <div>
          <label className="label" htmlFor="data_inicio">Data de início</label>
          <input
            id="data_inicio"
            name="data_inicio"
            type="date"
            required
            className="input"
            defaultValue={defaultValues?.data_inicio ?? new Date().toISOString().slice(0, 10)}
          />
        </div>

        <div>
          <label className="label" htmlFor="faixa">Faixa</label>
          <select id="faixa" name="faixa" className="input" defaultValue={defaultValues?.faixa ?? 'Branca'}>
            {FAIXAS.map((faixa) => (
              <option key={faixa} value={faixa}>{faixa}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="label" htmlFor="grau">Grau</label>
          <select id="grau" name="grau" className="input" defaultValue={defaultValues?.grau ?? 0}>
            {GRAUS.map((grau) => (
              <option key={grau} value={grau}>{grau}</option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="label" htmlFor="foto_url">Foto (URL)</label>
          <input
            id="foto_url"
            name="foto_url"
            type="url"
            placeholder="https://..."
            className="input"
            defaultValue={defaultValues?.foto_url ?? ''}
          />
        </div>

        <div className="sm:col-span-2">
          <label className="label" htmlFor="objetivo">Objetivo</label>
          <textarea
            id="objetivo"
            name="objetivo"
            rows={3}
            className="input"
            defaultValue={defaultValues?.objetivo ?? ''}
          />
        </div>
      </div>

      {state?.error && <p className="text-sm text-danger">{state.error}</p>}
      {state?.success && <p className="text-sm text-green-400">Alterações salvas.</p>}

      <SubmitButton label={submitLabel} />
    </form>
  )
}
