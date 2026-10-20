import Link from 'next/link'
import { cn } from '@/lib/utils'

type ButtonOwnProps = {
  variant?: 'primary' | 'secondary'
  className?: string
  children: React.ReactNode
}

type ButtonAsLink = ButtonOwnProps & { href: string } & Omit<React.ComponentProps<typeof Link>, 'href' | 'className'>
type ButtonAsButton = ButtonOwnProps & { href?: undefined } & Omit<React.ComponentProps<'button'>, 'className'>

/**
 * Site/Button. `variant: 'primary'` (bg-inverse) o `'secondary'` (borde line-strong).
 * Misma altura en los dos: el borde del secundario va por dentro.
 * Funciona como <Link> (pasa `href`) o como <button>.
 */
export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = 'primary', className, children, ...rest } = props

  const classes = cn(
    'inline-flex items-center justify-center text-body font-semibold px-6 py-4 rounded-sm transition-opacity disabled:opacity-50 disabled:pointer-events-none',
    variant === 'primary' ? 'bg-inverse text-fg-on-inverse hover:opacity-80' : 'border border-line-strong text-fg hover:opacity-70',
    className
  )

  if (props.href) {
    const { href, ...linkRest } = rest as Omit<ButtonAsLink, 'variant' | 'className' | 'children'>
    return (
      <Link href={href} className={classes} {...linkRest}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} {...(rest as React.ComponentProps<'button'>)}>
      {children}
    </button>
  )
}
