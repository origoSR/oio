import Link from 'next/link'

interface OtherRowProps {
  title: string
  description: string
  meta: string
  cta?: { label: string; href: string }
}

export function OtherRow({ title, description, meta, cta }: OtherRowProps) {
  return (
    <div className="border-t border-line-subtle py-4 flex items-center justify-between gap-4 flex-wrap">
      <div>
        <p className="text-body font-semibold">{title}</p>
        <p className="text-body text-fg-secondary">{description}</p>
        {cta && (
          <Link href={cta.href} className="label mt-1 inline-block hover:opacity-70 transition-opacity">
            {cta.label}
          </Link>
        )}
      </div>
      <p className="label text-fg-tertiary whitespace-nowrap">{meta}</p>
    </div>
  )
}
