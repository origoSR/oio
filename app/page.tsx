import type { Metadata } from 'next'
import Link from 'next/link'
import { site } from '@/content/site'
import { projects } from '@/content/projects'
import { ProjectCard } from '@/components/site/ProjectCard'
import { LogoVivo } from '@/components/site/LogoVivo'
import { SiteFooter } from '@/components/site/SiteFooter'

export const metadata: Metadata = {
  title: site.home.seo.title,
  description: site.home.seo.description,
  alternates: { canonical: '/' },
  openGraph: {
    title: site.home.seo.title,
    description: site.home.seo.description,
    images: ['/proyectos/push/01-portada.jpg'],
  },
}

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    jobTitle: 'Diseñador de producto',
    address: 'Málaga',
    sameAs: [site.linkedin],
  }

  return (
    <main className="bg-canvas">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section id="hero" className="page-x pt-32 lg:pt-48 pb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">
        <div className="flex flex-col gap-6 max-w-media-l">
          <p className="label text-fg-secondary">{site.home.eyebrow}</p>
          <h1 className="text-h1">{site.home.title}</h1>
          <p className="text-lead text-fg-secondary max-w-text">{site.home.lead}</p>
          <div className="flex flex-wrap gap-8 mt-2">
            {site.home.ctas.map((cta) => (
              <Link key={cta.href} href={cta.href} className="text-body font-semibold hover:opacity-70 transition-opacity">
                {cta.label}
              </Link>
            ))}
          </div>
        </div>
        <LogoVivo />
      </section>

      <section className="section-y page-x">
        <div className="flex items-end justify-between mb-12">
          <p className="label text-fg-secondary">{site.home.projectsLabel}</p>
          <Link href={site.home.projectsLink.href} className="label hover:opacity-70 transition-opacity">
            {site.home.projectsLink.label}
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[var(--gutter)] gap-y-16">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="bg-surface section-y page-x">
        <p className="label text-fg-secondary">{site.home.how.label}</p>
        <h2 className="text-h2 max-w-media-l mt-4">{site.home.how.title}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-[var(--gutter)] gap-y-12 mt-12">
          {site.home.how.steps.map((step) => (
            <div key={step.n} className="border-t border-line-strong pt-4 flex flex-col gap-2">
              <p className="label text-fg-tertiary">{step.n}</p>
              <h3 className="text-h4">{step.title}</h3>
              <p className="text-body text-fg-secondary">{step.text}</p>
            </div>
          ))}
        </div>
        <p className="label text-fg-secondary mt-16">{site.home.how.capabilities}</p>
      </section>

      <SiteFooter />
    </main>
  )
}
