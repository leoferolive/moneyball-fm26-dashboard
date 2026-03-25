/**
 * Number parsing and math utilities for FM26 data.
 * Handles PT-BR (1.234,56) and EN (1,234.56) number formats.
 * Ported from moneyball_fm26_planilha.html.
 */

/** Parse a value to float, handling PT-BR and EN number formats + FM26 units */
export function pf(v: string | number | undefined | null): number {
  if (v === undefined || v === null || v === '') return 0
  if (typeof v === 'number') return isNaN(v) ? 0 : v

  let s = String(v).trim()

  // Remove common units/suffixes from FM data
  s = s
    .replace(/\s*km\s*/gi, '')
    .replace(/\s*cm\s*/gi, '')
    .replace(/\s*€.*$/g, '')
    .replace(/\s*p\/m.*$/g, '')
    .replace(/\s*M\s*€.*$/i, '')
    .replace(/\s*m\s*€.*$/g, '')
    .replace(/[^\d.,\-]/g, '')

  s = s.trim()
  if (!s || s === '-') return 0

  // PT-BR: "1.234,56" → 1234.56 | "6,4" → 6.4 | "1234" → 1234
  // EN: "1,234.56" → 1234.56 | "6.4" → 6.4
  const lastComma = s.lastIndexOf(',')
  const lastDot = s.lastIndexOf('.')

  if (lastComma > lastDot) {
    // Comma is last → PT-BR decimal: "1.234,56" or "6,4"
    s = s.replace(/\./g, '').replace(',', '.')
  } else if (lastDot > lastComma) {
    // Dot is last → EN decimal: "1,234.56" or "6.4"
    s = s.replace(/,/g, '')
  } else if (lastComma >= 0 && lastDot < 0) {
    // Only comma → treat as decimal: "6,4"
    s = s.replace(',', '.')
  }
  // Only dot or no separator → already fine

  const n = parseFloat(s)
  return isNaN(n) ? 0 : n
}

/** Round to d decimal places (default 2) */
export function rnd(v: number, d = 2): number {
  const factor = Math.pow(10, d)
  return Math.round(v * factor) / factor
}

/** Safe division — returns 0 if divisor is 0 */
export function sDiv(a: number, b: number): number {
  return b === 0 ? 0 : rnd(a / b)
}

/** Percentage — returns 0 if divisor is 0 */
export function pct(a: number, b: number): number {
  return b === 0 ? 0 : rnd((a / b) * 100)
}

/** Clamp value to [min, max] range */
export function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v))
}
