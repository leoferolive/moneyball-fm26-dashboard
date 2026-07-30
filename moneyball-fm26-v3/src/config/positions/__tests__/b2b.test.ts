import { describe, expect, it } from 'vitest'
import { derivePlayer } from '@/engine/derive.ts'
import type { RawPlayer } from '@/types/player.ts'
import { b2bConfig } from '../b2b.ts'

const RAW_COLUMNS = [
  'Inf', 'Nação', 'Jogador', 'Idade', 'Clube', 'Altura', 'Pé Preferido',
  'Valor Estimado', 'Salário', 'Expira', 'Minutos', 'Presenças', 'HdJ',
  'EPG', 'Golos', 'Assist.', 'Amr', 'Cartões vermelhos', 'OCG',
  'Poss Perd/90', 'xG', 'xA', 'Faltas Cometidas', 'Faltas Contra',
  'Cab A', 'Cabs', 'Cab Dec/90', 'Pas A', 'Ps C', 'Passes Ch', 'PeP',
  'Fnt', 'Remates', 'Rem %', 'Press. tent.', 'Press. conc.', 'T Desa',
  'Des C', 'Crt D', 'Blq', 'Crt', 'Rems Bloq', 'Alívios', 'Poss Con/90',
  'Remates de fora da área em cada 90 minutes', 'Cr T', 'Cr C',
  'Remates em livres', 'Pens', 'Pens M', 'Distância', 'Classificação',
]

const DERIVED_LABELS = [
  'Jogos completos', 'Jogos Totais', 'Minutos por partida', 'Jogos como Titular',
  'Pênaltis batidos', 'Pênaltis marcados', 'Pênaltis perdidos', '% Conversão de pênalti',
  'Gols', 'Assistências', 'Gols + Ass', 'Bolas recuperadas',
  'Bolas recuperadas / 90', 'Finalizações realizadas', 'Finalizações /90',
  'Finalizações no Gol', 'Finalizações no Gol /90', '% Finalizações Certas',
  'Taxa de Conversão %', 'Gols esperados (xG)', 'xG /90', 'xG (Sem pênaltis)',
  'xG (Sem pênaltis) /90', 'Assistências Esperadas (xA)', 'xA /90',
  'xA + xG sem pen', 'xA + xG /90', 'Man of the match',
  'Minutos pra ser o homem do jogo', '% de vezes que foi eleito o Homem do Jogo',
  'Interceptações', 'Int / 90', 'Desarmes Tentados', 'Des disputados /90',
  'Desarmes Ganhos', 'Desarmes G/90', 'Dribles Sofridos', 'Dribles Sofridos /90',
  '% Des Ganhos', 'Faltas cometidas', 'Faltas/90', 'Faltas sem cartão',
  'Cartões por falta cometida', 'Movimentos de pressão tentados', 'Mov Press T/90',
  'Movimentos de pressão ganhos', 'Mov Press Ganhos /90', '% Pressão ganha/90',
  'Amarelos', 'Vermelhos', 'Total cartões', 'Lances disputados',
  'Lances disputados e ganhos de forma limpa',
  '% Lances disputados e ganhos de forma limpa', '%Faltas limpas (Sem cartão)',
  'Desarmes Decisivos', 'Desarmes Decisivos / 90', 'Cruzamentos Tentados',
  'Cruzamentos com sucesso', '% Cruzamentos certos', 'Passes tentados',
  'Passes certos', 'Passes certos  - errados / Jogo', 'Passes errados',
  '% Passes certos', 'Cabeceios Disputados', 'Cabeceios Disputados /90',
  'Cabeceios Ganhos', 'Cabeceios Perdidos', '% Cabs Ganhos',
  'Participação por jogo (passes, fnt, fin, criação, roubadas de bola, etc)',
  'Lances Tentados (Remate, Passe, Finta, etc)', 'Lances Tentados /90',
  'Lances Conseguidos', 'Lances Conseguidos /90', '% Acerto', 'Chances criadas',
  'Chances criadas / 90', 'Passes Decisivos', 'Pass D /90',
  'Passes Decisivos pra uma assistência',
  'Pass Decisivos que se converteram em assistências',
  'Assistências Claras que a Equipe desperdiçou', 'xA / Passe Decisivo',
  'Bolas Interceptadas', 'Bolas Interceptadas /90', 'Bolas roubadas',
  'Bolas roubadas / 90', 'Ações no último terço (Finta, Pass D, OGC, etc)',
  'Último terço/90', 'Distância', 'Dist / 90', 'Posse Desperdiçada',
  'Posse Desperdiçada /90', 'Posse perdida /90', 'Nota média',
]

