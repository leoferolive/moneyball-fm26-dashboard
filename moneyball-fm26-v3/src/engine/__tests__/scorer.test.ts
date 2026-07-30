import { describe, expect, it } from 'vitest'
import type { DerivedPlayer } from '@/types/player.ts'
import type { MetricDefinition } from '@/config/positions/types.ts'
import type { ScoringProfile } from '@/types/scoring.ts'
import { computeScore } from '../scorer.ts'

const profile: ScoringProfile = {
  id: 'test',
  name: 'Teste',
  positionKey: 'goleiros',
  weights: [{ metricKey: 'falhas90', weight: 100 }],
  isBuiltIn: false,
  createdAt: 0,
  updatedAt: 0,
}

const metric: MetricDefinition = {
  key: 'falhas90',
  label: 'Falhas/90',
  category: 'discipline',
  formula: () => 0,
  displayInTable: true,
  lowerIsBetter: true,
  format: 'number',
}

function player(falhas90: number): DerivedPlayer {
  return {
    _position: 'goleiros',
    _importedAt: 0,
    Jogador: 'Teste',
    Idade: 25,
    NotaFM: 7,
    Jogos90: 10,
    falhas90,
  }
}

describe('computeScore', () => {
  it('inverte a normalização de métricas em que menor é melhor', () => {
    const stats = { falhas90: { min: 0, max: 2, mean: 1, median: 1, stdDev: 1, count: 2 } }

    expect(computeScore(player(0), profile, stats, [metric])).toBe(100)
    expect(computeScore(player(2), profile, stats, [metric])).toBe(0)
  })
})
