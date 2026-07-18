'use client'

import Image from 'next/image'
import { LayoutContainer } from '@/components/ui/layout-container'

interface SantaluciaLayoutProps {
  backgroundColor?: string
}

export function SantaluciaLayout({ backgroundColor = '#F29E39' }: SantaluciaLayoutProps) {
  return (
    <div className="w-full bg-[#F5F5F5] text-black overflow-x-hidden project-detail">

      {/* BLOQUE EDITORIAL — Contexto y reto */}
      <section className="w-full bg-inherit border-t border-[#1A1A1A] pt-10 md:pt-24 pb-10 md:pb-16">
        <LayoutContainer>
          <h2 className="font-manrope font-bold text-black leading-[1.05] text-[40px] md:text-[56px] max-w-3xl mb-8 md:mb-12">
            Contexto y reto
          </h2>
          <p className="text-black/70 text-[18px] leading-[1.5] max-w-2xl">
            Una app pensada para que personas mayores puedan programar la visita de un reparador a domicilio en muy pocos clics, sin fricción ni pasos innecesarios.
          </p>
        </LayoutContainer>
      </section>

      {/* CAPTURAS DE PANTALLA — flex-wrap, ancho natural por imagen */}
      <section className="w-full pb-10 md:pb-16">
        <LayoutContainer>
          <div className="flex flex-wrap justify-center items-end gap-4 md:gap-6">
            <div className="h-[380px] md:h-[480px]">
              <Image
                src="/santalucia-1.png"
                alt="Santalucía pantalla 1"
                height={480}
                width={220}
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="h-[380px] md:h-[480px]">
              <Image
                src="/santalucia-2.png"
                alt="Santalucía pantalla 2"
                height={480}
                width={220}
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="h-[380px] md:h-[480px]">
              <Image
                src="/santalucia-3.png"
                alt="Santalucía pantalla 3"
                height={480}
                width={220}
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="h-[380px] md:h-[480px]">
              <Image
                src="/santalucia-4.png"
                alt="Santalucía pantalla 4"
                height={480}
                width={220}
                className="h-full w-auto object-contain"
              />
            </div>
          </div>
        </LayoutContainer>
      </section>

      {/* BLOQUE — Rol y proceso */}
      <section className="w-full bg-inherit pb-10 md:pb-16">
        <LayoutContainer>
          <h3 className="font-manrope font-bold text-black leading-[1.1] text-[28px] md:text-[36px] max-w-3xl mb-6">
            Rol y proceso
          </h3>
          <p className="text-black/70 text-[18px] leading-[1.5] max-w-2xl">
            Diseñé la experiencia completa pensando en accesibilidad real: tamaños, lenguaje claro y un flujo simplificado al máximo. Cada decisión se testeó directamente con usuarios mayores para validarla.
          </p>
        </LayoutContainer>
      </section>

      {/* BLOQUE — Resultado */}
      <section className="w-full bg-inherit pb-14 md:pb-24">
        <LayoutContainer>
          <h3 className="font-manrope font-bold text-black leading-[1.1] text-[28px] md:text-[36px] max-w-3xl mb-6">
            Resultado
          </h3>
          <p className="text-black/70 text-[18px] leading-[1.5] max-w-2xl">
            Este proyecto fue seleccionado como caso de estudio en UXER School, durante mi bootcamp de UX/UI.
          </p>
        </LayoutContainer>
      </section>

    </div>
  )
}
