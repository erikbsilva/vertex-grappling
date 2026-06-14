'use client'

import { useEffect, useRef } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import type { ActionState } from '@/app/admin/feedback/actions'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" className="btn-primary" disabled={pending}>
      {pending ? 'Enviando...' : 'Enviar feedback'}
    </button>
  )
}

export function FeedbackForm({
  action,
  students,
  classes,
}: {
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>
  students: { id: string; nome: string }[]
  classes: { id: string; data: string; local: string }[]
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
      <div className="grid gap-5 sm:grid-cols-2">
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
          <label className="label" htmlFor="class_id">Aula (opcional)</label>
          <select id="class_id" name="class_id" className="input" defaultValue="">
            <option value="">Sem aula vinculada</option>
            {classes.map((classSession) => (
              <option key={classSession.id} value={classSession.id}>
                {new Date(classSession.data + 'T00:00:00').toLocaleDateString('pt-BR')} · {classSession.local}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="label" htmlFor="summary">Feedback</label>
          <textarea
            id="summary"
            name="summary"
            rows={4}
            required
            className="input"
            placeholder="O que o aluno trabalhou bem, pontos de atenção, próximos passos..."
          />
        </div>

        <div className="sm:col-span-2">
          <label className="label" htmlFor="audio_url">Link do áudio (opcional)</label>
          <input id="audio_url" name="audio_url" type="url" className="input" placeholder="https://..." />
        </div>
      </div>

      {state?.error && <p className="text-sm text-danger">{state.error}</p>}
      {state?.success && <p className="text-sm text-green-400">Feedback enviado para o aluno.</p>}

      <SubmitButton />
    </form>
  )
}
