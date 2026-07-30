import { describe, expect, it } from 'vitest'
import { positionConfigs } from '../index.ts'
import type { PositionKey } from '@/types/position.ts'

const EXPECTED_COVERAGE: Record<
  PositionKey,
  { rawColumns: number; rowMetrics: number; collectionMetrics: number }
> = {
  goleiros: { rawColumns: 37, rowMetrics: 85, collectionMetrics: 3 },
  zagueiros: { rawColumns: 48, rowMetrics: 128, collectionMetrics: 1 },
  laterais: { rawColumns: 51, rowMetrics: 101, collectionMetrics: 1 },
  volantes: { rawColumns: 47, rowMetrics: 92, collectionMetrics: 3 },
  b2b: { rawColumns: 52, rowMetrics: 98, collectionMetrics: 1 },
  armadores: { rawColumns: 42, rowMetrics: 99, collectionMetrics: 1 },
  avancados: { rawColumns: 50, rowMetrics: 130, collectionMetrics: 1 },
  time: { rawColumns: 38, rowMetrics: 60, collectionMetrics: 0 },
  esforco: { rawColumns: 21, rowMetrics: 17, collectionMetrics: 1 },
  overall: { rawColumns: 57, rowMetrics: 156, collectionMetrics: 1 },
}

describe('cobertura completa das abas do workbook', () => {
  it.each(Object.entries(EXPECTED_COVERAGE))(
    'mantém a cobertura auditada de %s',
    (position, expected) => {
      const config = positionConfigs[position as PositionKey]

      expect(config.rawColumns).toHaveLength(expected.rawColumns)
      expect(config.metrics).toHaveLength(expected.rowMetrics)
      expect(config.collectionMetrics ?? []).toHaveLength(expected.collectionMetrics)
      expect(new Set(config.rawColumns).size).toBe(config.rawColumns.length)
      expect(new Set(config.metrics.map((metric) => metric.key)).size).toBe(
        config.metrics.length,
      )
    },
  )
})
