import { NewProjectLayout } from '@/components/project-detail/layouts/NewProjectLayout'
import { BurgerKingLayout } from '@/components/project-detail/layouts/BurgerKingLayout'

export default function BurgerKingPage() {
  return (
    <NewProjectLayout
      title="Burger King / Popeyes"
      backgroundColor="#E7863F"
      textColor="#FFFFFF"
      hoverImage="/card_burger.png"
      description="Rediseño completo del proceso de compra de la app y de los kioskos para optimizar velocidad, consistencia visual y experiencia del usuario."
      location="Garaje de Ideas, Madrid"
      role="UX/UI Design"
      tools="Figma, Photoshop, VS Code"
      year="2024"
      isConfidential={true}
    >
      <BurgerKingLayout backgroundColor="#E7863F" />
    </NewProjectLayout>
  )
}
