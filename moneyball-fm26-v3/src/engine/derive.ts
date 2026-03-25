/**
 * Generic derivation engine.
 * Takes a PositionConfig and a RawPlayer row, runs each MetricDefinition.formula()
 * against the row, and produces a DerivedPlayer.
 */

import type { RawPlayer, DerivedPlayer } from '@/types/player.ts'
import type { PositionConfig, FormulaContext } from '@/config/positions/types.ts'
import { pf, rnd, sDiv, pct, clamp } from './numbers.ts'

function createFormulaContext(raw: RawPlayer, _config: PositionConfig): FormulaContext {
  // Calculate games/90 from minutes — different positions store this differently
  const minutes = pf(raw['Minutos'] || raw['Minutos Jogados'] || raw['CW'] || '0')
  const j90 = minutes / 90

  return { pf, rnd, sDiv, pct, clamp, j90 }
}

/** Derive all metrics for a single raw player row */
export function derivePlayer(raw: RawPlayer, config: PositionConfig): DerivedPlayer | null {
  const ctx = createFormulaContext(raw, config)

  // Must have at least 1 game equivalent
  if (ctx.j90 < 1) return null

  // Extract identity columns
  const identity: Record<string, string> = {}
  for (const [field, rawCol] of Object.entries(config.identityColumns)) {
    identity[field] = raw[rawCol] || ''
  }

  // Compute all derived metrics
  const metrics: Record<string, number> = {}
  for (const metric of config.metrics) {
    try {
      metrics[metric.key] = metric.formula(raw, ctx)
    } catch {
      metrics[metric.key] = 0
    }
  }

  // Extract nota FM (rating) — try common column names
  const notaRaw = raw['Nota média'] || raw['Classificação'] || raw['Nota'] || '0'
  const notaFM = pf(notaRaw)

  return {
    _position: config.key,
    _importedAt: Date.now(),
    Jogador: identity['Jogador'] || raw['Jogador'] || '???',
    Nação: identity['Nação'] || raw['NAC'] || raw['Nação'] || '',
    Clube: identity['Clube'] || raw['Equipe'] || raw['Clube'] || '',
    Idade: pf(identity['Idade'] || raw['Idade'] || '0'),
    Salário: identity['Salário'] || raw['Salário'] || '',
    Valor: identity['Valor'] || raw['Valor'] || raw['Valor Estimado'] || raw['Valor estimado'] || '',
    NotaFM: notaFM,
    Jogos90: ctx.j90,
    ...metrics,
  }
}

/** Derive all players from raw data */
export function deriveAll(rawData: RawPlayer[], config: PositionConfig): DerivedPlayer[] {
  return rawData
    .map((raw) => derivePlayer(raw, config))
    .filter((p): p is DerivedPlayer => p !== null)
}
