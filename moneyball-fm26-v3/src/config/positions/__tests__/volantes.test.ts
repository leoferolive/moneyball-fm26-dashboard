import { describe, expect, it } from 'vitest'
import type { RawPlayer } from '@/types/player.ts'
import { derivePlayer } from '@/engine/derive.ts'
import { volantesConfig } from '../volantes.ts'

const expectedRawColumns = [
  'Inf', 'Nação', 'Jogador', 'Idade', 'Clube', 'Altura', 'Pé Preferido',
  'Valor Estimado', 'Salário', 'Expira', 'Minutos', 'Presenças', 'HdJ',
  'EPG', 'Golos', 'Assist.', 'Amr', 'Cartões vermelhos', 'OCG',
  'Poss Perd/90', 'xA', 'Faltas Cometidas', 'Cab A', 'Cabs', 'Cab Dec/90',
  'Pas A', 'Ps C', 'Passes Ch', 'PeP', 'Remates', 'Rem %',
  'Press. tent.', 'Press. conc.', 'T Desa', 'Des C', 'Crt D', 'Blq',
  'Crt', 'Rems Bloq', 'Alívios', 'Faltas Contra', 'Poss Con/90',
  'Remates em livres', 'Pens', 'Pens M', 'Distância', 'Classificação',
]

// Linha 2 da aba 🛡️Volantes (valores em cache da planilha).
const workbookRow: RawPlayer = {
  Nação: 'BRA',
  Jogador: 'Cauan Barros',
  Idade: '22',
  Clube: 'Vasco da Gama',
  Altura: '183 cm',
  'Pé Preferido': 'Pé Direito',
  'Valor Estimado': '4,9M € - 9,2M €',
  Salário: '32,5m € p/m',
  Expira: '31/12/2029',
  Minutos: '2837',
  Presenças: '32 (10)',
  HdJ: '1',
  EPG: '0',
  Golos: '5',
  'Assist.': '4',
  Amr: '4',
  'Cartões vermelhos': '0',
  OCG: '10',
  'Poss Perd/90': '6,3',
  xA: '4.57',
  'Faltas Cometidas': '19',
  'Cab A': '101',
  Cabs: '64',
  'Cab Dec/90': '0,4',
  'Pas A': '1857',
  'Ps C': '1693',
  'Passes Ch': '40',
  PeP: '227',
  Remates: '39',
  'Rem %': '18',
  'Press. tent.': '193',
  'Press. conc.': '46',
  'T Desa': '46',
  'Des C': '31',
  'Crt D': '5',
  Blq: '17',
  Crt: '91',
  'Rems Bloq': '14',
  'Alívios': '27',
  'Faltas Contra': '8',
  'Poss Con/90': '8,6',
  'Remates em livres': '0',
  Pens: '0',
  'Pens M': '0',
  Distância: '371,3 km',
  Classificação: '6,98',
}

