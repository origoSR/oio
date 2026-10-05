import type { Metadata } from 'next'
import Link from 'next/link'
import { site } from '@/content/site'
import { projects, featuredSlugs, getProject } from '@/content/projects'
import { WorkCard } from '@/components/site/WorkCard'
import { SiteFooter } from '@/components/site/SiteFooter'
import { workCardVariant, workCardColSpan } from '@/lib/work-grid'

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
          <div className="flex flex-wrap gap-8 mt-[var(--hero-cta-gap)]">
            {site.home.ctas.map((cta) => (
              <Link key={cta.href} href={cta.href} className="text-body font-semibold hover:opacity-70 transition-opacity">
                {cta.label}
              </Link>
            ))}
          </div>
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
                <WorkCard project={project} variant={variant} />
              </div>
            )
          })}
        </div>
      </section>

      {/* 3. Qué hago: en canvas, sin fondo propio (Figma: bloque separado de "Cómo trabajo"). */}
      <section className="section-y page-x">
        <p className="label text-fg-secondary mb-12">{site.home.servicesLabel}</p>
        <div>
          {site.home.services.map((service) => (
            <div key={service.slug} className="border-t border-line-strong py-6 grid-page gap-y-4 items-start">
              <h2 className="col-span-4 lg:col-span-4 text-h2">{service.title}</h2>
              <p className="col-span-4 lg:col-span-5 text-body text-fg-secondary">{service.text}</p>
              <Link
                href={`/proyectos?servicio=${service.slug}`}
                className="col-span-4 lg:col-span-3 label lg:text-right hover:opacity-70 transition-opacity"
              >
                {site.home.servicesLinkLabel}
              </Link>
            </div>
          ))}
        </div>
        <div className="bg-line h-px w-full" />
      </section>

      {/* 4. Cómo trabajo: fondo surface, bloque propio. */}
      <section className="bg-surface section-y page-x flex flex-col block-gap">
        <div className="max-w-media-m flex flex-col gap-4">
          <p className="label text-fg-tertiary">{site.home.how.label}</p>
          <h2 className="text-h2">{site.home.how.title}</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-4 lg:gap-x-8 gap-y-12 lg:gap-y-16">
          {site.home.how.steps.map((step) => (
            <div key={step.n} className="border-t border-line-strong pt-4 flex flex-col gap-2">
              <p className="label text-fg-tertiary">{step.n}</p>
              <h3 className="text-h4">{step.title}</h3>
              <p className="text-body text-fg-secondary">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Pie. */}
      <SiteFooter />
    </main>
  )
}
