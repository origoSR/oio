export type ProjectId =
  | 'push'
  | 'catalonia'
  | 'rank'
  | 'talengo'
  | 'bk'
  | 'rbi'
  | 'santalucia'

/**
 * Maps projectId to clean URL routes
 */
export function getProjectRoute(projectId: string): string {
  const routeMap: Record<string, string> = {
    push: '/push',
    catalonia: '/catalonia',
    rank: '/rank-me-higher',
    talengo: '/talengo',
    bk: '/burger-king',
    rbi: '/rbi',
    santalucia: '/santalucia',
  }
  return routeMap[projectId] || '/'
}
