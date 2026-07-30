import { describe, expect, it } from 'vitest'
import { allPresets } from '../index.ts'
import { positionConfigs } from '@/config/positions/index.ts'

describe('presets de score', () => {
  it('referenciam somente métricas existentes na posição correspondente', () => {
    for (const preset of allPresets) {
      const metricKeys = new Set(
        positionConfigs[preset.positionKey].metrics.map((metric) => metric.key),
      )

      for (const weight of preset.weights) {
        expect(
          metricKeys.has(weight.metricKey),
          `${preset.id}: métrica inexistente ${weight.metricKey}`,
        ).toBe(true)
      }
    }
  })
})
