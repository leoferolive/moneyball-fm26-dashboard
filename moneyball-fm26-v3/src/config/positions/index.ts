import type { PositionKey } from '@/types/position.ts'
import type { MetricDefinition, PositionConfig } from './types.ts'
import { goleirosConfig } from './goleiros.ts'
import { zagueirosConfig } from './zagueiros.ts'
import { lateraisConfig } from './laterais.ts'
import { volantesConfig } from './volantes.ts'
import { b2bConfig } from './b2b.ts'
import { armadoresConfig } from './armadores.ts'
import { avancadosConfig } from './avancados.ts'
import { esforcoConfig } from './esforco.ts'
import { timeConfig } from './time.ts'
import { overallConfig } from './overall.ts'

function collectionMetric(
  key: string,
  label: string,
  formula: NonNullable<MetricDefinition['collectionFormula']>,
  format: MetricDefinition['format'] = 'number',
  decimals = 2,
): MetricDefinition {
  return {
    key,
    label,
    category: 'general',
    formula: () => 0,
    collectionFormula: formula,
    displayInTable: false,
    lowerIsBetter: false,
    format,
    decimals,
    description: 'Métrica calculada sobre toda a coleção importada, como na planilha.',
  }
}

const averageGames = collectionMetric(
  'mediaJogos',
  'Média de jogos',
  (_player, players) => {
    if (players.length === 0) return 0
    return players.reduce((sum, player) => sum + player.Jogos90, 0) / players.length
  },
)

function withCollectionMetrics(
  config: PositionConfig,
  extraMetrics: MetricDefinition[] = [],
): PositionConfig {
  return {
    ...config,
    collectionMetrics: [averageGames, ...extraMetrics],
  }
}

const goleirosCollectionMetrics = [
  collectionMetric(
    'pctGolosSofridosComparado',
    '% Gols Sofridos comparado aos outros goleiros',
    (player, players) => {
      const total = players.reduce(
        (sum, item) => sum + Number(item.golos_sofridos ?? 0),
        0,
      )
      return total === 0 ? 0 : (Number(player.golos_sofridos ?? 0) / total) * 100
    },
    'percentage',
  ),
  collectionMetric(
    'somaBolasEnfrentadas',
    'Soma de todas as bolas enfrentadas',
    (_player, players) => players.reduce(
      (sum, item) => sum + Number(item.bolas_enfrentadas ?? 0),
      0,
    ),
    'integer',
    0,
  ),
]

const volantesCollectionMetrics = [
  collectionMetric(
    'somaTodosDesarmes',
    'Soma de todos os desarmes',
    (_player, players) => players.reduce(
      (sum, item) => sum + Number(item.desG ?? 0),
      0,
    ),
    'integer',
    0,
  ),
  collectionMetric(
    'pctDesEmRelacaoMedia',
    '% Des em relação a media',
    (player, players) => {
      const total = players.reduce((sum, item) => sum + Number(item.desG ?? 0), 0)
      return total === 0 ? 0 : (Number(player.desG ?? 0) / total) * 100
    },
    'percentage',
  ),
]

export const positionConfigs: Record<PositionKey, PositionConfig> = {
  goleiros: withCollectionMetrics(goleirosConfig, goleirosCollectionMetrics),
  zagueiros: withCollectionMetrics(zagueirosConfig),
  laterais: withCollectionMetrics(lateraisConfig),
  volantes: withCollectionMetrics(volantesConfig, volantesCollectionMetrics),
  b2b: withCollectionMetrics(b2bConfig),
  armadores: withCollectionMetrics(armadoresConfig),
  avancados: withCollectionMetrics(avancadosConfig),
  esforco: withCollectionMetrics(esforcoConfig),
  time: timeConfig,
  overall: withCollectionMetrics(overallConfig),
}
