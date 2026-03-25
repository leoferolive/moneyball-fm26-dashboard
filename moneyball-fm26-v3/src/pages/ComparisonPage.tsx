import { useState, useEffect, useMemo } from 'react'
import { useAppStore } from '@/store/appStore.ts'
import { positionConfigs } from '@/config/positions/index.ts'
import { getPlayersForPosition } from '@/db/playerStore.ts'
import { usePlayerComparison } from '@/hooks/usePlayerComparison.ts'
import { useColumnStats } from '@/hooks/useColumnStats.ts'
import { PlayerSelector } from '@/components/comparison/PlayerSelector.tsx'
import { ComparisonTable } from '@/components/comparison/ComparisonTable.tsx'
import { ComparisonRadar } from '@/components/charts/ComparisonRadar.tsx'
import type { DerivedPlayer } from '@/types/player.ts'

export function ComparisonPage() {
  const currentPosition = useAppStore((s) => s.currentPosition)
  const config = positionConfigs[currentPosition]

  const [players, setPlayers] = useState<DerivedPlayer[]>([])
  const { selectedPlayers, addPlayer, removePlayer, clearSelection } = usePlayerComparison()

  // Load players from IndexedDB when position changes
  useEffect(() => {
    getPlayersForPosition(currentPosition).then(setPlayers)
  }, [currentPosition])

  // Clear selection when position changes
  useEffect(() => {
    clearSelection()
  }, [currentPosition, clearSelection])

  // All metrics for the comparison table
  const allMetrics = config.metrics

  // Display metrics for radar chart (only those marked displayInTable)
  const radarMetrics = useMemo(
    () => config.metrics.filter((m) => m.displayInTable),
    [config],
  )

  const radarKeys = useMemo(() => radarMetrics.map((m) => m.key), [radarMetrics])
  const radarStats = useColumnStats(players, radarKeys)

  const canCompare = selectedPlayers.length >= 2

  return (
    <div className="px-6 py-4">
      {/* Page header */}
      <div className="mb-6">
        <h2
          className="text-lg font-bold tracking-tight mb-1"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Comparar Jogadores
        </h2>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Selecione de 2 a 4 jogadores para comparar suas estatísticas lado a lado.
        </p>
      </div>

      {/* Player selector */}
      <div
        className="rounded-xl p-4 mb-6"
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          border: '1px solid var(--color-border)',
        }}
      >
        <PlayerSelector
          players={players}
          selected={selectedPlayers}
          onSelect={addPlayer}
          onRemove={removePlayer}
        />
      </div>

      {/* Empty state */}
      {!canCompare && (
        <div
          className="rounded-xl p-8 text-center"
          style={{
            backgroundColor: 'var(--color-bg-secondary)',
            border: '1px dashed var(--color-border)',
          }}
        >
          {players.length === 0 ? (
            <>
              <p className="text-lg mb-2" style={{ color: 'var(--color-text-muted)' }}>
                Nenhum jogador importado
              </p>
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                Importe dados do FM26 na aba Dashboard para começar.
              </p>
            </>
          ) : (
            <>
              <p className="text-lg mb-2" style={{ color: 'var(--color-text-muted)' }}>
                {selectedPlayers.length === 0
                  ? 'Selecione jogadores para comparar'
                  : 'Selecione pelo menos 2 jogadores'}
              </p>
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                Use a busca acima para encontrar e selecionar jogadores.
                {players.length > 0 && ` ${players.length} jogadores disponíveis.`}
              </p>
            </>
          )}
        </div>
      )}

      {/* Comparison content */}
      {canCompare && (
        <div className="space-y-6">
          {/* Radar chart */}
          <div
            className="rounded-xl p-4"
            style={{
              backgroundColor: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border)',
            }}
          >
            <h3
              className="text-sm font-semibold uppercase tracking-wider mb-4"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Radar de Comparação
            </h3>
            <ComparisonRadar
              players={selectedPlayers}
              metrics={radarMetrics}
              stats={radarStats}
            />
          </div>

          {/* Comparison table */}
          <div
            className="rounded-xl p-4"
            style={{
              backgroundColor: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border)',
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3
                className="text-sm font-semibold uppercase tracking-wider"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Comparação Detalhada
              </h3>
              <button
                onClick={clearSelection}
                className="text-xs px-3 py-1 rounded cursor-pointer transition-colors"
                style={{
                  backgroundColor: 'var(--color-bg-tertiary)',
                  color: 'var(--color-text-muted)',
                  border: '1px solid var(--color-border)',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--color-text-primary)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--color-text-muted)' }}
              >
                Limpar seleção
              </button>
            </div>
            <ComparisonTable
              players={selectedPlayers}
              metrics={allMetrics}
            />
          </div>
        </div>
      )}
    </div>
  )
}
