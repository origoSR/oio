/** Site/Step. Bloque con línea superior (proceso, "Qué cubro", "Formatos"…). `n` es opcional: el proceso lo numera, los otros bloques no. */
export function Step({ n, title, text }: { n?: string; title: string; text: string }) {
  return (
    <div className="border-t border-line-strong pt-4 flex flex-col gap-2">
      {n && <p className="label text-fg-tertiary">{n}</p>}
      <h3 className="text-h4">{title}</h3>
      <p className="text-body text-fg-secondary">{text}</p>
    </div>
  )
}
