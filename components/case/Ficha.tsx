import Link from 'next/link'
import type { FichaRow } from '@/content/types'

function DetailRow({ row }: { row: FichaRow }) {
  return (
    <div className="grid-page border-t border-on-project/20 pt-4">
      <div className="col-span-4 lg:col-span-4">
        <p className="text-body font-semibold">{row.label}</p>
      </div>
      <div className="col-span-4 lg:col-span-8">
        {row.href ? (
          <a href={row.href} target="_blank" rel="noopener noreferrer" className="text-body hover:opacity-70 transition-opacity">
            {row.content} ↗
          </a>
        ) : (
          <p className="text-body">{row.content}</p>
        )}
      </div>
    </div>
  )
}

// Vive en el componente (no en content/): "te lo enseño en una llamada" enlaza a /contacto?proyecto=<slug>.
function ConfidentialRow({ slug }: { slug: string }) {
  return (
    <div className="grid-page border-t border-on-project/20 pt-4">
      <div className="col-span-4 lg:col-span-4">
        <p className="text-body font-semibold">Confidencial</p>
      </div>
      <div className="col-span-4 lg:col-span-8">
        <p className="text-body">
          Proyecto bajo acuerdo de confidencialidad (NDA): algunos detalles no pueden mostrarse. Si quieres ver más,{' '}
          <Link href={`/contacto?proyecto=${slug}`} className="underline hover:opacity-70 transition-opacity">
            te lo enseño en una llamada
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export function Ficha({ ficha, nda, slug }: { ficha: FichaRow[]; nda: boolean; slug: string }) {
  // Una fila de ficha con href: '' no se pinta (p. ej. "Enlaces" pendiente de confirmar).
  const base = ficha.filter((row) => !(row.label === 'Enlaces' && !row.href))

  return (
    <div className="flex flex-col gap-4">
      {base.map((row, i) => (
        <DetailRow key={i} row={row} />
      ))}
      {nda && <ConfidentialRow slug={slug} />}
    </div>
  )
}