// Linha 2 da aba ⚙️Box-To-Box: Bruno Zapelli.
const BRUNO_ZAPELLI: RawPlayer = {
  Inf: '',
  Nação: 'ARG',
  Jogador: 'Bruno Zapelli',
  Idade: '24',
  Clube: 'Athletico Paranaense',
  Altura: '181 cm',
  'Pé Preferido': 'Pé Direito',
  'Valor Estimado': '3,5M €',
  Salário: '41m € p/m',
  Expira: '2030-12-31',
  Minutos: '2930',
  Presenças: '40 (1)',
  HdJ: '1',
  EPG: '0',
  Golos: '7',
  'Assist.': '9',
  Amr: '1',
  'Cartões vermelhos': '0',
  OCG: '17',
  'Poss Perd/90': '11.1',
  xG: '9.13',
  xA: '8.48',
  'Faltas Cometidas': '23',
  'Faltas Contra': '28',
  'Cab A': '118',
  Cabs: '34',
  'Cab Dec/90': '0.2',
  'Pas A': '1476',
  'Ps C': '1331',
  'Passes Ch': '64',
  PeP: '88',
  Fnt: '59',
  Remates: '87',
  'Rem %': '38',
  'Press. tent.': '198',
  'Press. conc.': '53',
  'T Desa': '35',
  'Des C': '27',
  'Crt D': '0',
  Blq: '8',
  Crt: '58',
  'Rems Bloq': '3',
  Alívios: '15',
  'Poss Con/90': '8.8',
  'Remates de fora da área em cada 90 minutes': '1.4',
  'Cr T': '176',
  'Cr C': '30',
  'Remates em livres': '7',
  Pens: '0',
  'Pens M': '0',
  Distância: '391,6 km',
  Classificação: '6.82',
}

const BRUNO_EXPECTED: Record<string, number> = {
  altura: 1.81,
  jogosCompletos: 32.55555555555556,
  jogosTotais: 41,
  minPartida: 71.46,
  jogosComoTitular: 100,
  hdj: 1,
  pctHdj: 3.07,
  pensBatidos: 0,
  pensMarcados: 0,
  pensPerdidos: 0,
  pctPen: 0.0000001,
  gols: 7,
  assist: 9,
  golsAst: 16,
  bolasRecuperadas: 85,
  bolasRec90: 2.61,
  finalizacoes: 87,
  fin90: 2.67,
  finNoGol: 38,
  finNoGol90: 1.17,
  pctFinCertas: 43.68,
  txConversao: 8.05,
  xG: 9.13,
  xG90: 0.28,
  npxG: 9.13,
  npxG90: 0.28,
  xA: 8.48,
  xA90: 0.26,
  xAxGSemPen: 17.61,
  xAxG90: 0.54,
  minHdj: 2930,
  interceptacoes: 58,
  int90: 1.78,
  desT: 58,
  desT90: 1.78,
  desG: 27,
  desG90: 0.83,
  driblesS: 31,
  driblesS90: 0.95,
  pctDes: 46.55,
  faltasComet: 23,
  faltas90: 0.71,
  desDec: 0,
  desDec90: 0,
  pressaoT: 198,
  pressaoT90: 6.08,
  pressaoG: 53,
  pressaoG90: 1.63,
  pctPressao: 26.77,
  amarelos: 1,
  vermelhos: 0,
  totalCartoes: 1,
  faltasSemCartao: 22,
  cartoesPorFalta: 4.35,
  lancesDisputados: 50,
  lancesLimpos: 27,
  pctLancesLimpos: 54,
  pctFaltasLimpas: 95.65,
  cruzT: 176,
  cruzC: 30,
  pctCruz: 17.05,
  passesT: 1476,
  passesC: 1331,
  pctPassesCertos: 90.18,
  passesErr: 145,
  passesErr90: 4.45,
  passesCurtosErr: 36.43,
  cabsDisp: 118,
  cabsDisp90: 3.62,
  cabsG: 34,
  cabsPerd: 84,
  pctCabs: 28.81,
  passD: 64,
  passD90: 1.97,
  passDecParaAst: 7.11,
  passDecConvertidos: 14.06,
  assistClarasDesperdicadas: 0.13,
  xAPerPassD: 0.13,
  bolasInt: 84,
  bolasInt90: 2.58,
  bolasRoubadas: 80,
  bRob90: 2.46,
  participacao90: 57.23,
  lancesT: 2171.48,
  lancesT90: 66.7,
  lancesC: 1546.25,
  lancesC90: 47.5,
  pctAcerto: 71.21,
  chancesCriadas: 119.48,
  chances90: 3.67,
  acoesUltimoTerco: 257,
  ultimoTerco90: 7.89,
  distancia: 391.6,
  dist90: 12.03,
  possDesp: 194,
  possDesp90: 5.96,
  possPerd90: 11.1,
  notaMedia: 6.82,
}

