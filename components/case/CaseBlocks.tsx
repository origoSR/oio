import { FadeInSection } from '@/components/shared/FadeInSection'
import { Cover } from '@/components/case/Cover'
import { Statement } from '@/components/case/Statement'
import { Figures } from '@/components/case/Figures'
import { Gallery } from '@/components/case/Gallery'
import { Decision } from '@/components/case/Decision'
import { Quote } from '@/components/case/Quote'
import { Outcome } from '@/components/case/Outcome'
import type { Block } from '@/content/types'

export function CaseBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        if (block.type === 'cover') {
          return <Cover key={i} image={block.image} />
        }

        return (
          <FadeInSection key={i}>
            {block.type === 'statement' && <Statement label={block.label} text={block.text} />}
            {block.type === 'figures' && <Figures label={block.label} items={block.items} />}
            {block.type === 'gallery' && <Gallery items={block.items} />}
            {block.type === 'decision' && (
              <Decision
                order={block.order}
                number={block.number}
                title={block.title}
                text={block.text}
                image={block.image}
                caption={block.caption}
              />
            )}
            {block.type === 'quote' && <Quote text={block.text} author={block.author} />}
            {block.type === 'outcome' && (
              <Outcome label={block.label} title={block.title} text={block.text} items={block.items} />
            )}
          </FadeInSection>
        )
      })}
    </>
  )
}
