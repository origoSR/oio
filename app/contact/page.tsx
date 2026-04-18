'use client'

import { useEffect, useState } from 'react'
import { LogoVivo } from '@/components/home/LogoVivo'

export default function ContactPage() {
  const [logoSize, setLogoSize] = useState(0)

  useEffect(() => {
    const compute = () => {
      if (window.innerWidth < 768) {
        setLogoSize(Math.round(Math.min(window.innerWidth * 0.70, window.innerHeight * 0.70)))
      } else {
        setLogoSize(500)
      }
    }
    compute()
    window.addEventListener('resize', compute)
    return () => window.removeEventListener('resize', compute)
  }, [])

  return (
    <main className="h-screen overflow-hidden bg-[#F5F5F5] flex flex-col md:flex-row items-center">

      {/* TEXT — mitad superior en mobile, izquierda en desktop */}
      <div className="w-full md:w-1/2 flex-1 md:flex-none md:h-full flex flex-col justify-center px-4 lg:px-6">

        <h1
          className="font-manrope font-bold tracking-[-0.02em] leading-none"
          style={{ fontSize: 'clamp(60px, 10vw, 140px)', color: '#222222' }}
        >
          Hablemos.
        </h1>

        <p className="font-manrope text-lg lg:text-xl font-normal leading-snug mt-6" style={{ color: '#222222', opacity: 0.6, maxWidth: '380px' }}>
          Cuéntame tu proyecto y construimos algo que funcione.
        </p>

        <div className="flex flex-wrap gap-x-8 gap-y-2 mt-6">
          <a
            href="mailto:rosanchez92@gmail.com"
            className="font-manrope text-xs uppercase tracking-widest hover:opacity-60 transition-opacity duration-300"
            style={{ color: '#222222' }}
          >
            rosanchez92@gmail.com
          </a>
          <a
            href="https://www.linkedin.com/in/rodrigosanchezromero/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-manrope text-xs uppercase tracking-widest hover:opacity-60 transition-opacity duration-300"
            style={{ color: '#222222' }}
          >
            LinkedIn
          </a>
        </div>

        <p className="font-manrope text-xs mt-6" style={{ color: '#888888' }}>
          © 2025 Rodrigo Sánchez
        </p>

      </div>

      {/* LOGO — mitad inferior en mobile, derecha en desktop */}
      <div className="w-full md:w-1/2 flex-1 md:flex-none md:h-full flex items-center justify-center">
        {logoSize > 0 && <LogoVivo size={logoSize} />}
      </div>

    </main>
  )
}
