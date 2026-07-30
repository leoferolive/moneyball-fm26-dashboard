import type { PositionKey } from './position.ts'

export interface WeightedMetric {
  metricKey: string
  weight: number
}

export interface ScoringProfile {
  id: string
  name: string
  positionKey: PositionKey
  weights: WeightedMetric[]
  isBuiltIn: boolean
  createdAt: number
  updatedAt: number
}
