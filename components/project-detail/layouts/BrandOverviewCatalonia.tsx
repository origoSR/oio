'use client'

import Image from 'next/image'

export function BrandOverviewCatalonia() {
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
                    <h3 className="text-xs uppercase tracking-[0.15em] text-black/50">
                        Logo
                    </h3>

                    <p className="mt-4 text-[15px] leading-relaxed text-neutral-800">
                        Catalonia Hotels mantiene su identidad principal, adaptada
                        a la nueva experiencia digital.
                    </p>

                    <Image
                        src="/logo_catalonia_landing.png"
                        alt="Catalonia logo"
                        width={320}
                        height={140}
                        className="mt-10 w-[260px] max-w-full object-contain"
                    />
                </div>

                {/* COLORS */}
                <div className="px-4 py-4 pr-[20px] flex flex-col justify-start">
                    <h3 className="text-xs uppercase tracking-[0.15em] text-black/50">Color</h3>
                    <div className="mt-8 grid grid-cols-3 gap-6">
                        <div className="w-16 h-16 rounded-full bg-[#F6D57A]" />
                        <div className="w-16 h-16 rounded-full bg-[#E8C35A]" />
                        <div className="w-16 h-16 rounded-full bg-[#FEF9E8]" />
                        <div className="w-16 h-16 rounded-full bg-[#2C3E50]" />
                        <div className="w-16 h-16 rounded-full bg-[#5D6D7E]" />
                        <div className="w-16 h-16 rounded-full bg-[#EAEDED]" />
                    </div>
                </div>

                {/* TYPOGRAPHY */}
                <div className="px-4 py-4 pr-[0px] flex flex-col justify-start">
                    <h3 className="text-xs uppercase tracking-[0.15em] text-black/50">
                        Typography & tone of voice
                    </h3>
                    <p className="mt-4 text-[15px] leading-relaxed text-neutral-800 max-w-[90%]">
                        Uso principal de Inter.
                    </p>
                    <span className="mt-10 text-[80px] leading-none font-serif text-neutral-900">
                        Aa
                    </span>
                </div>
            </div>

            {/* LÍNEA ENTRE FILA 1 Y FILA 2 (ocupa todo el ancho, sin margen lateral) */}
            <div className="h-px bg-[#1A1A1A]" />

            {/* FILA 2: Photostyle / Componentes UI / Quick links */}
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
                            src="/catalonia_foto_tabla.png"
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
                            src="/catalonia_componentes.png"
                            alt="Componentes UI"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>

                {/* VERSIÓN MÓVIL */}
                <div className="px-4 py-4 flex flex-col justify-start">
                    <h3 className="text-xs uppercase tracking-[0.15em] text-black/50">
                        Versión móvil
                    </h3>

                    <div className="mt-8 w-full h-[260px] relative rounded-md overflow-hidden bg-white">
                        <Image
                            src="/mockup_catalonia.png"   // tu mockup
                            alt="Versión móvil"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}

