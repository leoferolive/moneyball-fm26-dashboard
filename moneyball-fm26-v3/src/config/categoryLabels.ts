import type { MetricCategory } from './positions/types.ts'

export const CATEGORY_LABELS: Record<MetricCategory, string> = {
  general: 'Geral',
  attacking: 'Ataque',
  defending: 'Defesa',
  passing: 'Passes',
  pressing: 'Pressão',
  aerial: 'Aéreo',
  physical: 'Físico',
  creation: 'Criação',
  shooting: 'Finalização',
  goalkeeping: 'Goleiro',
  discipline: 'Disciplina',
  setpiece: 'Bola Parada',
}
