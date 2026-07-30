/**
 * Generic derivation engine.
 * Takes a PositionConfig and a RawPlayer row, runs each MetricDefinition.formula()
 * against the row, and produces a DerivedPlayer.
 */

import type { RawPlayer, DerivedPlayer } from '@/types/player.ts'
import type { PositionConfig, FormulaContext } from '@/config/positions/types.ts'
import { pf, rnd, sDiv, pct, clamp } from './numbers.ts'
import { normalizeWorkbookRow } from './workbookCompatibility.ts'

function createFormulaContext(raw: RawPlayer): FormulaContext {
  // Calculate games/90 from minutes — different positions store this differently
  const minutes = pf(raw['Minutos'] || raw['Minutos Jogados'] || raw['CW'] || '0')
  const j90 = minutes / 90

  return { pf, rnd, sDiv, pct, clamp, j90 }
}

/** Derive all metrics for a single raw player row */
export function derivePlayer(raw: RawPlayer, config: PositionConfig): DerivedPlayer | null {
  if (!Object.values(raw).some((value) => value.trim() !== '')) return null

  const adjustedRaw = normalizeWorkbookRow(raw, config.key)
  const ctx = createFormulaContext(adjustedRaw)

  // Extract identity columns
  const identity: Record<string, string> = {}
  for (const [field, rawCol] of Object.entries(config.identityColumns)) {
    identity[field] = adjustedRaw[rawCol] || ''
  }

  // Compute all derived metrics
  const metrics: Record<string, number> = {}
  for (const metric of config.metrics) {
    try {
      metrics[metric.key] = metric.formula(adjustedRaw, ctx)
    } catch {
      metrics[metric.key] = 0
    }
  }

  // Extract nota FM (rating) — try common column names
  const notaRaw = adjustedRaw['Nota média']
    || adjustedRaw['Classificação']
    || adjustedRaw['Nota']
    || '0'
  let notaFM = pf(notaRaw)
  if (notaFM === 0) {
    const ratingMetric = config.metrics.find((metric) =>
      metric.label.localeCompare('Nota Média', 'pt-BR', { sensitivity: 'base' }) === 0)
    if (ratingMetric) notaFM = metrics[ratingMetric.key] ?? 0
  }

  return {
    _position: config.key,
    _importedAt: Date.now(),
    ...identity,
    Jogador: identity['Jogador'] || adjustedRaw['Jogador'] || '???',
    Nação: identity['Nação'] || adjustedRaw['NAC'] || adjustedRaw['Nação'] || '',
    Clube: identity['Clube'] || adjustedRaw['Equipe'] || adjustedRaw['Clube'] || '',
    Idade: pf(identity['Idade'] || adjustedRaw['Idade'] || '0'),
    Salário: identity['Salário'] || adjustedRaw['Salário'] || '',
    Valor: identity['Valor']
      || adjustedRaw['Valor']
      || adjustedRaw['Valor Estimado']
      || adjustedRaw['Valor estimado']
      || '',
    'Pé Preferido': adjustedRaw['Pé Preferido'] || adjustedRaw['Pé preferido'] || '',
    Altura: adjustedRaw['Altura'] || '',
    Contrato: adjustedRaw['Expira'] || adjustedRaw['Data final de contrato'] || '',
    NotaFM: notaFM,
    Jogos90: ctx.j90,
    ...metrics,
  }
}

/** Derive all players from raw data */
export function deriveAll(rawData: RawPlayer[], config: PositionConfig): DerivedPlayer[] {
  const players = rawData
    .map((raw) => derivePlayer(raw, config))
    .filter((p): p is DerivedPlayer => p !== null)

  for (const metric of config.collectionMetrics ?? []) {
    if (!metric.collectionFormula) continue
    for (const player of players) {
      player[metric.key] = metric.collectionFormula(player, players)
    }
  }

  return players
}
