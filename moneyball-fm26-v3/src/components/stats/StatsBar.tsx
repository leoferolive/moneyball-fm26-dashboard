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
    { label: 'JOGADORES', value: String(count) },
    { label: 'MELHOR', value: bestScore.toFixed(1) },
    { label: 'MÉDIA', value: avgScore.toFixed(1) },
    { label: 'NOTA FM', value: bestFM.toFixed(2) },
  ]

  return (
    <div
      className="flex items-center"
      style={{ padding: '0.5rem 0', gap: '1px' }}
    >
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className="flex items-center gap-1.5"
          style={{
            padding: '0.375rem 0.75rem',
            backgroundColor: 'var(--turf-elevated)',
            borderRadius:
              i === 0
                ? '4px 0 0 4px'
                : i === stats.length - 1
                  ? '0 4px 4px 0'
                  : '0',
          }}
        >
          <span
            className="font-mono"
            style={{
              fontSize: '0.6rem',
              color: 'var(--chalk-ghost)',
              letterSpacing: '0.06em',
              fontWeight: 500,
            }}
          >
            {stat.label}
          </span>
          <span
            className="font-mono"
            style={{
              fontSize: '0.8rem',
              color: 'var(--chalk)',
              fontWeight: 700,
            }}
          >
            {stat.value}
          </span>
        </div>
      ))}
    </div>
  )
}
