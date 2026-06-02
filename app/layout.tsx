import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Private Grappling Lessons — Boca Raton, FL | Vertex',
  description:
    'One-on-one grappling and jiu-jitsu coaching for adults in Boca Raton. Train at your own pace — no class pressure, no judgment.',
  openGraph: {
    title: 'Private Grappling Lessons — Boca Raton, FL',
    description:
      'One-on-one grappling coaching for adults. Start or restart on your terms.',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
