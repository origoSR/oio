'use client'

import Link from 'next/link'
import { useIsMobile } from '@/hooks/use-mobile'

export function Hero() {
  const isMobile = useIsMobile()
  const pad = isMobile ? '20px' : '32px'

  const cornerStyle: React.CSSProperties = {
    position: 'absolute',
    zIndex: 10,
    mixBlendMode: 'difference',
    color: 'white',
    fontSize: '16px',
    fontFamily: 'var(--font-manrope)',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    lineHeight: 1.4,
    padding: pad,
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

      {/* TOP LEFT */}
      <div style={{ ...cornerStyle, top: 0, left: 0 }}>
        Product Designer
        <br />
        Web · Branding · SEO
      </div>

      {/* TOP RIGHT */}
      <Link
        href="/work"
        style={{ ...cornerStyle, top: 0, right: 0 }}
        className="hover:opacity-60 transition-opacity"
      >
        Work
      </Link>

      {/* BOTTOM LEFT */}
      <div style={{ ...cornerStyle, bottom: 0, left: 0, fontSize: '19px', fontWeight: 600 }}>
        Rodrigo Sánchez
      </div>

      {/* BOTTOM RIGHT */}
      <Link
        href="/contact"
        style={{ ...cornerStyle, bottom: 0, right: 0 }}
        className="hover:opacity-60 transition-opacity"
      >
        Contact
      </Link>
    </section>
  )
}
