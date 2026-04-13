import { NewProjectLayout } from '@/components/project-detail/layouts/NewProjectLayout'
import { RbiLayout } from '@/components/project-detail/layouts/RbiLayout'

export default function RbiPage() {
  return (
    <NewProjectLayout
      title="RBI"
      backgroundColor="#AE2825"
      textColor="#FFFFFF"
      hoverImage="/card_rbi.png"
      description="Rediseño funcional y visual de la app interna de empleados orientado a mejorar accesos, flujos y usabilidad general."
      location="Garaje de Ideas, Madrid"
      role="UX/UI Design"
      tools="Figma, Photoshop"
      year="2024"
      isConfidential={true}
    >
      <RbiLayout backgroundColor="#AE2825" />
    </NewProjectLayout>
  )
}
