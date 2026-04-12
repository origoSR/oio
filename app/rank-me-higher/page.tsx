'use client'

import { NewProjectLayout } from '@/components/project-detail/layouts/NewProjectLayout'
import { RankLayout } from '@/components/project-detail/layouts/RankLayout'

export default function RankMeHigherPage() {
  return (
    <NewProjectLayout
      title="Rank Me Higher"
      backgroundColor="#F1965B"
      textColor="#FFFFFF"
      hoverImage="/astronauta.png"
      description="Nueva identidad enfocada en el diseño y arquitectura web para una agencia de SEO orientada a claridad, estructura y resultados medibles."
      location="Londres"
      role="UX/UI Design, SEO, GEO"
      tools="Figma, Wordpress, Shopify, SEMRush"
      year="2022 - Actualidad"
    >
      <RankLayout />
    </NewProjectLayout>
  )
}
