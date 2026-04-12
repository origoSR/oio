'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const [isHeroVisible, setIsHeroVisible] = useState(true)
  const pathname = usePathname()
  const isHome = pathname === '/'
  const isWork = pathname === '/work'
  const isContact = pathname === '/contact'
  const isProjectPage = !isHome && !isWork && !isContact

  useEffect(() => {
    if (!isHome) {
      setIsHeroVisible(false)
      return
    }

    setIsHeroVisible(true)

    let observer: IntersectionObserver | null = null
    let rafId: number | null = null

    const setupObserver = () => {
      const hero = document.getElementById('hero')
      if (!hero) {
        rafId = requestAnimationFrame(setupObserver)
        return
      }

      observer = new IntersectionObserver(
        ([entry]) => setIsHeroVisible(entry.isIntersecting),
        { threshold: 0 }
      )

      observer.observe(hero)
    }

    setupObserver()

    return () => {
      if (observer) observer.disconnect()
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [pathname, isHome])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className="
        fixed top-0 left-0 w-full z-[9999]
        bg-transparent
        mix-blend-difference
        pointer-events-none
      "
    >
      <div className="w-full px-4 lg:px-6 pt-6 md:pt-6 flex justify-between items-start pointer-events-none">

        {/* LOGO */}
        <div
          className={cn(
            'transition-opacity duration-300',
            isHome && isHeroVisible
              ? 'opacity-0 pointer-events-none'
              : 'opacity-100 pointer-events-auto'
          )}
        >
          {isHome ? (
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault()
                scrollTo('hero')
              }}
            >
              <img
                src="/logo_oi0_mask.svg"
                alt="logo"
                className="object-contain w-12 sm:w-14 md:w-16"
              />
            </a>
          ) : (
            <Link href="/">
              <img
                src="/logo_oi0_mask.svg"
                alt="logo"
                className="object-contain w-10 sm:w-12 md:w-14"
              />
            </Link>
          )}
        </div>

        {/* NAV LINKS — contextuales según página */}
        {!isHome && (
          <div className="flex items-center gap-8 pointer-events-auto">
            {isWork && (
              <Link
                href="/contact"
                className="text-white hover:opacity-60 transition-opacity"
                style={{ fontSize: '16px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', lineHeight: 1.4 }}
              >
                Contact
              </Link>
            )}
            {isContact && (
              <Link
                href="/work"
                className="text-white hover:opacity-60 transition-opacity"
                style={{ fontSize: '16px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', lineHeight: 1.4 }}
              >
                Work
              </Link>
            )}
            {isProjectPage && (
              <>
                <Link
                  href="/work"
                  className="text-white hover:opacity-60 transition-opacity"
                  style={{ fontSize: '16px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', lineHeight: 1.4 }}
                >
                  Work
                </Link>
                <Link
                  href="/contact"
                  className="text-white hover:opacity-60 transition-opacity"
                  style={{ fontSize: '16px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', lineHeight: 1.4 }}
                >
                  Contact
                </Link>
              </>
            )}
          </div>
        )}

      </div>
    </nav>
  )
}
