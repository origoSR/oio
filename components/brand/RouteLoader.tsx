'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Pebble } from '@/components/brand/Pebble'

/**
 * Cargador de transición entre rutas: Pebble a 120px, solo respirando, y solo si
 * la navegación tarda más de 300ms. El App Router no da un evento de "empieza la
 * navegación", así que lo aproximamos con el click en un enlace interno y lo
 * cerramos en cuanto el pathname cambia.
 */
export function RouteLoader() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const link = (e.target as HTMLElement)?.closest('a')
      if (!link || link.target === '_blank') return
      const href = link.getAttribute('href')
      if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:')) return

      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => setVisible(true), 300)
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  // El pathname cambió: la navegación terminó.
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setVisible(false)
  }, [pathname])

  if (!visible) return null

  return (
    <div aria-hidden="true" className="fixed inset-0 z-[60] flex items-center justify-center bg-canvas/70 pointer-events-none">
      <Pebble breatheOnly className="w-30 h-30" />
    </div>
  )
}
