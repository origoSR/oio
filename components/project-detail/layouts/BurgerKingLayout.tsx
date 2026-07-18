'use client'

import Image from 'next/image'
import { LayoutContainer } from '@/components/ui/layout-container'

interface BurgerKingLayoutProps {
  backgroundColor?: string
}

export function BurgerKingLayout({ backgroundColor = '#E7863F' }: BurgerKingLayoutProps) {
  return (
    <div className="w-full bg-[#F5F5F5] text-black overflow-x-hidden project-detail">

      {/* BLOQUE EDITORIAL — Contexto y reto */}
      <section className="w-full bg-inherit border-t border-[#1A1A1A] pt-10 md:pt-24 pb-10 md:pb-16">
        <LayoutContainer>
          <h2 className="font-manrope font-bold text-black leading-[1.05] text-[40px] md:text-[56px] max-w-3xl mb-8 md:mb-12">
            Contexto y reto
          </h2>
          <p className="text-black/70 text-[18px] leading-[1.5] max-w-2xl mb-6 md:mb-8">
            Que pedir en la app o en el kiosko fuera igual de rápido, claro y coherente en toda la red de restaurantes.
          </p>
          <p className="text-black/70 text-[18px] leading-[1.5] max-w-2xl">
            Analizamos el flujo de compra de la competencia para detectar dónde los usuarios perdían tiempo y claridad, y usamos esos hallazgos para redefinir el propio.
          </p>
        </LayoutContainer>
      </section>

      {/* FOTO KIOSKO EN CONTEXTO */}
      <section className="w-full bg-[#F5F5F5]">
        <LayoutContainer className="pb-14 md:pb-24">
          <div className="relative w-full aspect-[16/9] max-w-6xl mx-auto">
            <Image
              src="/bk-kiosko-1.jpg"
              alt="Burger King kiosko en contexto"
              fill
              className="object-cover"
            />
          </div>
        </LayoutContainer>
      </section>

      {/* CAPTURAS DE PANTALLA — flex-wrap, ancho natural por imagen */}
      <section className="w-full pb-10 md:pb-16">
        <LayoutContainer>
          <div className="flex flex-wrap justify-center items-end gap-4 md:gap-6">
            <div className="h-[380px] md:h-[480px]">
              <Image
                src="/bk-kiosko-2.png"
                alt="Burger King kiosko pantalla 2"
                height={480}
                width={220}
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="h-[380px] md:h-[480px]">
              <Image
                src="/bk-kiosko-3.png"
                alt="Burger King kiosko pantalla 3"
                height={480}
                width={220}
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="h-[380px] md:h-[480px]">
              <Image
                src="/bk-kiosko-4.png"
                alt="Burger King kiosko pantalla 4"
                height={480}
                width={220}
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="h-[380px] md:h-[480px]">
              <Image
                src="/bk-kiosko-5.png"
                alt="Burger King kiosko pantalla 5"
                height={480}
                width={220}
                className="h-full w-auto object-contain"
              />
            </div>
          </div>
          {/* kiosko-6 centrada en su propia fila */}
          <div className="flex justify-center mt-4 md:mt-6">
            <div className="h-[380px] md:h-[480px]">
              <Image
                src="/bk-kiosko-6.png"
                alt="Burger King kiosko pantalla 6"
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
            Diseñé las pantallas del flujo de compra completo, definí la jerarquía visual y construí un sistema de componentes compartido entre app y kiosko, de forma que cualquier cambio se escala una sola vez a ambos canales. También mantuve y amplié el sistema de diseño existente conforme crecían las necesidades del producto.
          </p>
        </LayoutContainer>
      </section>

      {/* BLOQUE — Resultado */}
      <section className="w-full bg-inherit pb-10 md:pb-16">
        <LayoutContainer>
          <h3 className="font-manrope font-bold text-black leading-[1.1] text-[28px] md:text-[36px] max-w-3xl mb-6">
            Resultado
          </h3>
          <p className="text-black/70 text-[18px] leading-[1.5] max-w-2xl">
            El nuevo sistema de componentes agilizó el flujo de trabajo del equipo de diseño, y la estrategia de upselling y cross-selling integrada en el flujo de compra mejoró la conversión en ventas.
          </p>
        </LayoutContainer>
      </section>

      {/* CIERRE */}
      <section className="w-full bg-[#F5F5F5]">
        <LayoutContainer className="pt-10 pb-14 md:pt-16 md:pb-24">
          <div className="relative w-full aspect-[16/9] max-w-6xl mx-auto">
            <Image
              src="/bk-portada-cierre.png"
              alt="Burger King cierre"
              fill
              className="object-cover"
            />
          </div>
        </LayoutContainer>
      </section>

      {/* NOTA DE CONFIDENCIALIDAD */}
      <section className="w-full pb-14 md:pb-24">
        <LayoutContainer>
          <div className="border-t border-[#1A1A1A]/20 pt-6 mt-6">
            <p className="text-black/50 text-[13px] leading-relaxed max-w-xl">
              Algunas pantallas y procesos internos de este proyecto están bajo NDA.
              Si quieres ver el detalle completo,{' '}
              <a href="mailto:rodrigo@oi0.es" className="underline hover:opacity-70">escríbeme</a>.
            </p>
          </div>
        </LayoutContainer>
      </section>

    </div>
  )
}
