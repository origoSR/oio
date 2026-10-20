import type { Metadata } from 'next'
import Link from 'next/link'
import { privacyPage } from '@/content/services'
import { SiteFooter } from '@/components/site/SiteFooter'

export const metadata: Metadata = {
  title: privacyPage.seo.title,
  description: privacyPage.seo.description,
  alternates: { canonical: '/privacidad' },
  robots: { index: false },
}

// La sección "Quién trata tus datos" enlaza "aviso legal" a /aviso-legal.
function renderSectionText(text: string) {
  const parts = text.split('aviso legal')
  if (parts.length < 2) return text
  return (
    <>
      {parts[0]}
      <Link href="/aviso-legal" className="underline hover:opacity-70 transition-opacity">
        aviso legal
      </Link>
      {parts[1]}
    </>
  )
}

export default function PrivacidadPage() {
  return (
    <main className="bg-canvas">
      <section className="page-x pt-[calc(var(--navbar-h)+var(--section-y))] pb-[var(--section-y)] flex flex-col gap-6">
        <p className="label text-fg-secondary">{privacyPage.updated}</p>
        <h1 className="text-h1 max-w-media-l">{privacyPage.title}</h1>
        <p className="text-lead text-fg-secondary max-w-text">{privacyPage.lead}</p>
      </section>

      <section className="page-x pb-[var(--section-y)] flex flex-col gap-6">
        {privacyPage.sections.map((section) => (
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
