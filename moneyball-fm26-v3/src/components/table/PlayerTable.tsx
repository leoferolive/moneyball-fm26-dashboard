import { useAppStore } from '@/store/appStore.ts'
import type { DerivedPlayer } from '@/types/player.ts'
import type { MetricDefinition } from '@/config/positions/types.ts'
import type { ColumnStats } from '@/engine/statistics.ts'
import { heatmapClass } from '@/engine/statistics.ts'
import { ScoreBadge } from './ScoreBadge.tsx'
import { InfoIcon } from './InfoIcon.tsx'

interface PlayerTableProps {
  players: DerivedPlayer[]
  displayMetrics: MetricDefinition[]
  columnStats: Record<string, ColumnStats>
  onPlayerClick: (player: DerivedPlayer) => void
  selectedIds: Set<number>
  onToggleSelect: (id: number, index: number, shiftKey: boolean) => void
}

export function PlayerTable({ players, displayMetrics, columnStats, onPlayerClick, selectedIds, onToggleSelect }: PlayerTableProps) {
  const sortColumn = useAppStore((s) => s.sortColumn)
  const sortDirection = useAppStore((s) => s.sortDirection)
  const setSort = useAppStore((s) => s.setSort)

  const rankDisplay = (i: number) => String(i + 1)

  const formatValue = (val: unknown, metric: MetricDefinition) => {
    if (val == null || val === '') return '-'
    if (typeof val !== 'number') return String(val)
    if (metric.format === 'integer') return Math.round(val).toString()
    if (metric.format === 'percentage') return `${val.toFixed(metric.decimals ?? 1)}%`
    return val.toFixed(metric.decimals ?? 2)
  }

  if (players.length === 0) {
    return (
      <div className="text-center py-12" style={{ color: 'var(--color-text-muted)' }}>
        <p className="text-lg mb-2">Nenhum jogador encontrado</p>
        <p className="text-sm">Importe dados do FM26 para começar a análise.</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto" style={{ borderRadius: '4px', border: '1px solid var(--slate)' }}>
      <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--color-border)', backgroundColor: 'var(--color-bg-secondary)' }}>
            <th className="text-center" style={{ width: '32px', padding: '0.625rem 0.5rem' }}>
              <input
                type="checkbox"
                checked={players.length > 0 && players.every((p) => p._id != null && selectedIds.has(p._id))}
                onChange={() => {}}
                onClick={(e) => {
                  e.stopPropagation()
                  const allSelected = players.length > 0 && players.every((p) => p._id != null && selectedIds.has(p._id))
                  players.forEach((p, i) => {
                    if (p._id == null) return
                    const isSelected = selectedIds.has(p._id)
                    if (allSelected && isSelected) onToggleSelect(p._id, i, false)
                    else if (!allSelected && !isSelected) onToggleSelect(p._id, i, false)
                  })
                }}
              />
            </th>
            <th className="text-left text-xs font-semibold" style={{ color: 'var(--color-text-muted)', width: '40px', padding: '0.625rem 0.75rem' }}>#</th>
            <th className="text-left text-xs font-semibold" style={{ color: 'var(--color-text-muted)', padding: '0.625rem 0.75rem' }}>Jogador</th>
            <th className="text-left text-xs font-semibold" style={{ color: 'var(--color-text-muted)', padding: '0.625rem 0.75rem' }}>Clube</th>
            <th className="text-center text-xs font-semibold" style={{ color: 'var(--color-text-muted)', width: '40px', padding: '0.625rem 0.75rem' }}>Idade</th>
            {players[0]?._customScore !== undefined && (
              <th
                className="text-center text-xs font-semibold cursor-pointer select-none"
                style={{ color: sortColumn === '_customScore' ? 'var(--color-accent)' : 'var(--color-text-muted)', width: '60px', padding: '0.625rem 0.75rem' }}
                onClick={() => setSort('_customScore')}
              >
                Score {sortColumn === '_customScore' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
              </th>
            )}
            {displayMetrics.map((metric) => (
              <th
                key={metric.key}
                className="text-right text-xs font-semibold cursor-pointer select-none whitespace-nowrap"
                style={{ color: sortColumn === metric.key ? 'var(--color-accent)' : 'var(--color-text-muted)', padding: '0.625rem 0.75rem' }}
                onClick={() => setSort(metric.key)}
                title={!metric.description ? metric.label : undefined}
              >
                {metric.label}
                {sortColumn === metric.key ? (sortDirection === 'asc' ? ' ↑' : ' ↓') : ''}
                {metric.description && (
                  <span onClick={(e) => e.stopPropagation()}>
                    <InfoIcon description={metric.description} />
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => {
            const isEven = index % 2 === 0
            const isSelected = player._id != null && selectedIds.has(player._id)
            const zebraBg = isSelected
              ? 'color-mix(in srgb, var(--color-accent) 12%, transparent)'
              : isEven ? 'transparent' : 'var(--color-bg-secondary)'

            return (
              <tr
                key={`${player.Jogador}-${index}`}
                className="transition-colors cursor-pointer"
                style={{
                  borderBottom: '1px solid var(--color-border)',
                  backgroundColor: zebraBg,
                }}
                onClick={() => onPlayerClick(player)}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-bg-hover)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = zebraBg }}
              >
                <td
                  className="text-center"
                  style={{ padding: '0.625rem 0.5rem' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => {}}
                    onClick={(e) => {
                      e.stopPropagation()
                      if (player._id != null) onToggleSelect(player._id, index, e.shiftKey)
                    }}
                  />
                </td>
                <td
                  className="text-center font-mono text-xs"
                  style={{
                    color: index < 3 ? 'var(--pitch)' : 'var(--color-text-muted)',
                    fontWeight: index < 3 ? 700 : 400,
                    padding: '0.625rem 0.75rem',
                  }}
                >
                  {rankDisplay(index)}
                </td>
                <td className="font-medium" style={{ color: 'var(--color-text-primary)', padding: '0.625rem 0.75rem' }}>
                  {player.Jogador}
                </td>
                <td style={{ color: 'var(--color-text-secondary)', padding: '0.625rem 0.75rem' }}>
                  {player.Clube}
                </td>
                <td className="text-center font-mono" style={{ color: 'var(--color-text-secondary)', padding: '0.625rem 0.75rem' }}>
                  {player.Idade}
                </td>
                {player._customScore !== undefined && (
                  <td className="text-center" style={{ padding: '0.625rem 0.75rem' }}>
                    <ScoreBadge score={player._customScore} />
                  </td>
                )}
                {displayMetrics.map((metric) => {
                  const val = player[metric.key]
                  const numVal = typeof val === 'number' ? val : undefined
                  const heat = numVal !== undefined && columnStats[metric.key]
                    ? heatmapClass(numVal, columnStats[metric.key], metric.lowerIsBetter)
                    : ''

                  return (
                    <td
                      key={metric.key}
                      className="text-right font-mono text-xs"
                      style={{
                        padding: '0.625rem 0.75rem',
                        color: 'var(--color-text-primary)',
                        backgroundColor: heat === 'good'
                          ? 'var(--color-heat-good)'
                          : heat === 'bad'
                            ? 'var(--color-heat-bad)'
                            : undefined,
                      }}
                    >
                      {formatValue(val, metric)}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
