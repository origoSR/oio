import { cn } from '@/lib/utils'
import type { BrandNote } from '@/content/brand'

/**
 * Recurso de marca: la capa de construcción. Superpuesta, aria-hidden,
 * pointer-events: none, position: absolute sobre su contenedor (que debe ser
 * `relative`, y `group` si `mode` es 'hover').
 *
 * 'hover': aparece en 300ms solo con ratón/trackpad (pointer-fine + group-hover
 * del contenedor); no existe en táctil. 'always': visible desde 1024px.
 * Más de dos anotaciones en una zona es demasiado, así que corta al resto.
 */
export function Construction({
  notes,
  grid = false,
  outline = true,
  dashed = false,
  corners = false,
  mode = 'hover',
  className,
}: {
  notes?: BrandNote[]
  grid?: boolean
  outline?: boolean
  dashed?: boolean
  corners?: boolean
  mode?: 'hover' | 'always'
  className?: string
}) {
  const shown = (notes ?? []).slice(0, 2)
  const accent = shown[0]?.kind === 'component' ? 'var(--color-construction-component)' : 'var(--color-construction-guide)'

  return (
    <div
      aria-hidden="true"
      className={cn(
        'absolute inset-0 pointer-events-none',
        mode === 'hover'
          ? 'opacity-0 transition-opacity duration-300 ease-out motion-reduce:transition-none pointer-fine:group-hover:opacity-100'
          : 'hidden lg:block',
        className
      )}
    >
      {grid && (
        <div className="absolute inset-0 grid-page page-x">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="hidden lg:block h-full" style={{ background: 'var(--color-construction-guide)', opacity: 0.03 }} />
          ))}
        </div>
      )}

      {outline && (
        <div className={cn('absolute inset-0 border', dashed && 'border-dashed')} style={{ borderColor: accent, opacity: 0.5 }} />
      )}

      {corners && (
        <>
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l" style={{ borderColor: accent, opacity: 0.55 }} />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r" style={{ borderColor: accent, opacity: 0.55 }} />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l" style={{ borderColor: accent, opacity: 0.55 }} />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r" style={{ borderColor: accent, opacity: 0.55 }} />
        </>
      )}

      {shown.length > 0 && (
        <div className="absolute left-2 top-2 flex flex-col gap-0.5">
          {shown.map((note, i) => (
            <span
              key={i}
              className="font-mono text-[10px] leading-tight whitespace-nowrap"
              style={{ color: note.kind === 'guide' ? 'var(--color-construction-guide)' : 'var(--color-construction-component)' }}
            >
              {note.text}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
