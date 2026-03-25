import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import type { DerivedPlayer } from '@/types/player.ts'
import type { MetricDefinition } from '@/config/positions/types.ts'

interface ScatterPlotProps {
  players: DerivedPlayer[]
  xMetric: MetricDefinition
  yMetric: MetricDefinition
  highlightPlayer?: string
}

interface ScatterDataPoint {
  x: number
  y: number
  name: string
}

function CustomTooltip({
  active,
  payload,
  xLabel,
  yLabel,
}: {
  active?: boolean
  payload?: Array<{ payload: ScatterDataPoint }>
  xLabel: string
  yLabel: string
}) {
  if (!active || !payload || payload.length === 0) return null

  const data = payload[0].payload

  return (
    <div
      className="rounded-lg px-3 py-2 text-xs shadow-lg"
      style={{
        backgroundColor: 'var(--color-bg-tertiary)',
        border: '1px solid var(--color-border)',
        color: 'var(--color-text-primary)',
      }}
    >
      <p className="font-semibold mb-1">{data.name}</p>
      <p style={{ color: 'var(--color-text-secondary)' }}>
        {xLabel}: <span className="font-mono">{data.x.toFixed(2)}</span>
      </p>
      <p style={{ color: 'var(--color-text-secondary)' }}>
        {yLabel}: <span className="font-mono">{data.y.toFixed(2)}</span>
      </p>
    </div>
  )
}

export function ScatterPlot({ players, xMetric, yMetric, highlightPlayer }: ScatterPlotProps) {
  const data: ScatterDataPoint[] = players
    .map((p) => {
      const xVal = p[xMetric.key]
      const yVal = p[yMetric.key]
      if (typeof xVal !== 'number' || typeof yVal !== 'number') return null
      return { x: xVal, y: yVal, name: p.Jogador }
    })
    .filter((d): d is ScatterDataPoint => d !== null)

  return (
    <div
      className="rounded-lg p-4"
      style={{ backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}
    >
      <h3
        className="text-sm font-semibold mb-3 text-center"
        style={{ color: 'var(--color-text-primary)' }}
      >
        {xMetric.label} vs {yMetric.label}
      </h3>
      <ResponsiveContainer width="100%" height={360}>
        <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
          <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
          <XAxis
            type="number"
            dataKey="x"
            name={xMetric.label}
            tick={{ fill: 'var(--color-text-muted)', fontSize: 11 }}
            label={{
              value: xMetric.label,
              position: 'insideBottom',
              offset: -10,
              fill: 'var(--color-text-secondary)',
              fontSize: 12,
            }}
          />
          <YAxis
            type="number"
            dataKey="y"
            name={yMetric.label}
            tick={{ fill: 'var(--color-text-muted)', fontSize: 11 }}
            label={{
              value: yMetric.label,
              angle: -90,
              position: 'insideLeft',
              offset: 5,
              fill: 'var(--color-text-secondary)',
              fontSize: 12,
            }}
          />
          <Tooltip
            content={<CustomTooltip xLabel={xMetric.label} yLabel={yMetric.label} />}
            cursor={{ strokeDasharray: '3 3', stroke: 'var(--color-border-light)' }}
          />
          <Scatter data={data} fill="var(--color-accent)">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  highlightPlayer && entry.name === highlightPlayer
                    ? 'var(--color-accent)'
                    : 'var(--color-text-muted)'
                }
                fillOpacity={
                  highlightPlayer && entry.name === highlightPlayer ? 1 : 0.5
                }
                r={
                  highlightPlayer && entry.name === highlightPlayer ? 6 : 4
                }
              />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}
