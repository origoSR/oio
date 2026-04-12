'use client'

import { useRef } from 'react'
import { Hero } from '@/components/home/Hero'
import { GlobalDraggableLogo } from '@/components/home/GlobalDraggableLogo'

export function HomeScene() {
  const pageRef = useRef<HTMLDivElement | null>(null)

  return (
    <div ref={pageRef} className="relative h-screen overflow-hidden">
      <Hero />
      <GlobalDraggableLogo containerRef={pageRef} />
    </div>
  )
}
