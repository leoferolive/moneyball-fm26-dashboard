import { describe, expect, it } from 'vitest'
import type { RawPlayer } from '@/types/player.ts'
import type { FormulaContext } from '../types.ts'
import { clamp, pct, pf, rnd, sDiv } from '@/engine/numbers.ts'
import { derivePlayer } from '@/engine/derive.ts'
import { timeConfig } from '../time.ts'

const expectedRawColumns = [
  'Inf', 'Escolhido', 'Jogador', 'Idade', 'Altura', 'Pé Preferido',
  'Minutos', 'Classificação', 'Golos', 'Assist.', 'Pens', 'Pens M',
  'Remates', 'Rem %', 'Cab A', 'Cabs', 'xG', 'xA', 'Poss Perd/90',
  'OCG', 'Passes Ch', 'Cr T', 'Cr C', 'CT-JA', 'CC-JA', 'Crt D',
  'Faltas Cometidas', 'Faltas Contra', 'EPG', 'Distância', 'Fnt',
  'Pas A', 'Ps C', 'PeP', 'Press. tent.', 'Press. conc.',
  'T Desa', 'Des C',
]

// Linha real de Gustavo Henrique no cache da aba 🌎Overall Análise.
// Ela usa 37 dos 38 cabeçalhos FM26 de 📊Time Estatísticas; `Escolhido`
// é o campo manual que seleciona a posição em um dos 11 slots da equipe.
const workbookPlayer: RawPlayer = {
  Inf: '',
  Escolhido: 'Zagueiro',
  Jogador: 'Gustavo Henrique',
  Idade: '33',
  Altura: '196 cm',
  'Pé Preferido': 'Pé Direito',
  Minutos: '3624',
  Classificação: '6,85',
  Golos: '0',
  'Assist.': '1',
  Pens: '0',
  'Pens M': '0',
  Remates: '20',
  'Rem %': '6',
  'Cab A': '233',
  Cabs: '181',
  xG: '1,4',
  xA: '0.14',
  'Poss Perd/90': '4,1',
  OCG: '1',
  'Passes Ch': '8',
  'Cr T': '0',
  'Cr C': '0',
  'CT-JA': '0',
  'CC-JA': '0',
  'Crt D': '3',
  'Faltas Cometidas': '12',
  'Faltas Contra': '3',
  EPG: '0',
  Distância: '392,7 km',
  Fnt: '2',
  'Pas A': '1909',
  'Ps C': '1766',
  PeP: '158',
  'Press. tent.': '84',
  'Press. conc.': '21',
  'T Desa': '19',
  'Des C': '18',
}

const emptyContext: FormulaContext = {
  pf,
  rnd,
  sDiv,
  pct,
  clamp,
  j90: 0,
}

