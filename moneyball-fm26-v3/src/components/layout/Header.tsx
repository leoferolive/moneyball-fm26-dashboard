import { APP_VERSION } from '@/config/constants.ts'
import { useTheme } from '@/hooks/useTheme.ts'

export function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header
      className="flex items-center justify-between py-4"
      style={{
        borderBottom: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-bg-secondary)',
        paddingLeft: 'clamp(0.75rem, 2vw, 2rem)',
        paddingRight: 'clamp(0.75rem, 2vw, 2rem)',
      }}
    >
      <div className="flex items-center gap-3">
        <h1
          className="text-lg font-bold tracking-tight"
          style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-text-primary)' }}
        >
          MONEYBALL FM26
        </h1>
        <span
          className="text-xs px-2 py-0.5 rounded font-mono"
          style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-muted)' }}
        >
          {APP_VERSION}
        </span>
      </div>
      <button
        onClick={toggleTheme}
        className="text-sm px-3 py-1.5 rounded transition-colors cursor-pointer"
        style={{
          backgroundColor: 'var(--color-bg-tertiary)',
          color: 'var(--color-text-secondary)',
          border: '1px solid var(--color-border)',
        }}
        title="Alternar tema"
      >
        {theme === 'dark' ? '☀️ Claro' : '🌙 Escuro'}
      </button>
    </header>
  )
}
