import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProjectCTAProps {
  label: string
  href: string
  className?: string
}

export function ProjectCTA({ label, href, className }: ProjectCTAProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        'flex items-center gap-2 uppercase text-[10px] lg:text-[12px] tracking-[0.18em] font-medium',
        'transition-colors duration-300 hover:opacity-80',
        className
      )}
    >
      <span>{label}</span>
      <ArrowUpRight className="w-3 h-3 lg:w-4 lg:h-4 flex-shrink-0" />
    </a>
  )
}
