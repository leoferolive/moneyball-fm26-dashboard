import { scoreLabel, scoreColor } from '@/config/constants.ts'

interface ScoreBadgeProps {
  score: number
}

export function ScoreBadge({ score }: ScoreBadgeProps) {
  const label = scoreLabel(score)
  const color = scoreColor(score)

  return (
    <span
      className="inline-flex items-center justify-center w-8 h-6 rounded text-xs font-bold font-mono"
      style={{
        backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)`,
        color,
        border: `1px solid color-mix(in srgb, ${color} 35%, transparent)`,
      }}
    >
      {label}
    </span>
  )
}
