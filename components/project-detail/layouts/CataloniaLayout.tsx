'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { LayoutContainer } from '@/components/ui/layout-container'
import { BrandOverviewCatalonia } from './BrandOverviewCatalonia'

// Fade-in al entrar en viewport — mismo patrón que NewProjectLayout.tsx
// Cada sección gestiona su propio ref/animación de forma independiente
function FadeInSection({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-5%' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

// Frame de navegador — sin parallax, imágenes a tamaño natural (w-full h-auto)
// Las imágenes son capturas de UI, no fotos decorativas: no se pueden recortar
// sin perder el header/contenido relevante. El parallax + scale se reservan para
// fotos decorativas donde recortar los bordes no importa.
function BrowserFrame({
  src,
  alt,
  width,
  height,
}: {
  src: string
  alt: string
  width: number
  height: number
}) {
  return (
    <div className="rounded-xl overflow-hidden shadow-lg border border-black/10">
      {/* Barra de navegador */}
      <div className="bg-[#E8E6E1] px-4 py-3 flex items-center gap-2">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#D9D9D9]" />
          <span className="w-3 h-3 rounded-full bg-[#D9D9D9]" />
          <span className="w-3 h-3 rounded-full bg-[#D9D9D9]" />
        </div>
        <div className="flex-1 mx-4 bg-white/60 rounded-md px-3 py-1 text-center">
          <span className="text-sm font-medium text-black/60">
            cataloniahotels.com
          </span>
        </div>
      </div>
      {/* Imagen a su proporción natural — sin fill ni object-cover */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-auto"
      />
    </div>
  )
}

export function CataloniaLayout() {
  return (
    <div className="w-full text-black overflow-x-hidden project-detail">

      {/* MOCKUPS — crema suave */}
      <section className="w-full bg-[#FBF8F2]">
        <FadeInSection>
          <LayoutContainer className="pt-10 pb-14 md:pt-16 md:pb-24">
            <div className="flex justify-center mb-10 md:mb-16">
              <div className="w-full max-w-4xl">
                <BrowserFrame
                  src="/catalonia_mockup.png"
                  alt="Catalonia Hotels — vista web principal"
                  width={1200}
                  height={800}
                />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-4xl">
                <BrowserFrame
                  src="/catalonia_mockup_02.png"
                  alt="Catalonia Hotels — segunda vista web"
                  width={1200}
                  height={800}
                />
              </div>
            </div>
          </LayoutContainer>
        </FadeInSection>
      </section>

      {/* BLOQUE EDITORIAL */}
      <section className="w-full bg-[#F5F5F5] border-t border-[#1A1A1A] pt-10 md:pt-24 pb-10 md:pb-16">
        <FadeInSection>
          <LayoutContainer>
            <h2 className="font-bold text-black leading-[1.05] text-[40px] md:text-[56px] max-w-3xl mb-8 md:mb-12">
              Diseñando experiencias digitales que elevan la marca.
            </h2>
            <p className="text-black/70 text-[18px] leading-[1.5] max-w-2xl mb-6 md:mb-8">
              Desde el sistema de diseño hasta la implementación visual,
              construimos una experiencia web que refleja la excelencia y el compromiso
              de Catalonia Hotels con la hospitalidad de calidad.
            </p>
          </LayoutContainer>
        </FadeInSection>
      </section>

      {/* BRAND OVERVIEW */}
      <section className="bg-[#F5F5F5] pb-10 md:pb-16">
        <FadeInSection>
          <div className="px-0 md:px-4 lg:px-6">
            <BrandOverviewCatalonia />
          </div>
        </FadeInSection>
      </section>

      {/* CONTEXTO Y RETO — dorado de marca */}
      <section className="w-full bg-[#F6D57A] pt-10 md:pt-16 pb-10 md:pb-16">
        <FadeInSection>
          <LayoutContainer>
            <h3 className="font-semibold text-[#2C3E50] leading-[1.1] text-[28px] md:text-[36px] max-w-3xl mb-6">
              Contexto y reto
            </h3>
            <p className="text-[#2C3E50]/80 text-[18px] leading-[1.5] max-w-2xl">
              La web de Catalonia Hotels tenía un problema doble: una navegación confusa y una conversión baja, pese al volumen de tráfico que ya recibía la marca.
            </p>
          </LayoutContainer>
        </FadeInSection>
      </section>

      {/* GRID 1 — blanco */}
      <section className="w-full bg-white pt-10 md:pt-16 pb-10 md:pb-16">
        <FadeInSection>
          <LayoutContainer>
            <div className="flex flex-col gap-8 md:gap-12">
              <BrowserFrame
                src="/catalonia_banner_04.png"
                alt="Catalonia Hotels — detalle web 1"
                width={1000}
                height={750}
              />
              <BrowserFrame
                src="/catalonia_banner_02.png"
                alt="Catalonia Hotels — detalle web 2"
                width={1000}
                height={750}
              />
            </div>
          </LayoutContainer>
        </FadeInSection>
      </section>

      {/* ROL Y PROCESO — blanco */}
      <section className="w-full bg-white pb-10 md:pb-16">
        <FadeInSection>
          <LayoutContainer>
            <h3 className="font-semibold text-black leading-[1.1] text-[28px] md:text-[36px] max-w-3xl mb-6">
              Rol y proceso
            </h3>
            <p className="text-black/70 text-[18px] leading-[1.5] max-w-2xl">
              Además de mantener y escalar el sistema de diseño existente, construí desde cero un sistema de diseño de más de 100 componentes que unificó toda la experiencia de la web.
            </p>
          </LayoutContainer>
        </FadeInSection>
      </section>

      {/* GRID 2 — crema */}
      <section className="w-full bg-[#FBF8F2] pt-10 md:pt-16 pb-10 md:pb-16">
        <FadeInSection>
          <LayoutContainer>
            <div className="flex flex-col gap-8 md:gap-12">
              <BrowserFrame
                src="/catalonia_banner_01.png"
                alt="Catalonia Hotels — detalle web 3"
                width={1000}
                height={750}
              />
              <BrowserFrame
                src="/catalonia_banner_03.png"
                alt="Catalonia Hotels — detalle web 4"
                width={1000}
                height={750}
              />
            </div>
          </LayoutContainer>
        </FadeInSection>
      </section>

      {/* RESULTADO — crema */}
      <section className="w-full bg-[#FBF8F2] pb-14 md:pb-24">
        <FadeInSection>
          <LayoutContainer>
            <h3 className="font-semibold text-black leading-[1.1] text-[28px] md:text-[36px] max-w-3xl mb-6">
              Resultado
            </h3>
            <p className="text-black/70 text-[18px] leading-[1.5] max-w-2xl">
              El rediseño se tradujo en una mejora medible tanto en tráfico como en conversión.
            </p>
          </LayoutContainer>
        </FadeInSection>
      </section>

    </div>
  )
}
