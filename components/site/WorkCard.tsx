import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { WorkCardMediaConstruction, WorkCardOuterConstruction } from '@/components/brand/Construction'
import { publicFileSize } from '@/lib/file-size'
import type { Project } from '@/content/types'

/**
 * Site/WorkCard. `variant` decide que imagen de `card` se usa y el ancho en la rejilla.
 * 'full' es la ultima tarjeta cuando el numero de proyectos visibles es impar: usa la
 * imagen wide (o el logo) a las 12 columnas, con una media mas alta en desktop.
 * `colLabel` (recurso de marca): "col 1–8" etc., de lib/work-grid.ts.
 */
export function WorkCard({ project, variant, colLabel }: { project: Project; variant: 'wide' | 'narrow' | 'full'; colLabel?: string }) {
  const { card } = project
  const image = card.logo ? undefined : variant === 'narrow' ? card.narrow : card.wide
  const sizes = variant === 'narrow' ? '(min-width: 1024px) 416px, 100vw' : '(min-width: 1024px) 1312px, 100vw'
  const mediaHeightClass = cn('h-[300px]', variant === 'full' ? 'lg:h-[640px]' : 'lg:h-[540px]')

  // Recurso de marca: ruta (sin la "/" inicial) y peso del archivo, calculado en build.
  const media = card.logo ?? image
  const path = media ? media.src.replace(/^\//, '') : null
  const weight = media ? publicFileSize(media.src) : null

  return (
    <Link href={`/proyectos/${project.slug}`} data-project={project.key} className="group relative block">
      <div className={cn('relative w-full overflow-hidden', mediaHeightClass)}>
        {card.logo ? (
          <div className="absolute inset-0 bg-project flex items-center justify-center p-12">
            <Image
              src={card.logo.src}
              alt={card.logo.alt}
              width={card.logo.w}
              height={card.logo.h}
              className="w-auto h-auto max-h-full lg:max-h-[120px] object-contain"
            />
          </div>
        ) : image ? (
          <div className={cn('absolute inset-0', image.fit === 'contain' && 'bg-project-tint')}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={sizes}
              className={cn(
                'transition-transform duration-300 ease-out motion-reduce:transition-none',
                image.fit === 'contain' ? 'object-contain' : 'object-cover',
                'pointer-fine:group-hover:scale-[1.03]'
              )}
            />
          </div>
        ) : null}
      </div>
      {/* Fuera del overflow-hidden de la media: el contorno y las marcas de corte se salen
          10px del borde, y "col X–Y" / ruta·peso van por encima y por debajo de la media. */}
      <WorkCardMediaConstruction mediaHeightClass={mediaHeightClass} />
      {path && colLabel && <WorkCardOuterConstruction colLabel={colLabel} path={path} weight={weight} mediaHeightClass={mediaHeightClass} />}

      <div className="flex items-center gap-2 mt-4">
        <h4 className="text-h4">{project.title}</h4>
        <span
          aria-hidden="true"
          className="opacity-0 -translate-x-1 pointer-fine:group-hover:opacity-100 pointer-fine:group-hover:translate-x-0 transition-all duration-300 ease-out motion-reduce:transition-none"
        >
          →
        </span>
      </div>
      <p className="text-body text-fg-secondary mt-1 grid">
        <span className="col-start-1 row-start-1 pointer-fine:group-hover:opacity-0 transition-opacity duration-300 motion-reduce:transition-none">
          {card.services}
        </span>
        <span
          aria-hidden="true"
          className="col-start-1 row-start-1 opacity-0 pointer-fine:group-hover:opacity-100 transition-opacity duration-300 motion-reduce:transition-none"
        >
          {card.tagline}
        </span>
      </p>
    </Link>
  )
}
