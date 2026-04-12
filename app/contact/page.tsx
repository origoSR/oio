'use client'

import { useIsMobile } from '@/hooks/use-mobile'
import { LogoVivo } from '@/components/home/LogoVivo'

export default function ContactPage() {
  const isMobile = useIsMobile()

  return (
    <main className="h-screen overflow-hidden bg-[#111111] flex flex-col md:flex-row items-center">

      {/* LEFT / TOP */}
      <div
        className="w-full md:w-1/2 flex-[6] md:flex-none md:h-full flex flex-col justify-center items-center md:items-start px-8 md:px-12"
        style={{ borderBottom: 'none', borderRight: '1px solid rgba(255,255,255,0.1)' }}
      >
        <div className="w-full max-w-sm md:max-w-none">
          <h1
            className="font-manrope font-bold text-white leading-none"
            style={{ fontSize: 'clamp(60px, 10vw, 140px)' }}
          >
            ¡Hablemos.
          </h1>

          <p
            className="text-white"
            style={{ fontSize: '16px', opacity: 0.6, maxWidth: '380px', marginTop: '24px' }}
          >
            Cuéntame tu proyecto y construimos algo que funcione.
          </p>

          <div className="flex flex-wrap gap-x-8 gap-y-2" style={{ marginTop: '24px' }}>
            <a
              href="mailto:rosanchez92@gmail.com"
              className="text-xs uppercase tracking-widest text-white opacity-60 hover:opacity-100 transition-opacity duration-300"
            >
              rosanchez92@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/rodrigosanchezromero/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-widest text-white opacity-60 hover:opacity-100 transition-opacity duration-300"
            >
              LinkedIn
            </a>
          </div>

          <p className="text-xs text-white" style={{ opacity: 0.3, marginTop: '24px' }}>
            © 2025 Rodrigo Sánchez
          </p>
        </div>
      </div>

      {/* RIGHT / BOTTOM */}
      <div
        className="w-full md:w-1/2 flex-[4] md:flex-none md:h-full flex items-center justify-center"
        style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
      >
        <div style={{ mixBlendMode: 'difference' }}>
          <LogoVivo size={isMobile ? 200 : 500} />
        </div>
      </div>

    </main>
  )
}
