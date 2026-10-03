import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface BrowserFrameProps {
  children: ReactNode
  className?: string
}

export function BrowserFrame({ children, className }: BrowserFrameProps) {
  return (
    <div className={cn('overflow-hidden rounded-md shadow-media bg-surface', className)}>
      <div className="flex h-10 items-center gap-1.5 bg-subtle px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
      </div>
      {children}
    </div>
  )
}
