import type { Figure } from '@/content/types'

export function Figures({ label, items }: { label?: string; items: Figure[] }) {
  return (
    <div className="section-y page-x">
      {label && <p className="label text-fg-secondary mb-6">{label}</p>}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 lg:gap-x-8 gap-y-12">
        {items.map((item, i) => (
          <div key={i} className="border-t border-line-strong pt-4">
            <p className="text-h1">{item.value}</p>
            <p className="label text-fg-secondary mt-2">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
