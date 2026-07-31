/**
 * Statistical utilities for column-level analysis.
 * Used for heatmap coloring, normalization, and distribution charts.
 */

import type { DerivedPlayer } from '@/types/player.ts'

export interface ColumnStats {
  min: number
  max: number
  mean: number
  median: number
  count: number
}

/** Compute statistics for a single column across all players */
export function computeColumnStats(players: DerivedPlayer[], key: string): ColumnStats {
  const values = players
    .map((p) => (typeof p[key] === 'number' ? (p[key] as number) : null))
    .filter((v): v is number => v !== null && !isNaN(v))

  if (values.length === 0) {
    return { min: 0, max: 0, mean: 0, median: 0, count: 0 }
  }

  const sorted = [...values].sort((a, b) => a - b)
  const sum = values.reduce((acc, v) => acc + v, 0)

  return {
    min: sorted[0],
    max: sorted[sorted.length - 1],
    mean: sum / values.length,
    median:
      sorted.length % 2 === 0
        ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
        : sorted[Math.floor(sorted.length / 2)],
    count: values.length,
  }
}

/** Compute statistics for multiple columns at once */
export function computeAllColumnStats(
  players: DerivedPlayer[],
  keys: string[],
): Record<string, ColumnStats> {
  const result: Record<string, ColumnStats> = {}
  for (const key of keys) {
    result[key] = computeColumnStats(players, key)
  }
  return result
}

/**
 * Posição relativa (0 a 1) de um valor dentro do range da coluna (min..max),
 * já invertida quando `lowerIsBetter`. Base compartilhada pela escala de
 * cores, ícones de tendência e barras de dados.
 */
export function normalizedPosition(
  value: number,
  stats: ColumnStats,
  lowerIsBetter = false,
): number {
  if (stats.max === stats.min) return 0.5
  let normalized = (value - stats.min) / (stats.max - stats.min)
  if (lowerIsBetter) normalized = 1 - normalized
  return Math.min(1, Math.max(0, normalized))
}

// Paleta Okabe-Ito (colorblind-safe): vermelhão, amarelo e azul continuam
// distinguíveis nos tipos mais comuns de daltonismo (deuteranopia/
// protanopia), ao contrário do vermelho-amarelo-verde nativo do Excel, que
// é justamente a combinação mais problemática pra confusão vermelho-verde.
// Usada tanto como fallback quanto pra "traduzir" as escalas reais
// extraídas do .xlsm, preservando a semântica (pior→neutro→melhor) mas
// trocando os tons.
const CB_SAFE_SCALE_3 = ['#D55E00', '#F0E442', '#0072B2']
const CB_SAFE_SCALE_2 = ['#D55E00', '#0072B2']
export const CB_SAFE_DATA_BAR = '#0072B2'

const DEFAULT_SCALE = CB_SAFE_SCALE_3

/**
 * Substitui os tons de uma escala extraída do Excel (que pode vir em
 * vermelho/amarelo/verde ou outras combinações) pela paleta colorblind-safe,
 * preservando a quantidade de stops (2 ou 3) e a ordem pior→melhor.
 */
export function colorblindSafeScale(stopCount: number): string[] {
  return stopCount <= 2 ? CB_SAFE_SCALE_2 : CB_SAFE_SCALE_3
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace('#', '')
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  }
}

function lerp(a: number, b: number, t: number): number {
  return Math.round(a + (b - a) * t)
}

/**
 * Cor interpolada ao longo de N stops hex (2 = mín/máx, 3 = mín/meio/máx,
 * como as escalas de 2 e 3 cores do Excel) para um valor normalizado (0 a
 * 1). Cores literais das regras reais extraídas do .xlsm — ver
 * `EXCEL_CONDITIONAL_FORMATS`.
 */
export function colorScaleColor(colors: string[], normalized: number): string {
  if (colors.length === 1) return colors[0]
  const t = Math.min(1, Math.max(0, normalized))
  const segments = colors.length - 1
  const segment = Math.min(segments - 1, Math.floor(t * segments))
  const localT = t * segments - segment
  const from = hexToRgb(colors[segment])
  const to = hexToRgb(colors[segment + 1])
  const r = lerp(from.r, to.r, localT)
  const g = lerp(from.g, to.g, localT)
  const b = lerp(from.b, to.b, localT)
  return `rgb(${r}, ${g}, ${b})`
}

/** Cor vermelho→amarelo→verde (paleta padrão do Excel) para um valor normalizado (0 a 1). */
export function scaleColor(normalized: number): string {
  return colorScaleColor(DEFAULT_SCALE, normalized)
}

export interface TrendIcon {
  symbol: string
  color: string
}

// Excel varia o número de setas por regra (3/4/5 Arrows); cada largura tem
// seu próprio conjunto de símbolos, do pior pro melhor.
const ICON_GLYPHS: Record<number, string[]> = {
  3: ['↓', '→', '↑'],
  4: ['↓', '↘', '↗', '↑'],
  5: ['↓', '↘', '→', '↗', '↑'],
}

/**
 * Ícone de tendência replicando o conjunto de setas do Excel (3/4/5 Arrows,
 * coloridas ou "Gray"), comparando o jogador aos demais na mesma coluna —
 * não há série temporal nos dados, "tendência" aqui é ranking relativo.
 */
export function excelIcon(
  normalized: number,
  bands: number = 5,
  variant: string = '5Arrows',
  colors: string[] = DEFAULT_SCALE,
): TrendIcon {
  const glyphs = ICON_GLYPHS[bands] ?? ICON_GLYPHS[5]
  const t = Math.min(1, Math.max(0, normalized))
  const idx = Math.min(glyphs.length - 1, Math.floor(t * glyphs.length))
  const isGray = variant.includes('Gray')
  return {
    symbol: glyphs[idx],
    color: isGray ? 'var(--color-text-muted)' : colorScaleColor(colors, normalized),
  }
}
