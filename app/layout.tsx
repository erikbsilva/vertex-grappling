import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://vertexbjj.com'),
  title: 'Private Grappling Lessons in Boca Raton, FL | Vertex',
  description:
    'Private and small-group grappling and jiu-jitsu coaching for adults in Boca Raton. Train solo or with people you trust, at your own pace, with no class pressure and no judgment.',
  openGraph: {
    title: 'Private Grappling Lessons in Boca Raton, FL',
    description:
      'Train solo or in a small group, your call. Coaching for adults who want to start or restart on their own terms.',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/img/eriksilvagrapplingcoachhero.webp',
        width: 1200,
        height: 630,
        alt: 'Erik Silva — Private Grappling Coach, Boca Raton FL',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Private Grappling Lessons in Boca Raton, FL',
    description: 'Train solo or in a small group, your call. Coaching for adults who want to start or restart on their own terms.',
    images: ['/img/eriksilvagrapplingcoachhero.webp'],
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
