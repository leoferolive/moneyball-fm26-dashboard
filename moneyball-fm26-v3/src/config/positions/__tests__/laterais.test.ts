import { describe, expect, it } from 'vitest'
import { lateraisConfig } from '../laterais.ts'
import { derivePlayer } from '@/engine/derive.ts'
import type { RawPlayer } from '@/types/player.ts'

const BRAIAN_CUFRE: RawPlayer = {
  Inf: '',
  Jogador: 'Braian Cufré',
  Altura: '178 cm',
  Idade: '29',
  'Valor Estimado': '130m € - 1,3M €',
  Salário: '12,5m € p/m',
  Nação: 'ARG',
  'Pé Preferido': 'Somente Pé Esquerdo',
  Expira: '31/12/2028',
  Clube: 'Remo',
  Minutos: '3551',
  Presenças: '43 (2)',
  HdJ: '2',
  EPG: '0',
  Golos: '1',
  'Assist.': '5',
  Amr: '11',
  'Cartões vermelhos': '0',
  OCG: '16',
  'Poss Perd/90': '12.4',
  'Sprints/90': '19.3',
  xA: '6,23',
  xG: '1,95',
  'Cab A': '110',
  Cabs: '54',
  'Cab Dec/90': '0.2',
  'Pas A': '2508',
  'Ps C': '2234',
  'Passes Ch': '63',
  PeP: '344',
  Remates: '28',
  'Rem %': '11',
  'Press. tent.': '377',
  'Press. conc.': '117',
  'Faltas Cometidas': '73',
  'T Desa': '119',
  'Des C': '86',
  'Crt D': '4',
  Blq: '20',
  Crt: '147',
  'Rems Bloq': '16',
  Alívios: '35',
  'Cr T': '166',
  'Cr C': '34',
  Fj: '2',
  'Remates em livres': '0',
  Pens: '0',
  'Pens M': '0',
  Fnt: '39',
  Distância: '490,4 km',
  Classificação: '6.94',
}

const CUIABANO: RawPlayer = {
  Inf: '',
  Jogador: 'Cuiabano',
  Altura: '179 cm',
  Idade: '23',
  'Valor Estimado': '9,2M € - 15,5M €',
  Salário: '97,5m € p/m',
  Nação: 'BRA',
  'Pé Preferido': 'Pé Esquerdo',
  Expira: '30/06/2030',
  Clube: 'Vasco da Gama',
  Minutos: '3253',
  Presenças: '40 (1)',
  HdJ: '1',
  EPG: '0',
  Golos: '2',
  'Assist.': '9',
  Amr: '7',
  'Cartões vermelhos': '1',
  OCG: '10',
  'Poss Perd/90': '12.5',
  'Sprints/90': '20.9',
  xA: '5,07',
  xG: '2,73',
  'Cab A': '107',
  Cabs: '65',
  'Cab Dec/90': '0.2',
  'Pas A': '2067',
  'Ps C': '1823',
  'Passes Ch': '65',
  PeP: '287',
  Remates: '28',
  'Rem %': '7',
  'Press. tent.': '358',
  'Press. conc.': '100',
  'Faltas Cometidas': '53',
  'T Desa': '114',
  'Des C': '87',
  'Crt D': '5',
  Blq: '21',
  Crt: '148',
  'Rems Bloq': '10',
  Alívios: '20',
  'Cr T': '187',
  'Cr C': '38',
  Fj: '7',
  'Remates em livres': '0',
  Pens: '1',
  'Pens M': '0',
  Fnt: '73',
  Distância: '457,2 km',
  Classificação: '6.96',
}

/**
 * Cached results from row 2 of `🛡️Laterais`, converted to the site's
 * percentage scale (0–100). Formula results are compared at worksheet
 * display precision because the site intentionally rounds safe division.
 */
