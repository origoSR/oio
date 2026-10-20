import type { Metadata } from 'next'
import Link from 'next/link'
import { site } from '@/content/site'
import { projects, featuredSlugs, getProject } from '@/content/projects'
import { WorkCard } from '@/components/site/WorkCard'
import { SiteFooter } from '@/components/site/SiteFooter'
import { Button } from '@/components/site/Button'
import { ServiceRow } from '@/components/site/ServiceRow'
import { homeServiceLinks, servicePages } from '@/content/services'
import { brandNotes } from '@/content/brand'
import { SectionGrid, SectionTopPadding, GuideBox, GuideLabel } from '@/components/brand/Construction'
import { workCardVariant, workCardColSpan, workCardColLabel } from '@/lib/work-grid'

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
    worksFor: { '@type': 'Organization', name: site.brand },
    makesOffer: servicePages.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.title, description: s.summary, url: `https://oi0.es/servicios/${s.slug}` },
    })),
  }

  const featured = featuredSlugs.map(getProject).filter((p): p is NonNullable<typeof p> => Boolean(p))

  return (
    <main className="bg-canvas">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* 1. Hero: sin el anillo del logo. pt compensa el navbar fixed con su alto real
          (--navbar-h); en desktop ocupa la primera pantalla entera (min-h) con el
          contenido centrado, y manda el padding si la pantalla es baja. */}
      <section
        id="hero"
        className="page-x pb-[var(--hero-pad-y)] pt-[calc(var(--navbar-h)+var(--hero-pad-y))] lg:min-h-[calc(100svh-var(--navbar-h))] flex flex-col lg:justify-center"
      >
        <div className="max-w-media-l">
          <div className="flex flex-col gap-6 md:gap-8">
            <p className="label text-fg-secondary">{site.home.eyebrow}</p>
            <h1 className="text-h1">{site.home.title}</h1>
            <p className="text-lead text-fg-secondary max-w-text">{site.home.lead}</p>
          </div>
          <div className="flex flex-wrap items-center gap-8 mt-[var(--hero-cta-gap)]">
            {/* Regla del sitio: la acción principal de la página es un Button principal; la secundaria, un enlace de texto. */}
            {site.home.ctas.map((cta, i) =>
              i === 0 ? (
                <Button key={cta.href} href={cta.href}>
                  {cta.label}
                </Button>
              ) : (
                <Link key={cta.href} href={cta.href} className="text-body font-semibold hover:opacity-70 transition-opacity">
                  {cta.label}
                </Link>
              )
            )}
          </div>
          <p className="text-body text-fg-secondary mt-6 lg:mt-8">
            {site.home.agencyNote.text}
            <Link href={site.home.agencyNote.link.href} className="text-fg underline hover:opacity-70 transition-opacity">
              {site.home.agencyNote.link.label}
            </Link>
          </p>
        </div>
      </section>

      {/* 2. Proyectos destacados: sin padding-top extra, el hero ya aporta el aire. */}
      <section className="pb-[var(--section-y)] page-x">
        <div className="flex items-end justify-between mb-12 gap-4">
          <p className="label text-fg-secondary">{site.home.projectsLabel}</p>
          <Link href={site.home.projectsLink.href} className="label hover:opacity-70 transition-opacity whitespace-nowrap">
            Ver los {projects.length} proyectos →
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-4 lg:gap-x-8 gap-y-12 lg:gap-y-24">
          {featured.map((project, i) => {
            const variant = workCardVariant(i, featured.length)
            return (
              <div key={project.slug} className={workCardColSpan(variant)}>
                <WorkCard project={project} variant={variant} colLabel={workCardColLabel(i, featured.length)} />
              </div>
            )
          })}
        </div>
      </section>

      {/* 3. Agencias: sobre bg-inverse, entre "Proyectos destacados" y "Qué hago". En móvil, todo apilado. */}
      <section className="bg-inverse dark:bg-surface text-fg-on-inverse dark:text-fg section-y page-x">
        <p className="label text-fg-on-inverse-secondary dark:text-fg-secondary">{site.home.agencies.label}</p>
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-8 lg:items-end">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <h2 className="text-h2 text-fg-on-inverse dark:text-fg">{site.home.agencies.title}</h2>
            <p className="text-lead text-fg-on-inverse-secondary dark:text-fg-secondary">{site.home.agencies.lead}</p>
          </div>
          <div className="lg:col-span-5 flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-8">
            <Button href={site.home.agencies.cta.href} className="bg-canvas text-fg hover:opacity-80">
              {site.home.agencies.cta.label}
            </Button>
            <Link href={site.home.agencies.cta2.href} className="text-body font-semibold text-fg-on-inverse dark:text-fg hover:opacity-70 transition-opacity">
              {site.home.agencies.cta2.label}
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Qué hago: en canvas, sin fondo propio (Figma: bloque separado de "Cómo trabajo"). */}
      <section className="section-y page-x">
        <p className="label text-fg-secondary mb-12">{site.home.servicesLabel}</p>
        <div>
          {site.home.services.map((service) => {
            const href = homeServiceLinks[service.slug] ?? `/proyectos?servicio=${service.slug}`
            const linkLabel = href.startsWith('/servicios/') ? site.home.serviceLinkLabel : site.home.servicesLinkLabel
            return <ServiceRow key={service.slug} href={href} title={service.title} summary={service.text} linkLabel={linkLabel} />
          })}
        </div>
        <div className="bg-line h-px w-full" />
      </section>

      {/* 5. Cómo trabajo: fondo surface, bloque propio. group+relative: al pasar el ratón, la capa de construcción
          pinta la retícula, la medida del padding superior, el contorno del h2 y la anotación de los pasos. */}
      <section className="group relative bg-surface section-y page-x flex flex-col block-gap">
        <SectionGrid fillOpacity={0.05} lineOpacity={0.5} visible="hover" />
        <SectionTopPadding label={brandNotes.howWeWork.paddingPill} />
        <div className="max-w-media-m flex flex-col gap-4">
          <p className="label text-fg-tertiary">{site.home.how.label}</p>
          <GuideBox label={brandNotes.howWeWork.h2} opacity={1} visible="hover" className="max-w-media-m">
            <h2 className="text-h2">{site.home.how.title}</h2>
          </GuideBox>
        </div>
        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-x-4 lg:gap-x-8 gap-y-12 lg:gap-y-16">
          <GuideLabel visible="hover" className="left-0 bottom-full mb-4">
            {brandNotes.howWeWork.steps(site.home.how.steps.length)}
          </GuideLabel>
          {site.home.how.steps.map((step) => (
            <div key={step.n} className="border-t border-line-strong pt-4 flex flex-col gap-2">
              <p className="label text-fg-tertiary">{step.n}</p>
              <h3 className="text-h4">{step.title}</h3>
              <p className="text-body text-fg-secondary">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Pie. */}
      <SiteFooter />
    </main>
  )
}
