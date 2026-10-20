'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

// Recurso de marca: la capa de construcción, idéntica a Figma (página "Marca ·
// exploración", sección 6 · Propuesta). Medidas exactas, sin redondear.
// Solo existe con ratón/trackpad y desde 1024px (variante `construction` en
// globals.css); aria-hidden y pointer-events: none siempre. Nunca en el formulario.

const GUIDE = '#2F6BFF'
const COMPONENT = '#9747FF'

const TEXT = 'font-mono text-[10px] leading-[13px] whitespace-nowrap'

/** Cómo se muestra: 'hover' necesita un ancestro `group` que reciba el ratón; 'always' se ve siempre desde 1024px. */
type Visibility = 'hover' | 'always'

const visibilityClass = (visible: Visibility) =>
  visible === 'hover'
    ? 'opacity-0 transition-opacity duration-300 ease-out motion-reduce:transition-none construction:group-hover:opacity-100'
    : 'hidden construction:block'

function DashedOutline({ opacity }: { opacity: number }) {
  return (
    <svg aria-hidden="true" className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
      <rect x="0" y="0" width="100%" height="100%" fill="none" stroke={GUIDE} strokeOpacity={opacity} strokeWidth={1} strokeDasharray="4 4" />
    </svg>
  )
}

function SolidOutline({ color = COMPONENT, opacity = 0.5 }: { color?: string; opacity?: number }) {
  return (
    <svg aria-hidden="true" className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
      <rect x="0" y="0" width="100%" height="100%" fill="none" stroke={color} strokeOpacity={opacity} strokeWidth={1} />
    </svg>
  )
}

/**
 * Envuelve `children` con un contorno discontinuo azul y su anotación encima
 * (ej. el h2 de "Cómo trabajo" o el h1 de /agencias).
 */
export function GuideBox({
  children,
  label,
  opacity,
  gap = 3,
  align = 'left',
  visible,
  className,
}: {
  children: ReactNode
  label: string
  opacity: number
  gap?: number
  align?: 'left' | 'right'
  visible: Visibility
  className?: string
}) {
  return (
    <div className={cn('relative', className)}>
      {children}
      <div aria-hidden="true" className={cn('absolute inset-0 pointer-events-none', visibilityClass(visible))}>
        <DashedOutline opacity={opacity} />
        <div className={cn('absolute bottom-full', align === 'left' ? 'left-0' : 'right-0')} style={{ marginBottom: gap }}>
          <span className={TEXT} style={{ color: GUIDE }}>
            {label}
          </span>
        </div>
      </div>
    </div>
  )
}

/**
 * Envuelve `children` con un contorno continuo morado y su etiqueta pegada
 * encima, sin hueco (ej. Site/Button, Site/Step × 4, Site/Point × 6).
 */
export function ComponentBox({
  children,
  label,
  align = 'left',
  inset = 0,
  visible,
  className,
}: {
  children: ReactNode
  label: string
  align?: 'left' | 'right'
  inset?: number
  visible: Visibility
  className?: string
}) {
  return (
    <div className={cn('relative', className)}>
      {children}
      <div aria-hidden="true" className={cn('absolute inset-0 pointer-events-none', visibilityClass(visible))}>
        <SolidOutline opacity={0.5} />
        <div
          className="absolute bottom-full h-[19px] pt-[3px]"
          style={align === 'left' ? { left: inset } : { right: inset }}
        >
          <span className={TEXT} style={{ color: COMPONENT }}>
            {label}
          </span>
        </div>
      </div>
    </div>
  )
}

/**
 * Retícula de 12 columnas (relleno azul) + las dos líneas de borde del área de
 * contenido, para una sección entera (relative). "Cómo trabajo": 5%/50%.
 * /agencias: 2%/30%.
 */
export function SectionGrid({ fillOpacity, lineOpacity, visible }: { fillOpacity: number; lineOpacity: number; visible: Visibility }) {
  return (
    <div aria-hidden="true" className={cn('absolute inset-0 pointer-events-none', visibilityClass(visible))}>
      <div className="absolute inset-0 grid-page page-x">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="h-full" style={{ background: GUIDE, opacity: fillOpacity }} />
        ))}
      </div>
      <div className="absolute inset-y-0 w-px" style={{ left: 'var(--margin)', background: GUIDE, opacity: lineOpacity }} />
      <div className="absolute inset-y-0 w-px" style={{ right: 'var(--margin)', background: GUIDE, opacity: lineOpacity }} />
    </div>
  )
}

