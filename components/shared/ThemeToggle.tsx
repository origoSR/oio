'use client'

import { useLayoutEffect, useRef, useState } from 'react'

const LIGHT_THEME_COLOR = '#F5F5F5'
const DARK_THEME_COLOR = '#0A0A0A'

function setThemeColorMeta(dark: boolean) {
  let meta = document.querySelector('meta[name="theme-color"]')
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute('name', 'theme-color')
    document.head.appendChild(meta)
  }
  meta.setAttribute('content', dark ? DARK_THEME_COLOR : LIGHT_THEME_COLOR)
}

/**
 * Interruptor de tema, como en boldscandinavia.com: SVG de 26x12 con dos
 * círculos de 12px que intercambian de lado. El estado real vive en la
 * clase `dark` de <html> (la pone el script anti-parpadeo de layout.tsx);
 * este componente solo la lee y la alterna.
 */
export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [wiggle, setWiggle] = useState(false)
  const reducedMotionRef = useRef(false)

  useLayoutEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    reducedMotionRef.current = reduced
    if (reduced) return

    let alreadySeen = false
    try {
      alreadySeen = localStorage.getItem('theme-toggle-seen') === '1'
    } catch {
      // Storage bloqueado (modo privado, etc.): no insistir, solo no mostrar el guiño.
      alreadySeen = true
    }
    if (alreadySeen) return

    const showTimer = window.setTimeout(() => {
      setWiggle(true)
      const hideTimer = window.setTimeout(() => setWiggle(false), 300)
      try {
        localStorage.setItem('theme-toggle-seen', '1')
      } catch {
        /* nada que hacer si no hay storage */
      }
      return () => window.clearTimeout(hideTimer)
    }, 1200)
    return () => window.clearTimeout(showTimer)
  }, [])

  const toggle = () => {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle('dark', next)
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light')
    } catch {
      /* si no hay storage, el toggle sigue funcionando, solo no se recuerda */
    }
    setThemeColorMeta(next)
  }

  // El guiño de la primera visita intercambia la posición un instante y
  // vuelve, sin tocar el tema real: solo afecta a dónde se dibujan los
  // círculos, nunca a isDark/aria-pressed.
  const visualDark = wiggle ? !isDark : isDark
  const canNudge = hovered && !reducedMotionRef.current
  const filledBaseX = visualDark ? 0 : 14
  const outlineX = visualDark ? 14 : 0
  const filledX = filledBaseX + (canNudge ? (visualDark ? 2 : -2) : 0)

  return (
    <button
      type="button"
      onClick={toggle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      aria-pressed={isDark}
      className="relative shrink-0 inline-flex items-center justify-center size-11 cursor-pointer"
    >
      <svg width="26" height="12" viewBox="0 0 26 12" fill="none" aria-hidden="true">
        <rect
          x={outlineX}
          y="0"
          width="12"
          height="12"
          rx="6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          style={{ transition: 'x 300ms cubic-bezier(.87,0,.13,1)' }}
        />
        <rect
          x={filledX}
          y="0"
          width="12"
          height="12"
          rx="6"
          fill="currentColor"
          style={{ transition: 'x 300ms cubic-bezier(.87,0,.13,1)' }}
        />
      </svg>
    </button>
  )
}
