import { cn } from '@/lib/utils'
import { serviceLabels } from '@/content/services'
import type { Package } from '@/content/services'

/**
 * Site/PackageCard. Sin precio. El plazo (`time`) solo se pinta si existe.
 * `featured`: borde line-strong y etiqueta "Recomendado". En escritorio, las
 * tarjetas de una fila tienen la misma altura (h-full + grid items-stretch).
 */
export function PackageCard({ pkg }: { pkg: Package }) {
  return (
    <div className={cn('flex flex-col gap-6 p-6 rounded-sm border h-full', pkg.featured ? 'border-line-strong' : 'border-line')}>
      <div className="flex flex-col gap-3">
        {pkg.featured && <p className="label text-fg-tertiary">{serviceLabels.featured}</p>}
        <h4 className="text-h4">{pkg.title}</h4>
        <p className="text-body text-fg-secondary">{pkg.text}</p>
      </div>

      <div className="border-t border-line-subtle pt-4 flex flex-col gap-3">
        <p className="label text-fg-tertiary">Incluye</p>
        <ul className="flex flex-col gap-2">
          {pkg.includes.map((item) => (
            <li key={item} className="text-body text-fg-secondary flex gap-2">
              <span aria-hidden="true">+</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {pkg.time && <p className="label text-fg-tertiary mt-auto">{pkg.time}</p>}
    </div>
  )
}
