export type PositionKey =
  | 'goleiros'
  | 'zagueiros'
  | 'laterais'
  | 'volantes'
  | 'b2b'
  | 'armadores'
  | 'avancados'
  | 'time'
  | 'esforco'
  | 'overall'

export const POSITION_ORDER: PositionKey[] = [
  'goleiros',
  'zagueiros',
  'laterais',
  'volantes',
  'b2b',
  'armadores',
  'avancados',
  'esforco',
  'time',
  'overall',
]

export const POSITION_META: Record<PositionKey, { emoji: string; name: string }> = {
  goleiros: { emoji: '🧤', name: 'Goleiros' },
  zagueiros: { emoji: '🧱', name: 'Zagueiros' },
  laterais: { emoji: '🛡️', name: 'Laterais' },
  volantes: { emoji: '🛡️', name: 'Volantes' },
  b2b: { emoji: '⚙️', name: 'Box-To-Box' },
  armadores: { emoji: '⚙️', name: 'Armadores' },
  avancados: { emoji: '🎯', name: 'Avançados' },
  esforco: { emoji: '💪', name: 'Placar de Esforço' },
  time: { emoji: '📊', name: 'Time Estatísticas' },
  overall: { emoji: '🌎', name: 'Overall Análise' },
}