describe('volantesConfig — paridade com a aba 🛡️Volantes', () => {
  it('preserva exatamente os 47 cabeçalhos de entrada FM26', () => {
    expect(volantesConfig.rawColumns).toEqual(expectedRawColumns)
  })

  it('reproduz as fórmulas materiais da linha real da planilha', () => {
    const player = derivePlayer(workbookRow, volantesConfig)

    expect(player).not.toBeNull()
    expect(player).toMatchObject({
      Jogador: 'Cauan Barros',
      Nação: 'BRA',
      Clube: 'Vasco da Gama',
      Idade: 22,
      NotaFM: 6.98,
      jogosTotais: 42,
      minPartida: 67.55,
      pctJogosTitular: 76,
      golsAst: 9,
      pctPen: 0.0000001,
      cartoesPorFalta: 21.05,
      pctFaltasSemCartao: 78.95,
      bolasDisputadas: 166,
      bolasDisp90: 5.27,
      bolasGanhas: 100,
      bolasGanhas90: 3.17,
      pctBolasGanhas: 60.24,
      desT: 65,
      desT90: 2.06,
      desG: 31,
      desG90: 0.98,
      pctDes: 47.69,
      cabsDisp: 101,
      cabsDisp90: 3.2,
      cabsG: 64,
      cabsG90: 2.03,
      pctCabs: 63.37,
      cabsPerd: 37,
      cabsPerd90: 1.17,
      saldoPasses90: 48.51,
      passesCurtos: 1630,
      passesCurtos90: 51.71,
      passesProgr90: 7.2,
      pctProgr: 13.93,
      passD90: 1.27,
      xA: 4.57,
      xA90: 0.14,
      xAPerPassD: 0.11,
      criacao: 50,
      criacao90: 1.59,
      criacaoComAssist90: 1.71,
      intRec: 127,
      intRec90: 4.03,
      bolasInt: 149,
      bolasInt90: 4.73,
      bolasRoubadas: 79.5,
      bRob90: 2.52,
      lancesDefT: 220,
      lancesDefT90: 6.98,
      lancesDefC90: 6.07,
      errosDef: 24,
      errosDef90: 0.76,
      eficaciaDef: 86.96,
      distancia: 371.3,
      dist90: 11.78,
      velMedia: 7.85,
      possDesp: 222,
      possDesp90: 7.04,
      possPerd90: 6.3,
      notaMedia: 6.98,
    })

    expect(player!.jogosCompletos).toBeCloseTo(31.5222222222, 8)
    expect(player!.desDecisivos).toBe(5)
    expect(player!.desDecisivos90).toBe(0.16)
    expect(player!.cabsEvitaramJogada).toBeCloseTo(12.6088888889, 8)
    expect(player!.cabsEvitaramJogada90).toBe(0.4)
    expect(player!.lancesDefC).toBeCloseTo(191.3044444444, 8)
  })

  it('mantém os fallbacks e o arredondamento peculiares da planilha', () => {
    const withoutSubstitutes = derivePlayer({
      ...workbookRow,
      Jogador: 'Sem suplências',
      Presenças: '42',
    }, volantesConfig)
    const zeroDivisors = derivePlayer({
      ...workbookRow,
      Jogador: 'Zeros',
      Presenças: '0 (0)',
      Pens: '0',
      'Pens M': '0',
      'Faltas Cometidas': '0',
      'Press. tent.': '0',
      'Press. conc.': '0',
      'Cab A': '0',
      Cabs: '0',
      'T Desa': '0',
      'Des C': '0',
      'Crt D': '0',
      Crt: '0',
      Blq: '0',
      'Rems Bloq': '0',
      'Alívios': '0',
    }, volantesConfig)

    expect(withoutSubstitutes).not.toBeNull()
    expect(withoutSubstitutes!.jogosTotais).toBe(42)
    expect(withoutSubstitutes!.pctJogosTitular).toBe(100)

    expect(zeroDivisors).not.toBeNull()
    expect(zeroDivisors).toMatchObject({
      jogosTotais: 0,
      minPartida: 0,
      pctJogosTitular: 0,
      pctPen: 0.0000001,
      cartoesPorFalta: 0,
      pctFaltasSemCartao: 0,
      pctPressao: 0,
      pctBolasGanhas: 0,
      pctDes: 0,
      pctCabs: 0,
    })
  })

  it('mantém as keys canônicas e declara as colunas padrão pelos rótulos exibidos', () => {
    const canonicalKeys = [
      'jogosCompletos', 'desG90', 'pctDes', 'intRec90', 'pressaoG90',
      'pctPressao', 'pctPassesCertos', 'passD90', 'xA90', 'eficaciaDef',
      'bRob90', 'dist90', 'notaMedia',
    ]
    const metricKeys = volantesConfig.metrics.map((metric) => metric.key)
    const displayedLabels = volantesConfig.metrics
      .filter((metric) => metric.displayInTable)
      .map((metric) => metric.label)

    expect(metricKeys).toEqual(expect.arrayContaining(canonicalKeys))
    expect(displayedLabels).toEqual(volantesConfig.defaultTableColumns)
  })
})
