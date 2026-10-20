import fs from 'node:fs'
import path from 'node:path'

/** Peso de un archivo de /public, calculado en build (fs.statSync, solo en servidor). */
export function publicFileSize(src: string): string | null {
  try {
    const abs = path.join(process.cwd(), 'public', src.replace(/^\//, ''))
    const kb = fs.statSync(abs).size / 1024
    return `${kb.toFixed(0)} KB`
  } catch {
    return null
  }
}
