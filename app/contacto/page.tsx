import type { Metadata } from 'next'
import Link from 'next/link'
import { site } from '@/content/site'
import { contactForm } from '@/content/services'
import { getProject } from '@/content/projects'
import { CopyEmailButton } from '@/components/site/CopyEmailButton'
import { ContactForm } from '@/components/site/ContactForm'

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

const servicioField = contactForm.fields.find((f) => f.name === 'servicio')
const servicioOptions = (servicioField && 'options' in servicioField ? servicioField.options : []) as { value: string; label: string }[]

export default async function ContactoPage({
  searchParams,
}: {
  searchParams: Promise<{ proyecto?: string; servicio?: string }>
}) {
  const { proyecto, servicio } = await searchParams
  const matched = proyecto ? getProject(proyecto) : undefined
  const projectName = matched ? matched.title : proyecto ? displayNameFromSlug(proyecto) : undefined
  // ?servicio=<slug>: igual que ?proyecto=, preselecciona el campo y muestra "Sobre: <servicio>".
  const servicioLabel = servicio ? servicioOptions.find((o) => o.value === servicio)?.label : undefined
  const aboutLabel = projectName ?? servicioLabel

  const mailtoHref = projectName
    ? `mailto:${site.email}?subject=${encodeURIComponent(`Caso ${projectName}`)}`
    : `mailto:${site.email}`

  return (
    <main className="bg-canvas">
      <section className="page-x pt-[calc(var(--navbar-h)+var(--block-gap))] pb-[var(--section-y)] flex flex-col block-gap">
        <div className="flex flex-col gap-6">
          <h1 className="text-display">{site.contact.title}</h1>
          <p className="text-lead text-fg-secondary max-w-text">{site.contact.lead}</p>
          {aboutLabel && <p className="label text-fg-tertiary">Sobre: {aboutLabel}</p>}
        </div>

        {/* En móvil, primero el formulario (orden natural del DOM). */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-4 lg:gap-x-8 gap-y-12">
          <div className="lg:col-span-8">
            <ContactForm defaultServicio={servicio} />
          </div>
          <div className="lg:col-span-4 flex flex-col gap-2 h-fit">
            <p className="label text-fg-tertiary">{site.contact.emailLabel}</p>
            <a href={mailtoHref} className="text-h3 hover:opacity-70 transition-opacity">
              {site.email}
            </a>
            <CopyEmailButton email={site.email} copyLabel={site.contact.copyLabel} copiedLabel={site.contact.copiedLabel} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-4 lg:gap-x-8 gap-y-12 lg:gap-y-16">
          {site.contact.columns.map((col) => (
            <div key={col.label} className="border-t border-line-strong pt-4 flex flex-col gap-3">
              <p className="label text-fg-tertiary">{col.label}</p>
              {col.lines.map((line) => {
                if ('links' in col && col.links) {
                  const match = Object.entries(col.links).find(([word]) => line.includes(word))
                  if (match) {
                    const [word, href] = match
                    const idx = line.indexOf(word)
                    return (
                      <p key={line} className="text-body">
                        {line.slice(0, idx)}
                        <Link href={href} className="underline hover:opacity-70 transition-opacity">
                          {word}
                        </Link>
                        {line.slice(idx + word.length)}
                      </p>
                    )
                  }
                }
                if (line === 'LinkedIn →') {
                  return (
                    <a
                      key={line}
                      href={site.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-body hover:opacity-70 transition-opacity"
                    >
                      LinkedIn ↗
                    </a>
                  )
                }
                return (
                  <p key={line} className="text-body">
                    {line}
                  </p>
                )
              })}
            </div>
          ))}
        </div>
      </section>

      <div className="border-t border-line-subtle flex flex-wrap items-start justify-between gap-2 page-x py-6">
        <p className="label text-fg-tertiary">
          © {new Date().getFullYear()} {site.name} · {site.brand}
        </p>
        <p className="label text-fg-tertiary">{site.location}</p>
      </div>
    </main>
  )
}
