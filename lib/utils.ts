import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

// tailwind-merge no conoce los tokens de texto propios del tema (globals.css): sin esta
// configuración, confunde el tamaño de fuente (text-body, text-h1…) con el color de texto
// (text-fg, text-fg-secondary…), porque ambos empiezan por "text-", y descarta el tamaño
// al mezclarlo con un color en la misma llamada a cn() — p. ej. cn('text-body', 'text-fg').
const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': ['text-label', 'text-small', 'text-body', 'text-lead', 'text-h4', 'text-h3', 'text-h2', 'text-h1', 'text-display'],
      'text-color': [
        'text-fg',
        'text-fg-secondary',
        'text-fg-tertiary',
        'text-fg-on-inverse',
        'text-fg-on-inverse-secondary',
        'text-on-project',
        'text-on-project-secondary',
        'text-project',
        'text-white',
        'text-canvas',
        'text-surface',
        'text-subtle',
        'text-inverse',
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs))
}
