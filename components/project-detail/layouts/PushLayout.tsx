'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { LayoutContainer } from '@/components/ui/layout-container'
import { BrandOverviewPush } from './BrandOverviewPush'

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
            virtualpush.es
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

export function PushLayout() {
  return (
    <div className="w-full text-black overflow-x-hidden project-detail">

      {/* MOCKUPS — lila suave de paleta Push */}
      {/* mockup_push.png y app_push_landing.png son mockups/ilustraciones de dispositivo,
          no capturas de navegador → sin BrowserFrame */}
      <section className="w-full bg-[#F3ECFF]">
        <FadeInSection>
          <LayoutContainer className="pt-10 pb-14 md:pt-16 md:pb-24">
            <div className="flex justify-center mb-10 md:mb-16">
              <div className="w-full max-w-4xl">
                <Image
                  src="/mockup_push.png"
                  alt="Push — mockup principal"
                  width={1200}
                  height={800}
                  className="w-full h-auto"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-4xl">
                <Image
                  src="/app_push_landing.png"
                  alt="Push — landing de la aplicación"
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
              Diseñando experiencias XR que transforman el miedo en confianza.
            </h2>
            <p className="text-black/70 text-[18px] leading-[1.5] max-w-2xl mb-6 md:mb-8">
              Desde la definición de los escenarios hasta la narrativa inmersiva,
              construimos un flujo que acompaña al usuario en cada fase del viaje:
              anticipación, exposición y consolidación.
            </p>
          </LayoutContainer>
        </FadeInSection>
      </section>

      {/* BRAND OVERVIEW */}
      <section className="bg-[#F5F5F5] pb-10 md:pb-16">
        <FadeInSection>
          <div className="px-0 md:px-4 lg:px-6">
            <BrandOverviewPush />
          </div>
        </FadeInSection>
      </section>

      {/* CONTEXTO Y RETO — morado principal de Push, texto en blanco */}
      <section className="w-full bg-[#865DE5] pt-10 md:pt-16 pb-10 md:pb-16">
        <FadeInSection>
          <LayoutContainer>
            <h3 className="font-semibold text-white leading-[1.1] text-[28px] md:text-[36px] max-w-3xl mb-6">
              Contexto y reto
            </h3>
            <p className="text-white/80 text-[18px] leading-[1.5] max-w-2xl">
              El reto era diseñar una experiencia de exposición progresiva que se sintiera segura y efectiva para personas con fobias, a través de escenarios realistas y personalizables.
            </p>
          </LayoutContainer>
        </FadeInSection>
      </section>

      {/* GRID 1 — blanco */}
      {/* app_push_splash y app_push_capitulos son capturas de UI → BrowserFrame */}
      <section className="w-full bg-white pt-10 md:pt-16 pb-10 md:pb-16">
        <FadeInSection>
          <LayoutContainer>
            <div className="flex flex-col gap-8 md:gap-12">
              <BrowserFrame
                src="/app_push_splash.png"
                alt="Push — pantalla de inicio de sesión"
                width={1000}
                height={750}
              />
              <BrowserFrame
                src="/app_push_capitulos.png"
                alt="Push — capítulos de exposición"
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
              Lideré todo el proceso de principio a fin: research, estudio de mercado y desarrollo del producto — incluyendo entrevistas con psiquiatras y psicólogos profesionales, y testing con usuarios y pacientes reales.
            </p>
          </LayoutContainer>
        </FadeInSection>
      </section>

      {/* GRID 2 — verde suave de paleta Push */}
      {/* app_push_tratamiento y app_push_mapa_01 son capturas de UI → BrowserFrame */}
      <section className="w-full bg-[#EEFEE2] pt-10 md:pt-16 pb-10 md:pb-16">
        <FadeInSection>
          <LayoutContainer>
            <div className="flex flex-col gap-8 md:gap-12">
              <BrowserFrame
                src="/app_push_tratamiento.png"
                alt="Push — pantalla de tratamiento"
                width={1000}
                height={750}
              />
              <BrowserFrame
                src="/app_push_mapa_01.png"
                alt="Push — mapa de exposición"
                width={1000}
                height={750}
              />
            </div>
          </LayoutContainer>
        </FadeInSection>
      </section>

      {/* RESULTADO — verde suave, cierre */}
      <section className="w-full bg-[#EEFEE2] pb-14 md:pb-24">
        <FadeInSection>
          <LayoutContainer>
            <h3 className="font-semibold text-black leading-[1.1] text-[28px] md:text-[36px] max-w-3xl mb-6">
              Resultado
            </h3>
            <p className="text-black/70 text-[18px] leading-[1.5] max-w-2xl">
              Tras validar el prototipo clínicamente, Push escaló comercialmente.
            </p>
          </LayoutContainer>
        </FadeInSection>
      </section>

    </div>
  )
}
