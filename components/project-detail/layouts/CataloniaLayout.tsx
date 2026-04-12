'use client'

import Image from 'next/image'
import { LayoutContainer } from '@/components/ui/layout-container'
import { BrandOverviewCatalonia } from './BrandOverviewCatalonia'

export function CataloniaLayout() {
  return (
    <div className="w-full bg-[#F5F5F5] text-black overflow-x-hidden project-detail">
      {/* MOCKUPS */}
      <section className="w-full bg-[#F5F5F5]">
        <LayoutContainer className="pt-10 pb-14 md:pt-16 md:pb-24">
          <div className="flex justify-center mb-10 md:mb-24">
            <div className="w-full max-w-4xl">
              <Image
                src="/catalonia_mockup.png"
                alt="Catalonia mockup"
                width={1200}
                height={800}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
          <div className="flex justify-center mb-10 md:mb-24">
            <div className="w-full max-w-4xl">
              <Image
                src="/catalonia_mockup_02.png"
                alt="Second Catalonia view"
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
            Diseñando experiencias digitales que elevan la marca.
          </h2>

          {/* Subtítulo editorial */}
          <p className="text-black/70 text-[18px] leading-[1.5] max-w-2xl mb-6 md:mb-8">
            Desde el sistema de diseño hasta la implementación visual,
            construimos una experiencia web que refleja la excelencia y el compromiso
            de Catalonia Hotels con la hospitalidad de calidad.
          </p>
        </LayoutContainer>
      </section>

      {/* Brand Overview */}
      <section className="bg-inherit pb-14 md:pb-24">
        <div className="px-0 md:px-4 lg:px-6">
          <BrandOverviewCatalonia />
        </div>

        <LayoutContainer className="pt-10 md:pt-16">
          {/* GRID 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mb-10 md:mb-16">
            <Image
              src="/catalonia_banner_04.png"
              alt="Catalonia editorial 1"
              width={1000}
              height={750}
              className="w-full h-auto object-cover"
            />
            <Image
              src="/catalonia_banner_02.png"
              alt="Catalonia editorial 2"
              width={1000}
              height={750}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* GRID 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 pb-14 md:pb-24">
            <Image
              src="/catalonia_banner_01.png"
              alt="Catalonia editorial 3"
              width={1000}
              height={750}
              className="w-full h-auto object-cover"
            />
            <Image
              src="/catalonia_banner_03.png"
              alt="Catalonia editorial 4"
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
