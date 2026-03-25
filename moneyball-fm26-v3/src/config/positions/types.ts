import type { PositionKey } from '@/types/position.ts'
import type { RawPlayer } from '@/types/player.ts'

export type MetricCategory =
  | 'general'
  | 'attacking'
  | 'defending'
  | 'passing'
  | 'pressing'
  | 'aerial'
  | 'physical'
  | 'creation'
  | 'shooting'
  | 'goalkeeping'
  | 'discipline'
  | 'setpiece'

export interface FormulaContext {
  pf: (val: string | undefined) => number
  rnd: (val: number, decimals?: number) => number
  sDiv: (a: number, b: number) => number
  pct: (a: number, b: number) => number
  clamp: (val: number, min: number, max: number) => number
  j90: number
}

export interface MetricDefinition {
  key: string
  label: string
  category: MetricCategory
  formula: (raw: RawPlayer, ctx: FormulaContext) => number
  displayInTable: boolean
  lowerIsBetter: boolean
  format: 'number' | 'percentage' | 'integer'
  decimals?: number
  description?: string
}

export interface PositionConfig {
  key: PositionKey
  emoji: string
  name: string
  rawColumns: string[]
  metrics: MetricDefinition[]
  defaultTableColumns: string[]
  identityColumns: Record<string, string>
}
