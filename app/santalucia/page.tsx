import { NewProjectLayout } from '@/components/project-detail/layouts/NewProjectLayout'
import { SantaluciaLayout } from '@/components/project-detail/layouts/SantaluciaLayout'

export default function SantaluciaPage() {
  return (
    <NewProjectLayout
      title="Santalucía Impulsa"
      backgroundColor="#F29E39"
      textColor="#111111"
      hoverImage="/santalucia-portada.png"
      description="App accesible para personas mayores, diseñada para simplificar tareas diarias y mejorar la autonomía del usuario."
      location="Madrid"
      role="UX/UI Design"
      tools="Figma"
      year="2023"
    >
      <SantaluciaLayout backgroundColor="#F29E39" />
    </NewProjectLayout>
  )
}
