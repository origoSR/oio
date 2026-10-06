import Link from 'next/link'
import { Logo } from '@/components/shared/Logo'
import { ThemeToggle } from '@/components/shared/ThemeToggle'
import { site } from '@/content/site'

export function CaseNavbar() {
  return (
    <div className="page-x py-4 flex items-center justify-between">
      <Link href="/" aria-label="Inicio">
        <Logo className="h-10 w-10" />
      </Link>
      <div className="flex items-center gap-8">
        {site.nav.map((item) => (
          <Link key={item.href} href={item.href} className="text-body font-medium hover:opacity-70 transition-opacity">
            {item.label}
          </Link>
        ))}
        <ThemeToggle />
      </div>
    </div>
  )
}
