'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Logo } from '@/components/shared/Logo'
import { site } from '@/content/site'
import { cn } from '@/lib/utils'

export function SiteNavbar() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [pastHero, setPastHero] = useState(!isHome)

  const isCaseDetail = /^\/proyectos\/[^/]+$/.test(pathname)

  useEffect(() => {
    if (!isHome) {
      setPastHero(true)
      return
    }

    setPastHero(false)
    const hero = document.getElementById('hero')
    if (!hero) return

    const observer = new IntersectionObserver(([entry]) => setPastHero(!entry.isIntersecting), { threshold: 0 })
    observer.observe(hero)
    return () => observer.disconnect()
  }, [isHome, pathname])

  if (isCaseDetail) return null

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-50 py-4 page-x flex items-center justify-between transition-colors duration-300',
        pastHero ? 'bg-canvas text-fg' : 'bg-transparent text-fg'
      )}
    >
      <Link href="/" aria-label="Inicio">
        <Logo className="h-8 w-8" />
      </Link>
      <div className="flex items-center gap-8">
        {site.nav.map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={cn('label hover:opacity-70 transition-opacity', active && 'underline')}
            >
              {item.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
