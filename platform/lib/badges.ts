import type { StudentStats } from '@/lib/types'

export interface Badge {
  id: string
  label: string
  description: string
  achieved: boolean
}

// Badges are computed on the fly from XP/streak stats and graduation count —
// no extra table needed.
export function computeBadges(stats: StudentStats | null, graduationsCount: number): Badge[] {
  const xp = stats?.xp_total ?? 0
  const streak = stats?.streak_recorde ?? 0

  return [
    { id: 'first-checkin', label: 'Primeiro check-in', description: 'Faça check-in em uma aula.', achieved: xp > 0 },
    { id: 'streak-3', label: 'Sequência de 3', description: 'Check-in em 3 aulas seguidas.', achieved: streak >= 3 },
    { id: 'streak-7', label: 'Sequência de 7', description: 'Check-in em 7 aulas seguidas.', achieved: streak >= 7 },
    { id: 'streak-30', label: 'Sequência de 30', description: 'Check-in em 30 aulas seguidas.', achieved: streak >= 30 },
    { id: 'xp-100', label: '100 XP', description: 'Acumule 100 XP.', achieved: xp >= 100 },
    { id: 'xp-500', label: '500 XP', description: 'Acumule 500 XP.', achieved: xp >= 500 },
    { id: 'xp-1000', label: '1000 XP', description: 'Acumule 1000 XP.', achieved: xp >= 1000 },
    { id: 'graduado', label: 'Graduado', description: 'Receba sua primeira graduação.', achieved: graduationsCount > 0 },
  ]
}
