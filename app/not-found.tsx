import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFoundPage } from '@/content/services'
import { site } from '@/content/site'
import { Button } from '@/components/site/Button'
import { SiteFooter } from '@/components/site/SiteFooter'

export const metadata: Metadata = {
  title: 'Página no encontrada',
  robots: { index: false },
}

export default function NotFound() {
  const [before, after] = notFoundPage.note.split(site.email)

  return (
    <main className="bg-canvas">
      <section className="page-x section-y pt-[calc(var(--navbar-h)+var(--section-y))] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">
        <div className="flex-1 flex flex-col gap-6">
          <p className="label text-fg-secondary">{notFoundPage.label}</p>
          <h1 className="text-h1">{notFoundPage.title}</h1>
          <p className="text-lead text-fg-secondary max-w-text">{notFoundPage.lead}</p>
          <div className="flex flex-wrap items-center gap-8">
            <Button href={notFoundPage.cta.href}>{notFoundPage.cta.label}</Button>
            <Link href={notFoundPage.cta2.href} className="text-body font-semibold hover:opacity-70 transition-opacity">
              {notFoundPage.cta2.label}
            </Link>
          </div>
          <p className="text-body text-fg-secondary">
            {before}
            <a href={`mailto:${site.email}`} className="underline hover:opacity-70 transition-opacity">
              {site.email}
            </a>
            {after}
          </p>
        </div>

        {/* Pegatina de Michael Scott (solo en la 404, en Figma): 280px (160px en móvil), respira como Pebble, sin radio ni sombra. */}
        <div className="relative shrink-0 w-40 h-40 lg:w-70 lg:h-70 pebble-breathe">
          <Image src="/brand/404.webp" alt="Michael Scott con cara de apuro" fill sizes="280px" className="object-contain" />
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
