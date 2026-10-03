import Link from 'next/link'
import type { Project } from '@/content/types'

export function NextProject({ next }: { next: Project }) {
  return (
    <Link
      href={`/proyectos/${next.slug}`}
      data-project={next.key}
      className="block bg-project text-on-project page-x pt-12 lg:pt-16 pb-20 lg:pb-32"
    >
      <p className="label mb-6">Siguiente proyecto ↓</p>
      <span className="block text-h1 text-on-project">{next.title}</span>
      <span className="block text-h1 text-on-project-secondary">{next.subtitle}</span>
    </Link>
  )
}