describe('b2bConfig — paridade com a aba ⚙️Box-To-Box', () => {
  it('preserva exatamente os 52 cabeçalhos brutos do FM26', () => {
    expect(b2bConfig.rawColumns).toEqual(RAW_COLUMNS)
  })

  it('reflete todos os cabeçalhos numéricos derivados da aba', () => {
    const labels = b2bConfig.metrics.map((metric) => metric.label)
    expect(labels).toEqual(expect.arrayContaining(DERIVED_LABELS))
    expect(new Set(labels).size).toBe(labels.length)
  })

  it('reproduz todas as fórmulas da linha real Bruno Zapelli', () => {
    const player = derivePlayer(BRUNO_ZAPELLI, b2bConfig)
    expect(player).not.toBeNull()

    for (const [key, expected] of Object.entries(BRUNO_EXPECTED)) {
      expect(player?.[key], key).toBeCloseTo(expected, 10)
    }

    expect(b2bConfig.metrics.map((metric) => metric.key)).toEqual(
      Object.keys(BRUNO_EXPECTED),
    )
  })

  it('mantém parsing, fallbacks e referência peculiar de titularidade da planilha', () => {
    const player = derivePlayer({
      ...BRUNO_ZAPELLI,
      Presenças: '8 (4)',
      HdJ: '0',
      Pens: '0',
      'Pens M': '0',
      'Assist.': '0',
      Expira: '-',
    }, b2bConfig)

    expect(player).not.toBeNull()
    expect(player).toMatchObject({
      jogosTotais: 12,
      minPartida: 244.17,
      jogosComoTitular: 100,
      minHdj: 5000,
      pctPen: 0.0000001,
      passDecParaAst: 25,
    })
  })

  it('reproduz pênalti e ponderação de desarme decisivo da linha Erick', () => {
    const player = derivePlayer({
      ...BRUNO_ZAPELLI,
      Jogador: 'Erick',
      Minutos: '3141',
      Presenças: '30 (26)',
      Golos: '4',
      'Assist.': '2',
      Pens: '1',
      'Pens M': '0',
      xG: '3.15',
      'Cab A': '77',
      Cabs: '44',
      'Des C': '52',
      'Crt D': '5',
      Blq: '26',
      Crt: '104',
      'Rems Bloq': '21',
      Alívios: '38',
      'Press. conc.': '80',
    }, b2bConfig)

    expect(player).not.toBeNull()
    expect(player).toMatchObject({
      jogosTotais: 56,
      pensPerdidos: 1,
      pctPen: 0,
      npxG: 2.36,
      npxG90: 0.07,
      cabsDisp: 77,
      cabsG: 44,
      cabsPerd: 33,
      pctCabs: 57.14,
      desDec: 5,
      desDec90: 0.14,
      bolasRecuperadas: 161,
      bolasInt: 191.5,
      bolasInt90: 5.49,
      bolasRoubadas: 134.5,
      bRob90: 3.85,
    })
  })

  it('mantém keys canônicas e colunas padrão válidas', () => {
    const metricKeys = b2bConfig.metrics.map((metric) => metric.key)
    expect(new Set(metricKeys).size).toBe(metricKeys.length)
    expect(b2bConfig.defaultTableColumns.every((key) => metricKeys.includes(key))).toBe(true)
    expect(
      b2bConfig.metrics.filter((metric) => metric.displayInTable).map((metric) => metric.key),
    ).toEqual(b2bConfig.defaultTableColumns)
  })
})
