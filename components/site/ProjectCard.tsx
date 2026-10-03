import Link from 'next/link'
import Image from 'next/image'
import type { Project } from '@/content/types'

export function ProjectCard({ project }: { project: Project }) {
  const cover = project.blocks.find((b) => b.type === 'cover')
  const image = cover?.type === 'cover' ? cover.image : undefined

  return (
    <Link
      href={`/proyectos/${project.slug}`}
      data-project={project.key}
      className="group block border-b-2 border-transparent hover:border-project focus-visible:border-project transition-colors duration-300"
    >
      {image && (
        <div className="relative w-full aspect-[16/10] rounded-md overflow-hidden">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 648px, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
      )}
      <p className="label text-fg-tertiary mt-4">{project.cardMeta}</p>
      <h3 className="text-h3 mt-2">{project.title}</h3>
      <p className="text-body text-fg-secondary mt-1">{project.subtitle}</p>
    </Link>
  )
}
