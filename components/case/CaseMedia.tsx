import Image from 'next/image'
import { BrowserFrame } from '@/components/shared/BrowserFrame'
import { cn } from '@/lib/utils'
import type { Img, MediaItem } from '@/content/types'

const sizesFor = {
  full: '(min-width: 1024px) 1312px, 100vw',
  browser: '1088px',
  phones: '280px',
  pair: '(min-width: 1024px) 648px, 100vw',
  video: '(min-width: 1024px) 1312px, 100vw',
  bleed: '100vw',
} as const

function MediaImage({ img, sizes, className }: { img: Img; sizes: string; className?: string }) {
  return (
    <Image
      src={img.src}
      width={img.w}
      height={img.h}
      alt={img.alt}
      sizes={sizes}
      className={cn('w-full h-auto', img.fit === 'contain' ? 'object-contain bg-subtle' : undefined, className)}
    />
  )
}

export function CaseMedia({ item }: { item: MediaItem }) {
  const { layout, images, caption } = item

  let body: React.ReactNode = null

  if (layout === 'full') {
    body = (
      <div className="page-x">
        <MediaImage img={images[0]} sizes={sizesFor.full} className="max-w-page mx-auto rounded-md" />
      </div>
    )
  } else if (layout === 'browser') {
    body = (
      <div className="page-x">
        <BrowserFrame className="max-w-media-l mx-auto">
          <MediaImage img={images[0]} sizes={sizesFor.browser} />
        </BrowserFrame>
      </div>
    )
  } else if (layout === 'phones') {
    body = (
      <div className="page-x bg-subtle rounded-md py-24 px-8">
        <div className="flex gap-4 lg:gap-8 justify-center overflow-x-auto scrollbar-hide snap-x lg:overflow-visible">
          {images.map((img, i) => (
            <div key={i} className="shrink-0 w-[70vw] lg:w-[280px] snap-center">
              <MediaImage img={img} sizes={sizesFor.phones} className="rounded-md" />
            </div>
          ))}
        </div>
      </div>
    )
  } else if (layout === 'pair') {
    body = (
      <div className="page-x grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
        {images.map((img, i) => (
          <MediaImage key={i} img={img} sizes={sizesFor.pair} className="rounded-md aspect-[4/5]" />
        ))}
      </div>
    )
  } else if (layout === 'video') {
    body = (
      <div className="page-x">
        {/* Ningun caso usa 'video' en content/projects.ts todavia; poster como marcador. */}
        <video className="max-w-page mx-auto rounded-md w-full" autoPlay muted loop playsInline preload="none" poster={images[0]?.src} />
      </div>
    )
  } else if (layout === 'bleed') {
    body = <MediaImage img={images[0]} sizes={sizesFor.bleed} />
  }

  return (
    <div>
      {body}
      {caption && <p className="small text-fg-secondary mt-3 max-w-text page-x">{caption}</p>}
    </div>
  )
}
