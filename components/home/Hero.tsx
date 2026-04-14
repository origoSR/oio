'use client'

import Link from 'next/link'
import { useIsMobile } from '@/hooks/use-mobile'

export function Hero() {
  const isMobile = useIsMobile()
  const pad = isMobile ? '16px' : '32px'

  const baseCorner: React.CSSProperties = {
    position: 'absolute',
    zIndex: 10,
    fontFamily: 'var(--font-manrope)',
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    lineHeight: 1.4,
    padding: pad,
  }

  // Textos decorativos — blanco puro, sin blend mode
  const infoStyle: React.CSSProperties = {
    ...baseCorner,
    color: '#FFFFFF',
    fontSize: isMobile ? '13px' : '16px',
    fontWeight: 800,
    opacity: 0.9,
  }

  const nameStyle: React.CSSProperties = {
    ...baseCorner,
    color: '#FFFFFF',
    fontSize: isMobile ? '13px' : '16px',
    fontWeight: 800,
    opacity: 0.9,
  }

  // Links de navegación — con mix-blend-mode difference
  const navLinkStyle: React.CSSProperties = {
    ...baseCorner,
    color: 'white',
    fontSize: isMobile ? '20px' : '32px',
    fontWeight: 900,
    opacity: 1,
    cursor: 'pointer',
    padding: isMobile ? '12px' : pad,
  }

  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden"
    >
      {/* VIDEO BACKGROUND */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/ocean-bg.mp4"
      />

      {/* LOGO ANCHOR — centrado */}
      <div
        id="draggable-logo-anchor"
        className="pointer-events-none absolute"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '220px',
          zIndex: 1,
        }}
        aria-hidden
      >
        <img
          src="/logo_oi0_mask.svg"
          alt=""
          aria-hidden="true"
          className="w-full h-auto opacity-0"
        />
      </div>

      {/* TOP LEFT — decorativo */}
      <div style={{ ...infoStyle, top: 0, left: 0 }}>
        {isMobile ? (
          <>
            Product Designer
            <br />
            Web
            <br />
            Branding
            <br />
            SEO
          </>
        ) : (
          <>
            Product Designer
            <br />
            Web · Branding · SEO
          </>
        )}
      </div>

      {/* TOP RIGHT — nav */}
      <Link
        href="/work"
        style={{ ...navLinkStyle, top: 0, right: 0 }}
        className="hover:opacity-50 transition-opacity duration-150"
      >
        Work →
      </Link>

      {/* BOTTOM LEFT — decorativo */}
      <div style={{ ...nameStyle, bottom: 0, left: 0 }}>
        {isMobile ? (
          <>
            Rodrigo
            <br />
            Sánchez
          </>
        ) : (
          <>Rodrigo Sánchez</>
        )}
      </div>

      {/* BOTTOM RIGHT — nav */}
      <Link
        href="/contact"
        style={{ ...navLinkStyle, bottom: 0, right: 0 }}
        className="hover:opacity-50 transition-opacity duration-150"
      >
        Contact →
      </Link>
    </section>
  )
}
