import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CaseLayout } from '@/components/case/CaseLayout'
import { CaseHeader } from '@/components/case/CaseHeader'
import { CaseBlocks } from '@/components/case/CaseBlocks'
import { NextProject } from '@/components/case/NextProject'
import { getProject, getNextProject, projects } from '@/content/projects'

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}

  const cover = project.blocks.find((b) => b.type === 'cover')
  const ogImage = cover?.type === 'cover' ? cover.image.src : '/og-image.png'

  return {
    title: project.seo.title,
    description: project.seo.description,
    alternates: { canonical: `/proyectos/${project.slug}` },
    openGraph: {
      title: project.seo.title,
      description: project.seo.description,
      images: [ogImage],
    },
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const next = getNextProject(slug)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.seo.description,
    dateCreated: project.year.slice(0, 4),
    creator: { '@type': 'Person', name: 'Rodrigo Sánchez' },
  }

  return (
    <CaseLayout projectKey={project.key}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CaseHeader project={project} />
      <CaseBlocks blocks={project.blocks} />
      <NextProject next={next} />
    </CaseLayout>
  )
}
