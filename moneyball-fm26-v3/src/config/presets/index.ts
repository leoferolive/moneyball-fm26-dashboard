import type { WeightedMetric } from '@/types/scoring.ts'
import type { PositionKey } from '@/types/position.ts'

export interface Preset {
  id: string
  name: string
  description: string
  positionKey: PositionKey
  weights: WeightedMetric[]
}

const goleirosPresets: Preset[] = [
  {
    id: 'gk-defensor', name: 'Goleiro Defensor', description: 'Foco em defesas, reflexos e clean sheets',
    positionKey: 'goleiros',
    weights: [
      { metricKey: 'defTotais90', weight: 80 },
      { metricKey: 'pctDefSeguras', weight: 60 },
      { metricKey: 'indiceDefCriticas', weight: 90 },
      { metricKey: 'pctCleanSheet', weight: 70 },
      { metricKey: 'xGDef90', weight: 85 },
      { metricKey: 'minSofrerGol', weight: 60 },
      { metricKey: 'falhas90', weight: 40 },
    ],
  },
  {
    id: 'gk-construtor', name: 'Goleiro Construtor', description: 'Foco em passes, distribuição e saída de jogo',
    positionKey: 'goleiros',
    weights: [
      { metricKey: 'pctPassesCertos', weight: 90 },
      { metricKey: 'passesC90', weight: 70 },
      { metricKey: 'passProgr90', weight: 80 },
      { metricKey: 'passD90', weight: 60 },
      { metricKey: 'possePerd90', weight: 50 },
      { metricKey: 'pctCleanSheet', weight: 40 },
      { metricKey: 'xGDef90', weight: 50 },
    ],
  },
  {
    id: 'gk-penalti', name: 'Goleiro Pegador de Pênalti', description: 'Foco em defesas de pênalti e 1v1',
    positionKey: 'goleiros',
    weights: [
      { metricKey: 'pctPenDef', weight: 100 },
      { metricKey: 'indiceDefCriticas', weight: 80 },
      { metricKey: 'pctDefDificeis', weight: 70 },
      { metricKey: 'xGP', weight: 60 },
      { metricKey: 'defTotais90', weight: 50 },
    ],
  },
]

const zagueirosPresets: Preset[] = [
  {
    id: 'cb-aereo', name: 'Zagueiro Aéreo', description: 'Domínio nos duelos aéreos e bolas altas',
    positionKey: 'zagueiros',
    weights: [
      { metricKey: 'cabsG90', weight: 100 },
      { metricKey: 'pctCabs', weight: 90 },
      { metricKey: 'alivios90', weight: 60 },
      { metricKey: 'desG90', weight: 50 },
      { metricKey: 'interceptacoes90', weight: 50 },
      { metricKey: 'erros90', weight: 40 },
    ],
  },
  {
    id: 'cb-construtor', name: 'Zagueiro Construtor', description: 'Qualidade na saída de bola e passes longos',
    positionKey: 'zagueiros',
    weights: [
      { metricKey: 'pctPassesCertos', weight: 90 },
      { metricKey: 'passesProgr90', weight: 80 },
      { metricKey: 'passD90', weight: 70 },
      { metricKey: 'desG90', weight: 50 },
      { metricKey: 'cabsG90', weight: 40 },
      { metricKey: 'erros90', weight: 40 },
    ],
  },
  {
    id: 'cb-marcador', name: 'Zagueiro Marcador', description: 'Agressividade nos desarmes e interceptações',
    positionKey: 'zagueiros',
    weights: [
      { metricKey: 'desG90', weight: 100 },
      { metricKey: 'pctDes', weight: 80 },
      { metricKey: 'interceptacoes90', weight: 90 },
      { metricKey: 'alivios90', weight: 70 },
      { metricKey: 'pressaoG90', weight: 60 },
      { metricKey: 'erros90', weight: 50 },
    ],
  },
]

