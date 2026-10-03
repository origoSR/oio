import { CaseMedia } from '@/components/case/CaseMedia'
import type { MediaItem } from '@/content/types'

export function Gallery({ items }: { items: MediaItem[] }) {
  return (
    <div className="flex flex-col" style={{ gap: 'var(--gutter)' }}>
      {items.map((item, i) => (
        <CaseMedia key={i} item={item} />
      ))}
    </div>
  )
}
