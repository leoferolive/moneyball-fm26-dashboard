import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import type { DerivedPlayer } from '@/types/player.ts'

interface DistributionChartProps {
  players: DerivedPlayer[]
  metricKey: string
  label: string
  bins?: number
}

interface BinData {
  range: string
  count: number
}

function buildBins(values: number[], binCount: number): BinData[] {
  if (values.length === 0) return []

  const min = Math.min(...values)
  const max = Math.max(...values)

  if (min === max) {
    return [{ range: min.toFixed(1), count: values.length }]
  }

  const width = (max - min) / binCount
  const bins: BinData[] = []

  for (let i = 0; i < binCount; i++) {
    const lo = min + i * width
    const hi = i === binCount - 1 ? max + 0.001 : min + (i + 1) * width
    const count = values.filter((v) => v >= lo && v < hi).length

    bins.push({
      range: `${lo.toFixed(1)}-${(i === binCount - 1 ? max : hi).toFixed(1)}`,
      count,
    })
  }

  return bins
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ value: number }>
  label?: string
}) {
  if (!active || !payload || payload.length === 0) return null

  return (
    <div
      className="rounded-lg px-3 py-2 text-xs shadow-lg"
      style={{
        backgroundColor: 'var(--color-bg-tertiary)',
        border: '1px solid var(--color-border)',
        color: 'var(--color-text-primary)',
      }}
    >
      <p style={{ color: 'var(--color-text-secondary)' }}>Faixa: {label}</p>
      <p className="font-semibold">
        Jogadores: <span className="font-mono">{payload[0].value}</span>
      </p>
    </div>
  )
}

export function DistributionChart({ players, metricKey, label, bins = 10 }: DistributionChartProps) {
  const values = players
    .map((p) => p[metricKey])
    .filter((v): v is number => typeof v === 'number' && !isNaN(v))

  const data = buildBins(values, bins)

  return (
    <div
      className="rounded-lg p-4"
      style={{ backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}
    >
      <h3
        className="text-sm font-semibold mb-3 text-center"
        style={{ color: 'var(--color-text-primary)' }}
      >
        Distribuição: {label}
      </h3>
      {data.length === 0 ? (
        <p className="text-center py-8 text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Sem dados disponíveis
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 5, right: 20, bottom: 30, left: 10 }}>
            <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="range"
              tick={{ fill: 'var(--color-text-muted)', fontSize: 10 }}
              angle={-35}
              textAnchor="end"
              height={50}
              label={{
                value: label,
                position: 'insideBottom',
                offset: -20,
                fill: 'var(--color-text-secondary)',
                fontSize: 12,
              }}
            />
            <YAxis
              tick={{ fill: 'var(--color-text-muted)', fontSize: 11 }}
              allowDecimals={false}
              label={{
                value: 'Contagem',
                angle: -90,
                position: 'insideLeft',
                offset: 5,
                fill: 'var(--color-text-secondary)',
                fontSize: 12,
              }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--color-bg-hover)' }} />
            <Bar
              dataKey="count"
              fill="var(--color-accent)"
              fillOpacity={0.8}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
