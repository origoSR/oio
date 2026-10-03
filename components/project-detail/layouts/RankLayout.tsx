'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { LayoutContainer } from '@/components/ui/layout-container'

// Fade-in al entrar en viewport — mismo patrón que NewProjectLayout.tsx y CataloniaLayout.tsx
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

// Frame de navegador — sin parallax, imagen a tamaño natural (w-full h-auto)
// Solo para capturas de UI, nunca para fotos/ilustraciones/mockups de dispositivo
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
      <div className="bg-[#E8E6E1] px-4 py-3 flex items-center gap-2">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#D9D9D9]" />
          <span className="w-3 h-3 rounded-full bg-[#D9D9D9]" />
          <span className="w-3 h-3 rounded-full bg-[#D9D9D9]" />
        </div>
        <div className="flex-1 mx-4 bg-white/60 rounded-md px-3 py-1 text-center">
          <span className="text-sm font-medium text-black/60">
            rankmehigher.co
          </span>
        </div>
      </div>
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

export function RankLayout() {
  return (
    <div className="w-full text-black overflow-x-hidden project-detail">

      {/* MOCKUPS — blanco puro */}
      {/* rmh_01 y rmh_03 son mockups/ilustraciones de dispositivo, no capturas → sin BrowserFrame */}
      <section className="w-full bg-white">
        <FadeInSection>
          <LayoutContainer className="pt-10 pb-14 md:pt-16 md:pb-24">
            <div className="flex justify-center mb-10 md:mb-16">
              <div className="w-full max-w-4xl">
                <Image
                  src="/rmh_01.png"
                  alt="Rank Me Higher mockup"
                  width={1200}
                  height={800}
                  className="w-full h-auto"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-4xl">
                <Image
                  src="/rmh_03.png"
                  alt="Rank Me Higher mockup 2"
                  width={1200}
                  height={800}
                  className="w-full h-auto"
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
              Visibilidad medible: SEO y diseño al servicio de resultados.
            </h2>
            <p className="text-black/70 text-[18px] leading-[1.5] max-w-2xl">
              Desde la arquitectura de información hasta la implementación visual,
              construimos una experiencia web que refleja la identidad y los valores
              de Rank Me Higher con claridad y resultados medibles.
            </p>
          </LayoutContainer>
        </FadeInSection>
      </section>

      {/* CONTEXTO Y RETO — naranja accent de Rank Me Higher, texto en blanco */}
      <section className="w-full bg-[#F1965B] pt-10 md:pt-16 pb-10 md:pb-16">
        <FadeInSection>
          <LayoutContainer>
            <h3 className="font-semibold text-white leading-[1.1] text-[28px] md:text-[36px] max-w-3xl mb-6">
              Contexto y reto
            </h3>
            <p className="text-white/80 text-[18px] leading-[1.5] max-w-2xl">
              El reto tenía dos frentes: diseñar una web de UX/UI que convirtiera bien, y en paralelo trabajar el SEO para pequeñas y medianas empresas internacionales.
            </p>
          </LayoutContainer>
        </FadeInSection>
      </section>

      {/* GRID 1 — blanco */}
      {/* rmh_02 y rmh_04 son capturas de la web → BrowserFrame */}
      <section className="w-full bg-white pt-10 md:pt-16 pb-10 md:pb-16">
        <FadeInSection>
          <LayoutContainer>
            <div className="flex flex-col gap-8 md:gap-12">
              <BrowserFrame
                src="/rmh_02.png"
                alt="Rank Me Higher — captura web 1"
                width={1200}
                height={800}
              />
              <BrowserFrame
                src="/rmh_04.png"
                alt="Rank Me Higher — captura web 2"
                width={1200}
                height={800}
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
              Diseñé la web de UX/UI de Rank Me Higher y, en paralelo, trabajé el SEO de pequeñas y medianas empresas internacionales, además de diseñar páginas web para esos mismos clientes.
            </p>
          </LayoutContainer>
        </FadeInSection>
      </section>

      {/* RESULTADO — crema suave, cierre */}
      <section className="w-full bg-[#FBF8F2] pb-14 md:pb-24">
        <FadeInSection>
          <LayoutContainer className="pt-10 md:pt-16">
            <h3 className="font-semibold text-black leading-[1.1] text-[28px] md:text-[36px] max-w-3xl mb-6">
              Resultado
            </h3>
            <p className="text-black/70 text-[18px] leading-[1.5] max-w-2xl">
              Mejoras notorias en conversión, tanto en la propia web de Rank Me Higher como en las empresas a las que se les hizo SEO.
            </p>
          </LayoutContainer>
        </FadeInSection>
      </section>

    </div>
  )
}
