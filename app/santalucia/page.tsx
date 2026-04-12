'use client'

import { NewProjectLayout } from '@/components/project-detail/layouts/NewProjectLayout'

export default function SantaluciaPage() {
  return (
    <NewProjectLayout
      title="Santalucía Impulsa"
      backgroundColor="#F29E39"
      textColor="#111111"
      hoverImage="/card_santalucia.png"
      description="App accesible para personas mayores, diseñada para simplificar tareas diarias y mejorar la autonomía del usuario."
      location="Madrid"
      role="UX/UI Design"
      tools="Figma"
      year="2023"
    />
  )
}
