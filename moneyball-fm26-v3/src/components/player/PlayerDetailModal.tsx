import { useEffect } from 'react'
import type { DerivedPlayer } from '@/types/player.ts'
import type { MetricDefinition } from '@/config/positions/types.ts'
import { ScoreBadge } from '@/components/table/ScoreBadge.tsx'

interface PlayerDetailModalProps {
  player: DerivedPlayer
  metrics: MetricDefinition[]
  onClose: () => void
}

export function PlayerDetailModal({ player, metrics, onClose }: PlayerDetailModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const formatValue = (val: unknown, metric: MetricDefinition) => {
    if (val == null || val === '') return '-'
    if (typeof val !== 'number') return String(val)
    if (metric.format === 'integer') return Math.round(val).toString()
    if (metric.format === 'percentage') return `${val.toFixed(metric.decimals ?? 1)}%`
    return val.toFixed(metric.decimals ?? 2)
  }

  // Group metrics by category
  const grouped = new Map<string, MetricDefinition[]>()
  for (const m of metrics) {
    const cat = m.category
    if (!grouped.has(cat)) grouped.set(cat, [])
    grouped.get(cat)!.push(m)
  }

  const categoryLabels: Record<string, string> = {
    general: 'Geral', attacking: 'Ataque', defending: 'Defesa',
    passing: 'Passes', pressing: 'Pressão', aerial: 'Aéreo',
    physical: 'Físico', creation: 'Criação', shooting: 'Finalização',
    goalkeeping: 'Goleiro', discipline: 'Disciplina', setpiece: 'Bola Parada',
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
      onClick={onClose}
    >
      <div
        className="rounded-xl p-6 max-w-3xl w-full mx-4 max-h-[85vh] overflow-y-auto"
        style={{ backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
              {player.Jogador}
            </h2>
            <div className="flex items-center gap-3 mt-1 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              {player.Clube && <span>{player.Clube}</span>}
              {player.Nação && <span>· {player.Nação}</span>}
              <span>· {player.Idade} anos</span>
              {player.NotaFM > 0 && <span>· FM {player.NotaFM.toFixed(2)}</span>}
            </div>
            {player._customScore !== undefined && (
              <div className="mt-2 flex items-center gap-2">
                <ScoreBadge score={player._customScore} />
                <span className="font-mono text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>
                  {player._customScore.toFixed(1)}
                </span>
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-lg px-2 cursor-pointer"
            style={{ color: 'var(--color-text-muted)' }}
          >
            ✕
          </button>
        </div>

        {/* Metrics grid by category */}
        {[...grouped.entries()].map(([category, catMetrics]) => (
          <div key={category} className="mb-5">
            <h3
              className="text-xs font-semibold uppercase tracking-wider mb-2 pb-1"
              style={{ color: 'var(--color-text-muted)', borderBottom: '1px solid var(--color-border)' }}
            >
              {categoryLabels[category] || category}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {catMetrics.map((metric) => {
                const val = player[metric.key]
                return (
                  <div
                    key={metric.key}
                    className="px-3 py-2 rounded"
                    style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
                    title={metric.description}
                  >
                    <div className="text-xs truncate" style={{ color: 'var(--color-text-muted)' }}>
                      {metric.label}
                    </div>
                    <div className="font-mono text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>
                      {formatValue(val, metric)}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
