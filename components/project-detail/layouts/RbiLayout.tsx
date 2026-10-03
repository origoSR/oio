'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { LayoutContainer } from '@/components/ui/layout-container'

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

interface RbiLayoutProps {
  backgroundColor?: string
}

export function RbiLayout({ backgroundColor = '#AE2825' }: RbiLayoutProps) {
  return (
    <div className="w-full bg-[#F5F5F5] text-black overflow-x-hidden project-detail">

      {/* BLOQUE EDITORIAL — Contexto y reto */}
      {/* #AE2825 es rojo oscuro — texto en blanco para contraste adecuado */}
      <section className="w-full bg-[#AE2825] border-t border-white/20 pt-10 md:pt-24 pb-10 md:pb-16">
        <FadeInSection>
          <LayoutContainer>
            <h2 className="font-bold text-white leading-[1.05] text-[40px] md:text-[56px] max-w-3xl mb-8 md:mb-12">
              Contexto y reto
            </h2>
            <p className="text-white/80 text-[18px] leading-[1.5] max-w-2xl mb-6 md:mb-8">
              La app interna de empleados de RBI (matriz de Burger King y Popeyes) tenía un userflow muy pobre, lo que generaba quejas constantes por parte de los propios empleados.
            </p>
            <p className="text-white/80 text-[18px] leading-[1.5] max-w-2xl">
              El objetivo era simplificar el acceso y los flujos más usados del día a día.
            </p>
          </LayoutContainer>
        </FadeInSection>
      </section>

      {/* CAPTURAS DE PANTALLA */}
      <section className="w-full pt-10 md:pt-16 pb-10 md:pb-16">
        <FadeInSection>
          <LayoutContainer>
            <div className="flex flex-wrap justify-center items-end gap-4 md:gap-6">
              <div className="h-[380px] md:h-[480px]">
                <Image src="/rbi-1.png" alt="RBI pantalla 1" height={480} width={220} className="h-full w-auto object-contain" />
              </div>
              <div className="h-[380px] md:h-[480px]">
                <Image src="/rbi-2.png" alt="RBI pantalla 2" height={480} width={220} className="h-full w-auto object-contain" />
              </div>
              <div className="h-[380px] md:h-[480px]">
                <Image src="/rbi-3.png" alt="RBI pantalla 3" height={480} width={220} className="h-full w-auto object-contain" />
              </div>
              <div className="h-[380px] md:h-[480px]">
                <Image src="/rbi-4.png" alt="RBI pantalla 4" height={480} width={220} className="h-full w-auto object-contain" />
              </div>
            </div>
          </LayoutContainer>
        </FadeInSection>
      </section>

      {/* BLOQUE — Rol y proceso */}
      <section className="w-full bg-inherit pb-10 md:pb-16">
        <FadeInSection>
          <LayoutContainer>
            <h3 className="font-bold text-black leading-[1.1] text-[28px] md:text-[36px] max-w-3xl mb-6">
              Rol y proceso
            </h3>
            <p className="text-black/70 text-[18px] leading-[1.5] max-w-2xl">
              Entré en una fase de continuación del proyecto, escalando el trabajo previo de una compañera de diseño y aportando mejoras propias sobre esa base en la siguiente iteración.
            </p>
          </LayoutContainer>
        </FadeInSection>
      </section>

      {/* BLOQUE — Resultado */}
      <section className="w-full bg-inherit pb-10 md:pb-16">
        <FadeInSection>
          <LayoutContainer>
            <h3 className="font-bold text-black leading-[1.1] text-[28px] md:text-[36px] max-w-3xl mb-6">
              Resultado
            </h3>
            <p className="text-black/70 text-[18px] leading-[1.5] max-w-2xl">
              El rediseño resolvió el principal punto de dolor de los empleados y mejoró la experiencia general de la app.
            </p>
          </LayoutContainer>
        </FadeInSection>
      </section>

      {/* CIERRE */}
      <section className="w-full bg-[#F5F5F5]">
        <FadeInSection>
          <LayoutContainer className="pt-10 pb-14 md:pt-16 md:pb-24">
            <div className="relative w-full aspect-[16/9] max-w-6xl mx-auto">
              <Image src="/rbi-cierre.png" alt="RBI cierre" fill className="object-cover" />
            </div>
          </LayoutContainer>
        </FadeInSection>
      </section>

      {/* NOTA DE CONFIDENCIALIDAD */}
      <section className="w-full pb-14 md:pb-24">
        <FadeInSection>
          <LayoutContainer>
            <div className="border-t border-[#1A1A1A]/20 pt-6 mt-6">
              <p className="text-black/50 text-[13px] leading-relaxed max-w-xl">
                Algunas pantallas y procesos internos de este proyecto están bajo NDA.
                Si quieres ver el detalle completo,{' '}
                <a href="mailto:rodrigo@oi0.es" className="underline hover:opacity-70">escríbeme</a>.
              </p>
            </div>
          </LayoutContainer>
        </FadeInSection>
      </section>

    </div>
  )
}
