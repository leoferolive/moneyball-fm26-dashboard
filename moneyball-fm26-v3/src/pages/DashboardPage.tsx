import { useState, useEffect, useCallback, useMemo } from 'react'
import { useAppStore } from '@/store/appStore.ts'
import { positionConfigs } from '@/config/positions/index.ts'
import { useImport } from '@/hooks/useImport.ts'
import { useFilters } from '@/hooks/useFilters.ts'
import { useSortedData } from '@/hooks/useSortedData.ts'
import { useColumnStats } from '@/hooks/useColumnStats.ts'
import { getPlayersForPosition } from '@/db/playerStore.ts'
import { ImportPanel } from '@/components/import/ImportPanel.tsx'
import { StatsBar } from '@/components/stats/StatsBar.tsx'
import { FilterBar } from '@/components/filters/FilterBar.tsx'
import { PlayerTable } from '@/components/table/PlayerTable.tsx'
import { PlayerDetailModal } from '@/components/player/PlayerDetailModal.tsx'
import type { DerivedPlayer } from '@/types/player.ts'

export function DashboardPage() {
  const currentPosition = useAppStore((s) => s.currentPosition)
  const sortColumn = useAppStore((s) => s.sortColumn)
  const sortDirection = useAppStore((s) => s.sortDirection)

  const [players, setPlayers] = useState<DerivedPlayer[]>([])
  const [selectedPlayer, setSelectedPlayer] = useState<DerivedPlayer | null>(null)

  const config = positionConfigs[currentPosition]
  const { loading, error, importData, lastResult } = useImport(positionConfigs)

  // Load players from IndexedDB when position changes
  useEffect(() => {
    getPlayersForPosition(currentPosition).then(setPlayers)
  }, [currentPosition, lastResult])

  // Filter & sort
  const { filters, filteredPlayers, updateFilter } = useFilters(players)
  const sortedPlayers = useSortedData(filteredPlayers, sortColumn, sortDirection)

  // Get display metrics for current position
  const displayMetrics = useMemo(
    () => config.metrics.filter((m) => m.displayInTable),
    [config],
  )

  // Column stats for heatmap
  const columnKeys = useMemo(() => displayMetrics.map((m) => m.key), [displayMetrics])
  const columnStats = useColumnStats(sortedPlayers, columnKeys)

  const handleImport = useCallback(
    (rawText: string) => importData(rawText),
    [importData],
  )

  return (
    <div>
      <ImportPanel onImport={handleImport} loading={loading} error={error} />

      {lastResult && (
        <div className="px-6 py-2">
          <span className="text-xs" style={{ color: 'var(--color-score-s)' }}>
            ✓ {lastResult.playerCount} jogadores importados ({lastResult.separatorName})
          </span>
        </div>
      )}

      <StatsBar players={sortedPlayers} />

      <FilterBar
        search={filters.search}
        onSearchChange={(v) => updateFilter('search', v)}
        playerCount={filteredPlayers.length}
        totalCount={players.length}
      />

      <div className="px-6 pb-6">
        <PlayerTable
          players={sortedPlayers}
          displayMetrics={displayMetrics}
          columnStats={columnStats}
          onPlayerClick={setSelectedPlayer}
        />
      </div>

      {selectedPlayer && (
        <PlayerDetailModal
          player={selectedPlayer}
          metrics={config.metrics}
          onClose={() => setSelectedPlayer(null)}
        />
      )}
    </div>
  )
}
