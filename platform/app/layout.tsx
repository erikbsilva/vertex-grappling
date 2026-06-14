import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vertex BJJ',
  description: 'Plataforma de coaching e acompanhamento de alunos Vertex BJJ',
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  themeColor: '#07091A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
