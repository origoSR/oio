'use client'

import Image from 'next/image'
import { LayoutContainer } from '@/components/ui/layout-container'
import { BrandOverviewPush } from './BrandOverviewPush'

interface PushLayoutProps {
  projectId: string
  title: string
  description: string
  role?: string
  year?: string
  country?: string
  tools?: string[]
  website?: string
  backgroundColor: string
  frame7BackgroundImage?: string
  sticker?: React.ReactNode | null
  animationClasses?: string
}

export function PushLayout({
  backgroundColor,
  animationClasses = '',
}: PushLayoutProps) {
  return (
    <div
      className={`w-full bg-[#F5F5F5] text-black overflow-x-hidden project-detail ${animationClasses}`}
    >
      {/* MOCKUPS */}
      <section className="w-full" style={{ backgroundColor: '#F5F5F5', color: '#222222' }}>
        <LayoutContainer className="pt-10 pb-14 md:pt-16 md:pb-24">
          {/* MOCKUP PRINCIPAL */}
          <div className="flex justify-center mb-10 md:mb-24">
            <div className="w-full max-w-4xl">
              <Image
                src="/mockup_push.png"
                alt="Push mockup"
                width={1200}
                height={800}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* IMAGEN 2 */}
          <div className="flex justify-center mb-10 md:mb-24">
            <div className="w-full max-w-4xl">
              <Image
                src="/app_push_landing.png"
                alt="Second Push view"
                width={1200}
                height={800}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </LayoutContainer>
      </section>

      {/* BLOQUE EDITORIAL */}
      <section className="w-full bg-inherit border-t border-[#1A1A1A] pt-10 md:pt-24 pb-10 md:pb-16">
        <LayoutContainer>
          {/* Título editorial */}
          <h2 className="font-manrope font-bold text-black leading-[1.05] text-[40px] md:text-[56px] max-w-3xl mb-8 md:mb-12">
            Diseñando experiencias XR que transforman el miedo en confianza.
          </h2>

          {/* Subtítulo editorial */}
          <p className="text-black/70 text-[18px] leading-[1.5] max-w-2xl mb-6 md:mb-8">
            Desde la definición de los escenarios hasta la narrativa inmersiva,
            construimos un flujo que acompaña al usuario en cada fase del viaje:
            anticipación, exposición y consolidación.
          </p>
        </LayoutContainer>
      </section>

      {/* Brand Overview */}
      <section className="bg-inherit pb-14 md:pb-24">
        <div className="px-0 md:px-4 lg:px-6">
          <BrandOverviewPush />
        </div>

        <LayoutContainer className="pt-10 md:pt-16">
          {/* GRID 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mb-10 md:mb-16">
            <Image
              src="/app_push_splash.png"
              alt="Push editorial 1"
              width={1000}
              height={750}
              className="w-full h-auto object-cover"
            />
            <Image
              src="/app_push_capitulos.png"
              alt="Push editorial 2"
              width={1000}
              height={750}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* GRID 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 pb-14 md:pb-24">
            <Image
              src="/app_push_tratamiento.png"
              alt="Push editorial 3"
              width={1000}
              height={750}
              className="w-full h-auto object-cover"
            />
            <Image
              src="/app_push_mapa_01.png"
              alt="Push editorial 4"
              width={1000}
              height={750}
              className="w-full h-auto object-cover"
            />
          </div>
        </LayoutContainer>
      </section>

    </div>
  )
}
