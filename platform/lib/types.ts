export type StudentStatus = 'ativo' | 'arquivado'

export interface Student {
  id: string
  user_id: string | null
  nome: string
  email: string
  foto_url: string | null
  telefone: string | null
  objetivo: string | null
  data_inicio: string
  idioma: string | null
  faixa: string
  grau: number
  status: StudentStatus
  created_at: string
  updated_at: string
}

export interface BeltLevel {
  id: string
  faixa: string
  grau: number
  ordem: number
}

export interface ClassSession {
  id: string
  data: string
  horario: string | null
  local: string
  notas: string | null
  created_at: string
}

export interface Attendance {
  id: string
  class_id: string
  student_id: string
  presente: boolean
  checkin_at: string | null
  xp_awarded: number
  created_at: string
}

export interface StudentStats {
  student_id: string
  xp_total: number
  streak_atual: number
  streak_recorde: number
  faltas_consecutivas: number
  updated_at: string
}

export const FAIXAS = ['Branca', 'Azul', 'Roxa', 'Marrom', 'Preta'] as const

export const IDIOMAS = [
  { value: 'pt', label: 'Português' },
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
] as const

export const IDIOMA_LABELS: Record<string, string> = IDIOMAS.reduce(
  (acc, { value, label }) => ({ ...acc, [value]: label }),
  {} as Record<string, string>
)

export interface Graduation {
  id: string
  student_id: string
  faixa: string
  grau: number
  data: string
  created_at: string
}

export type PaymentStatus = 'pago' | 'pendente' | 'atrasado'

export interface Payment {
  id: string
  student_id: string
  valor: number
  vencimento: string
  status: PaymentStatus
  pago_em: string | null
  created_at: string
}

// `status` is only ever stored as 'pago' or 'pendente' — 'atrasado' is
// derived here for display when a 'pendente' payment is past due.
export function paymentDisplayStatus(payment: Pick<Payment, 'status' | 'vencimento'>): PaymentStatus {
  if (payment.status === 'pago') return 'pago'
  const today = new Date().toISOString().slice(0, 10)
  return payment.vencimento < today ? 'atrasado' : 'pendente'
}

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  pago: 'Pago',
  pendente: 'Pendente',
  atrasado: 'Atrasado',
}

export interface Feedback {
  id: string
  student_id: string
  class_id: string | null
  audio_url: string | null
  transcript: string | null
  summary_original: string | null
  summary_translated: string | null
  idioma_traducao: string | null
  visto_em: string | null
  created_at: string
}
