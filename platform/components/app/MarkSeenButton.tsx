'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { markFeedbackSeen } from '@/app/app/(shell)/feedback/actions'

export function MarkSeenButton({ feedbackId }: { feedbackId: string }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function handleClick() {
    startTransition(async () => {
      await markFeedbackSeen(feedbackId)
      router.refresh()
    })
  }

  return (
    <button onClick={handleClick} disabled={isPending} className="btn-secondary mt-3 px-4 py-2 text-xs">
      Marcar como visto
    </button>
  )
}
