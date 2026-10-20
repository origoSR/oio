// Textos de las anotaciones de la capa de construcción (components/brand/Construction.tsx).
// No se escriben en los componentes: cada sitio que la usa lee de aquí. Las anotaciones
// calculadas (medidas y peso de una imagen en Site/WorkCard) se generan en el propio
// componente, porque dependen del archivo, no de un texto fijo.

export type BrandNote = { text: string; kind: 'guide' | 'component' }

export const brandNotes = {
  howWeWork: {
    title: { text: 'h2 · retícula', kind: 'guide' } satisfies BrandNote,
  },
  agencias: {
    h1: { text: 'h1 · 72 / 1.05 · Manrope 400 · máx. 1088', kind: 'guide' } satisfies BrandNote,
    button: { text: '◇ Site/Button · Principal', kind: 'component' } satisfies BrandNote,
    covers: { text: '◇ Site/Step × 4', kind: 'component' } satisfies BrandNote,
    rules: { text: '◇ Site/Point × 6', kind: 'component' } satisfies BrandNote,
  },
}
