/**
 * Design Tokens — centralized design values
 */

export const projectKeys = {
  push: 'push',
  catalonia: 'catalonia',
  rank: 'rank',
  talengo: 'talengo',
  bk: 'bk',
  rbi: 'rbi',
  santalucia: 'santalucia',
} as const

export type ProjectKey = keyof typeof projectKeys
