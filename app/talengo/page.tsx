'use client'

import { NewProjectLayout } from '@/components/project-detail/layouts/NewProjectLayout'
import { TalengoLayout } from '@/components/project-detail/layouts/TalengoLayout'

export default function TalengoPage() {
  return (
    <NewProjectLayout
      title="Talengo"
      backgroundColor="#84BDC9"
      textColor="#111111"
      hoverImage="/card_talengo.png"
      description="Plataforma de RRHH impulsada por IA diseñada para mejorar la gestión del talento y la experiencia del usuario interno."
      location="Madrid"
      role="Product Design, Design Systems"
      tools="Figma, Lovable, Cursor, Power BI"
      year="2024"
      isConfidential={true}
    >
      <TalengoLayout backgroundColor="#84BDC9" />
    </NewProjectLayout>
  )
}
