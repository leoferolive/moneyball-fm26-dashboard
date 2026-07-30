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

export const POSITION_META: Record<PositionKey, { emoji: string; name: string; code: string }> = {
  goleiros: { emoji: '🧤', name: 'Goleiros', code: 'GK' },
  zagueiros: { emoji: '🧱', name: 'Zagueiros', code: 'CB' },
  laterais: { emoji: '🛡️', name: 'Laterais', code: 'FB' },
  volantes: { emoji: '🛡️', name: 'Volantes', code: 'DM' },
  b2b: { emoji: '⚙️', name: 'Box-to-Box', code: 'B2B' },
  armadores: { emoji: '⚙️', name: 'Armadores', code: 'AMC' },
  avancados: { emoji: '🎯', name: 'Avançados', code: 'ST' },
  esforco: { emoji: '💪', name: 'Esforço', code: 'EFF' },
  time: { emoji: '📊', name: 'Time', code: 'TEAM' },
  overall: { emoji: '🌎', name: 'Overall', code: 'OVR' },
}
