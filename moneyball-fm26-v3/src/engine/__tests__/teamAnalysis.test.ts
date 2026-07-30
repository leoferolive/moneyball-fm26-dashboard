import { describe, expect, it } from 'vitest'
import type { DerivedPlayer } from '@/types/player.ts'
import { computeTeamAnalysis } from '../teamAnalysis.ts'

function player(index: number): DerivedPlayer {
  return {
    _position: 'time',
    _importedAt: 0,
    Jogador: `Jogador ${index}`,
    Idade: 20 + index,
    NotaFM: 7,
    Jogos90: 1,
    altura: 1.8,
    passesT90: 10,
    passesC90: 8,
    cabsDisp90: 4,
    cabsG90: 2,
    fin90: 2,
    finCertas90: 1,
    passD90: 1,
    fintas: 3,
    fintas90: 0.5,
    gols90: index,
    ast90: 1,
    desG90: 2,
  }
}

describe('computeTeamAnalysis', () => {
  it('reproduz as agregações dos 11 slots da planilha', () => {
    const metrics = computeTeamAnalysis(Array.from({ length: 12 }, (_, index) => player(index)))
    const byKey = Object.fromEntries(metrics.map((metric) => [metric.key, metric.value]))

    expect(byKey.mediaIdade).toBe(25)
    expect(byKey.passesTentados90).toBe(110)
    expect(byKey.passesCompletados90).toBe(88)
    expect(byKey.pctPasses).toBe(80)
    expect(byKey.pctCabs).toBe(50)
    expect(byKey.mediaAltura).toBeCloseTo(1.8)
  })

  it('preserva a fórmula literal que exclui o primeiro slot em Gols+Ast/90', () => {
    const metrics = computeTeamAnalysis([player(10), player(2)])
    const golsAst = metrics.find((metric) => metric.key === 'golsAst90')

    expect(golsAst?.value).toBe(3)
  })
})
