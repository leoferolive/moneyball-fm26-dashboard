import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { DerivedPlayer } from '@/types/player.ts'
import { useRowSelection } from '../useRowSelection.ts'

function makePlayers(count: number): DerivedPlayer[] {
  return Array.from({ length: count }, (_, i) => ({
    _id: i + 1,
    _position: 'zagueiros',
    _importedAt: 0,
    Jogador: `Jogador ${i + 1}`,
    Idade: 20,
    NotaFM: 7,
    Jogos90: 10,
  }))
}

describe('useRowSelection', () => {
  it('toggle simples adiciona e remove um id', () => {
    const players = makePlayers(5)
    const { result } = renderHook(() => useRowSelection(players))

    act(() => result.current.toggle(2, 1, false))
    expect([...result.current.selectedIds]).toEqual([2])

    act(() => result.current.toggle(2, 1, false))
    expect(result.current.selectedIds.size).toBe(0)
  })

  it('shift-click depois de um clique simples seleciona o intervalo contíguo por índice', () => {
    const players = makePlayers(6)
    const { result } = renderHook(() => useRowSelection(players))

    act(() => result.current.toggle(players[1]._id!, 1, false))
    act(() => result.current.toggle(players[4]._id!, 4, true))

    const ids = [...result.current.selectedIds].sort((a, b) => a - b)
    expect(ids).toEqual([players[1]._id, players[2]._id, players[3]._id, players[4]._id])
  })

  it('shift-click reverso (de baixo pra cima) também seleciona o intervalo', () => {
    const players = makePlayers(6)
    const { result } = renderHook(() => useRowSelection(players))

    act(() => result.current.toggle(players[4]._id!, 4, false))
    act(() => result.current.toggle(players[1]._id!, 1, true))

    const ids = [...result.current.selectedIds].sort((a, b) => a - b)
    expect(ids).toEqual([players[1]._id, players[2]._id, players[3]._id, players[4]._id])
  })

  it('clear esvazia a seleção', () => {
    const players = makePlayers(3)
    const { result } = renderHook(() => useRowSelection(players))

    act(() => result.current.toggle(players[0]._id!, 0, false))
    act(() => result.current.clear())

    expect(result.current.count).toBe(0)
  })

  it('selectAll seleciona todos os ids definidos', () => {
    const players = makePlayers(4)
    const { result } = renderHook(() => useRowSelection(players))

    act(() => result.current.selectAll())

    expect(result.current.count).toBe(4)
    expect([...result.current.selectedIds].sort((a, b) => a - b)).toEqual([1, 2, 3, 4])
  })
})
