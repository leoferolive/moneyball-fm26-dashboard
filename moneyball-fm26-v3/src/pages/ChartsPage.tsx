import { useState, useEffect, useMemo } from 'react'
import { useAppStore } from '@/store/appStore.ts'
import { positionConfigs } from '@/config/positions/index.ts'
import { getPlayersForPosition } from '@/db/playerStore.ts'
import { computeAllColumnStats } from '@/engine/statistics.ts'
import { ScatterPlot } from '@/components/charts/ScatterPlot.tsx'
import { DistributionChart } from '@/components/charts/DistributionChart.tsx'
import type { DerivedPlayer } from '@/types/player.ts'
import type { MetricDefinition } from '@/config/positions/types.ts'

export function ChartsPage() {
  const currentPosition = useAppStore((s) => s.currentPosition)
  const config = positionConfigs[currentPosition]

  const [players, setPlayers] = useState<DerivedPlayer[]>([])

  // User-selected metric keys (empty string means "use default")
  const [xMetricKey, setXMetricKey] = useState<string>('')
  const [yMetricKey, setYMetricKey] = useState<string>('')
  const [distMetricKey, setDistMetricKey] = useState<string>('')

  const numericMetrics = useMemo(
    () => config.metrics.filter((m) => m.format === 'number' || m.format === 'percentage' || m.format === 'integer'),
    [config],
  )

  // Derive effective keys: use selection if valid for current metrics, otherwise fall back to defaults
  const effectiveXKey = useMemo(() => {
    if (xMetricKey && numericMetrics.some((m) => m.key === xMetricKey)) return xMetricKey
    return numericMetrics[0]?.key ?? ''
  }, [xMetricKey, numericMetrics])

  const effectiveYKey = useMemo(() => {
    if (yMetricKey && numericMetrics.some((m) => m.key === yMetricKey)) return yMetricKey
    return numericMetrics[1]?.key ?? numericMetrics[0]?.key ?? ''
  }, [yMetricKey, numericMetrics])

  const effectiveDistKey = useMemo(() => {
    if (distMetricKey && numericMetrics.some((m) => m.key === distMetricKey)) return distMetricKey
    return numericMetrics[0]?.key ?? ''
  }, [distMetricKey, numericMetrics])

  // Load players from IndexedDB when position changes
  useEffect(() => {
    getPlayersForPosition(currentPosition).then(setPlayers)
  }, [currentPosition])

  // Column stats for normalization
  const allKeys = useMemo(() => numericMetrics.map((m) => m.key), [numericMetrics])
  const columnStats = useMemo(
    () => computeAllColumnStats(players, allKeys),
    [players, allKeys],
  )

  const findMetric = (key: string): MetricDefinition | undefined =>
    numericMetrics.find((m) => m.key === key)

  const xMetric = findMetric(effectiveXKey)
  const yMetric = findMetric(effectiveYKey)
  const distMetric = findMetric(effectiveDistKey)

  if (players.length === 0) {
    return (
      <div className="text-center py-16" style={{ color: 'var(--color-text-muted)' }}>
        <p className="text-lg mb-2">Nenhum jogador importado para esta posição</p>
        <p className="text-sm">Importe dados do FM26 na aba Dashboard para visualizar gráficos.</p>
      </div>
    )
  }

  const selectStyle = {
    backgroundColor: 'var(--color-bg-tertiary)',
    color: 'var(--color-text-primary)',
    border: '1px solid var(--color-border)',
  }

  return (
    <div className="px-6 py-4 space-y-6">
      {/* Scatter Plot Section */}
      <section>
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <h2
            className="text-sm font-semibold"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Dispersão
          </h2>
          <div className="flex items-center gap-2">
            <label className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Eixo X:</label>
            <select
              className="text-xs px-2 py-1 rounded cursor-pointer"
              style={selectStyle}
              value={effectiveXKey}
              onChange={(e) => setXMetricKey(e.target.value)}
            >
              {numericMetrics.map((m) => (
                <option key={m.key} value={m.key}>{m.label}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Eixo Y:</label>
            <select
              className="text-xs px-2 py-1 rounded cursor-pointer"
              style={selectStyle}
              value={effectiveYKey}
              onChange={(e) => setYMetricKey(e.target.value)}
            >
              {numericMetrics.map((m) => (
                <option key={m.key} value={m.key}>{m.label}</option>
              ))}
            </select>
          </div>
        </div>

        {xMetric && yMetric && (
          <ScatterPlot
            players={players}
            xMetric={xMetric}
            yMetric={yMetric}
          />
        )}
      </section>

      {/* Distribution Section */}
      <section>
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <h2
            className="text-sm font-semibold"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Distribuição
          </h2>
          <div className="flex items-center gap-2">
            <label className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Métrica:</label>
            <select
              className="text-xs px-2 py-1 rounded cursor-pointer"
              style={selectStyle}
              value={effectiveDistKey}
              onChange={(e) => setDistMetricKey(e.target.value)}
            >
              {numericMetrics.map((m) => (
                <option key={m.key} value={m.key}>{m.label}</option>
              ))}
            </select>
          </div>
        </div>

        {distMetric && (
          <DistributionChart
            players={players}
            metricKey={distMetric.key}
            label={distMetric.label}
          />
        )}
      </section>

      {/* Stats summary at bottom */}
      <section
        className="rounded-lg p-4"
        style={{ backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}
      >
        <h3
          className="text-xs font-semibold mb-2"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Resumo Estatístico
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {numericMetrics.slice(0, 8).map((m) => {
            const stat = columnStats[m.key]
            if (!stat || stat.count === 0) return null
            return (
              <div key={m.key} className="text-xs">
                <p className="font-medium mb-0.5" style={{ color: 'var(--color-text-secondary)' }}>
                  {m.label}
                </p>
                <div className="flex gap-3 font-mono" style={{ color: 'var(--color-text-muted)' }}>
                  <span>Min: {stat.min.toFixed(1)}</span>
                  <span>Avg: {stat.mean.toFixed(1)}</span>
                  <span>Max: {stat.max.toFixed(1)}</span>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
