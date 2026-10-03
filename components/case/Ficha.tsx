import { cn } from '@/lib/utils'
import type { FichaRow } from '@/content/types'

function DetailRow({ row, onCanvas }: { row: FichaRow; onCanvas: boolean }) {
  return (
    <div className={cn('grid-page border-t pt-4', onCanvas ? 'border-line' : 'border-on-project/20')}>
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

export function Ficha({ ficha, nda, onCanvas = false }: { ficha: FichaRow[]; nda: boolean; onCanvas?: boolean }) {
  const base = nda ? ficha.filter((row) => !(row.label === 'Enlaces' && !row.href)) : ficha
  const rows: FichaRow[] = nda
    ? [...base, { label: 'Confidencial', content: 'Proyecto bajo acuerdo de confidencialidad (NDA): algunos detalles no pueden mostrarse.' }]
    : base

  return (
    <div className="flex flex-col gap-4">
      {rows.map((row, i) => (
        <DetailRow key={i} row={row} onCanvas={onCanvas} />
      ))}
    </div>
  )
}
