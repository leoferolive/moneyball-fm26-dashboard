import type { WeightedMetric } from '@/types/scoring.ts'
import type { PositionKey } from '@/types/position.ts'

export interface Preset {
  id: string
  name: string
  description: string
  positionKey: PositionKey
  weights: WeightedMetric[]
  isAbsolute?: boolean
}

// ── Moneyball Original (scoring absoluto da planilha) ──────────

const moneyballPresets: Preset[] = [
  { id: 'mb-goleiros', name: 'Moneyball Original', description: 'Scoring da planilha original (FM 35% + Métricas 65%)', positionKey: 'goleiros', isAbsolute: true, weights: [{ metricKey: '_moneyball', weight: 100 }] },
  { id: 'mb-zagueiros', name: 'Moneyball Original', description: 'Scoring da planilha original (FM 35% + Métricas 65%)', positionKey: 'zagueiros', isAbsolute: true, weights: [{ metricKey: '_moneyball', weight: 100 }] },
  { id: 'mb-laterais', name: 'Moneyball Original', description: 'Scoring da planilha original (FM 35% + Métricas 65%)', positionKey: 'laterais', isAbsolute: true, weights: [{ metricKey: '_moneyball', weight: 100 }] },
  { id: 'mb-volantes', name: 'Moneyball Original', description: 'Scoring da planilha original (FM 35% + Métricas 65%)', positionKey: 'volantes', isAbsolute: true, weights: [{ metricKey: '_moneyball', weight: 100 }] },
  { id: 'mb-b2b', name: 'Moneyball Original', description: 'Scoring da planilha original (FM 35% + Métricas 65%)', positionKey: 'b2b', isAbsolute: true, weights: [{ metricKey: '_moneyball', weight: 100 }] },
  { id: 'mb-armadores', name: 'Moneyball Original', description: 'Scoring da planilha original (FM 35% + Métricas 65%)', positionKey: 'armadores', isAbsolute: true, weights: [{ metricKey: '_moneyball', weight: 100 }] },
  { id: 'mb-avancados', name: 'Moneyball Original', description: 'Scoring da planilha original (FM 35% + Métricas 65%)', positionKey: 'avancados', isAbsolute: true, weights: [{ metricKey: '_moneyball', weight: 100 }] },
  { id: 'mb-esforco', name: 'Moneyball Original', description: 'Placar de esforço da planilha original', positionKey: 'esforco', isAbsolute: true, weights: [{ metricKey: '_moneyball', weight: 100 }] },
  { id: 'mb-time', name: 'Moneyball Original', description: 'Nota FM x10 da planilha original', positionKey: 'time', isAbsolute: true, weights: [{ metricKey: '_moneyball', weight: 100 }] },
  { id: 'mb-overall', name: 'Moneyball Original', description: 'Nota FM x10 da planilha original', positionKey: 'overall', isAbsolute: true, weights: [{ metricKey: '_moneyball', weight: 100 }] },
]

// ── Goleiros ───────────────────────────────────────────────────

const goleirosPresets: Preset[] = [
  {
    id: 'gk-defensor', name: 'Goleiro Defensor', description: 'Foco em defesas, reflexos e clean sheets',
    positionKey: 'goleiros',
    weights: [
      { metricKey: 'defesas_totais_jogo', weight: 80 },
      { metricKey: 'pct_def_seguras', weight: 60 },
      { metricKey: 'indice_defesas_criticas', weight: 90 },
      { metricKey: 'pct_jogos_clean_sheet', weight: 70 },
      { metricKey: 'xg_def_90', weight: 85 },
      { metricKey: 'min_p_sofrer_gol', weight: 60 },
      { metricKey: 'falhas_90', weight: 40 },
    ],
  },
  {
    id: 'gk-construtor', name: 'Goleiro Construtor', description: 'Foco em passes, distribuição e saída de jogo',
    positionKey: 'goleiros',
    weights: [
      { metricKey: 'pct_passes_certos', weight: 90 },
      { metricKey: 'passes_c_90', weight: 70 },
      { metricKey: 'pass_prog_90', weight: 80 },
      { metricKey: 'pass_d_90', weight: 60 },
      { metricKey: 'posse_perdida_90', weight: 50 },
      { metricKey: 'pct_jogos_clean_sheet', weight: 40 },
      { metricKey: 'xg_def_90', weight: 50 },
    ],
  },
  {
    id: 'gk-penalti', name: 'Goleiro Pegador de Pênalti', description: 'Foco em defesas de pênalti e 1v1',
    positionKey: 'goleiros',
    weights: [
      { metricKey: 'pct_penaltis_def', weight: 100 },
      { metricKey: 'indice_defesas_criticas', weight: 80 },
      { metricKey: 'pct_def_dificeis', weight: 70 },
      { metricKey: 'xgp', weight: 60 },
      { metricKey: 'defesas_totais_jogo', weight: 50 },
    ],
  },
]

