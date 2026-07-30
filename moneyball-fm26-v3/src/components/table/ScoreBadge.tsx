import { scoreLabel, scoreColor } from '@/config/constants.ts'

interface ScoreBadgeProps {
  score: number
}

export function ScoreBadge({ score }: ScoreBadgeProps) {
  const label = scoreLabel(score)
  const color = scoreColor(score)

  return (
    <span
      className="inline-flex items-center justify-center font-mono"
      style={{
        width: '1.75rem',
        height: '1.5rem',
        fontSize: '0.7rem',
        fontWeight: 800,
        letterSpacing: '0.02em',
        borderRadius: '3px',
        borderLeft: `3px solid ${color}`,
        backgroundColor: `color-mix(in srgb, ${color} 12%, transparent)`,
        color,
      }}
    >
      {label}
    </span>
  )
}
