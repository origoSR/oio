import Link from 'next/link'
import { Logo } from '@/components/shared/Logo'
import { ThemeToggle } from '@/components/shared/ThemeToggle'
import { site } from '@/content/site'
import { cn } from '@/lib/utils'

export function CaseNavbar() {
  return (
    <div className="page-x py-4 flex items-center justify-between">
      <Link href="/" aria-label="oio, inicio">
        <Logo className="h-10 w-10" />
      </Link>
      <div className="flex items-center gap-[var(--gutter)]">
        {site.nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'text-body font-medium hover:opacity-70 transition-opacity',
              'hideOnMobile' in item && item.hideOnMobile && 'hidden md:inline'
            )}
          >
            {item.label}
          </Link>
        ))}
        <ThemeToggle />
      </div>
    </div>
  )
}
