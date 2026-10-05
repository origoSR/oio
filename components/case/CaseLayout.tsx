import type { ReactNode } from 'react'
import type { ProjectKey } from '@/content/types'

export function CaseLayout({ projectKey, children }: { projectKey: ProjectKey; children: ReactNode }) {
  // relative: ancla de posicion para la ficha en modo absolute (CaseHeader), sin acortar
  // el contenedor de la barra sticky (abarca toda la pagina, no solo la cabecera).
  return (
    <main data-project={projectKey} className="relative">
      {children}
    </main>
  )
}
