export function Statement({ label, text }: { label?: string; text: string }) {
  return (
    <div className="section-y page-x">
      {label && <p className="label text-fg-tertiary mb-6">{label}</p>}
      <p className="text-h2 max-w-media-l">{text}</p>
    </div>
  )
}
