import type { DerivedPlayer } from '@/types/player.ts'
import type { MetricDefinition } from '@/config/positions/types.ts'
import { ScoreBadge } from '@/components/table/ScoreBadge.tsx'

interface ComparisonTableProps {
  players: DerivedPlayer[]
  metrics: MetricDefinition[]
}

const categoryLabels: Record<string, string> = {
  general: 'Geral',
  attacking: 'Ataque',
  defending: 'Defesa',
  passing: 'Passes',
  pressing: 'Pressão',
  aerial: 'Aéreo',
  physical: 'Físico',
  creation: 'Criação',
  shooting: 'Finalização',
  goalkeeping: 'Goleiro',
  discipline: 'Disciplina',
  setpiece: 'Bola Parada',
}

function formatValue(val: unknown, metric: MetricDefinition): string {
  if (val == null || val === '') return '-'
  if (typeof val !== 'number') return String(val)
  if (metric.format === 'integer') return Math.round(val).toString()
  if (metric.format === 'percentage') return `${val.toFixed(metric.decimals ?? 1)}%`
  return val.toFixed(metric.decimals ?? 2)
}

/**
 * For a given metric row, determine which player index(es) have the best value.
 * Returns a Set of indices that share the best value.
 */
function findBestIndices(
  players: DerivedPlayer[],
  metricKey: string,
  lowerIsBetter: boolean,
): Set<number> {
  const best = new Set<number>()
  let bestVal: number | null = null

  players.forEach((player, index) => {
    const val = player[metricKey]
    if (typeof val !== 'number') return

    if (bestVal === null) {
      bestVal = val
      best.clear()
      best.add(index)
    } else if (lowerIsBetter ? val < bestVal : val > bestVal) {
      bestVal = val
      best.clear()
      best.add(index)
    } else if (val === bestVal) {
      best.add(index)
    }
  })

  return best
}

export function ComparisonTable({ players, metrics }: ComparisonTableProps) {
  // Group metrics by category
  const grouped = new Map<string, MetricDefinition[]>()
  for (const m of metrics) {
    const cat = m.category
    if (!grouped.has(cat)) grouped.set(cat, [])
    grouped.get(cat)!.push(m)
  }

  const playerCount = players.length
  // Dynamic column width: metric label column + player columns
  const playerColWidth = `${Math.floor(70 / playerCount)}%`

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
        {/* Header with player names */}
        <thead>
          <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
            <th
              className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
              style={{ color: 'var(--color-text-muted)', width: '30%' }}
            >
              Métrica
            </th>
            {players.map((player, index) => (
              <th
                key={`${player.Jogador}-${index}`}
                className="px-3 py-3 text-center"
                style={{ width: playerColWidth }}
              >
                <div className="flex flex-col items-center gap-1">
                  <span className="font-bold text-sm" style={{ color: 'var(--color-text-primary)' }}>
                    {player.Jogador}
                  </span>
                  {player.Clube && (
                    <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                      {player.Clube}
                    </span>
                  )}
                  {player._customScore !== undefined && (
                    <ScoreBadge score={player._customScore} />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {[...grouped.entries()].map(([category, catMetrics]) => (
            <CategoryGroup
              key={category}
              category={category}
              metrics={catMetrics}
              players={players}
              playerCount={playerCount}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

interface CategoryGroupProps {
  category: string
  metrics: MetricDefinition[]
  players: DerivedPlayer[]
  playerCount: number
}

function CategoryGroup({ category, metrics, players, playerCount }: CategoryGroupProps) {
  return (
    <>
      {/* Category header row */}
      <tr>
        <td
          colSpan={playerCount + 1}
          className="px-4 py-2 text-xs font-semibold uppercase tracking-wider"
          style={{
            color: 'var(--color-accent)',
            backgroundColor: 'var(--color-bg-tertiary)',
            borderBottom: '1px solid var(--color-border)',
            borderTop: '1px solid var(--color-border)',
          }}
        >
          {categoryLabels[category] || category}
        </td>
      </tr>

      {/* Metric rows */}
      {metrics.map((metric) => {
        const bestIndices = findBestIndices(players, metric.key, metric.lowerIsBetter)

        return (
          <tr
            key={metric.key}
            style={{ borderBottom: '1px solid var(--color-border)' }}
            className="transition-colors"
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-bg-hover)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '' }}
          >
            <td
              className="px-4 py-2 text-sm"
              style={{ color: 'var(--color-text-secondary)' }}
              title={metric.description}
            >
              {metric.label}
            </td>
            {players.map((player, index) => {
              const val = player[metric.key]
              const isBest = bestIndices.has(index) && bestIndices.size < players.length
              const formatted = formatValue(val, metric)

              return (
                <td
                  key={`${metric.key}-${index}`}
                  className="px-3 py-2 text-center font-mono text-sm"
                  style={{
                    color: isBest ? 'var(--color-score-s)' : 'var(--color-text-primary)',
                    fontWeight: isBest ? 700 : 400,
                    backgroundColor: isBest
                      ? 'color-mix(in srgb, var(--color-score-s) 8%, transparent)'
                      : undefined,
                  }}
                >
                  {formatted}
                </td>
              )
            })}
          </tr>
        )
      })}
    </>
  )
}