const lateraisPresets: Preset[] = [
  {
    id: 'fb-ofensivo', name: 'Lateral Ofensivo', description: 'Cruzamentos, assistências e participação ofensiva',
    positionKey: 'laterais',
    weights: [
      { metricKey: 'xA90', weight: 100 },
      { metricKey: 'cruzC90', weight: 80 },
      { metricKey: 'pctCruz', weight: 60 },
      { metricKey: 'chances90', weight: 90 },
      { metricKey: 'fintas90', weight: 50 },
      { metricKey: 'passD90', weight: 70 },
      { metricKey: 'dist90', weight: 40 },
    ],
  },
  {
    id: 'fb-equilibrado', name: 'Lateral Equilibrado', description: 'Bom nos dois lados do campo',
    positionKey: 'laterais',
    weights: [
      { metricKey: 'xA90', weight: 70 },
      { metricKey: 'desG90', weight: 70 },
      { metricKey: 'pctDes', weight: 60 },
      { metricKey: 'cruzC90', weight: 60 },
      { metricKey: 'pctPassesCertos', weight: 60 },
      { metricKey: 'eficaciaDef', weight: 50 },
      { metricKey: 'dist90', weight: 50 },
    ],
  },
  {
    id: 'fb-defensivo', name: 'Lateral Defensivo', description: 'Prioriza solidez defensiva',
    positionKey: 'laterais',
    weights: [
      { metricKey: 'desG90', weight: 100 },
      { metricKey: 'pctDes', weight: 80 },
      { metricKey: 'eficaciaDef', weight: 90 },
      { metricKey: 'cabsG90', weight: 50 },
      { metricKey: 'pctPassesCertos', weight: 40 },
      { metricKey: 'erros90', weight: 60 },
    ],
  },
]

const volantesPresets: Preset[] = [
  {
    id: 'dm-destruidor', name: 'Volante Destruidor', description: 'Desarmes, interceptações e recuperação de bola',
    positionKey: 'volantes',
    weights: [
      { metricKey: 'desG90', weight: 100 },
      { metricKey: 'pctDes', weight: 80 },
      { metricKey: 'intRec90', weight: 90 },
      { metricKey: 'bRob90', weight: 85 },
      { metricKey: 'pressaoG90', weight: 70 },
      { metricKey: 'eficaciaDef', weight: 60 },
      { metricKey: 'erros90', weight: 40 },
    ],
  },
  {
    id: 'dm-construtor', name: 'Volante Construtor', description: 'Distribuição de jogo e passes progressivos',
    positionKey: 'volantes',
    weights: [
      { metricKey: 'pctPassesCertos', weight: 90 },
      { metricKey: 'passD90', weight: 80 },
      { metricKey: 'xA90', weight: 70 },
      { metricKey: 'passesProgr90', weight: 75 },
      { metricKey: 'desG90', weight: 50 },
      { metricKey: 'intRec90', weight: 50 },
      { metricKey: 'criacao90', weight: 60 },
    ],
  },
  {
    id: 'dm-completo', name: 'Volante Completo', description: 'Equilíbrio entre defesa e construção',
    positionKey: 'volantes',
    weights: [
      { metricKey: 'desG90', weight: 70 },
      { metricKey: 'intRec90', weight: 70 },
      { metricKey: 'pctPassesCertos', weight: 70 },
      { metricKey: 'passD90', weight: 60 },
      { metricKey: 'pressaoG90', weight: 60 },
      { metricKey: 'bRob90', weight: 65 },
      { metricKey: 'eficaciaDef', weight: 55 },
    ],
  },
]

