'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { checkIn } from '@/app/app/(shell)/actions'

export function CheckInButton({ classId }: { classId: string }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function handleClick() {
    startTransition(async () => {
      await checkIn(classId)
      router.refresh()
    })
  }

  return (
    <button onClick={handleClick} disabled={isPending} className="btn-primary mt-4 w-full">
      {isPending ? 'Fazendo check-in...' : 'Fazer check-in'}
    </button>
  )
}
