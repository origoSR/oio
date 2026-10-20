import type { Metadata } from 'next'
import Link from 'next/link'
import { legalPage } from '@/content/services'
import { SiteFooter } from '@/components/site/SiteFooter'

export const metadata: Metadata = {
  title: legalPage.seo.title,
  description: legalPage.seo.description,
  alternates: { canonical: '/aviso-legal' },
  robots: { index: false },
}

// El último apartado ("Datos y cookies") enlaza "política de privacidad" a /privacidad.
function renderSectionText(text: string) {
  const parts = text.split('política de privacidad')
  if (parts.length < 2) return text
  return (
    <>
      {parts[0]}
      <Link href="/privacidad" className="underline hover:opacity-70 transition-opacity">
        política de privacidad
      </Link>
      {parts[1]}
    </>
  )
}

export default function AvisoLegalPage() {
  return (
    <main className="bg-canvas">
      <section className="page-x pt-[calc(var(--navbar-h)+var(--section-y))] pb-[var(--section-y)] flex flex-col gap-6">
        <p className="label text-fg-secondary">{legalPage.updated}</p>
        <h1 className="text-h1 max-w-media-l">{legalPage.title}</h1>
        <p className="text-lead text-fg-secondary max-w-text">{legalPage.lead}</p>
      </section>

      <section className="page-x pb-[var(--section-y)] flex flex-col gap-6">
        {legalPage.sections.map((section) => (
          <div key={section.title} className="border-t border-line pt-6 grid-page gap-y-2">
            <h4 className="col-span-4 lg:col-span-4 text-h4">{section.title}</h4>
            <p className="col-span-4 lg:col-span-8 text-body text-fg-secondary max-w-text">{renderSectionText(section.text)}</p>
          </div>
        ))}
      </section>

      <SiteFooter />
    </main>
  )
}
