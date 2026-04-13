import { NewProjectLayout } from '@/components/project-detail/layouts/NewProjectLayout'
import { CataloniaLayout } from '@/components/project-detail/layouts/CataloniaLayout'

export default function CataloniaPage() {
  return (
    <NewProjectLayout
      title="Catalonia Hotels"
      backgroundColor="#F6D57A"
      textColor="#111111"
      hoverImage="/card_catalonia.png"
      description="Rediseño integral de la web de Catalonia Hotels para mejorar navegación, diseño, claridad y conversión."
      location="Madrid"
      role="UX/UI Design, Design Systems"
      tools="Figma, SEMRush"
      year="2023"
    >
      <CataloniaLayout />
    </NewProjectLayout>
  )
}
