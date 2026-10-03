import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProject, projects } from '@/content/projects'

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}

  return {
    title: project.seo.title,
    description: project.seo.description,
    alternates: { canonical: `/proyectos/${project.slug}` },
    openGraph: {
      title: project.seo.title,
      description: project.seo.description,
      images: [project.blocks[0].type === 'cover' ? project.blocks[0].image.src : '/og-image.png'],
    },
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  return (
    <main data-project={project.key}>
      <section className="bg-project text-on-project page-x pt-32 pb-16">
        <h1 className="text-h1">{project.title}</h1>
        <p className="text-h1 text-on-project-secondary">{project.subtitle}</p>
      </section>
      <section className="page-x section-y">
        <p>Contexto: {project.ficha[0]?.content}</p>
      </section>
    </main>
  )
}
