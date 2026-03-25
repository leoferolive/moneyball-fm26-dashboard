import { useAppStore } from '@/store/appStore.ts'
import { POSITION_ORDER, POSITION_META, type PositionKey } from '@/types/position.ts'

interface PositionTabsProps {
  playerCounts: Record<string, number>
}

export function PositionTabs({ playerCounts }: PositionTabsProps) {
  const currentPosition = useAppStore((s) => s.currentPosition)
  const setCurrentPosition = useAppStore((s) => s.setCurrentPosition)

  return (
    <nav
      className="flex gap-1 px-4 py-2 overflow-x-auto"
      style={{ borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-secondary)' }}
    >
      {POSITION_ORDER.map((key) => {
        const meta = POSITION_META[key]
        const count = playerCounts[key] || 0
        const isActive = key === currentPosition

        return (
          <button
            key={key}
            onClick={() => setCurrentPosition(key as PositionKey)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-sm whitespace-nowrap transition-all cursor-pointer"
            style={{
              backgroundColor: isActive ? 'var(--color-bg-tertiary)' : 'transparent',
              color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
              borderBottom: isActive ? '2px solid var(--color-accent)' : '2px solid transparent',
              fontWeight: isActive ? 600 : 400,
            }}
          >
            <span>{meta.emoji}</span>
            <span>{meta.name}</span>
            {count > 0 && (
              <span
                className="text-xs px-1.5 py-0.5 rounded-full font-mono"
                style={{
                  backgroundColor: isActive ? 'var(--color-accent)' : 'var(--color-bg-tertiary)',
                  color: isActive ? '#fff' : 'var(--color-text-muted)',
                  fontSize: '0.65rem',
                }}
              >
                {count}
              </span>
            )}
          </button>
        )
      })}
    </nav>
  )
}
