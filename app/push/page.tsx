import { NewProjectLayout } from '@/components/project-detail/layouts/NewProjectLayout'
import { PushLayout } from '@/components/project-detail/layouts/PushLayout'

export default function PushPage() {
  return (
    <NewProjectLayout
      title="Push"
      backgroundColor="#865DE5"
      textColor="#FAFAFA"
      hoverImage="/bluesky.png"
      description="Push es una plataforma XR diseñada para ayudar a las personas a trabajar sus fobias mediante experiencias inmersivas de exposición gradual."
      location="Málaga"
      role="Product Design"
      tools="Figma, v0, Cursor, Lovable, Unity, SEMRush"
      year="2024 - Actualidad"
    >
      <PushLayout />
    </NewProjectLayout>
  )
}
