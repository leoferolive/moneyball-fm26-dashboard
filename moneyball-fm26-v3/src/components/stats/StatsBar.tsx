import type { DerivedPlayer } from '@/types/player.ts'

interface StatsBarProps {
  players: DerivedPlayer[]
}

export function StatsBar({ players }: StatsBarProps) {
  if (players.length === 0) return null

  const count = players.length
  const scores = players.map((p) => p._customScore).filter((s): s is number => s !== undefined)
  const bestScore = scores.length > 0 ? Math.max(...scores) : 0
  const avgScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0
  const bestFM = Math.max(...players.map((p) => p.NotaFM))

  const stats = [
    { label: 'Jogadores', value: String(count) },
    { label: 'Melhor Score', value: bestScore.toFixed(1) },
    { label: 'Média Score', value: avgScore.toFixed(1) },
    { label: 'Melhor Nota FM', value: bestFM.toFixed(2) },
  ]

  return (
    <div className="flex flex-wrap gap-3 px-6 py-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex items-center gap-2 px-3 py-1.5 rounded"
          style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
        >
          <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            {stat.label}
          </span>
          <span className="text-sm font-bold font-mono" style={{ color: 'var(--color-text-primary)' }}>
            {stat.value}
          </span>
        </div>
      ))}
    </div>
  )
}
