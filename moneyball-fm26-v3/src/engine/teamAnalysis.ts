import type { DerivedPlayer } from '@/types/player.ts'

export interface TeamAnalysisMetric {
  key: string
  label: string
  value: number
  format: 'number' | 'percentage'
}

function value(player: DerivedPlayer, key: string): number {
  const metric = player[key]
  return typeof metric === 'number' ? metric : 0
}

function sum(players: DerivedPlayer[], key: string): number {
  return players.reduce((total, player) => total + value(player, key), 0)
}

function average(players: DerivedPlayer[], key: string): number {
  if (players.length === 0) return 0
  return sum(players, key) / players.length
}

function percentage(numerator: number, denominator: number): number {
  return denominator === 0 ? 0 : (numerator / denominator) * 100
}

/**
 * Reproduz o bloco "Análise da Equipe" da aba 📊Time Estatísticas.
 * A planilha possui 11 slots (linhas 2–12); entradas adicionais não entram
 * no agregado. A fórmula de Gols+Ast/90 exclui literalmente o primeiro slot.
 */
export function computeTeamAnalysis(players: DerivedPlayer[]): TeamAnalysisMetric[] {
  const slots = players.slice(0, 11)
  const passesTentados90 = sum(slots, 'passesT90')
  const passesCompletados90 = sum(slots, 'passesC90')
  const cabsDisputados90 = sum(slots, 'cabsDisp90')
  const cabsGanhos90 = sum(slots, 'cabsG90')
  const finalizacoes90 = sum(slots, 'fin90')
  const finalizacoesCertas90 = sum(slots, 'finCertas90')

  return [
    { key: 'mediaIdade', label: 'Média de idade', value: average(slots, 'Idade'), format: 'number' },
    { key: 'passesTentados90', label: 'Passes tentados/90', value: passesTentados90, format: 'number' },
    { key: 'lancesAereos90', label: 'Lances aéreos disputados/90', value: cabsDisputados90, format: 'number' },
    { key: 'passesCompletados90', label: 'Passes completados/90', value: passesCompletados90, format: 'number' },
    { key: 'cabsGanhos90', label: 'Cabs ganhos/90', value: cabsGanhos90, format: 'number' },
    {
      key: 'pctPasses',
      label: '% Passes certos/90',
      value: percentage(passesCompletados90, passesTentados90),
      format: 'percentage',
    },
    {
      key: 'pctCabs',
      label: '% Cabs',
      value: percentage(cabsGanhos90, cabsDisputados90),
      format: 'percentage',
    },
    { key: 'finalizacoes90', label: 'Finalizações/90', value: finalizacoes90, format: 'number' },
    { key: 'passesDecisivos90', label: 'Pass D/90', value: sum(slots, 'passD90'), format: 'number' },
    {
      key: 'pctFinalizacoes',
      label: '% Fin',
      value: percentage(finalizacoesCertas90, finalizacoes90),
      format: 'percentage',
    },
    { key: 'fintas', label: 'Fintas', value: sum(slots, 'fintas'), format: 'number' },
    { key: 'gols90', label: 'Gols/90', value: sum(slots, 'gols90'), format: 'number' },
    { key: 'fintas90', label: 'Fintas/90', value: sum(slots, 'fintas90'), format: 'number' },
    { key: 'ast90', label: 'Ast/90', value: sum(slots, 'ast90'), format: 'number' },
    { key: 'desarmes90', label: 'Des/90', value: sum(slots, 'desG90'), format: 'number' },
    {
      key: 'golsAst90',
      label: 'Gols+Ast/90',
      value: sum(slots.slice(1), 'gols90') + sum(slots.slice(1), 'ast90'),
      format: 'number',
    },
    { key: 'mediaAltura', label: 'Média de altura', value: average(slots, 'altura'), format: 'number' },
  ]
}
