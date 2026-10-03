import type { Figure } from '@/content/types'

interface OutcomeProps {
  label: string
  title: string
  text: string
  items?: Figure[]
}

export function Outcome({ label, title, text, items }: OutcomeProps) {
  return (
    <div className="section-y page-x">
      <p className="label text-fg-secondary mb-4">{label}</p>
      <h3 className="text-h3 max-w-media-m">{title}</h3>
      <p className="text-body max-w-text mt-4">{text}</p>
      {items && items.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 lg:gap-x-8 gap-y-12 mt-12">
          {items.map((item, i) => (
            <div key={i} className="border-t border-line-strong pt-4">
              <p className="text-h1">{item.value}</p>
              <p className="label text-fg-secondary mt-2">{item.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
