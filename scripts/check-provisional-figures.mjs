// Aviso en build de las cifras con `provisional: true` en content/projects.ts.
// No se ocultan ni se marcan en la web: publicarlas o no es decision de Rodrigo.
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const file = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'content', 'projects.ts')
const text = readFileSync(file, 'utf8')

const slugRe = /slug:\s*'([^']+)'/g
const figureRe = /\{\s*value:\s*'([^']+)',\s*label:\s*'([^']+)'(,\s*provisional:\s*true)?\s*\}/g

const slugPositions = [...text.matchAll(slugRe)].map((m) => ({ slug: m[1], index: m.index }))

function slugAt(index) {
  let current = '?'
  for (const { slug, index: slugIndex } of slugPositions) {
    if (slugIndex <= index) current = slug
    else break
  }
  return current
}

const provisional = []
for (const m of text.matchAll(figureRe)) {
  if (!m[3]) continue
  provisional.push({ proyecto: slugAt(m.index), valor: m[1], etiqueta: m[2] })
}

if (provisional.length > 0) {
  console.log('\n⚠️  Cifras provisionales (sin confirmar, no publicar sin revisar):')
  for (const { proyecto, valor, etiqueta } of provisional) {
    console.log(`   - [${proyecto}] ${valor} — ${etiqueta}`)
  }
  console.log(`   Total: ${provisional.length}\n`)
}
