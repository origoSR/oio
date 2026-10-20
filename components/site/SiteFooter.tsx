import Link from 'next/link'
import { site } from '@/content/site'
import { legalLinks } from '@/content/services'
import { Pebble } from '@/components/brand/Pebble'

// `hidePebble`: la 404 ya tiene su propia piedra junto al texto, para que no salga dos veces.
export function SiteFooter({ hidePebble = false }: { hidePebble?: boolean } = {}) {
  return (
    <footer className="bg-inverse dark:bg-surface text-fg-on-inverse dark:text-fg dark:border-t dark:border-line pt-[var(--section-y)] pb-12 page-x">
      <div className="flex items-start justify-between gap-8">
        <div>
          <p className="label text-fg-on-inverse-secondary dark:text-fg-secondary">{site.footer.label}</p>
          <h2 className="text-h1 mt-6">{site.footer.title}</h2>
        </div>
        {/* Piedra de marca: 200px en escritorio, oculta por debajo de 768px (paso 8). */}
        {!hidePebble && <Pebble className="hidden md:block w-50 h-50" />}
      </div>
      <div className="flex flex-col lg:flex-row lg:items-baseline gap-2 lg:gap-8 mt-6">
        <a href={`mailto:${site.email}`} className="text-h3 hover:opacity-70 transition-opacity">
          {site.email}
        </a>
        <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="text-body hover:opacity-70 transition-opacity">
          LinkedIn ↗
        </a>
        <Link href={site.footer.agencies.href} className="text-body hover:opacity-70 transition-opacity">
          {site.footer.agencies.label}
        </Link>
      </div>
      <div className="flex flex-wrap items-start justify-between gap-2 mt-12 lg:mt-16 pt-6 border-t border-fg-on-inverse-secondary/20 dark:border-line">
        <p className="label text-fg-on-inverse-secondary dark:text-fg-secondary">
          © {new Date().getFullYear()} {site.name} · {site.brand}
        </p>
        <p className="label text-fg-on-inverse-secondary dark:text-fg-secondary flex flex-wrap items-center gap-1">
          {legalLinks.map((link, i) => (
            <span key={link.href} className="flex items-center gap-1">
              {i > 0 && <span aria-hidden="true">·</span>}
              <Link href={link.href} className="underline hover:opacity-70 transition-opacity">
                {link.label}
              </Link>
            </span>
          ))}
        </p>
        <p className="label text-fg-on-inverse-secondary dark:text-fg-secondary">{site.location}</p>
      </div>
    </footer>
  )
}