const b2bPresets: Preset[] = [
  {
    id: 'b2b-ofensivo', name: 'B2B Ofensivo', description: 'Chegada ao ataque, gols e assistências',
    positionKey: 'b2b',
    weights: [
      { metricKey: 'npxG90', weight: 100 },
      { metricKey: 'xA90', weight: 90 },
      { metricKey: 'passD90', weight: 70 },
      { metricKey: 'chances90', weight: 80 },
      { metricKey: 'pctFinCertas', weight: 50 },
      { metricKey: 'desG90', weight: 30 },
      { metricKey: 'dist90', weight: 40 },
    ],
  },
  {
    id: 'b2b-equilibrado', name: 'B2B Equilibrado', description: 'Contribui nos dois lados do campo',
    positionKey: 'b2b',
    weights: [
      { metricKey: 'npxG90', weight: 60 },
      { metricKey: 'xA90', weight: 60 },
      { metricKey: 'desG90', weight: 60 },
      { metricKey: 'pressaoG90', weight: 60 },
      { metricKey: 'pctPassesCertos', weight: 60 },
      { metricKey: 'bRob90', weight: 55 },
      { metricKey: 'dist90', weight: 50 },
    ],
  },
  {
    id: 'b2b-recuperador', name: 'B2B Recuperador', description: 'Pressão alta e recuperação de bola',
    positionKey: 'b2b',
    weights: [
      { metricKey: 'pressaoG90', weight: 100 },
      { metricKey: 'pctPressao', weight: 80 },
      { metricKey: 'bRob90', weight: 90 },
      { metricKey: 'desG90', weight: 70 },
      { metricKey: 'dist90', weight: 60 },
      { metricKey: 'xA90', weight: 40 },
    ],
  },
]

const armadoresPresets: Preset[] = [
  {
    id: 'amc-criativo', name: 'Meia Criativo', description: 'Passes decisivos, chances criadas e xA',
    positionKey: 'armadores',
    weights: [
      { metricKey: 'xA90', weight: 100 },
      { metricKey: 'passD90', weight: 90 },
      { metricKey: 'chancesPerigo90', weight: 85 },
      { metricKey: 'pctPassesCertos', weight: 50 },
      { metricKey: 'fintas90', weight: 40 },
      { metricKey: 'npxG90', weight: 30 },
    ],
  },
  {
    id: 'amc-goleador', name: 'Meia Goleador', description: 'Finalizações, gols e chegada na área',
    positionKey: 'armadores',
    weights: [
      { metricKey: 'npxG90', weight: 100 },
      { metricKey: 'gols90', weight: 90 },
      { metricKey: 'pctFinNoGol', weight: 70 },
      { metricKey: 'xA90', weight: 50 },
      { metricKey: 'fintas90', weight: 40 },
      { metricKey: 'passD90', weight: 30 },
    ],
  },
  {
    id: 'amc-completo', name: 'Meia Completo', description: 'Cria e finaliza, versatilidade ofensiva',
    positionKey: 'armadores',
    weights: [
      { metricKey: 'xA90', weight: 80 },
      { metricKey: 'npxG90', weight: 70 },
      { metricKey: 'passD90', weight: 70 },
      { metricKey: 'chancesPerigo90', weight: 65 },
      { metricKey: 'fintas90', weight: 50 },
      { metricKey: 'pctPassesCertos', weight: 50 },
      { metricKey: 'pctFinNoGol', weight: 40 },
    ],
  },
]

