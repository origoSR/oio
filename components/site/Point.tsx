/** Site/Point. Punto de una lista ("Es para ti si…", "Cómo colaboro"…). */
export function Point({ text }: { text: string }) {
  return <li className="border-t border-line-strong py-4 text-body text-fg-secondary">{text}</li>
}