describe('timeConfig — paridade com a aba 📊Time Estatísticas', () => {
  it('preserva exatamente os 38 cabeçalhos de entrada de BK:CV', () => {
    expect(timeConfig.rawColumns).toEqual(expectedRawColumns)
  })

  it('reproduz as fórmulas dos slots usando uma linha real do mesmo workbook', () => {
    const player = derivePlayer(workbookPlayer, timeConfig)

    expect(player).not.toBeNull()
    expect(player).toMatchObject({
      Jogador: 'Gustavo Henrique',
      Idade: 33,
      NotaFM: 6.85,
      minutosJogados: 3624,
      altura: 1.96,
      passesT90: 47.41,
      passesC90: 43.86,
      passesErrados: 143,
      passesErrados90: 3.55,
      pctPassesCertos: 92.51,
      pctPassesErrados: 7.49,
      possePerdida90: 4.1,
      falhas: 0,
      falhas90: 0,
      acoesBola: 3646,
      acoesBola90: 90.55,
      gols: 0,
      gols90: 0,
      assistencias: 1,
      ast90: 0.02,
      golsAst: 1,
      golsAst90: 0.02,
      fintas: 2,
      fintas90: 0.05,
      acoesFin90: 0.18,
      xgSemPen: 1.4,
      npxg90: 0.03,
      finalizacoes: 20,
      fin90: 0.5,
      finCertas90: 0.15,
      pctFinCertas: 30,
      conversaoGols: 0,
      xA: 0.14,
      xA90: 0,
      xAxgSemPen: 1.54,
      xAxg90: 0.04,
      passesDecisivos: 8,
      passD90: 0.2,
      cabsDisputados: 233,
      cabsDisp90: 5.79,
      cabsGanhos: 181,
      cabsG90: 4.5,
      pctCabs: 77.68,
      desarmesTentados: 34,
      desT90: 0.84,
      desarmesGanhos: 21,
      desG90: 0.52,
      pctDesarmes: 61.76,
      faltasCometidas: 12,
      faltas90: 0.3,
      chancesBPTentadas: 0,
      chancesBPCriadas: 0,
      pctAprovBP: 0,
      distancia: 392.7,
      dist90: 9.75,
      notaMedia: 6.85,
    })

    expect(player!.jogosCompletos).toBeCloseTo(40.2666666667, 8)
    expect(player!.possePerdida).toBeCloseTo(165.0933333333, 8)
    expect(player!.acoesFinalizacao).toBeCloseTo(7.14, 8)
  })

  it('mantém os sinais das bolas paradas e os fallbacks IFERROR', () => {
    const player = derivePlayer({
      ...workbookPlayer,
      Jogador: 'Bolas paradas',
      'Cr T': '15',
      'Cr C': '6',
      'CT-JA': '10',
      'CC-JA': '2',
      Minutos: '180',
      Pens: '2',
      'Pens M': '1',
      Remates: '2',
      'Rem %': '1',
      Classificação: '-',
    }, timeConfig)

    expect(player).not.toBeNull()
    expect(player).toMatchObject({
      chancesBPTentadas: 5,
      chancesBPCriadas: 4,
      pctAprovBP: 80,
      finCertas90: 0,
      pctFinCertas: 0,
      conversaoGols: 0,
      notaMedia: 6,
    })
  })

  it('reflete o cache vazio dos 11 slots e o fallback de Nota média', () => {
    const notaMedia = timeConfig.metrics.find((metric) => metric.key === 'notaMedia')

    expect(derivePlayer({}, timeConfig)).toBeNull()
    expect(notaMedia).toBeDefined()
    expect(notaMedia!.formula({}, emptyContext)).toBe(6)
    expect(notaMedia!.formula({ Classificação: 'inválida' }, emptyContext)).toBe(6)
    expect(notaMedia!.formula({ Classificação: '0' }, emptyContext)).toBe(0)
  })

  it('preserva as keys e os formatos visuais declarados pela planilha', () => {
    const metrics = new Map(timeConfig.metrics.map((metric) => [metric.key, metric]))
    const displayedLabels = timeConfig.metrics
      .filter((metric) => metric.displayInTable)
      .map((metric) => metric.label)

    expect(metrics.get('jogosCompletos')).toMatchObject({ format: 'integer' })
    expect(metrics.get('passesT90')).toMatchObject({ decimals: 1 })
    expect(metrics.get('passesC90')).toMatchObject({ decimals: 1 })
    expect(metrics.get('acoesBola90')).toMatchObject({ decimals: 1 })
    expect(metrics.get('pctFinCertas')).toMatchObject({ decimals: 1 })
    expect(metrics.get('conversaoGols')).toMatchObject({ decimals: 2 })
    expect(metrics.get('pctCruzamentos')).toMatchObject({ decimals: 2 })
    expect(metrics.get('cabsDisp90')).toMatchObject({ decimals: 1 })
    expect(metrics.get('pctCabs')).toMatchObject({ decimals: 2 })
    expect(metrics.get('pctDesarmes')).toMatchObject({ decimals: 2 })
    expect(metrics.get('pctAprovBP')).toMatchObject({ decimals: 2 })
    expect(displayedLabels).toEqual(timeConfig.defaultTableColumns)
  })
})