const avancadosPresets: Preset[] = [
  {
    id: 'st-finalizador', name: 'Centroavante Finalizador', description: 'Conversão de gols e eficiência',
    positionKey: 'avancados',
    weights: [
      { metricKey: 'gols90', weight: 100 },
      { metricKey: 'npxG90', weight: 90 },
      { metricKey: 'pctConversaoFin', weight: 80 },
      { metricKey: 'pctFinNoGol', weight: 70 },
      { metricKey: 'overUnderXG', weight: 60 },
      { metricKey: 'xA90', weight: 30 },
    ],
  },
  {
    id: 'st-completo', name: 'Atacante Completo', description: 'Gols, assistências e participação no jogo',
    positionKey: 'avancados',
    weights: [
      { metricKey: 'gols90', weight: 80 },
      { metricKey: 'npxG90', weight: 70 },
      { metricKey: 'xA90', weight: 70 },
      { metricKey: 'passD90', weight: 60 },
      { metricKey: 'fintas90', weight: 50 },
      { metricKey: 'desPresC90', weight: 40 },
      { metricKey: 'pctFinNoGol', weight: 50 },
    ],
  },
  {
    id: 'st-pivô', name: 'Atacante Pivô', description: 'Jogo aéreo, assistências e pressão',
    positionKey: 'avancados',
    weights: [
      { metricKey: 'cabsG90', weight: 90 },
      { metricKey: 'pctCabs', weight: 70 },
      { metricKey: 'xA90', weight: 80 },
      { metricKey: 'passD90', weight: 70 },
      { metricKey: 'desPresC90', weight: 60 },
      { metricKey: 'gols90', weight: 50 },
    ],
  },
]

const esforcoPresets: Preset[] = [
  {
    id: 'esf-intenso', name: 'Intensidade Máxima', description: 'Distância, sprints e pressão',
    positionKey: 'esforco',
    weights: [
      { metricKey: 'dist90', weight: 80 },
      { metricKey: 'sprints90', weight: 90 },
      { metricKey: 'pressaoT90', weight: 70 },
      { metricKey: 'pressaoC90', weight: 80 },
      { metricKey: 'desC90', weight: 60 },
      { metricKey: 'erros90', weight: 40 },
    ],
  },
]

const timePresets: Preset[] = [
  {
    id: 'time-ofensivo', name: 'Perfil Ofensivo', description: 'Gols, finalizações e criação',
    positionKey: 'time',
    weights: [
      { metricKey: 'gols90', weight: 100 },
      { metricKey: 'ast90', weight: 80 },
      { metricKey: 'npxG90', weight: 70 },
      { metricKey: 'xA90', weight: 70 },
      { metricKey: 'passD90', weight: 50 },
    ],
  },
  {
    id: 'time-defensivo', name: 'Perfil Defensivo', description: 'Desarmes, cabeceios e disciplina',
    positionKey: 'time',
    weights: [
      { metricKey: 'desG90', weight: 100 },
      { metricKey: 'cabsG90', weight: 80 },
      { metricKey: 'pctPassesCertos', weight: 60 },
      { metricKey: 'faltas90', weight: 50 },
    ],
  },
]

const overallPresets: Preset[] = [
  {
    id: 'ov-destaque', name: 'Destaque Geral', description: 'Gols, assistências e impacto ofensivo',
    positionKey: 'overall',
    weights: [
      { metricKey: 'gols90', weight: 90 },
      { metricKey: 'ast90', weight: 80 },
      { metricKey: 'npxG90', weight: 70 },
      { metricKey: 'xA90', weight: 70 },
      { metricKey: 'pctFinNoGol', weight: 50 },
      { metricKey: 'desG90', weight: 40 },
    ],
  },
  {
    id: 'ov-completo', name: 'Jogador Completo', description: 'Equilíbrio entre ataque e defesa',
    positionKey: 'overall',
    weights: [
      { metricKey: 'gols90', weight: 60 },
      { metricKey: 'xA90', weight: 60 },
      { metricKey: 'desG90', weight: 60 },
      { metricKey: 'pctCabs', weight: 50 },
      { metricKey: 'pctPassesCertos', weight: 60 },
      { metricKey: 'pressaoG90', weight: 50 },
      { metricKey: 'dist90', weight: 40 },
    ],
  },
]

const allPresets: Preset[] = [
  ...goleirosPresets, ...zagueirosPresets, ...lateraisPresets,
  ...volantesPresets, ...b2bPresets, ...armadoresPresets,
  ...avancadosPresets, ...esforcoPresets, ...timePresets, ...overallPresets,
]

export function getPresetsForPosition(position: PositionKey): Preset[] {
  return allPresets.filter((p) => p.positionKey === position)
}

export { allPresets }
