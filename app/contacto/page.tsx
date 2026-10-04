import type { Metadata } from 'next'
import { site } from '@/content/site'
import { getProject } from '@/content/projects'
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

// '?proyecto=<slug|nombre>': para cualquier proyecto con NDA, no solo Talengo.
function displayNameFromSlug(value: string) {
  return value
    .split('-')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export default async function ContactoPage({ searchParams }: { searchParams: Promise<{ proyecto?: string }> }) {
  const { proyecto } = await searchParams
  const matched = proyecto ? getProject(proyecto) : undefined
  const projectName = matched ? matched.title : proyecto ? displayNameFromSlug(proyecto) : undefined

  const mailtoHref = projectName
    ? `mailto:${site.email}?subject=${encodeURIComponent(`Caso ${projectName}`)}`
    : `mailto:${site.email}`

  return (
    <main className="bg-canvas">
      <section className="page-x pt-32 lg:pt-48 pb-16">
        <h1 className="text-display">{site.contact.title}</h1>
        <p className="text-lead text-fg-secondary max-w-text mt-6">{site.contact.lead}</p>
      </section>

      <section className="page-x pb-16 flex flex-col gap-4">
        {projectName && <p className="label text-fg-secondary">Sobre: {projectName}</p>}
        <p className="label text-fg-secondary">{site.contact.emailLabel}</p>
        <a href={mailtoHref} className="text-h2 hover:opacity-70 transition-opacity">
          {site.email}
        </a>
        <CopyEmailButton email={site.email} copyLabel={site.contact.copyLabel} copiedLabel={site.contact.copiedLabel} />
      </section>

      <section className="page-x section-y grid grid-cols-1 lg:grid-cols-3 gap-x-4 lg:gap-x-8 gap-y-12">
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
