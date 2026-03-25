import { useState, useEffect, lazy, Suspense } from 'react'
import { Header } from '@/components/layout/Header.tsx'
import { PositionTabs } from '@/components/layout/PositionTabs.tsx'
import { DashboardPage } from '@/pages/DashboardPage.tsx'
import { getPositionCounts } from '@/db/playerStore.ts'
import { useAppStore } from '@/store/appStore.ts'

const ChartsPage = lazy(() => import('@/pages/ChartsPage.tsx').then((m) => ({ default: m.ChartsPage })))
const ComparisonPage = lazy(() => import('@/pages/ComparisonPage.tsx').then((m) => ({ default: m.ComparisonPage })))

function App() {
  const [playerCounts, setPlayerCounts] = useState<Record<string, number>>({})
  const currentPosition = useAppStore((s) => s.currentPosition)
  const activeView = useAppStore((s) => s.activeView)
  const setActiveView = useAppStore((s) => s.setActiveView)

  useEffect(() => {
    const refresh = () => getPositionCounts().then(setPlayerCounts)
    refresh()
    const interval = setInterval(refresh, 2000)
    return () => clearInterval(interval)
  }, [currentPosition])

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      <Header />
      <PositionTabs playerCounts={playerCounts} />

      {/* View navigation */}
      <nav className="flex gap-1 px-6 py-2" style={{ borderBottom: '1px solid var(--color-border)' }}>
        {(['dashboard', 'charts', 'comparison'] as const).map((view) => {
          const labels = { dashboard: '📊 Dashboard', charts: '📈 Gráficos', comparison: '🔄 Comparação' }
          return (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className="text-xs px-3 py-1.5 rounded cursor-pointer transition-colors"
              style={{
                backgroundColor: activeView === view ? 'var(--color-accent)' : 'var(--color-bg-tertiary)',
                color: activeView === view ? '#fff' : 'var(--color-text-secondary)',
              }}
            >
              {labels[view]}
            </button>
          )
        })}
      </nav>

      <Suspense fallback={<div className="p-6" style={{ color: 'var(--color-text-muted)' }}>Carregando...</div>}>
        {activeView === 'dashboard' && <DashboardPage />}
        {activeView === 'charts' && <ChartsPage />}
        {activeView === 'comparison' && <ComparisonPage />}
      </Suspense>
    </div>
  )
}

export default App
