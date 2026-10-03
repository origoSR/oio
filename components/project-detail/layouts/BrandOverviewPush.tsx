'use client'

import Image from 'next/image'

export function BrandOverviewPush() {
    return (
        <div className="border-y border-[#1A1A1A] w-full">
            {/* FILA 0: Project overview */}
            <div className="border-b border-[#1A1A1A]">
                <div className="px-4 lg:px-0 py-6">
                    <h3 className="text-xs uppercase tracking-[0.15em] text-black/50">
                        Project overview
                    </h3>
                </div>
            </div>

            {/* FILA 1: Logo / Color / Typography */}
            <div
                className="
          grid grid-cols-1 md:grid-cols-3
          divide-y divide-[#1A1A1A] md:divide-y-0
          md:[&>*:not(:last-child)]:border-r md:[&>*:not(:last-child)]:border-[#1A1A1A]
        "
            >
                {/* LOGO */}
                <div className="px-4 lg:px-0 lg:pr-4 py-4">
                    <h3 className="text-xs uppercase tracking-[0.15em] text-black/50">Logo</h3>
                    <p className="mt-4 text-[15px] leading-relaxed text-neutral-800">
                        Hoja como símbolo principal, adaptada a la
                        identidad fluorescente y minimalista.
                    </p>
                    <Image
                        src="/logo_push_brand.png"
                        alt="Push logo"
                        width={320}
                        height={140}
                        className="mt-10 w-[260px] max-w-full object-contain"
                    />
                </div>

                {/* COLORS */}
                <div className="px-4 py-4 pr-[20px] flex flex-col justify-start">
                    <h3 className="text-xs uppercase tracking-[0.15em] text-black/50">Color</h3>
                    <div className="mt-8 grid grid-cols-3 gap-6">
                        <div className="w-16 h-16 rounded-full bg-[#6B8F4E]" />
                        <div className="w-16 h-16 rounded-full bg-[#93CC5A]" />
                        <div className="w-16 h-16 rounded-full bg-[#EEFEE2]" />
                        <div className="w-16 h-16 rounded-full bg-[#865DE5]" />
                        <div className="w-16 h-16 rounded-full bg-[#ADA2FF]" />
                        <div className="w-16 h-16 rounded-full bg-[#F3ECFF]" />
                    </div>
                </div>

                {/* TYPOGRAPHY */}
                <div className="px-4 py-4 pr-[0px] flex flex-col justify-start">
                    <h3 className="text-xs uppercase tracking-[0.15em] text-black/50">
                        Typography & tone of voice
                    </h3>
                    <p className="mt-4 text-[15px] leading-relaxed text-neutral-800 max-w-[90%]">
                        Uso principal de Montserrat para UI y
                        sitio web.
                    </p>
                    <span className="mt-10 text-[80px] leading-none text-neutral-900">
                        Aa
                    </span>
                </div>
            </div>

            {/* LÍNEA ENTRE FILA 1 Y FILA 2 (ocupa todo el ancho, sin margen lateral) */}
            <div className="h-px bg-[#1A1A1A]" />

            {/* FILA 2: Photostyle / Illustrations / Quick links */}
            <div
                className="
          grid grid-cols-1 md:grid-cols-3
          divide-y divide-[#1A1A1A] md:divide-y-0
          md:[&>*:not(:last-child)]:border-r md:[&>*:not(:last-child)]:border-[#1A1A1A]
        "
            >
                {/* PHOTOSTYLE */}
                <div className="px-4 lg:px-0 lg:pr-4 py-4">
                    <h3 className="text-xs uppercase tracking-[0.15em] text-black/50">
                        Photostyle
                    </h3>

                    <div className="mt-8 w-full h-[260px] relative rounded-md overflow-hidden">
                        <Image
                            src="/bluesky.png"
                            alt="Photostyle"
                            fill
                            className="object-cover rounded-md"
                        />
                    </div>
                </div>

                {/* COMPONENTES UI */}
                <div className="px-4 py-4 flex flex-col justify-start border-r border-neutral-700">
                    <h3 className="text-xs uppercase tracking-[0.15em] text-black/50">
                        Componentes UI
                    </h3>

                    <div className="mt-8 w-full h-[260px] relative rounded-md overflow-hidden bg-white">
                        <Image
                            src="/componentes_app_push.png"
                            alt="Componentes UI"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>



            </div>
        </div>
    )
}