const WORKSHEET_ROW_2: Record<string, number> = {
  altura: 1.78,
  valorEstimadoMedio: 65.65,
  jogosCompletos: 39.455555555555556,
  jogosTotais: 45,
  minPartida: 78.91111111111111,
  pctJogosTitular: 96,
  gols: 1,
  assist: 5,
  golsAst: 6,
  ga90: 0.1520698394818361,
  hdj: 2,
  pctHdJ: 5.068994649394537,
  xG: 1.95,
  xG90: 0.04942269783159673,
  npxG: 1.95,
  npxG90: 0.04942269783159673,
  xA: 6.23,
  xA90: 0.15789918332863984,
  xaNpxG: 8.18,
  xaNpxG90: 0.20732188116023653,
  pensBatidos: 0,
  pensMarcados: 0,
  pensPerdidos: 0,
  pctConversaoPen: 0.00001,
  desarmesTentados: 192,
  desT90: 4.8662348634187556,
  desarmesGanhos: 86,
  desG90: 2.179667699239651,
  driblesSofridos: 33,
  driblesSof90: 0.8363841171500985,
  pctDesGanhos: 44.79166666666667,
  faltasCometidas: 73,
  faltas90: 1.850183047029006,
  lancesDisputados: 589,
  lancesDisputados90: 14.92818924246691,
  lancesGanhosSemFalta: 227,
  lancesGanhosSemFalta90: 5.7533089270627995,
  pctLancesGanhos: 38.539898132427844,
  passesTentados: 2508,
  passesT90: 63.56519290340749,
  passesCertos: 2234,
  passesC90: 56.62067023373697,
  pctPassesCertos: 89.07496012759171,
  passesErrados: 406,
  passErr90: 10.290059138270909,
  umPasseErradoCada: 9.153284671532846,
  passesCurtos: 2164,
  passesCurtos90: 54.84652210644889,
  passesProgressao: 344,
  passProg90: 8.718670796958603,
  pctPassesProgressao: 15.89648798521257,
  cruzTentados: 166,
  cruzT90: 4.207265558997466,
  cruzConseguidos: 34,
  cruzC90: 0.8617290903970712,
  pctCruzamentos: 20.481927710843372,
  passesDecisivos: 63,
  passD90: 1.596733314559279,
  minPorChancePerigo: 39.455555555555556,
  minPorPasseDecisivo: 56.36507936507937,
  assistenciasEsperadas: 6.23,
  assistDesperdicadas: 1.2300000000000004,
  chancesCriadas: 119.23,
  chances90: 3.021881160236553,
  fintas: 39,
  fintas90: 0.9884539566319347,
  desarmesDecisivos: 4,
  desarmesDecisivos90: 0.10137989298789074,
  errosGol: 0,
  erros90: 0,
  participacoes: 3219,
  participacoes90: 81.58546888200507,
  cabsTentados: 110,
  cabsT90: 2.787947057166995,
  cabsGanhos: 54,
  cabsG90: 1.368628555336525,
  pctCabsGanhos: 49.09090909090909,
  cabsDecisivos: 7.891111111111112,
  cabDec90: 0.2,
  bolasRoubadas: 242.89111111111112,
  bolasRob90: 6.1560687130385805,
  movOfTentados: 312,
  movOfConseguidos: 194.5,
  movOf90: 4.929597296536187,
  pctMovOfSucesso: 62.33974358974359,
  lancesDefTentados: 534.63,
  lancesDefT90: 13.550183047029005,
  lancesDefConseguidos: 365.94555555555553,
  lancesDefC90: 9.274880315404111,
  errosDefensivos: 86.75,
  errosDefensivos90: 2.1986764291748804,
  eficaciaDefensiva: 68.44837655117661,
  sucessoOverall: 66.19722376428375,
  distancia: 490.4,
  dist90: 12.429174880315404,
  sprintsTotal: 761.4922222222223,
  sprints90: 19.3,
  posseDesperdicada: 462,
  posseDesperdicada90: 11.70937764010138,
  possPerd90: 12.4,
  notaMedia: 6.94,
}

describe('lateraisConfig', () => {
  it('preserva exatamente os cabeçalhos de entrada FM26 da aba', () => {
    expect(lateraisConfig.rawColumns).toEqual(Object.keys(BRAIAN_CUFRE))
  })

  it('expõe chaves únicas e mantém todas as colunas padrão válidas', () => {
    const metricKeys = lateraisConfig.metrics.map((metric) => metric.key)
    expect(new Set(metricKeys).size).toBe(metricKeys.length)
    expect(lateraisConfig.defaultTableColumns.every((key) => metricKeys.includes(key))).toBe(true)
    expect(lateraisConfig.metrics.filter((metric) => metric.displayInTable).map((metric) => (
      metric.key
    ))).toEqual(lateraisConfig.defaultTableColumns)
  })

  it('reproduz as fórmulas e valores cacheados da linha de referência', () => {
    const player = derivePlayer(BRAIAN_CUFRE, lateraisConfig)
    expect(player).not.toBeNull()

    for (const [metricKey, worksheetValue] of Object.entries(WORKSHEET_ROW_2)) {
      expect(
        player?.[metricKey],
        `${metricKey} divergiu da fórmula da aba 🛡️Laterais`,
      ).toBeCloseTo(worksheetValue, 2)
    }

    expect(Object.keys(WORKSHEET_ROW_2)).toEqual(
      lateraisConfig.metrics.map((metric) => metric.key),
    )
  })

  it('interpreta Presenças como titulares + entradas do banco', () => {
    const player = derivePlayer({
      ...BRAIAN_CUFRE,
      Minutos: '900',
      Presenças: '8 (4)',
    }, lateraisConfig)

    expect(player?.jogosTotais).toBe(12)
    expect(player?.minPartida).toBe(75)
    expect(player?.pctJogosTitular).toBe(67)
  })

  it('reproduz a linha real com pênalti perdido e cartão vermelho', () => {
    const player = derivePlayer(CUIABANO, lateraisConfig)

    expect(player).toMatchObject({
      altura: 1.79,
      valorEstimadoMedio: 12.35,
      jogosTotais: 41,
      pctJogosTitular: 98,
      npxG: 1.94,
      pensPerdidos: 1,
      pctConversaoPen: 0,
      passesErrados: 393,
      lancesDefTentados: 484.31,
      errosDefensivos: 63.75,
    })
    expect(player?.assistDesperdicadas).toBeCloseTo(-3.93, 2)
    expect(player?.eficaciaDefensiva).toBeCloseTo(74.2529463452013, 2)
    expect(player?.sucessoOverall).toBeCloseTo(69.05553391845304, 2)
  })

  it('trata uma presença sem parênteses como 100% titular', () => {
    const player = derivePlayer({
      ...BRAIAN_CUFRE,
      Minutos: '900',
      Presenças: '10',
    }, lateraisConfig)

    expect(player?.jogosTotais).toBe(10)
    expect(player?.pctJogosTitular).toBe(100)
  })
})
