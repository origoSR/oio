import { site } from '@/content/site'

export function SiteFooter() {
  return (
    <footer className="bg-inverse text-fg-on-inverse pt-[var(--section-y)] pb-12 page-x">
      <p className="label text-fg-on-inverse-secondary">{site.footer.label}</p>
      <h2 className="text-h1 mt-6">{site.footer.title}</h2>
      <div className="flex flex-col lg:flex-row lg:items-baseline gap-2 lg:gap-8 mt-6">
        <a href={`mailto:${site.email}`} className="text-h3 hover:opacity-70 transition-opacity">
          {site.email}
        </a>
        <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="text-body hover:opacity-70 transition-opacity">
          LinkedIn ↗
        </a>
      </div>
      <div className="flex items-center justify-between mt-16 pt-6 border-t border-fg-on-inverse-secondary/20">
        <p className="label text-fg-on-inverse-secondary">
          © {new Date().getFullYear()} {site.name} · {site.brand}
        </p>
        <p className="label text-fg-on-inverse-secondary">{site.location}</p>
      </div>
    </footer>
  )
}
