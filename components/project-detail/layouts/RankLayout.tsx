'use client'

import Image from 'next/image'
import { LayoutContainer } from '@/components/ui/layout-container'

export function RankLayout() {
  return (
    <div className="w-full bg-[#F5F5F5] text-black overflow-x-hidden project-detail">
      {/* MOCKUPS */}
      <section className="w-full bg-[#F5F5F5]">
        <LayoutContainer className="pt-10 pb-14 md:pt-16 md:pb-24">
          <div className="flex justify-center mb-10 md:mb-24">
            <div className="w-full max-w-4xl">
              <Image src="/rmh_01.png" alt="Rank Me Higher mockup" width={1200} height={800} className="w-full h-auto object-contain" />
            </div>
          </div>
          <div className="flex justify-center mb-10 md:mb-24">
            <div className="w-full max-w-4xl">
              <Image src="/rmh_03.png" alt="Rank Me Higher mockup 2" width={1200} height={800} className="w-full h-auto object-contain" />
            </div>
          </div>
        </LayoutContainer>
      </section>

      {/* BLOQUE EDITORIAL */}
      <section className="w-full bg-[#F5F5F5] py-14 md:py-24">
        <LayoutContainer>
          {/* Título editorial */}
          <h2 className="font-manrope font-bold text-black leading-[1.05] text-[40px] md:text-[56px] max-w-3xl mb-8 md:mb-12">
            Diseñando experiencias digitales que elevan la marca.
          </h2>

          {/* Subtítulo editorial */}
          <p className="text-black/70 text-[18px] leading-[1.5] max-w-2xl mb-10 md:mb-16">
            Desde la arquitectura de información hasta la implementación visual,
            construimos una experiencia web que refleja la identidad y los valores
            de Rank Me Higher con claridad y resultados medibles.
          </p>

          {/* GRID 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mb-10 md:mb-16">
            <div className="flex justify-center mb-10 md:mb-0">
              <div className="w-full max-w-4xl">
                <Image
                  src="/rmh_02.png"
                  alt="Push mockup"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
            <div className="flex justify-center mb-10 md:mb-0">
              <div className="w-full max-w-4xl">
                <Image
                  src="/rmh_04.png"
                  alt="Push mockup"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>

        </LayoutContainer>
      </section>

    </div>
  )
}
