export type WorkCardVariant = 'wide' | 'narrow' | 'full'

/**
 * Variante (y ancho) de cada Site/WorkCard en una rejilla: filas de 2 con ancho
 * alterno [8,4], [4,8], [8,4]… Si `total` es impar, la ultima tarjeta no tiene pareja
 * y ocupa las 12 columnas ('full').
 * `i` es la posicion en la lista (0-based). Usado en /proyectos y en "Proyectos destacados" de la home.
 */
export function workCardVariant(i: number, total: number): WorkCardVariant {
  if (total % 2 === 1 && i === total - 1) return 'full'

  const pairIndex = Math.floor(i / 2)
  const firstInPair = i % 2 === 0
  const pairIsEven = pairIndex % 2 === 0
  const wide = pairIsEven ? firstInPair : !firstInPair
  return wide ? 'wide' : 'narrow'
}

export const workCardColSpan = (variant: WorkCardVariant) =>
  variant === 'full' ? 'lg:col-span-12' : variant === 'wide' ? 'lg:col-span-8' : 'lg:col-span-4'

/**
 * Rango de columnas que ocupa la tarjeta en la rejilla de 12, para la anotación
 * "col 1–8" de la capa de construcción (recurso de marca).
 */
export function workCardColLabel(i: number, total: number): string {
  if (total % 2 === 1 && i === total - 1) return 'col 1–12'

  const pairIndex = Math.floor(i / 2)
  const firstInPair = i % 2 === 0
  const pairIsEven = pairIndex % 2 === 0
  const wide = pairIsEven ? firstInPair : !firstInPair

  if (wide) return firstInPair ? 'col 1–8' : 'col 5–12'
  return firstInPair ? 'col 1–4' : 'col 9–12'
}
