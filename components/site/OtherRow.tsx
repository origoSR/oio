import Link from 'next/link'

interface OtherRowProps {
  title: string
  description: string
  meta: string
  cta?: { label: string; href: string }
}

export function OtherRow({ title, description, meta, cta }: OtherRowProps) {
  return (
    <div className="border-t border-line-subtle py-4 flex flex-wrap items-baseline gap-x-4 lg:gap-x-8 gap-y-1">
      <p className="text-body font-semibold flex-1 min-w-40">{title}</p>
      <p className="text-body text-fg-secondary flex-1 min-w-60">{description}</p>
      <div className="shrink-0 flex items-baseline gap-2">
        <p className="label text-fg-tertiary whitespace-nowrap">{meta}</p>
        {cta && (
          <Link href={cta.href} className="label whitespace-nowrap hover:opacity-70 transition-opacity">
            {cta.label}
          </Link>
        )}
      </div>
    </div>
  )
}
