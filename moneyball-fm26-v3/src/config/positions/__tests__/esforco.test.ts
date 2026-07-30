import { describe, expect, it } from 'vitest'
import { derivePlayer } from '@/engine/derive.ts'
import type { RawPlayer } from '@/types/player.ts'
import { esforcoConfig } from '../esforco.ts'

const RAW_COLUMNS = [
  'Inf', 'Nação', 'Clube', 'Jogador', 'Idade', 'Minutos',
  'Poss Con/90', 'Press. tent.', 'Press. conc.', 'Distância',
  'Dist/90', 'Des Dec/90', 'Des C', 'Fnt', 'Classificação',
  'EPG', 'Sprints/90', 'Valor Estimado', 'Salário',
  'Recomendação', 'Observação',
]

const DERIVED_LABELS = [
  'Jogos completos',
  'Distância',
  'Dist / 90',
  'Velocidade Média (em km/h)',
  'Pressões Tentadas',
  'Pressões T /90',
  'Pressões concluídas',
  'Pressões C /90',
  '% Des + Pressões concluídas',
  'Desarmes Conseguidos',
  'Desarmes C/90',
  'Desarmes Decisivos',
  'Sprints /90',
  'Erros que geraram gol adversário',
  'Erros que originaram gols /90',
  'Placar de Esforço',
  'Nota média',
]

// Linha 2 da aba 💪Placar de Esforço.
const ANDRE: RawPlayer = {
  Inf: '',
  Nação: 'BRA',
  Clube: 'Corinthians',
  Jogador: 'André',
  Idade: '20',
  Minutos: '3212',
  'Poss Con/90': '9.6',
  'Press. tent.': '354',
  'Press. conc.': '103',
  Distância: '444,8 km',
  'Dist/90': '12.5',
  'Des Dec/90': '0.1',
  'Des C': '68',
  Fnt: '7',
  Classificação: '6.87',
  EPG: '0',
  'Sprints/90': '15.2',
  'Valor Estimado': '5,6M € - 8,4M €',
  Salário: '10,5m € p/m',
  Recomendação: '19',
  Observação: 'Nenhuma',
}

const ANDRE_EXPECTED: Record<string, number> = {
  jogosCompletos: 35.68888888888889,
  distancia: 444.8,
  dist90: 12.46,
  velocidadeMedia: 8.3088,
  pressoesTentadas: 354,
  pressoesT90: 9.92,
  pressoesConcluidas: 103,
  pressoesC90: 2.89,
  pctDesPressoes: 29.1,
  desarmesConseguidos: 68,
  desarmesC90: 1.91,
  desarmesDecisivos: 0.1,
  sprints90: 15.2,
  errosGeraramGol: 0,
  erros90: 0,
  placarEsforco: 139.92,
  notaMedia: 6.87,
}

describe('esforcoConfig — paridade com a aba 💪Placar de Esforço', () => {
  it('preserva exatamente os 21 cabeçalhos brutos da estrutura especial', () => {
    expect(esforcoConfig.rawColumns).toEqual(RAW_COLUMNS)
  })

  it('reflete todos os 17 cabeçalhos numéricos por linha', () => {
    const labels = esforcoConfig.metrics.map((metric) => metric.label)
    expect(labels).toEqual(expect.arrayContaining(DERIVED_LABELS))
    expect(new Set(labels).size).toBe(DERIVED_LABELS.length)
  })

  it('reproduz todas as fórmulas da linha real André', () => {
    const player = derivePlayer(ANDRE, esforcoConfig)
    expect(player).not.toBeNull()

    for (const [key, expected] of Object.entries(ANDRE_EXPECTED)) {
      expect(player?.[key], key).toBeCloseTo(expected, 10)
    }

    expect(esforcoConfig.metrics.map((metric) => metric.key)).toEqual(
      Object.keys(ANDRE_EXPECTED),
    )
    expect(player).toMatchObject({
      Jogador: 'André',
      Nação: 'BRA',
      Clube: 'Corinthians',
      Idade: 20,
      Salário: '10,5m € p/m',
      Valor: '5,6M € - 8,4M €',
    })
  })

  it('calcula o placar com intermediários não arredondados e penaliza EPG', () => {
    // Linha 7 da aba: a coluna raw Dist/90 é 12,2, mas a fórmula recalcula
    // 469,6 / (3475 / 90) e usa a precisão integral no placar.
    const player = derivePlayer({
      ...ANDRE,
      Jogador: 'Jean Lucas',
      Clube: 'Bahia',
      Idade: '28',
      Minutos: '3475',
      'Press. tent.': '288',
      'Press. conc.': '62',
      Distância: '469,6 km',
      'Dist/90': '12.2',
      'Des C': '48',
      Classificação: '7',
      EPG: '1',
      'Sprints/90': '11.9',
    }, esforcoConfig)

    expect(player).not.toBeNull()
    expect(player).toMatchObject({
      dist90: 12.16,
      velocidadeMedia: 8.1082,
      pressoesT90: 7.46,
      pressoesC90: 1.61,
      pctDesPressoes: 21.53,
      desarmesC90: 1.24,
      errosGeraramGol: 1,
      erros90: 0.03,
      placarEsforco: 110.73,
    })
  })

  it('mantém o fallback percentual e os arredondamentos exibidos pela aba', () => {
    const player = derivePlayer({
      ...ANDRE,
      'Press. tent.': '0',
      'Press. conc.': '0',
      Distância: '-',
    }, esforcoConfig)

    expect(player).not.toBeNull()
    expect(player).toMatchObject({
      distancia: 0,
      dist90: 0,
      velocidadeMedia: 0,
      pctDesPressoes: 0,
    })

    const decimals = Object.fromEntries(
      esforcoConfig.metrics.map((metric) => [metric.key, metric.decimals]),
    )
    expect(decimals).toMatchObject({
      jogosCompletos: 0,
      distancia: 0,
      dist90: 2,
      velocidadeMedia: 4,
      pctDesPressoes: 2,
      desarmesC90: 2,
      desarmesDecisivos: 1,
      placarEsforco: 2,
      notaMedia: 2,
    })
  })

  it('mantém keys existentes e defaults válidos', () => {
    const metricKeys = esforcoConfig.metrics.map((metric) => metric.key)
    expect(new Set(metricKeys).size).toBe(metricKeys.length)
    expect(esforcoConfig.defaultTableColumns.every((key) => metricKeys.includes(key))).toBe(true)
    expect(
      esforcoConfig.metrics.filter((metric) => metric.displayInTable).map((metric) => metric.key),
    ).toEqual(esforcoConfig.defaultTableColumns)
  })
})
