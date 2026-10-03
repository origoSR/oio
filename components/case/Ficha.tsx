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

export function Ficha({ ficha, nda }: { ficha: FichaRow[]; nda: boolean }) {
  const rows: FichaRow[] = nda
    ? [...ficha, { label: 'Confidencial', content: 'Proyecto bajo acuerdo de confidencialidad (NDA): algunos detalles no pueden mostrarse.' }]
    : ficha

  return (
    <div className="flex flex-col gap-4">
      {rows.map((row, i) => (
        <DetailRow key={i} row={row} />
      ))}
    </div>
  )
}
