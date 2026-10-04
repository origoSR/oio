import type { Metadata } from 'next'
import { site } from '@/content/site'
import { projects } from '@/content/projects'
import type { Service } from '@/content/types'
import { FilterChip } from '@/components/site/FilterChip'
import { WorkCard } from '@/components/site/WorkCard'
import { ContactGridCard } from '@/components/site/ContactGridCard'
import { OtherRow } from '@/components/site/OtherRow'
import { SiteFooter } from '@/components/site/SiteFooter'
import { workCardWidth, workCardColSpan } from '@/lib/work-grid'

export const metadata: Metadata = {
  title: site.projectsPage.seo.title,
  description: site.projectsPage.seo.description,
  alternates: { canonical: '/proyectos' },
  openGraph: {
    title: site.projectsPage.seo.title,
    description: site.projectsPage.seo.description,
  },
}

export default async function ProyectosPage({ searchParams }: { searchParams: Promise<{ servicio?: string }> }) {
  const { servicio } = await searchParams
  const activeSlug = (servicio as Service | undefined) ?? null

  const visible = activeSlug ? projects.filter((p) => p.services.includes(activeSlug)) : projects

  // Oculta los chips de servicios sin ningun proyecto (sobre el total, no sobre el filtro activo).
  const filters = site.projectsPage.filters.filter(
    (f) => f.slug === null || projects.some((p) => p.services.includes(f.slug as Service))
  )

  return (
    <main className="bg-canvas">
      <section className="page-x pt-32 lg:pt-48 pb-12 lg:pb-16">
        <h1 className="text-display">{site.projectsPage.title}</h1>
        <div className="flex gap-2 mt-10 overflow-x-auto scrollbar-hide lg:flex-wrap">
          {filters.map((f) => (
            <FilterChip
              key={f.slug ?? 'todos'}
              href={f.slug ? `/proyectos?servicio=${f.slug}` : '/proyectos'}
              label={f.label}
              active={f.slug === activeSlug}
            />
          ))}
        </div>
      </section>

      <section className="page-x pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-4 lg:gap-x-8 gap-y-12 lg:gap-y-16">
          {visible.map((project, i) => (
            <div key={project.slug} className={workCardColSpan(workCardWidth(i))}>
              <WorkCard project={project} variant={workCardWidth(i) === 8 ? 'wide' : 'narrow'} />
            </div>
          ))}
          {visible.length % 2 === 1 && (
            <div className={workCardColSpan(workCardWidth(visible.length))}>
              <ContactGridCard contact={site.projectsPage.contactCard} />
            </div>
          )}
        </div>
      </section>

      <section className="page-x section-y">
        <p className="label text-fg-secondary mb-6">{site.projectsPage.othersLabel}</p>
        <div>
          {site.projectsPage.others.map((other) => (
            <OtherRow key={other.title} title={other.title} description={other.description} meta={other.meta} cta={other.cta} />
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
