import { useState, useEffect, useCallback, useMemo } from 'react'
import { useAppStore } from '@/store/appStore.ts'
import { positionConfigs } from '@/config/positions/index.ts'
import { useImport } from '@/hooks/useImport.ts'
import { useFilters } from '@/hooks/useFilters.ts'
import { useSortedData } from '@/hooks/useSortedData.ts'
import { useColumnStats } from '@/hooks/useColumnStats.ts'
import { getPlayersForPosition } from '@/db/playerStore.ts'
import { computeScoresForAll } from '@/engine/scorer.ts'
import { extractClubs, extractNationalities } from '@/engine/filters.ts'
import { ImportPanel } from '@/components/import/ImportPanel.tsx'
import { StatsBar } from '@/components/stats/StatsBar.tsx'
import { FilterBar } from '@/components/filters/FilterBar.tsx'
import { AdvancedFilters } from '@/components/filters/AdvancedFilters.tsx'
import { PlayerTable } from '@/components/table/PlayerTable.tsx'
import { PlayerDetailModal } from '@/components/player/PlayerDetailModal.tsx'
import { ScoringPanel } from '@/components/scoring/ScoringPanel.tsx'
import type { DerivedPlayer } from '@/types/player.ts'
import type { WeightedMetric } from '@/types/scoring.ts'
import { computeAllColumnStats } from '@/engine/statistics.ts'

export function DashboardPage() {
  const currentPosition = useAppStore((s) => s.currentPosition)
  const sortColumn = useAppStore((s) => s.sortColumn)
  const sortDirection = useAppStore((s) => s.sortDirection)

  const [rawPlayers, setRawPlayers] = useState<DerivedPlayer[]>([])
  const [players, setPlayers] = useState<DerivedPlayer[]>([])
  const [selectedPlayer, setSelectedPlayer] = useState<DerivedPlayer | null>(null)
  const [activeWeights, setActiveWeights] = useState<WeightedMetric[]>([])

  const config = positionConfigs[currentPosition]
  const { loading, error, importData, lastResult } = useImport(positionConfigs)

  // Load players from IndexedDB when position changes
  useEffect(() => {
    getPlayersForPosition(currentPosition).then(setRawPlayers)
  }, [currentPosition, lastResult])

  // Apply scoring when weights or players change
  useEffect(() => {
    if (activeWeights.length === 0) {
      setPlayers(rawPlayers)
      return
    }

    const metricKeys = activeWeights.map((w) => w.metricKey)
    const stats = computeAllColumnStats(rawPlayers, metricKeys)
    const profile = {
      id: 'active',
      name: 'Active',
      positionKey: currentPosition,
      weights: activeWeights,
      isBuiltIn: false,
      createdAt: 0,
      updatedAt: 0,
    }
    setPlayers(computeScoresForAll(rawPlayers, profile, stats))
  }, [rawPlayers, activeWeights, currentPosition])

  // Filter & sort
  const { filters, filteredPlayers, updateFilter, resetFilters } = useFilters(players)

  // Default sort by _customScore if scoring is active
  const effectiveSortCol = sortColumn || (activeWeights.length > 0 ? '_customScore' : null)
  const sortedPlayers = useSortedData(filteredPlayers, effectiveSortCol, sortDirection)

  // Get display metrics for current position
  const displayMetrics = useMemo(
    () => config.metrics.filter((m) => m.displayInTable),
    [config],
  )

  // Column stats for heatmap
  const columnKeys = useMemo(() => displayMetrics.map((m) => m.key), [displayMetrics])
  const columnStats = useColumnStats(sortedPlayers, columnKeys)

  // Extract clubs/nationalities for filters
  const clubs = useMemo(() => extractClubs(players), [players])
  const nationalities = useMemo(() => extractNationalities(players), [players])

  const handleImport = useCallback(
    (rawText: string) => importData(rawText),
    [importData],
  )

  const handleProfileChange = useCallback((weights: WeightedMetric[]) => {
    setActiveWeights(weights)
  }, [])

  return (
    <div>
      <ImportPanel onImport={handleImport} loading={loading} error={error} />

      {lastResult && (
        <div className="py-2">
          <span className="text-xs" style={{ color: 'var(--color-score-s)' }}>
            ✓ {lastResult.playerCount} jogadores importados ({lastResult.separatorName})
          </span>
        </div>
      )}

      <ScoringPanel
        positionKey={currentPosition}
        metrics={config.metrics}
        onProfileChange={handleProfileChange}
      />

      <StatsBar players={sortedPlayers} />

      <FilterBar
        search={filters.search}
        onSearchChange={(v) => updateFilter('search', v)}
        playerCount={filteredPlayers.length}
        totalCount={players.length}
      />

      <AdvancedFilters
        filters={filters}
        onUpdate={updateFilter}
        onReset={resetFilters}
        clubs={clubs}
        nationalities={nationalities}
      />

      <div className="pb-6">
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
