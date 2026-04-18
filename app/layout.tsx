import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import { LoaderOnce } from '@/components/home/LoaderOnce'

export const metadata: Metadata = {
  title: 'Rodrigo Sánchez — Product Designer',
  description: 'Product Designer specializing in UX/UI, Web, Systems, XR & AI',

  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' }, // favicon principal
    ],
    apple: '/icon.png', // si quieres un PNG para Apple, sino bórralo
  },

  openGraph: {
    title: 'Rodrigo Sánchez — Product Designer',
    description: 'Portfolio de diseño digital, producto, UX/UI, XR y sistemas',
    images: ['/og-image.png'], // si aún no lo tienes, puedo generarlo
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className="font-sans antialiased"
      >
        <LoaderOnce />
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
