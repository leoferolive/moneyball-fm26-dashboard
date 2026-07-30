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
      className="flex gap-0.5 overflow-x-auto"
      style={{
        borderBottom: '1px solid var(--slate)',
        paddingTop: '0.625rem',
        paddingBottom: 0,
        marginTop: '0.5rem',
      }}
    >
      {POSITION_ORDER.map((key) => {
        const meta = POSITION_META[key]
        const count = playerCounts[key] || 0
        const isActive = key === currentPosition

        return (
          <button
            key={key}
            onClick={() => setCurrentPosition(key as PositionKey)}
            className="flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer"
            style={{
              padding: '0.5rem 0.875rem 0.625rem',
              fontSize: '0.8rem',
              color: isActive ? 'var(--chalk)' : 'var(--chalk-ghost)',
              fontWeight: isActive ? 600 : 400,
              borderBottom: isActive
                ? '3px solid var(--pitch)'
                : '3px solid transparent',
              background: 'transparent',
              letterSpacing: '0.01em',
            }}
          >
            <span
              className="font-mono"
              style={{
                fontSize: '0.65rem',
                fontWeight: 700,
                color: isActive ? 'var(--pitch)' : 'var(--chalk-ghost)',
                letterSpacing: '0.04em',
              }}
            >
              {meta.code}
            </span>
            <span>{meta.name}</span>
            {count > 0 && (
              <span
                className="font-mono"
                style={{
                  fontSize: '0.6rem',
                  padding: '0.125rem 0.375rem',
                  borderRadius: '3px',
                  backgroundColor: isActive ? 'var(--pitch)' : 'var(--slate)',
                  color: isActive ? '#fff' : 'var(--chalk-ghost)',
                  fontWeight: 600,
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
