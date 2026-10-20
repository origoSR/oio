import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getServicePage, servicePages, serviceLabels, process } from '@/content/services'
import { getProject } from '@/content/projects'
import { Button } from '@/components/site/Button'
import { Point } from '@/components/site/Point'
import { PackageCard } from '@/components/site/PackageCard'
import { Step } from '@/components/site/Step'
import { FaqItem } from '@/components/site/FaqItem'
import { WorkCard } from '@/components/site/WorkCard'
import { SiteFooter } from '@/components/site/SiteFooter'
import { workCardVariant, workCardColSpan } from '@/lib/work-grid'
import { cn } from '@/lib/utils'

// Tantas columnas como paquetes en escritorio (Diseño web: 4; el resto: 2 o 3).
const PACKAGES_COLS: Record<number, string> = {
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
}

export function generateStaticParams() {
  return servicePages.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const service = getServicePage(slug)
  if (!service) return {}

  return {
    title: service.seo.title,
    description: service.seo.description,
    alternates: { canonical: `/servicios/${service.slug}` },
    openGraph: {
      title: service.seo.title,
      description: service.seo.description,
    },
  }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = getServicePage(slug)
  if (!service) notFound()

  // Como mucho una fila de dos tarjetas en escritorio, aunque el servicio liste más casos.
  const cases = service.cases
    .slice(0, 2)
    .map(getProject)
    .filter((p): p is NonNullable<typeof p> => Boolean(p))

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.seo.description,
    provider: { '@type': 'Person', name: 'Rodrigo Sánchez' },
    areaServed: ['Málaga', 'España'],
  }
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }

  return (
    <main className="bg-canvas">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* 1. Cabecera: section-y arriba y abajo. */}
      <section className="page-x pt-[calc(var(--navbar-h)+var(--section-y))] pb-[var(--section-y)] flex flex-col gap-6">
        <p className="label text-fg-secondary">{service.eyebrow}</p>
        <h1 className="text-h1 max-w-media-l">{service.h1}</h1>
        <p className="text-lead text-fg-secondary max-w-text">{service.lead}</p>
        <div className="flex flex-wrap items-center gap-8">
          <Button href={service.cta.href}>{service.cta.label}</Button>
          <Link
            href={`/proyectos?servicio=${service.filter}`}
            aria-label={`Ver los proyectos de ${service.title}`}
            className="text-body font-semibold hover:opacity-70 transition-opacity"
          >
            {service.cta2}
          </Link>
        </div>
      </section>

      {/* 2. Es para ti si… */}
      <section className="page-x pb-[var(--section-y)] grid-page gap-y-6">
        <h2 className="col-span-4 lg:col-span-4 text-h2">{service.forWho.label}</h2>
        <ul className="col-span-4 lg:col-span-8 flex flex-col">
          {service.forWho.items.map((item) => (
            <Point key={item} text={item} />
          ))}
        </ul>
      </section>

      {/* 2b. Qué es el GEO (solo SEO y GEO). */}
      {service.explainer && (
        <section className="page-x pb-[var(--section-y)] grid-page gap-y-6">
          <p className="col-span-4 lg:col-span-4 label text-fg-tertiary">{service.explainer.label}</p>
          <div className="col-span-4 lg:col-span-8 flex flex-col gap-4">
            <h2 className="text-h2 max-w-media-m">{service.explainer.title}</h2>
            <p className="text-body text-fg-secondary max-w-text">{service.explainer.text}</p>
          </div>
        </section>
      )}

      {/* 3. Paquetes */}
      <section className="page-x pb-[var(--section-y)] flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <p className="label text-fg-secondary">{service.packages.label}</p>
          <h2 className="text-h2 max-w-media-m">{service.packages.title}</h2>
        </div>
        {/* En escritorio, una fila con tantas columnas como paquetes (Diseño web tiene 4; el resto, 2 o 3). Clases literales: Tailwind no genera lg:grid-cols-${n} desde una variable. */}
        <div className={cn('grid grid-cols-1 gap-4 lg:gap-8 items-stretch', PACKAGES_COLS[service.packages.items.length] ?? 'lg:grid-cols-3')}>
          {service.packages.items.map((pkg) => (
            <PackageCard key={pkg.title} pkg={pkg} />
          ))}
        </div>
        {service.packages.note && <p className="text-body text-fg-secondary">{service.packages.note}</p>}
      </section>

      {/* 4. Cómo trabajo, sobre bg-surface. */}
      <section className="bg-surface section-y page-x flex flex-col block-gap">
        <div className="max-w-media-m flex flex-col gap-4">
          <p className="label text-fg-tertiary">{process.label}</p>
          <h2 className="text-h2">{process.title}</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-4 lg:gap-x-8 gap-y-12">
          {process.steps.map((step) => (
            <Step key={step.n} n={step.n} title={step.title} text={step.text} />
          ))}
        </div>
      </section>

      {/* 5. Proyectos relacionados */}
      {cases.length > 0 && (
        <section className="page-x section-y">
          <div className="flex items-end justify-between mb-12 gap-4">
            <p className="label text-fg-secondary">{service.casesLabel}</p>
            <Link
              href={`/proyectos?servicio=${service.filter}`}
              aria-label={`Ver todos los proyectos de ${service.title}`}
              className="label hover:opacity-70 transition-opacity whitespace-nowrap"
            >
              {serviceLabels.casesLink}
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-4 lg:gap-x-8 gap-y-12 lg:gap-y-24">
            {cases.map((project, i) => {
              const variant = workCardVariant(i, cases.length)
              return (
                <div key={project.slug} className={workCardColSpan(variant)}>
                  <WorkCard project={project} variant={variant} />
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* 6. Preguntas frecuentes */}
      <section className="page-x pb-[var(--section-y)] grid-page gap-y-6">
        <h2 className="col-span-4 lg:col-span-4 text-h2">{serviceLabels.faqTitle}</h2>
        <div className="col-span-4 lg:col-span-8">
          {service.faqs.map((faq, i) => (
            <FaqItem key={faq.q} faq={faq} defaultOpen={i === 0} />
          ))}
        </div>
      </section>

      {/* 7. Pie */}
      <SiteFooter />
    </main>
  )
}
