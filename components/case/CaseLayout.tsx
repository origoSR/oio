import type { ReactNode } from 'react'
import type { ProjectKey } from '@/content/types'

export function CaseLayout({ projectKey, children }: { projectKey: ProjectKey; children: ReactNode }) {
  return <main data-project={projectKey}>{children}</main>
}
