import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/Header.tsx'
import { PositionTabs } from '@/components/layout/PositionTabs.tsx'
import { DashboardPage } from '@/pages/DashboardPage.tsx'
import { getPositionCounts } from '@/db/playerStore.ts'
import { useAppStore } from '@/store/appStore.ts'

function App() {
  const [playerCounts, setPlayerCounts] = useState<Record<string, number>>({})
  const currentPosition = useAppStore((s) => s.currentPosition)

  // Refresh player counts periodically
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
      <DashboardPage />
    </div>
  )
}

export default App
