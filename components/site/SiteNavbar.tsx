'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Logo } from '@/components/shared/Logo'
import { ThemeToggle } from '@/components/shared/ThemeToggle'
import { site } from '@/content/site'
import { cn } from '@/lib/utils'

export function SiteNavbar() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [pastHero, setPastHero] = useState(!isHome)
  const navRef = useRef<HTMLElement>(null)

  const isCaseDetail = /^\/proyectos\/[^/]+$/.test(pathname)

  // El navbar es fixed (se superpone al contenido): las paginas que empiezan
  // justo debajo miden su propio alto real en --navbar-h en vez de usar un
  // numero fijo a mano, para no desincronizarse si el navbar cambia.
  useLayoutEffect(() => {
    const nav = navRef.current
    if (!nav) return
    const setHeight = () => document.documentElement.style.setProperty('--navbar-h', `${nav.offsetHeight}px`)
    setHeight()
    const observer = new ResizeObserver(setHeight)
    observer.observe(nav)
    return () => observer.disconnect()
  }, [])

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
      ref={navRef}
      className={cn(
        'fixed top-0 left-0 w-full z-50 py-4 page-x flex items-center justify-between transition-colors duration-300',
        pastHero ? 'bg-canvas text-fg' : 'bg-transparent text-fg'
      )}
    >
      <Link href="/" aria-label="Inicio">
        <Logo className="h-10 w-10" />
      </Link>
      <div className="flex items-center gap-8">
        {site.nav.map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={cn('text-body font-medium text-fg hover:text-fg-secondary transition-colors', active && 'underline')}
            >
              {item.label}
            </Link>
          )
        })}
        <ThemeToggle />
      </div>
    </nav>
  )
}
