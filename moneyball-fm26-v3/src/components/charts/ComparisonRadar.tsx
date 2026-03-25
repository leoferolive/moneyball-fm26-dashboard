import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import type { DerivedPlayer } from '@/types/player.ts'
import type { MetricDefinition } from '@/config/positions/types.ts'
import type { ColumnStats } from '@/engine/statistics.ts'

interface ComparisonRadarProps {
  players: DerivedPlayer[]
  metrics: MetricDefinition[]
  stats: Record<string, ColumnStats>
}

const PLAYER_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']

function normalize(value: number, stat: ColumnStats): number {
  if (stat.max === stat.min) return 50
  return Math.round(((value - stat.min) / (stat.max - stat.min)) * 100)
}

export function ComparisonRadar({ players, metrics, stats }: ComparisonRadarProps) {
  const limitedPlayers = players.slice(0, 4)
  const limitedMetrics = metrics.slice(0, 10)

  const data = limitedMetrics.map((m) => {
    const point: Record<string, string | number> = { metric: m.label }

    limitedPlayers.forEach((p) => {
      const raw = p[m.key]
      const numVal = typeof raw === 'number' ? raw : 0
      const stat = stats[m.key]
      point[p.Jogador] = stat
        ? Math.max(0, Math.min(100, normalize(numVal, stat)))
        : 0
    })

    return point
  })

  return (
    <div
      className="rounded-lg p-4"
      style={{ backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}
    >
      <h3
        className="text-sm font-semibold mb-2 text-center"
        style={{ color: 'var(--color-text-primary)' }}
      >
        Comparação de Jogadores
      </h3>
      <ResponsiveContainer width="100%" height={360}>
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="65%">
          <PolarGrid stroke="var(--color-border)" />
          <PolarAngleAxis
            dataKey="metric"
            tick={{ fill: 'var(--color-text-secondary)', fontSize: 11 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: 'var(--color-text-muted)', fontSize: 9 }}
            tickCount={5}
          />
          {limitedPlayers.map((p, i) => (
            <Radar
              key={p.Jogador}
              name={p.Jogador}
              dataKey={p.Jogador}
              stroke={PLAYER_COLORS[i]}
              fill={PLAYER_COLORS[i]}
              fillOpacity={0.15}
              strokeWidth={2}
            />
          ))}
          <Legend
            wrapperStyle={{ color: 'var(--color-text-secondary)', fontSize: 12 }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
