import Link from 'next/link'

/** Site/ServiceRow. La fila entera es un enlace (igual que "Qué hago" de la home). */
export function ServiceRow({
  href,
  title,
  summary,
  linkLabel,
}: {
  href: string
  title: string
  summary: string
  linkLabel: string
}) {
  return (
    <Link
      href={href}
      aria-label={`Ver el servicio de ${title}`}
      className="group block border-t border-line-strong py-6 grid-page gap-y-4 items-start"
    >
      <h2 className="col-span-4 lg:col-span-4 text-h2">{title}</h2>
      <p className="col-span-4 lg:col-span-5 text-body text-fg-secondary">{summary}</p>
      <span className="col-span-4 lg:col-span-3 label lg:text-right block group-hover:opacity-70 transition-opacity">
        {linkLabel}
      </span>
    </Link>
  )
}