// ── Zagueiros ──────────────────────────────────────────────────

const zagueirosPresets: Preset[] = [
  {
    id: 'cb-aereo', name: 'Zagueiro Aéreo', description: 'Domínio nos duelos aéreos e bolas altas',
    positionKey: 'zagueiros',
    weights: [
      { metricKey: 'cabsG90', weight: 100 },
      { metricKey: 'pctCabsGanhos', weight: 90 },
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
      { metricKey: 'passProg90', weight: 80 },
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
      { metricKey: 'pctDesGanhos', weight: 80 },
      { metricKey: 'interceptacoes90', weight: 90 },
      { metricKey: 'alivios90', weight: 70 },
      { metricKey: 'pressaoG90', weight: 60 },
      { metricKey: 'erros90', weight: 50 },
    ],
  },
]

// ── Laterais ───────────────────────────────────────────────────

const lateraisPresets: Preset[] = [
  {
    id: 'fb-ofensivo', name: 'Lateral Ofensivo', description: 'Cruzamentos, assistências e participação ofensiva',
    positionKey: 'laterais',
    weights: [
      { metricKey: 'xA90', weight: 100 },
      { metricKey: 'cruzC90', weight: 80 },
      { metricKey: 'pctCruzamentos', weight: 60 },
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
      { metricKey: 'pctDesGanhos', weight: 60 },
      { metricKey: 'cruzC90', weight: 60 },
      { metricKey: 'pctPassesCertos', weight: 60 },
      { metricKey: 'eficaciaDefensiva', weight: 50 },
      { metricKey: 'dist90', weight: 50 },
    ],
  },
  {
    id: 'fb-defensivo', name: 'Lateral Defensivo', description: 'Prioriza solidez defensiva',
    positionKey: 'laterais',
    weights: [
      { metricKey: 'desG90', weight: 100 },
      { metricKey: 'pctDesGanhos', weight: 80 },
      { metricKey: 'eficaciaDefensiva', weight: 90 },
      { metricKey: 'cabsG90', weight: 50 },
      { metricKey: 'pctPassesCertos', weight: 40 },
      { metricKey: 'erros90', weight: 60 },
    ],
  },
]

// ── Volantes ───────────────────────────────────────────────────

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

// ── Box-to-Box ─────────────────────────────────────────────────

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

// ── Armadores ──────────────────────────────────────────────────

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

// ── Avançados ──────────────────────────────────────────────────

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

// ── Esforço ────────────────────────────────────────────────────

const esforcoPresets: Preset[] = [
  {
    id: 'esf-intenso', name: 'Intensidade Máxima', description: 'Distância, sprints e pressão',
    positionKey: 'esforco',
    weights: [
      { metricKey: 'dist90', weight: 80 },
      { metricKey: 'sprints90', weight: 90 },
      { metricKey: 'pressoesT90', weight: 70 },
      { metricKey: 'pressoesC90', weight: 80 },
      { metricKey: 'desarmesC90', weight: 60 },
      { metricKey: 'erros90', weight: 40 },
    ],
  },
]

// ── Time ───────────────────────────────────────────────────────

const timePresets: Preset[] = [
  {
    id: 'time-ofensivo', name: 'Perfil Ofensivo', description: 'Gols, finalizações e criação',
    positionKey: 'time',
    weights: [
      { metricKey: 'gols90', weight: 100 },
      { metricKey: 'ast90', weight: 80 },
      { metricKey: 'npxg90', weight: 70 },
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
      { metricKey: 'falhas90', weight: 50 },
    ],
  },
]

// ── Overall ────────────────────────────────────────────────────

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

// ── Export ──────────────────────────────────────────────────────

const allPresets: Preset[] = [
  ...moneyballPresets,
  ...goleirosPresets, ...zagueirosPresets, ...lateraisPresets,
  ...volantesPresets, ...b2bPresets, ...armadoresPresets,
  ...avancadosPresets, ...esforcoPresets, ...timePresets, ...overallPresets,
]

export function getPresetsForPosition(position: PositionKey): Preset[] {
  return allPresets.filter((p) => p.positionKey === position)
}

export { allPresets }
