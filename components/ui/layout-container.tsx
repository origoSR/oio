import { cn } from '@/lib/utils'

interface LayoutContainerProps {
  children: React.ReactNode
  className?: string
}

export function LayoutContainer({ children, className }: LayoutContainerProps) {
  return (
    <div className={cn('mx-auto w-full max-w-page page-x', className)}>
      {children}
    </div>
  )
}
