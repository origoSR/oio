'use client'

import Image from 'next/image'
import { LayoutContainer } from '@/components/ui/layout-container'

interface RbiLayoutProps {
  backgroundColor?: string
}

export function RbiLayout({ backgroundColor = '#AE2825' }: RbiLayoutProps) {
  return (
    <div className="w-full overflow-x-hidden project-detail">
      {/* BLOQUE NDA */}
      <section className="w-full bg-[#F5F5F5]">
        <LayoutContainer className="py-14 md:py-24">
          <div className="max-w-3xl mx-auto text-center">

            <div className="flex justify-center mb-8">
              <span
                className="inline-flex items-center w-fit px-3 py-1 rounded-full text-xs font-semibold tracking-tight"
                style={{ backgroundColor: '#FFFFFF', color: backgroundColor }}
              >
                Proyecto confidencial
              </span>
            </div>

            <div className="flex justify-center mb-10">
              <Image
                src="/ms_sticker_2.png"
                alt="Sticker"
                width={120}
                height={120}
                className="w-[90px] md:w-[200px] h-auto object-contain"
              />
            </div>

            <h3 className="font-manrope font-bold text-[#222222] text-[34px] md:text-[46px] leading-[1.05] tracking-tight mb-6">
              Parte de este proyecto no puede mostrarse.
            </h3>

            <p className="text-[#222222]/75 text-[15px] md:text-[17px] leading-[1.55] mb-10">
              Algunas piezas, procesos internos y pantallas están bajo NDA.
              Si quieres ver el trabajo completo, contáctame directamente.
            </p>

            <a
              href="mailto:rodrigo@oi0.co"
              className="inline-block text-[15px] md:text-[17px] font-medium underline decoration-[2px] decoration-[#222222]/40 underline-offset-4 hover:opacity-70 transition-opacity text-[#222222]"
            >
              rosanchez92@gmail.com
            </a>

          </div>
        </LayoutContainer>
      </section>
    </div>
  )
}
