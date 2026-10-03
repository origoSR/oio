import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { Img } from '@/content/types'

interface DecisionProps {
  order: 'text-media' | 'media-text'
  number: string
  title: string
  text: string
  image: Img
  caption?: string
}

export function Decision({ order, number, title, text, image, caption }: DecisionProps) {
  const mediaFirst = order === 'media-text'

  return (
    <div className="section-y page-x grid-page">
      <div className={cn('col-span-4 lg:col-span-4 flex flex-col gap-4', mediaFirst && 'lg:order-2')}>
        <p className="label text-fg-tertiary">{number}</p>
        <h3 className="text-h3">{title}</h3>
        <p className="text-body text-fg-secondary">{text}</p>
      </div>
      <div className={cn('col-span-4 lg:col-span-8', mediaFirst && 'lg:order-1')}>
        <div className="relative w-full aspect-[16/10] rounded-md overflow-hidden">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 864px, 100vw"
            className={image.fit === 'contain' ? 'object-contain bg-subtle' : 'object-cover'}
          />
        </div>
        {caption && <p className="small text-fg-secondary mt-3">{caption}</p>}
      </div>
    </div>
  )
}
