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

export const FAIXAS = ['Branca', 'Azul', 'Roxa', 'Marrom', 'Preta'] as const

export const IDIOMAS = [
  { value: 'pt', label: 'Português' },
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
] as const
