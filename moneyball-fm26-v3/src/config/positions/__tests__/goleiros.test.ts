import { describe, expect, it } from 'vitest'
import type { RawPlayer } from '@/types/player.ts'
import { derivePlayer } from '@/engine/derive.ts'
import { goleirosConfig } from '../goleiros.ts'

const expectedRawColumns = [
  'Inf', 'Nação', 'Clube', 'Idade', 'Jogador', 'Valor Estimado',
  'Pé Preferido', 'Salário', 'Altura', 'Expira', 'HdJ', 'Minutos',
  'Golos Sofridos', 'Ds', 'Dft', 'Dfa', 'Press. tent.', 'Poss Con/90',
  'Poss Perd/90', 'Sem golos sofridos', 'Amr', 'Cartões vermelhos',
  'Faltas Cometidas', 'Faltas Contra', 'PeP', 'Passes Ch', 'Pas A',
  'Ps C', 'xGD', 'Press. conc.', 'EPG', 'T Desa', 'Des C', 'Crt D',
  'Pen. Enfrentados', 'Pen. Defendidos', 'Classificação',
]

const workbookRow: RawPlayer = {
  Inf: 'BP',
  Nação: 'KOS',
  Clube: 'Sassuolo',
  Idade: '27',
  Jogador: 'Arijanet Murić',
  'Valor Estimado': '9,4M € - 14M €',
  'Pé Preferido': 'Somente Pé Direito',
  Salário: '177m € p/m',
  Altura: '198 cm',
  Expira: '30/06/2028',
  HdJ: '1',
  Minutos: '2035',
  'Golos Sofridos': '27',
  Ds: '16',
  Dft: '13',
  Dfa: '61',
  'Press. tent.': '0',
  'Poss Con/90': '4,2',
  'Poss Perd/90': '6,4',
  'Sem golos sofridos': '7',
  Amr: '2',
  'Cartões vermelhos': '0',
  'Faltas Cometidas': '2',
  'Faltas Contra': '2',
  PeP: '0',
  'Passes Ch': '0',
  'Pas A': '543',
  'Ps C': '469',
  xGD: '5.03',
  'Press. conc.': '0',
  EPG: '1',
  'T Desa': '1',
  'Des C': '1',
  'Crt D': '0',
  'Pen. Enfrentados': '1',
  'Pen. Defendidos': '1',
  Classificação: '6,8',
}

describe('goleirosConfig — paridade com a aba 🧤Goleiros', () => {
  it('preserva exatamente os 37 cabeçalhos de entrada FM26', () => {
    expect(goleirosConfig.rawColumns).toEqual(expectedRawColumns)
  })

  it('reproduz as fórmulas da primeira linha da planilha com parsing PT-BR', () => {
    const player = derivePlayer(workbookRow, goleirosConfig)

    expect(player).not.toBeNull()
    expect(player).toMatchObject({
      Jogador: 'Arijanet Murić',
      Nação: 'KOS',
      Clube: 'Sassuolo',
      Idade: 27,
      NotaFM: 6.8,
    })

    expect(player!.jogos_completos).toBeCloseTo(22.6111111111, 8)
    expect(player!.posse_ganha_total).toBeCloseTo(94.9666666667, 8)
    expect(player!.posse_perdida_total).toBeCloseTo(144.7111111111, 8)
    expect(player!.defesas_desviadas_90).toBeCloseTo(2.94, 8)
    expect(player!.proporcao_def_vs_chutes).toBeCloseTo(76.92, 8)
    expect(player!.chances_sofrer_gol_90).toBeCloseTo(23.08, 8)
    expect(player!.xpg_ratio).toBeCloseTo(0.72, 8)
    expect(player!.xgp).toBeCloseTo(15.7, 8)
    expect(player!.tentativas_saida_gol).toBe(4)
    expect(player!.tentativas_saida_90).toBeCloseTo(0.18, 8)
    expect(player!.saidas_sucesso).toBe(1)
    expect(player!.saidas_sucesso_90).toBeCloseTo(0.0442260442, 8)
    expect(player!.saidas_falhas).toBe(2)
    expect(player!.saidas_falhas_90).toBeCloseTo(0.09, 8)
    expect(player!.pct_saidas_sucesso).toBe(25)
    expect(player!.acoes_tentadas).toBeCloseTo(689.012, 8)
    expect(player!.acoes_com_sucesso).toBe(561)
    expect(player!.pct_acerto_goleiro).toBeCloseTo(81.42, 8)
  })

  it('mantém os fallbacks IFERROR da planilha para zeros e xGD ausente', () => {
    const player = derivePlayer({
      ...workbookRow,
      Jogador: 'Fallback',
      xGD: '-',
      'Golos Sofridos': '0',
      Ds: '0',
      Dft: '0',
      Dfa: '0',
      'Sem golos sofridos': '0',
      'Pen. Enfrentados': '0',
      'Pen. Defendidos': '0',
    }, goleirosConfig)

    expect(player).not.toBeNull()
    expect(player!.chances_sofrer_gol_90).toBe(100)
    expect(player!.xg_defendidos).toBe(0)
    expect(player!.xg_def_sem_pen).toBe(-100)
    expect(player!.xg_def_sem_pen_90).toBeCloseTo(-4.42, 8)
    expect(player!.xpg_ratio).toBe(0)
    expect(player!.xgp).toBe(0)
    expect(player!.pct_penaltis_def).toBe(-0.0000000001)
  })

  it('expõe na tabela somente métricas marcadas e mantém a seleção declarada', () => {
    const displayedLabels = goleirosConfig.metrics
      .filter((metric) => metric.displayInTable)
      .map((metric) => metric.label)

    expect(displayedLabels).toEqual(goleirosConfig.defaultTableColumns)
  })
})
