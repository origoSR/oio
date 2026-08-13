import { LayoutContainer } from '@/components/ui/layout-container'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="w-full bg-[#111111] text-white">
      <LayoutContainer className="py-16 md:py-24">

        {/* CTA principal */}
        <p className="font-manrope font-bold leading-[1.0] text-[40px] md:text-[64px] text-white mb-10 md:mb-14">
          ¿Hablamos?
        </p>

        {/* Links de contacto */}
        <div className="flex flex-col gap-3 mb-14 md:mb-20">
          <a
            href="mailto:rodrigo@oi0.es"
            className="font-manrope text-[18px] text-white/70 hover:text-white transition-colors duration-150"
          >
            rodrigo@oi0.es
          </a>
          <a
            href="tel:+34669570260"
            className="font-manrope text-[18px] text-white/70 hover:text-white transition-colors duration-150"
          >
            +34 669 57 02 60
          </a>
          <a
            href="https://linkedin.com/in/rodrigosanchezromero"
            target="_blank"
            rel="noopener noreferrer"
            className="font-manrope text-[18px] text-white/70 hover:text-white transition-colors duration-150"
          >
            linkedin.com/in/rodrigosanchezromero
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs uppercase tracking-[0.15em] text-white/30 font-manrope">
          © {year} Rodrigo Sánchez — oio
        </p>

      </LayoutContainer>
    </footer>
  )
}
