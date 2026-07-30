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
import { TeamAnalysis } from '@/components/stats/TeamAnalysis.tsx'
import { FilterBar } from '@/components/filters/FilterBar.tsx'
import { AdvancedFilters } from '@/components/filters/AdvancedFilters.tsx'
import { PlayerTable } from '@/components/table/PlayerTable.tsx'
import { PlayerDetailModal } from '@/components/player/PlayerDetailModal.tsx'
import { ScoringPanel } from '@/components/scoring/ScoringPanel.tsx'
import type { DerivedPlayer } from '@/types/player.ts'
import type { WeightedMetric } from '@/types/scoring.ts'
import { computeAllColumnStats } from '@/engine/statistics.ts'
import { computeTeamAnalysis } from '@/engine/teamAnalysis.ts'

export function DashboardPage() {
  const currentPosition = useAppStore((s) => s.currentPosition)
  const sortColumn = useAppStore((s) => s.sortColumn)
  const sortDirection = useAppStore((s) => s.sortDirection)

  const [rawPlayers, setRawPlayers] = useState<DerivedPlayer[]>([])
  const [selectedPlayer, setSelectedPlayer] = useState<DerivedPlayer | null>(null)
  const [activeWeights, setActiveWeights] = useState<WeightedMetric[]>([])

  const config = positionConfigs[currentPosition]
  const metrics = useMemo(
    () => [...config.metrics, ...(config.collectionMetrics ?? [])],
    [config],
  )
  const {
    loading,
    clearing,
    error,
    importData,
    clearData,
    lastResult,
  } = useImport(positionConfigs)

  // Load players from IndexedDB when position changes
  useEffect(() => {
    getPlayersForPosition(currentPosition).then(setRawPlayers)
  }, [currentPosition, lastResult])

  // Apply scoring as derived state so imports and weight changes stay in sync
  // without a second render caused by a state-setting effect.
  const players = useMemo(() => {
    if (activeWeights.length === 0) return rawPlayers

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
    return computeScoresForAll(rawPlayers, profile, stats, metrics)
  }, [rawPlayers, activeWeights, currentPosition, metrics])

  // Filter & sort
  const { filters, filteredPlayers, updateFilter, resetFilters } = useFilters(players)

  // Default sort by _customScore if scoring is active
  const effectiveSortCol = sortColumn || (activeWeights.length > 0 ? '_customScore' : null)
  const sortedPlayers = useSortedData(filteredPlayers, effectiveSortCol, sortDirection)

  // Get display metrics for current position
  const displayMetrics = useMemo(
    () => metrics.filter((m) => m.displayInTable),
    [metrics],
  )

  // Column stats for heatmap
  const columnKeys = useMemo(() => displayMetrics.map((m) => m.key), [displayMetrics])
  const columnStats = useColumnStats(sortedPlayers, columnKeys)
  const teamAnalysis = useMemo(
    () => currentPosition === 'time' ? computeTeamAnalysis(rawPlayers) : [],
    [currentPosition, rawPlayers],
  )

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

  const handleClearData = useCallback(async () => {
    if (!await clearData()) return

    setRawPlayers([])
    setSelectedPlayer(null)
    setActiveWeights([])
    resetFilters()
  }, [clearData, resetFilters])

  return (
    <div>
      <ImportPanel
        onImport={handleImport}
        onClearData={handleClearData}
        loading={loading}
        clearing={clearing}
        error={error}
        playerCount={rawPlayers.length}
      />

      {lastResult && (
        <div className="py-2">
          <span className="text-xs" style={{ color: 'var(--color-score-s)' }}>
            ✓ {lastResult.playerCount} jogadores importados ({lastResult.separatorName})
          </span>
        </div>
      )}

      <ScoringPanel
        key={currentPosition}
        positionKey={currentPosition}
        metrics={metrics}
        onProfileChange={handleProfileChange}
      />

      <StatsBar players={sortedPlayers} />
      {currentPosition === 'time' && <TeamAnalysis metrics={teamAnalysis} />}

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
          metrics={metrics}
          onClose={() => setSelectedPlayer(null)}
        />
      )}
    </div>
  )
}
