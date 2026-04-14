'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface NewProjectLayoutProps {
  title: string
  backgroundColor: string
  textColor: string
  hoverImage: string
  children?: React.ReactNode
  description?: string
  location?: string
  role?: string
  tools?: string
  year?: string
  isConfidential?: boolean
  websiteUrl?: string
}

export function NewProjectLayout({
  title,
  backgroundColor,
  textColor,
  hoverImage,
  children,
  description,
  location,
  role,
  tools,
  year,
  isConfidential = false,
  websiteUrl,
}: NewProjectLayoutProps) {
  const imageRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(imageRef, { once: true, margin: '-10%' })

  const metaItems = [location, role, tools, year].filter(Boolean)

  return (
    <div className="w-full overflow-x-hidden">
      {/* SECCIÓN 1 — Hero fullscreen */}
      <section
        className="relative h-screen w-full overflow-hidden"
        style={{ backgroundColor, color: textColor }}
      >
        {/* Bloque inferior — caso de estudio + título + descripción + metadata */}
        <div className="absolute flex flex-col bottom-6 md:bottom-8 left-4 md:left-8 right-4 md:right-8">
          {/* 1. CASO DE ESTUDIO + badge confidencial */}
          <motion.div
            className="flex items-center gap-3"
            style={{ marginBottom: '8px' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span
              className="text-xs uppercase tracking-widest"
              style={{ color: textColor, opacity: 0.5 }}
            >
              Caso de estudio
            </span>
            {isConfidential && (
              <span
                className="text-xs uppercase tracking-widest border rounded-full px-2 py-0.5"
                style={{ color: textColor, borderColor: textColor, opacity: 0.7 }}
              >
                Proyecto confidencial
              </span>
            )}
          </motion.div>

          {/* 2. Título */}
          <motion.h1
            className="font-manrope font-bold leading-none"
            style={{
              color: textColor,
              fontSize: 'clamp(56px, 12vw, 260px)',
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {title}
          </motion.h1>

          {/* 3. Descripción */}
          {description && (
            <motion.p
              className="text-[16px] leading-[1.5] max-w-full md:max-w-[400px]"
              style={{ color: textColor, marginTop: '16px' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {description}
            </motion.p>
          )}

          {/* 3b. Website link */}
          {websiteUrl && (
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest opacity-70 hover:opacity-100 transition-opacity duration-150 mt-3"
              style={{ color: textColor }}
            >
              Visitar web →
            </a>
          )}

          {/* 4. Metadata */}
          {metaItems.length > 0 && (
            <motion.div
              className="flex flex-col md:flex-row md:flex-wrap gap-y-1 md:gap-x-4"
              style={{ marginTop: '12px' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              {metaItems.map((item, i) => (
                <span
                  key={i}
                  className="text-xs uppercase tracking-widest"
                  style={{ color: textColor, opacity: 0.6 }}
                >
                  <span className="hidden md:inline">
                    {i > 0 && <span className="mr-4 opacity-40">·</span>}
                  </span>
                  {item}
                </span>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* SECCIÓN 2 — Imagen fullscreen con animación scroll */}
      <section ref={imageRef} className="relative h-screen w-full overflow-hidden">
        <motion.div
          className="w-full h-full"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={hoverImage}
            alt={`${title} visual`}
            fill
            className="object-cover"
          />
        </motion.div>
      </section>

      {/* SECCIÓN 3 — Contenido específico del proyecto */}
      {children}
    </div>
  )
}
