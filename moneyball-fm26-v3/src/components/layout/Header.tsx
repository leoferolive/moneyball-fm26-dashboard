import { APP_VERSION } from '@/config/constants.ts'
import { useTheme } from '@/hooks/useTheme.ts'

export function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header
      style={{
        backgroundColor: 'var(--turf-deep)',
        borderBottom: '1px solid var(--slate)',
      }}
    >
      {/* Scout accent line */}
      <div
        style={{
          height: '2px',
          background: 'linear-gradient(90deg, var(--pitch) 0%, var(--pitch) 25%, transparent 100%)',
        }}
      />

      <div
        className="flex items-center justify-between"
        style={{
          padding: '0.875rem clamp(0.75rem, 2vw, 2rem)',
          maxWidth: '1540px',
          margin: '0 auto',
        }}
      >
        <div className="flex items-center gap-3">
          <h1
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1.125rem',
              fontWeight: 800,
              letterSpacing: '0.05em',
              color: 'var(--chalk)',
            }}
          >
            MONEYBALL{' '}
            <span style={{ color: 'var(--pitch)' }}>FM26</span>
          </h1>
          <span
            className="font-mono"
            style={{
              fontSize: '0.6rem',
              padding: '0.2rem 0.5rem',
              borderRadius: '2px',
              backgroundColor: 'var(--slate)',
              color: 'var(--chalk-ghost)',
              letterSpacing: '0.04em',
            }}
          >
            {APP_VERSION}
          </span>
        </div>

        <button
          onClick={toggleTheme}
          className="cursor-pointer transition-colors"
          style={{
            fontSize: '0.75rem',
            padding: '0.375rem 0.75rem',
            borderRadius: '4px',
            backgroundColor: 'var(--turf-elevated)',
            color: 'var(--chalk-faded)',
            border: '1px solid var(--slate)',
          }}
          title="Alternar tema"
        >
          {theme === 'dark' ? '◐ Claro' : '◑ Escuro'}
        </button>
      </div>
    </header>
  )
}
