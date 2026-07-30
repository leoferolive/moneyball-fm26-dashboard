import type { RawPlayer } from '@/types/player.ts'
import type { PositionKey } from '@/types/position.ts'

export interface WorkbookMacroCompatibility {
  macroNames: readonly string[]
  decimalColumns: readonly string[]
  presentation: 'responsive-table'
  clearImportedData?: boolean
  headerCorrections?: Readonly<Record<string, string>>
}

/**
 * Functional equivalents of the non-empty VBA macros embedded in
 * Moneyball FM26.xlsm.
 *
 * Excel's "AJUSTES" buttons replace decimal dots with commas in the listed
 * raw-data columns. The web importer performs the same conversion before any
 * formula runs, which removes the ambiguity between values such as 1.000 xG
 * (one) and 1.000 minutes (one thousand).
 *
 * Row height, centring, scrolling and zoom macros are represented by the
 * responsive web table rather than exposed as actions.
 */
export const WORKBOOK_MACRO_COMPATIBILITY: Record<PositionKey, WorkbookMacroCompatibility> = {
  goleiros: {
    macroNames: ['Goleiros', 'Ajuste_Linhas'],
    decimalColumns: [
      'Press. conc.',
      'EPG',
      'T Desa',
      'Des C',
      'Crt D',
      'Pen. Enfrentados',
      'Pen. Defendidos',
      'Classificação',
    ],
    presentation: 'responsive-table',
  },
  zagueiros: {
    macroNames: ['Zagueiros', 'Ajuste_Linhas'],
    decimalColumns: ['xG', 'xA'],
    presentation: 'responsive-table',
  },
  laterais: {
    macroNames: ['Laterais', 'Ajuste_Linhas'],
    decimalColumns: ['xA', 'xG'],
    presentation: 'responsive-table',
  },
  volantes: {
    macroNames: ['Volantes', 'Ajuste_Linhas'],
    decimalColumns: ['xA'],
    presentation: 'responsive-table',
  },
  b2b: {
    macroNames: ['BoxBox', 'Ajuste_Linhas'],
    decimalColumns: ['xG', 'xA'],
    presentation: 'responsive-table',
  },
  armadores: {
    macroNames: ['Armador', 'Ajuste_Linhas'],
    decimalColumns: ['xG', 'xA'],
    presentation: 'responsive-table',
  },
  avancados: {
    macroNames: ['Avançados', 'Ajuste_Linhas'],
    decimalColumns: ['xG', 'xA'],
    presentation: 'responsive-table',
    headerCorrections: { FD: 'xG' },
  },
  time: {
    macroNames: ['Ajustes_TEstatisticas', 'Limpa_TEstatisticas'],
    decimalColumns: ['xG', 'xA'],
    presentation: 'responsive-table',
    clearImportedData: true,
  },
  esforco: {
    macroNames: ['AjustarLinhas25', 'Ajuste_Linhas'],
    decimalColumns: [],
    presentation: 'responsive-table',
  },
  overall: {
    macroNames: ['Overall', 'Ajuste_Linhas'],
    decimalColumns: ['xG', 'xA'],
    presentation: 'responsive-table',
  },
}

/** Apply the VBA decimal-normalisation step without mutating imported data. */
export function normalizeWorkbookRow(raw: RawPlayer, position: PositionKey): RawPlayer {
  const decimalColumns = WORKBOOK_MACRO_COMPATIBILITY[position].decimalColumns
  if (decimalColumns.length === 0) return raw

  let normalized: RawPlayer | undefined

  for (const column of decimalColumns) {
    const value = raw[column]
    if (!value?.includes('.')) continue

    normalized ??= { ...raw }
    normalized[column] = value.replaceAll('.', ',')
  }

  return normalized ?? raw
}
