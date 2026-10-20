// Textos de las anotaciones de la capa de construcción (components/brand/Construction.tsx).
// No se escriben en los componentes: cada sitio que la usa lee de aquí. Las anotaciones
// calculadas (medidas y peso de una imagen en Site/WorkCard) se generan en el propio
// componente, porque dependen del archivo, no de un texto fijo.
// Medidas de Figma (página «Marca · exploración», sección 6 · Propuesta): exactas, sin
// redondear ni reinterpretar.

export const brandNotes = {
  howWeWork: {
    paddingPill: 'section-y 128',
    h2: 'h2 · 48 / 1.1 · Manrope 400',
    // "Cómo trabajo" tiene 3 pasos en la home (4 col cada uno) y 4 en /servicios (3 col cada uno).
    steps: (count: number) => `Site/Step × ${count} · ${12 / count} col · gap 32`,
  },
  agencias: {
    h1: 'h1 · 72 / 1.05 · Manrope 400 · máx. 1088',
    button: '◇ Site/Button · Principal',
    covers: '◇ Site/Step × 4',
    rules: '◇ Site/Point × 6',
  },
}
