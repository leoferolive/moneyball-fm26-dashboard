/**
 * CSV/TSV parser with auto separator detection.
 * Ported from moneyball_fm26_planilha.html.
 */

import type { RawPlayer } from '@/types/player.ts'

export interface ParseResult {
  headers: string[]
  data: RawPlayer[]
  separator: string
  separatorName: string
}

/** Parse a CSV line handling quoted fields with embedded delimiters */
export function parseCSVLine(line: string, sep: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === '"') {
      if (inQuotes && i + 1 < line.length && line[i + 1] === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (ch === sep && !inQuotes) {
      result.push(current)
      current = ''
    } else {
      current += ch
    }
  }
  result.push(current)
  return result
}

/** Auto-detect separator and parse raw text into headers + data rows */
export function smartParse(raw: string): ParseResult | null {
  const lines = raw.split(/\r?\n/).filter((l) => l.trim())
  if (lines.length < 2) return null

  // Detect separator by counting occurrences in first line
  const firstLine = lines[0]
  const tabCount = (firstLine.match(/\t/g) || []).length
  const semiCount = (firstLine.match(/;/g) || []).length
  const commaCount = (firstLine.match(/,/g) || []).length

  let sep: string
  let separatorName: string

  if (tabCount >= 3 && tabCount >= semiCount && tabCount >= commaCount) {
    sep = '\t'
    separatorName = 'Tab (Excel/Sheets)'
  } else if (semiCount >= 3 && semiCount >= commaCount) {
    sep = ';'
    separatorName = 'Ponto-e-vírgula (CSV BR)'
  } else if (commaCount >= 3) {
    sep = ','
    separatorName = 'Vírgula (CSV)'
  } else {
    sep = '\t'
    separatorName = 'Tab (fallback)'
  }

  const parseLine = (line: string): string[] => {
    if (sep === ',' || sep === ';') return parseCSVLine(line, sep)
    return line.split(sep)
  }

  const headers = parseLine(lines[0]).map((h) =>
    h.trim().replace(/^["']|["']$/g, ''),
  )
  const data: RawPlayer[] = []

  for (let i = 1; i < lines.length; i++) {
    const vals = parseLine(lines[i])
    if (vals.length < 3) continue
    const obj: RawPlayer = {}
    headers.forEach((h, j) => {
      const v = (vals[j] || '').trim().replace(/^["']|["']$/g, '')
      obj[h] = v
    })
    data.push(obj)
  }

  return { headers, data, separator: sep, separatorName }
}
