import Image from 'next/image'
import type { Img } from '@/content/types'

export function Cover({ image }: { image: Img }) {
  return (
    <div className="relative w-full" style={{ aspectRatio: `${image.w} / ${image.h}` }}>
      <Image src={image.src} alt={image.alt} fill priority sizes="100vw" className="object-cover" />
    </div>
  )
}
