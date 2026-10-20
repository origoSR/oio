import type { Faq } from '@/content/services'

/**
 * Site/FaqItem. <details>/<summary> con "+"/"−"; la respuesta está siempre en
 * el HTML (no se monta al abrir). La primera pregunta, abierta por defecto.
 */
export function FaqItem({ faq, defaultOpen }: { faq: Faq; defaultOpen?: boolean }) {
  return (
    <details open={defaultOpen} className="group border-t border-line-strong py-4">
      <summary className="flex items-center justify-between gap-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        <span className="text-lead">{faq.q}</span>
        <span aria-hidden="true" className="shrink-0 text-h4 leading-none">
          <span className="group-open:hidden">+</span>
          <span className="hidden group-open:inline">−</span>
        </span>
      </summary>
      <p className="text-body text-fg-secondary mt-3">{faq.a}</p>
    </details>
  )
}
