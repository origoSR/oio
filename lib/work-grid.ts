/**
 * Ancho alterno de las filas de 2 de Site/WorkCard: [8,4], [4,8], [8,4]…
 * `i` es la posicion en la lista (0-based). Usado en /proyectos y en "Proyectos destacados" de la home.
 */
export function workCardWidth(i: number): 8 | 4 {
  const pairIndex = Math.floor(i / 2)
  const firstInPair = i % 2 === 0
  const pairIsEven = pairIndex % 2 === 0
  if (pairIsEven) return firstInPair ? 8 : 4
  return firstInPair ? 4 : 8
}

export const workCardColSpan = (width: 8 | 4) => (width === 8 ? 'lg:col-span-8' : 'lg:col-span-4')
