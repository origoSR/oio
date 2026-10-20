import type { Metadata } from 'next'
import Link from 'next/link'
import { servicesIndex, servicePages, process } from '@/content/services'
import { Button } from '@/components/site/Button'
import { ServiceRow } from '@/components/site/ServiceRow'
import { Step } from '@/components/site/Step'
import { SiteFooter } from '@/components/site/SiteFooter'
import { brandNotes } from '@/content/brand'
import { SectionGrid, SectionTopPadding, GuideBox, GuideLabel } from '@/components/brand/Construction'

export const metadata: Metadata = {
  title: servicesIndex.seo.title,
  description: servicesIndex.seo.description,
  alternates: { canonical: '/servicios' },
  openGraph: {
    title: servicesIndex.seo.title,
    description: servicesIndex.seo.description,
  },
}

export default function ServiciosPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: servicePages.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://oi0.es/servicios/${s.slug}`,
      name: s.title,
    })),
  }

  return (
    <main className="bg-canvas">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* 1. Cabecera */}
      <section className="page-x pt-[calc(var(--navbar-h)+var(--section-y))] pb-[var(--section-y)] flex flex-col gap-6">
        <h1 className="text-h1 max-w-media-l">{servicesIndex.title}</h1>
        <p className="text-lead text-fg-secondary max-w-text">{servicesIndex.lead}</p>
        <Button href={servicesIndex.cta.href} className="self-start">
          {servicesIndex.cta.label}
        </Button>
      </section>

      {/* 2. Los 4 servicios */}
      <section className="page-x pb-[var(--section-y)]">
        <div>
          {servicePages.map((s) => (
            <ServiceRow key={s.slug} href={`/servicios/${s.slug}`} title={s.title} summary={s.summary} linkLabel={servicesIndex.linkLabel} />
          ))}
        </div>
        <div className="bg-line h-px w-full" />
      </section>

      {/* 3. Cómo trabajo. group+relative: al pasar el ratón, la capa de construcción pinta la
          retícula, la medida del padding superior, el contorno del h2 y la anotación de los pasos. */}
      <section className="group relative bg-surface section-y page-x flex flex-col block-gap">
        <SectionGrid fillOpacity={0.05} lineOpacity={0.5} visible="hover" />
        <SectionTopPadding label={brandNotes.howWeWork.paddingPill} />
        <div className="max-w-media-m flex flex-col gap-4">
          <p className="label text-fg-tertiary">{process.label}</p>
          <GuideBox label={brandNotes.howWeWork.h2} opacity={1} visible="hover" className="max-w-media-m">
            <h2 className="text-h2">{process.title}</h2>
          </GuideBox>
        </div>
        <div className="relative grid grid-cols-1 lg:grid-cols-4 gap-x-4 lg:gap-x-8 gap-y-12">
          <GuideLabel visible="hover" className="left-0 bottom-full mb-4">
            {brandNotes.howWeWork.steps(process.steps.length)}
          </GuideLabel>
          {process.steps.map((step) => (
            <Step key={step.n} n={step.n} title={step.title} text={step.text} />
          ))}
        </div>
      </section>

      {/* 4. Aviso de agencias, entre dos líneas */}
      <section className="page-x pb-[var(--section-y)]">
        <div className="border-t border-b border-line-strong py-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <p className="text-body text-fg-secondary max-w-text">{servicesIndex.agencyNote.text}</p>
          <Link
            href={servicesIndex.agencyNote.link.href}
            className="text-body font-semibold whitespace-nowrap hover:opacity-70 transition-opacity"
          >
            {servicesIndex.agencyNote.link.label}
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
