interface OtherRowProps {
  title: string
  description: string
  meta: string
}

export function OtherRow({ title, description, meta }: OtherRowProps) {
  return (
    <div className="border-t border-line-subtle py-4 flex items-center justify-between gap-4">
      <div>
        <p className="text-body font-semibold">{title}</p>
        <p className="text-body text-fg-secondary">{description}</p>
      </div>
      <p className="label text-fg-tertiary whitespace-nowrap">{meta}</p>
    </div>
  )
}
