import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { Project } from '@/content/types'

/** Site/WorkCard. `variant` decide que imagen de `card` se usa segun el ancho en la rejilla. */
export function WorkCard({ project, variant }: { project: Project; variant: 'wide' | 'narrow' }) {
  const { card } = project
  const image = card.logo ? undefined : variant === 'wide' ? card.wide : card.narrow
  const sizes = variant === 'wide' ? '(min-width: 1024px) 864px, 100vw' : '(min-width: 1024px) 416px, 100vw'

  return (
    <Link href={`/proyectos/${project.slug}`} data-project={project.key} className="group block">
      <div className="relative w-full h-[300px] lg:h-[540px] overflow-hidden">
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
