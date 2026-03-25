import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts'
import type { DerivedPlayer } from '@/types/player.ts'
import type { MetricDefinition } from '@/config/positions/types.ts'
import type { ColumnStats } from '@/engine/statistics.ts'

interface RadarChartProps {
  player: DerivedPlayer
  metrics: MetricDefinition[]
  stats: Record<string, ColumnStats>
}

function normalize(value: number, stat: ColumnStats): number {
  if (stat.max === stat.min) return 50
  return Math.round(((value - stat.min) / (stat.max - stat.min)) * 100)
}

export function RadarChart({ player, metrics, stats }: RadarChartProps) {
  const limited = metrics.slice(0, 10)

  const data = limited.map((m) => {
    const raw = player[m.key]
    const numVal = typeof raw === 'number' ? raw : 0
    const stat = stats[m.key]
    const normalized = stat ? normalize(numVal, stat) : 0

    return {
      metric: m.label,
      value: Math.max(0, Math.min(100, normalized)),
    }
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
        {player.Jogador}
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <RechartsRadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
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
          <Radar
            name={player.Jogador}
            dataKey="value"
            stroke="var(--color-accent)"
            fill="var(--color-accent)"
            fillOpacity={0.25}
            strokeWidth={2}
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  )
}
