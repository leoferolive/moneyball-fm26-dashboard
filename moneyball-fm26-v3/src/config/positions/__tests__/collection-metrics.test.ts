import { describe, expect, it } from 'vitest'
import { positionConfigs } from '../index.ts'
import { deriveAll } from '@/engine/derive.ts'

describe('métricas globais das abas', () => {
  it('reproduz média, proporção de gols e soma de bolas enfrentadas dos goleiros', () => {
    const players = deriveAll([
      {
        Jogador: 'A',
        Minutos: '90',
        'Golos Sofridos': '1',
        Ds: '2',
        Dft: '3',
        Dfa: '4',
      },
      {
        Jogador: 'B',
        Minutos: '180',
        'Golos Sofridos': '3',
        Ds: '1',
        Dft: '1',
        Dfa: '1',
      },
    ], positionConfigs.goleiros)

    expect(players.map((player) => player.mediaJogos)).toEqual([1.5, 1.5])
    expect(players.map((player) => player.pctGolosSofridosComparado)).toEqual([25, 75])
    expect(players.map((player) => player.somaBolasEnfrentadas)).toEqual([16, 16])
  })

  it('reproduz a soma e a participação nos desarmes dos volantes', () => {
    const players = deriveAll([
      { Jogador: 'A', Minutos: '90', 'Des C': '2' },
      { Jogador: 'B', Minutos: '90', 'Des C': '6' },
    ], positionConfigs.volantes)

    expect(players.map((player) => player.somaTodosDesarmes)).toEqual([8, 8])
    expect(players.map((player) => player.pctDesEmRelacaoMedia)).toEqual([25, 75])
  })
})