/** Medida del padding superior de una sección: línea de section-y + píldora. Solo en hover. */
export function SectionTopPadding({ label }: { label: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn('absolute pointer-events-none', visibilityClass('hover'))}
      style={{ left: 'var(--margin)', top: 0, height: 'var(--section-y)' }}
    >
      <div className="absolute inset-y-0 left-0 w-px" style={{ background: GUIDE }} />
      <span
        className={TEXT}
        style={{ position: 'absolute', left: 8, top: 8, background: GUIDE, color: '#fff', padding: '3px 6px' }}
      >
        {label}
      </span>
    </div>
  )
}

/** Anotación sin caja ni contorno, en azul (ej. "Site/Step × 3 · 4 col · gap 32"). */
export function GuideLabel({ children, visible = 'hover', className }: { children: ReactNode; visible?: Visibility; className?: string }) {
  return (
    <span aria-hidden="true" className={cn('absolute pointer-events-none', TEXT, visibilityClass(visible), className)} style={{ color: GUIDE }}>
      {children}
    </span>
  )
}

const NAMED_RATIOS: [number, string][] = [
  [1, '1:1'],
  [4 / 3, '4:3'],
  [3 / 4, '3:4'],
  [3 / 2, '3:2'],
  [2 / 3, '2:3'],
  [16 / 9, '16:9'],
  [9 / 16, '9:16'],
  [16 / 10, '16:10'],
  [10 / 16, '10:16'],
  [5 / 4, '5:4'],
  [4 / 5, '4:5'],
]

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b)
}

function ratioLabel(w: number, h: number): string {
  const r = w / h
  const named = NAMED_RATIOS.find(([value]) => Math.abs(r - value) < 0.01)
  if (named) return named[1]
  const g = gcd(Math.round(w), Math.round(h)) || 1
  return `${Math.round(w / g)}:${Math.round(h / g)}`
}

/**
 * Site/WorkCard, al pasar el ratón: contorno discontinuo + marcas de corte sobre
 * la media (en su propio overflow:hidden), más "col X–Y" y la ruta/peso del
 * archivo, que se salen de la media y no pueden recortarse (segunda capa, misma
 * altura que la media pero sin overflow:hidden).
 */
export function WorkCardMediaConstruction({ mediaHeightClass }: { mediaHeightClass: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState<{ w: number; h: number } | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => setSize({ w: Math.round(el.offsetWidth), h: Math.round(el.offsetHeight) })
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn('absolute inset-x-0 top-0 pointer-events-none', mediaHeightClass, visibilityClass('hover'))}
    >
      <DashedOutline opacity={1} />
      {/* Marcas de corte: una cruz de 20×1 / 1×20 centrada en cada esquina. */}
      {[
        { x: 'left-0', y: 'top-0', t: '-translate-x-1/2 -translate-y-1/2' },
        { x: 'right-0', y: 'top-0', t: 'translate-x-1/2 -translate-y-1/2' },
        { x: 'left-0', y: 'bottom-0', t: '-translate-x-1/2 translate-y-1/2' },
        { x: 'right-0', y: 'bottom-0', t: 'translate-x-1/2 translate-y-1/2' },
      ].map((c, i) => (
        <div key={i} className={cn('absolute', c.x, c.y, c.t)}>
          <div className="absolute w-5 h-px top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ background: GUIDE }} />
          <div className="absolute w-px h-5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ background: GUIDE }} />
        </div>
      ))}
      {size && (
        <span className={TEXT} style={{ position: 'absolute', left: 16, top: 16, background: GUIDE, color: '#fff', padding: '3px 6px' }}>
          {size.w} × {size.h} · {ratioLabel(size.w, size.h)}
        </span>
      )}
    </div>
  )
}

/** Segunda capa, misma altura que la media pero sin recorte: "col X–Y" y ruta/peso. */
export function WorkCardOuterConstruction({ colLabel, path, weight, mediaHeightClass }: { colLabel: string; path: string; weight: string | null; mediaHeightClass: string }) {
  return (
    <div aria-hidden="true" className={cn('absolute inset-x-0 top-0 pointer-events-none', mediaHeightClass)}>
      <GuideLabel visible="hover" className="right-0 bottom-full mb-4">
        {colLabel}
      </GuideLabel>
      <GuideLabel visible="hover" className="left-0 top-full mt-[70px]">
        {path} · {weight ?? '—'}
      </GuideLabel>
    </div>
  )
}
