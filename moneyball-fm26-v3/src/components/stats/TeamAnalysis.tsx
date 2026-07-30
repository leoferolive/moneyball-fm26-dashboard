import type { TeamAnalysisMetric } from '@/engine/teamAnalysis.ts'

interface TeamAnalysisProps {
  metrics: TeamAnalysisMetric[]
}

function formatMetric(metric: TeamAnalysisMetric): string {
  const formatted = metric.value.toLocaleString('pt-BR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })
  return metric.format === 'percentage' ? `${formatted}%` : formatted
}

export function TeamAnalysis({ metrics }: TeamAnalysisProps) {
  if (metrics.length === 0) return null

  return (
    <section className="py-4" aria-labelledby="team-analysis-title">
      <div className="flex items-baseline justify-between mb-2">
        <h2
          id="team-analysis-title"
          className="text-sm font-semibold"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Análise da Equipe
        </h2>
        <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
          Primeiros 11 jogadores importados
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {metrics.map((metric) => (
          <div
            key={metric.key}
            className="rounded-lg px-3 py-2"
            style={{
              backgroundColor: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border)',
            }}
          >
            <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
              {metric.label}
            </div>
            <div
              className="font-mono text-sm font-semibold mt-1"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {formatMetric(metric)}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
