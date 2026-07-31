// Regenera src/config/excelConditionalFormats.generated.ts a partir de
// excel-conditional-formats-extracted.json (gerado por
// extract-excel-conditional-formats.py) + excel-label-aliases.json.
// Roda com: npx vite-node scripts/generate-excel-conditional-formats.ts
// (a partir da raiz de moneyball-fm26-v3/, pra resolver os aliases @/ do
// projeto).
//
// Casa as regras extraídas com as métricas reais de cada posição
// (positionConfigs), por label normalizado (fila FIFO por label — robusta
// a colunas de identidade intercaladas e a métricas sem equivalente no
// Excel, como as 30 extras de Overall), com um dicionário de aliases
// manuais pras posições onde os labels do TS são paráfrases das do Excel
// (goleiros/volantes/time — ver excel-label-aliases.json).
import { readFileSync, writeFileSync } from 'node:fs'
import { positionConfigs } from '../src/config/positions/index.ts'
import type { PositionKey } from '../src/types/position.ts'

interface ExtractedFormat {
  colorScale?: { colors: string[] }
  dataBar?: { color: string }
  iconSet?: { variant: string; bands: number }
}

interface ExtractedEntry {
  col: string
  label: string
  format: ExtractedFormat | null
}

const raw = JSON.parse(readFileSync('./scripts/excel-conditional-formats-extracted.json', 'utf-8')) as Record<string, ExtractedEntry[]>
const aliases = JSON.parse(readFileSync('./scripts/excel-label-aliases.json', 'utf-8')) as Record<string, Record<string, string>>

function normalize(s: string): string {
  return s
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/\s*\/\s*/g, '/')
    .replace(/\s+/g, ' ')
    .trim()
}

const output: Record<string, Record<string, ExtractedFormat>> = {}
const report: string[] = []
const stillUnmatched: Record<string, string[]> = {}

for (const posKey of Object.keys(raw) as PositionKey[]) {
  const config = positionConfigs[posKey]
  if (!config) continue

  const entries = raw[posKey]
  const byNormLabel = new Map<string, ExtractedEntry[]>()
  for (const e of entries) {
    const key = normalize(e.label)
    if (!byNormLabel.has(key)) byNormLabel.set(key, [])
    byNormLabel.get(key)!.push(e)
  }
  const cursor = new Map<string, number>()
  const posAliases = aliases[posKey] ?? {}

  const allMetrics = [...config.metrics, ...(config.collectionMetrics ?? [])]
  const posOutput: Record<string, ExtractedFormat> = {}
  let matched = 0
  let withFormat = 0
  const unmatchedLabels: string[] = []

  for (const metric of allMetrics) {
    const targetLabel = posAliases[metric.label] ?? metric.label
    const normKey = normalize(targetLabel)
    const bucket = byNormLabel.get(normKey)
    if (!bucket) {
      unmatchedLabels.push(metric.label)
      continue
    }
    const idx = cursor.get(normKey) ?? 0
    if (idx >= bucket.length) {
      unmatchedLabels.push(metric.label)
      continue
    }
    cursor.set(normKey, idx + 1)
    matched++
    const entry = bucket[idx]
    if (entry.format) {
      const clean: ExtractedFormat = {}
      if (entry.format.colorScale) clean.colorScale = { colors: entry.format.colorScale.colors }
      if (entry.format.dataBar) clean.dataBar = { color: entry.format.dataBar.color }
      if (entry.format.iconSet) clean.iconSet = { variant: entry.format.iconSet.variant, bands: entry.format.iconSet.bands }
      posOutput[metric.key] = clean
      withFormat++
    }
  }

  output[posKey] = posOutput
  report.push(`${posKey}: ${allMetrics.length} métricas, ${matched} casadas por label, ${withFormat} com formatação`)
  if (unmatchedLabels.length > 0) stillUnmatched[posKey] = unmatchedLabels
}

console.log(report.join('\n'))
console.log('\n--- ainda sem correspondência (por posição) ---')
for (const [pos, labels] of Object.entries(stillUnmatched)) {
  console.log(`${pos} (${labels.length}):`, labels.join(', '))
}

const tsHeader = `// GERADO AUTOMATICAMENTE — não editar à mão.
// Fonte: Moneyball FM26.xlsm, regras de conditionalFormatting extraídas via
// scripts_scratch_extract.py + scripts_scratch_generate.ts. Cada posição
// mapeia metric.key -> a formatação condicional real daquela coluna na
// planilha (colorScale/dataBar/iconSet), quando existir e quando o label da
// métrica foi identificado com confiança no cabeçalho correspondente do
// Excel (ver scripts_scratch_aliases.json para os casos parafraseados).
import type { PositionKey } from '@/types/position.ts'

export interface ExcelColorScale {
  colors: string[]
}

export interface ExcelDataBar {
  color: string
}

export interface ExcelIconSet {
  variant: string
  bands: number
}

export interface ExcelConditionalFormat {
  colorScale?: ExcelColorScale
  dataBar?: ExcelDataBar
  iconSet?: ExcelIconSet
}

export const EXCEL_CONDITIONAL_FORMATS: Record<PositionKey, Record<string, ExcelConditionalFormat>> = `

const body = JSON.stringify(output, null, 2)
writeFileSync('./src/config/excelConditionalFormats.generated.ts', tsHeader + body + '\n')
console.log('\nEscrito em src/config/excelConditionalFormats.generated.ts')
