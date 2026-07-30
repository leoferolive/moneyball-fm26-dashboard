import { describe, expect, it } from 'vitest'
import type { PositionConfig } from '@/config/positions/types.ts'
import { deriveAll, derivePlayer } from '../derive.ts'

const config: PositionConfig = {
  key: 'time',
  emoji: '📊',
  name: 'Teste',
  rawColumns: ['Jogador', 'Minutos', 'Classificação'],
  identityColumns: { Jogador: 'Jogador' },
  defaultTableColumns: ['Nota Média'],
  metrics: [
    {
      key: 'notaMedia',
      label: 'Nota Média',
      category: 'general',
      formula: (raw, ctx) => ctx.pf(raw['Classificação']) || 6,
      displayInTable: true,
      lowerIsBetter: false,
      format: 'number',
    },
  ],
}

describe('derivePlayer', () => {
  it('preserva jogadores com menos de 90 minutos, como a planilha', () => {
    const player = derivePlayer({ Jogador: 'Reserva', Minutos: '45' }, config)
    expect(player).not.toBeNull()
    expect(player?.Jogos90).toBe(0.5)
  })

  it('usa a métrica Nota Média quando o valor bruto é inválido', () => {
    const player = derivePlayer({
      Jogador: 'Sem nota',
      Minutos: '90',
      Classificação: '-',
    }, config)
    expect(player?.NotaFM).toBe(6)
  })

  it('mantém identidades auxiliares do FM26', () => {
    const player = derivePlayer({
      Jogador: 'Completo',
      Minutos: '90',
      'Pé Preferido': 'Pé Direito',
      Altura: '185 cm',
      Expira: '30/06/2029',
    }, config)

    expect(player?.['Pé Preferido']).toBe('Pé Direito')
    expect(player?.Altura).toBe('185 cm')
    expect(player?.Contrato).toBe('30/06/2029')
  })
})

describe('deriveAll', () => {
  it('calcula métricas que dependem da coleção inteira', () => {
    const collectionConfig: PositionConfig = {
      ...config,
      collectionMetrics: [
        {
          key: 'mediaJogos',
          label: 'Média de jogos',
          category: 'general',
          formula: () => 0,
          collectionFormula: (_player, players) =>
            players.reduce((sum, player) => sum + player.Jogos90, 0) / players.length,
          displayInTable: false,
          lowerIsBetter: false,
          format: 'number',
        },
      ],
    }

    const players = deriveAll([
      { Jogador: 'A', Minutos: '90' },
      { Jogador: 'B', Minutos: '270' },
    ], collectionConfig)

    expect(players.map((player) => player.mediaJogos)).toEqual([2, 2])
  })
})
