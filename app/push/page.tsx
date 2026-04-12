'use client'

import { NewProjectLayout } from '@/components/project-detail/layouts/NewProjectLayout'
import { PushLayout } from '@/components/project-detail/layouts/PushLayout'
import {
  getFrame7BackgroundImage,
  getConfidentialSticker,
  shouldShowSticker,
} from '@/lib/projects'

export default function PushPage() {
  const projectId = 'push'
  const title = 'Push'
  const description = 'Push es una plataforma XR diseñada para ayudar a las personas a trabajar sus fobias mediante experiencias inmersivas de exposición gradual.'
  const role = 'Product Design'
  const year = '2024 - Actualidad'
  const country = 'Málaga'
  const tools = ['Figma', 'v0', 'Cursor', 'Lovable', 'Unity', 'SEMRush']
  const website = 'https://virtualpush.es'
  const backgroundColor = '#865DE5'
  const isConfidential = false

  const showSticker = shouldShowSticker(projectId, isConfidential)
  const sticker = showSticker ? getConfidentialSticker(projectId) : null

  return (
    <NewProjectLayout
      title={title}
      backgroundColor={backgroundColor}
      textColor="#FAFAFA"
      hoverImage="/bluesky.png"
      description={description}
      location={country}
      role={role}
      tools={tools.join(', ')}
      year={year}
    >
      <PushLayout
        projectId={projectId}
        title={title}
        description={description}
        role={role}
        year={year}
        country={country}
        tools={tools}
        website={website}
        backgroundColor={backgroundColor}
        frame7BackgroundImage={getFrame7BackgroundImage(projectId)}
        sticker={sticker}
        animationClasses=""
      />
    </NewProjectLayout>
  )
}

