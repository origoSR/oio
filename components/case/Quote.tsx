export function Quote({ text, author }: { text: string; author: string }) {
  return (
    <div className="section-y page-x">
      <blockquote className="text-h2 max-w-media-l">{text}</blockquote>
      <p className="label text-fg-secondary mt-4">{author}</p>
    </div>
  )
}
