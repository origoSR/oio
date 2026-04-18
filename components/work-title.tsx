'use client'

import { useEffect, useRef, useState } from 'react'
import { LayoutContainer } from '@/components/ui/layout-container'
import { cn } from '@/lib/utils'

export function WorkTitle() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current)
    }
  }, [])

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative z-[1] bg-[#F5F5F5] border-t border-gray-200"
    >
      <LayoutContainer>
        <h2
          className={cn(
            "font-manrope font-bold tracking-[-0.02em] text-[#111111]",
            "text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[112px]",
            "mt-28 md:mt-32 lg:mt-[140px] mb-8 sm:mb-10 md:mb-12",
            "transition-all duration-1000 ease-out",
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          )}
        >
          Work.
        </h2>
      </LayoutContainer>
    </section>
  )
}
