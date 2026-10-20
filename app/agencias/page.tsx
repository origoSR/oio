import type { Metadata } from 'next'
import Link from 'next/link'
import { agencies } from '@/content/services'
import { getProject } from '@/content/projects'
import { Button } from '@/components/site/Button'
import { Step } from '@/components/site/Step'
import { Point } from '@/components/site/Point'
import { WorkCard } from '@/components/site/WorkCard'
import { AgencyForm } from '@/components/site/AgencyForm'
import { SiteFooter } from '@/components/site/SiteFooter'
import { workCardVariant, workCardColSpan } from '@/lib/work-grid'
import { brandNotes } from '@/content/brand'
import { Construction } from '@/components/brand/Construction'

// No va en el menú: enlazada desde el pie y /servicios.
export const metadata: Metadata = {
  title: agencies.seo.title,
  description: agencies.seo.description,
  alternates: { canonical: '/agencias' },
  openGraph: {
    title: agencies.seo.title,
    description: agencies.seo.description,
  },
}

export default function AgenciasPage() {
  // El brief pide los casos de RBI y Burger King aquí, aunque agencies.proof.cases liste más.
  const proofCases = agencies.proof.cases
    .filter((slug) => slug === 'rbi' || slug === 'burger-king')
    .map(getProject)
    .filter((p): p is NonNullable<typeof p> => Boolean(p))

  return (
    <main className="bg-canvas">
      {/* 1. Cabecera. Recurso de marca: retícula + anotación del h1, siempre visible desde 1024px. */}
      <section className="relative page-x pt-[calc(var(--navbar-h)+var(--section-y))] pb-[var(--section-y)] flex flex-col gap-6">
        <p className="label text-fg-secondary">{agencies.eyebrow}</p>
        <h1 className="text-h1 max-w-media-l">{agencies.h1}</h1>
        <p className="text-lead text-fg-secondary max-w-text">{agencies.lead}</p>
        {agencies.availability && <p className="label text-fg-tertiary">{agencies.availability}</p>}
        <div className="flex flex-wrap items-center gap-8">
          {agencies.ctas.map((cta, i) =>
            i === 0 ? (
              <span key={cta.href} className="relative inline-block">
                <Button href={cta.href}>{cta.label}</Button>
                <Construction mode="always" corners notes={[brandNotes.agencias.button]} />
              </span>
            ) : (
              <Link key={cta.href} href={cta.href} className="text-body font-semibold hover:opacity-70 transition-opacity">
                {cta.label}
              </Link>
            )
          )}
        </div>
        <Construction mode="always" grid outline={false} notes={[brandNotes.agencias.h1]} />
      </section>

      {/* 2. Qué cubro. Recurso de marca: ◇ Site/Step × 4. */}
      <section className="relative page-x pb-[var(--section-y)] flex flex-col gap-8">
        <p className="label text-fg-secondary">{agencies.covers.label}</p>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-4 lg:gap-x-8 gap-y-12">
          {agencies.covers.items.map((item) => (
            <Step key={item.title} title={item.title} text={item.text} />
          ))}
        </div>
        <p className="text-body text-fg-secondary">{agencies.covers.extra}</p>
        <Construction mode="always" notes={[brandNotes.agencias.covers]} />
      </section>

      {/* 3. Cómo colaboro. Recurso de marca: ◇ Site/Point × 6. */}
      <section className="relative page-x pb-[var(--section-y)] grid-page gap-y-6">
        <h2 className="col-span-4 lg:col-span-4 text-h2">{agencies.rules.label}</h2>
        <ul className="col-span-4 lg:col-span-8 flex flex-col">
          {agencies.rules.items.map((item) => (
            <Point key={item} text={item} />
          ))}
        </ul>
        <Construction mode="always" notes={[brandNotes.agencias.rules]} />
      </section>

      {/* 4. Formatos, sobre bg-surface */}
      <section className="bg-surface section-y page-x flex flex-col gap-8">
        <p className="label text-fg-tertiary">{agencies.formats.label}</p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-4 lg:gap-x-8 gap-y-12">
          {agencies.formats.items.map((item) => (
            <Step key={item.title} title={item.title} text={item.text} />
          ))}
        </div>
      </section>

      {/* 5. Ya he trabajado así */}
      {proofCases.length > 0 && (
        <section className="page-x section-y flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <p className="label text-fg-secondary">{agencies.proof.label}</p>
            <h2 className="text-h2 max-w-media-l">{agencies.proof.text}</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-4 lg:gap-x-8 gap-y-12 lg:gap-y-24">
            {proofCases.map((project, i) => {
              const variant = workCardVariant(i, proofCases.length)
              return (
                <div key={project.slug} className={workCardColSpan(variant)}>
                  <WorkCard project={project} variant={variant} />
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* 6. Formulario, sobre bg-surface: intro en 4 columnas, campos en 8. */}
      <section id={agencies.form.id} className="bg-surface section-y page-x grid-page gap-y-12">
        <div className="col-span-4 lg:col-span-4 flex flex-col gap-4">
          <p className="label text-fg-tertiary">{agencies.form.label}</p>
          <h2 className="text-h2">{agencies.form.title}</h2>
          <p className="text-body text-fg-secondary">{agencies.form.lead}</p>
        </div>
        <div className="col-span-4 lg:col-span-8">
          <AgencyForm />
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
