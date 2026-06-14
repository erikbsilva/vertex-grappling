'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { resendInvite, setStudentStatus } from '@/app/admin/students/actions'
import type { Student } from '@/lib/types'

export function StudentActions({ student }: { student: Student }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [inviteSent, setInviteSent] = useState(false)

  const isAtivo = student.status === 'ativo'

  function toggleArchive() {
    startTransition(async () => {
      await setStudentStatus(student.id, isAtivo ? 'arquivado' : 'ativo')
      router.refresh()
    })
  }

  function handleResendInvite() {
    startTransition(async () => {
      await resendInvite(student.email)
      setInviteSent(true)
    })
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {!student.user_id && (
        <button onClick={handleResendInvite} className="btn-secondary" disabled={isPending}>
          {inviteSent ? 'Convite reenviado' : 'Reenviar convite'}
        </button>
      )}
      <button onClick={toggleArchive} className="btn-secondary" disabled={isPending}>
        {isAtivo ? 'Arquivar aluno' : 'Reativar aluno'}
      </button>
    </div>
  )
}
