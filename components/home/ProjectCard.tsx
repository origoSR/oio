'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { getProjectRoute } from '@/lib/projects'

interface ProjectCardProps {
  id: number
  title: string
  hoverImage: string
  projectId?: string
  description?: string
  year?: string
  country?: string
  type?: string
  tools?: string[]
  behanceUrl: string | null
}

export function ProjectCard({
  title,
  projectId,
  description,
  year,
  country,
  type,
  tools,
  hoverImage,
}: ProjectCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const projectRoute = projectId ? getProjectRoute(projectId) : '#'

  // Metadata line: rol · herramientas principales · ciudad · año
  const metaParts = [type, tools?.[0], country, year].filter(Boolean)
  const metaLine = metaParts.join(' · ')

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 }
    )
    if (cardRef.current) observer.observe(cardRef.current)
    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current)
    }
  }, [])

  return (
    <Link
      href={projectRoute}
      ref={cardRef}
      className={cn(
        'relative w-full overflow-hidden flex flex-col cursor-pointer',
        'py-5 lg:py-8 min-h-[140px] lg:min-h-[200px]',
        'border-b border-[#CCCCCC]',
        'transition-all duration-700',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[10px]',
      )}
      style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* IMAGEN DE FONDO */}
      <motion.img
        src={hoverImage}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      />

      {/* OVERLAY */}
      <motion.div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: 'rgba(0,0,0,0.4)' }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      />

      {/* CONTENIDO */}
      <div className="relative z-[2] flex flex-1 flex-col justify-between px-4 lg:px-6 gap-2">

        {/* FILA PRINCIPAL: Título + VER → */}
        <div className="flex items-start justify-between gap-4">
          <h3 className={cn(
            'font-manrope font-bold tracking-[-0.02em] leading-tight transition-colors duration-500',
            'text-2xl lg:text-5xl',
            isHovered ? 'text-white' : 'text-[#222222]'
          )}>
            {title}
          </h3>

          <span className={cn(
            'font-manrope font-bold uppercase tracking-widest text-sm whitespace-nowrap',
            'pt-1 lg:pt-2 flex-shrink-0 transition-colors duration-500',
            isHovered ? 'text-white' : 'text-[#222222]'
          )}>
            Ver →
          </span>
        </div>

        {/* DESCRIPCIÓN */}
        {description && (
          <p className={cn(
            'font-manrope text-sm lg:text-lg font-normal leading-snug line-clamp-1 transition-colors duration-500 max-w-2xl',
            isHovered ? 'text-white/80' : 'text-neutral-500'
          )}>
            {description}
          </p>
        )}

        {/* METADATA — siempre visible en móvil, solo en hover en desktop */}
        <p
          className={cn(
            'font-manrope uppercase tracking-[0.18em] leading-none transition-all duration-[400ms]',
            isHovered
              ? 'opacity-100 translate-y-0 text-white/70'
              : 'opacity-100 md:opacity-0 md:translate-y-1 text-neutral-400'
          )}
          style={{ fontSize: '12px' }}
        >
          {metaLine}
        </p>

      </div>
    </Link>
  )
}
