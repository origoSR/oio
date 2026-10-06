import type { Metadata } from 'next'
import { Manrope, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import { SiteNavbar } from '@/components/site/SiteNavbar'

const manrope = Manrope({ subsets: ['latin'], weight: ['400', '600'], variable: '--font-manrope', display: 'swap' })
const geistMono = Geist_Mono({ subsets: ['latin'], weight: ['500'], variable: '--font-geist-mono', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://oi0.es'),
  title: 'Rodrigo Sánchez — Diseñador de producto',
  description: 'Diseñador de producto especializado en UX/UI, web, sistemas, XR e IA',

  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    other: [{ rel: 'icon', url: '/icon.svg' }],
  },

  openGraph: {
    title: 'Rodrigo Sánchez — Diseñador de producto',
    description: 'Portfolio de diseño digital, producto, UX/UI, XR y sistemas',
    images: ['/og-image.png'], // si aún no lo tienes, puedo generarlo
  },
}

const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');var m=document.querySelector('meta[name="theme-color"]');if(!m){m=document.createElement('meta');m.setAttribute('name','theme-color');document.head.appendChild(m);}m.setAttribute('content',d?'#0A0A0A':'#F5F5F5');}catch(e){}})();`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${manrope.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Pone la clase dark antes de pintar (evita el parpadeo) y el meta theme-color inicial. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body
        className="antialiased"
      >
        <SiteNavbar />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
