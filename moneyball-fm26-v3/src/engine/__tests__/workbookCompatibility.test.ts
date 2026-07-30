import { describe, expect, it } from 'vitest'
import { positionConfigs } from '@/config/positions/index.ts'
import type { PositionKey } from '@/types/position.ts'
import { derivePlayer } from '../derive.ts'
import {
  normalizeWorkbookRow,
  WORKBOOK_MACRO_COMPATIBILITY,
} from '../workbookCompatibility.ts'

const VBA_MACROS = [
  'AjustarLinhas25',
  'Ajuste_Linhas',
  'Goleiros',
  'Laterais',
  'Volantes',
  'BoxBox',
  'Armador',
  'Overall',
  'Avançados',
  'Zagueiros',
  'Ajustes_TEstatisticas',
  'Limpa_TEstatisticas',
].sort()

describe('compatibilidade com as macros VBA', () => {
  it('mapeia todos os 12 procedimentos não vazios da planilha', () => {
    const mapped = new Set(
      Object.values(WORKBOOK_MACRO_COMPATIBILITY)
        .flatMap((compatibility) => compatibility.macroNames),
    )

    expect([...mapped].sort()).toEqual(VBA_MACROS)
  })

  it.each(
    Object.entries(WORKBOOK_MACRO_COMPATIBILITY)
      .filter(([, compatibility]) => compatibility.decimalColumns.length > 0),
  )('replica a troca de ponto por vírgula da macro em %s', (position, compatibility) => {
    const raw = Object.fromEntries(
      compatibility.decimalColumns.map((column) => [column, '1.000']),
    )
    raw.Minutos = '2.035'

    const normalized = normalizeWorkbookRow(raw, position as PositionKey)

    for (const column of compatibility.decimalColumns) {
      expect(normalized[column]).toBe('1,000')
    }
    expect(normalized.Minutos).toBe('2.035')
    expect(raw[compatibility.decimalColumns[0]]).toBe('1.000')
  })

  it('mantém a aba de esforço sem normalização decimal', () => {
    const raw = { Classificação: '6.800' }
    expect(normalizeWorkbookRow(raw, 'esforco')).toBe(raw)
  })

  it('aplica os ajustes antes das fórmulas sem confundir decimais e milhares', () => {
    const player = derivePlayer({
      Jogador: 'Teste',
      Minutos: '2.035',
      Classificação: '6.800',
    }, positionConfigs.goleiros)

    expect(player?.Jogos90).toBeCloseTo(2035 / 90)
    expect(player?.NotaFM).toBe(6.8)
  })

  it('aplica a normalização de xG e xA usada pelos cálculos', () => {
    const player = derivePlayer({
      Jogador: 'Teste',
      Minutos: '900',
      xG: '1.000',
      xA: '2.000',
    }, positionConfigs.b2b)

    expect(player?.xG).toBe(1)
    expect(player?.xA).toBe(2)
  })

  it('registra o comando Limpar apenas onde existe no arquivo', () => {
    expect(WORKBOOK_MACRO_COMPATIBILITY.time.clearImportedData).toBe(true)

    for (const [position, compatibility] of Object.entries(WORKBOOK_MACRO_COMPATIBILITY)) {
      if (position !== 'time') expect(compatibility.clearImportedData).toBeUndefined()
    }
  })
})
