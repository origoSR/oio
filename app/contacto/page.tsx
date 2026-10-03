import type { Metadata } from 'next'
import { site } from '@/content/site'
import { CopyEmailButton } from '@/components/site/CopyEmailButton'

export const metadata: Metadata = {
  title: site.contact.seo.title,
  description: site.contact.seo.description,
  alternates: { canonical: '/contacto' },
  openGraph: {
    title: site.contact.seo.title,
    description: site.contact.seo.description,
  },
}

export default function ContactoPage() {
  return (
    <main className="bg-canvas">
      <section className="page-x pt-32 lg:pt-48 pb-16">
        <h1 className="text-display">{site.contact.title}</h1>
        <p className="text-lead text-fg-secondary max-w-text mt-6">{site.contact.lead}</p>
      </section>

      <section className="page-x pb-16 flex flex-col gap-4">
        <p className="label text-fg-secondary">{site.contact.emailLabel}</p>
        <a href={`mailto:${site.email}`} className="text-h2 hover:opacity-70 transition-opacity">
          {site.email}
        </a>
        <CopyEmailButton email={site.email} copyLabel={site.contact.copyLabel} copiedLabel={site.contact.copiedLabel} />
      </section>

      <section className="page-x section-y grid grid-cols-1 lg:grid-cols-3 gap-x-[var(--gutter)] gap-y-12">
        {site.contact.columns.map((col) => (
          <div key={col.label} className="flex flex-col gap-2">
            <p className="label text-fg-secondary mb-2">{col.label}</p>
            {col.lines.map((line) => (
              <p key={line} className="text-body text-fg-secondary">
                {line}
              </p>
            ))}
          </div>
        ))}
        <div className="flex flex-col gap-2">
          <p className="label text-fg-secondary mb-2">Otros canales</p>
          <a href={site.phoneHref} className="text-body text-fg-secondary hover:opacity-70 transition-opacity">
            {site.phone}
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-body text-fg-secondary hover:opacity-70 transition-opacity"
          >
            LinkedIn ↗
          </a>
        </div>
      </section>

      <section className="page-x pb-16">
        <p className="label text-fg-tertiary">
          © {new Date().getFullYear()} {site.name} · {site.brand}
        </p>
      </section>
    </main>
  )
}
