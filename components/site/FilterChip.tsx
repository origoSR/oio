import Link from 'next/link'
import { cn } from '@/lib/utils'

/** Site/FilterChip. Enlace a /proyectos?servicio=<slug> (o /proyectos si slug es null). */
export function FilterChip({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'text-body shrink-0 px-4 py-2 rounded-full border transition-colors',
        active ? 'bg-inverse text-fg-on-inverse border-line-strong' : 'border-line text-fg-secondary hover:border-line-strong hover:text-fg'
      )}
    >
      {label}
    </Link>
  )
}
