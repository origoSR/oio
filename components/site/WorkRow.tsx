import Link from 'next/link'
import Image from 'next/image'
import type { Project } from '@/content/types'

export function WorkRow({ project, number }: { project: Project; number: string }) {
  const cover = project.blocks.find((b) => b.type === 'cover')
  const image = cover?.type === 'cover' ? cover.image : undefined

  return (
    <Link href={`/proyectos/${project.slug}`} className="block border-t border-line pt-8 pb-16 grid-page">
      <div className="col-span-4 lg:col-span-4 flex flex-col gap-2 order-2 lg:order-1">
        <p className="label text-fg-tertiary">{number}</p>
        <h3 className="text-h2">{project.title}</h3>
        <p className="text-lead text-fg-secondary">{project.subtitle}</p>
        <p className="label text-fg-tertiary mt-2">{project.rowMeta}</p>
        <p className="label mt-1">Ver caso →</p>
      </div>
      {image && (
        <div className="col-span-4 lg:col-span-8 order-1 lg:order-2 relative w-full aspect-[16/10] rounded-md overflow-hidden mb-6 lg:mb-0">
          <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 864px, 100vw" className="object-cover" />
        </div>
      )}
    </Link>
  )
}
