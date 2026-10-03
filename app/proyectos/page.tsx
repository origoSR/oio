import type { Metadata } from 'next'
import { site } from '@/content/site'
import { projects } from '@/content/projects'
import { WorkRow } from '@/components/site/WorkRow'
import { OtherRow } from '@/components/site/OtherRow'
import { SiteFooter } from '@/components/site/SiteFooter'

export const metadata: Metadata = {
  title: site.projectsPage.seo.title,
  description: site.projectsPage.seo.description,
  alternates: { canonical: '/proyectos' },
  openGraph: {
    title: site.projectsPage.seo.title,
    description: site.projectsPage.seo.description,
  },
}

export default function ProyectosPage() {
  return (
    <main className="bg-canvas">
      <section className="page-x pt-32 lg:pt-48 pb-16">
        <h1 className="text-display">{site.projectsPage.title}</h1>
        <p className="text-lead text-fg-secondary max-w-text mt-6">{site.projectsPage.lead}</p>
      </section>

      <section className="page-x pb-16">
        {projects.map((project, i) => (
          <WorkRow key={project.slug} project={project} number={String(i + 1).padStart(2, '0')} />
        ))}
      </section>

      <section className="page-x section-y">
        <p className="label text-fg-secondary mb-6">{site.projectsPage.othersLabel}</p>
        <div>
          {site.projectsPage.others.map((other) => (
            <OtherRow key={other.title} title={other.title} description={other.description} meta={other.meta} />
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
