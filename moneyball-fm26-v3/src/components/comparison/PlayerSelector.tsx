import { useState, useMemo, useRef, useEffect } from 'react'
import type { DerivedPlayer } from '@/types/player.ts'
import { ScoreBadge } from '@/components/table/ScoreBadge.tsx'

interface PlayerSelectorProps {
  players: DerivedPlayer[]
  selected: DerivedPlayer[]
  onSelect: (player: DerivedPlayer) => void
  onRemove: (index: number) => void
}

const MAX_RESULTS = 10
const MAX_SELECTED = 4

export function PlayerSelector({ players, selected, onSelect, onRemove }: PlayerSelectorProps) {
  const [search, setSearch] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const isMaxReached = selected.length >= MAX_SELECTED

  // Filter players based on search text
  const filteredPlayers = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return []

    // Exclude already selected players
    const selectedKeys = new Set(
      selected.map((p) => `${p.Jogador}||${p.Clube}`),
    )

    return players
      .filter((p) => {
        const key = `${p.Jogador}||${p.Clube}`
        if (selectedKeys.has(key)) return false
        const name = (p.Jogador || '').toLowerCase()
        const club = (p.Clube || '').toLowerCase()
        return name.includes(term) || club.includes(term)
      })
      .slice(0, MAX_RESULTS)
  }, [players, search, selected])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (player: DerivedPlayer) => {
    if (isMaxReached) return
    onSelect(player)
    setSearch('')
  }

  const showDropdown = isFocused && search.trim().length > 0 && filteredPlayers.length > 0

  return (
    <div ref={containerRef} className="w-full">
      {/* Selected players chips */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {selected.map((player, index) => (
            <div
              key={`${player.Jogador}-${player.Clube}-${index}`}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm"
              style={{
                backgroundColor: 'var(--color-bg-tertiary)',
                border: '1px solid var(--color-border)',
              }}
            >
              {player._customScore !== undefined && (
                <ScoreBadge score={player._customScore} />
              )}
              <span className="font-medium" style={{ color: 'var(--color-text-primary)' }}>
                {player.Jogador}
              </span>
              {player.Clube && (
                <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  {player.Clube}
                </span>
              )}
              <button
                onClick={() => onRemove(index)}
                className="ml-1 text-xs px-1 rounded cursor-pointer transition-colors"
                style={{ color: 'var(--color-text-muted)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--color-score-c)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--color-text-muted)' }}
                title="Remover"
              >
                ✕
              </button>
            </div>
          ))}
          {selected.length > 0 && (
            <span className="self-center text-xs" style={{ color: 'var(--color-text-muted)' }}>
              {selected.length}/{MAX_SELECTED}
            </span>
          )}
        </div>
      )}

      {/* Search input */}
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder={
            isMaxReached
              ? 'Limite de 4 jogadores atingido'
              : 'Buscar jogador por nome ou clube...'
          }
          disabled={isMaxReached}
          className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-colors"
          style={{
            backgroundColor: 'var(--color-bg-tertiary)',
            color: isMaxReached ? 'var(--color-text-muted)' : 'var(--color-text-primary)',
            border: `1px solid ${isFocused && !isMaxReached ? 'var(--color-accent)' : 'var(--color-border)'}`,
            opacity: isMaxReached ? 0.6 : 1,
          }}
        />

        {/* Search icon */}
        <span
          className="absolute right-3 top-1/2 -translate-y-1/2 text-sm pointer-events-none"
          style={{ color: 'var(--color-text-muted)' }}
        >
          &#x1F50D;
        </span>

        {/* Dropdown results */}
        {showDropdown && (
          <div
            className="absolute z-40 w-full mt-1 rounded-lg overflow-hidden shadow-lg"
            style={{
              backgroundColor: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border)',
              maxHeight: '320px',
              overflowY: 'auto',
            }}
          >
            {filteredPlayers.map((player, idx) => (
              <div
                key={`${player.Jogador}-${player.Clube}-${idx}`}
                className="flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors"
                style={{ borderBottom: '1px solid var(--color-border)' }}
                onClick={() => handleSelect(player)}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-bg-hover)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '' }}
              >
                {player._customScore !== undefined && (
                  <ScoreBadge score={player._customScore} />
                )}
                <div className="flex-1 min-w-0">
                  <span className="font-medium text-sm" style={{ color: 'var(--color-text-primary)' }}>
                    {player.Jogador}
                  </span>
                  {player.Clube && (
                    <span className="ml-2 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                      {player.Clube}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  <span>{player.Idade} anos</span>
                  {player.Nação && <span>· {player.Nação}</span>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No results message */}
        {isFocused && search.trim().length > 0 && filteredPlayers.length === 0 && (
          <div
            className="absolute z-40 w-full mt-1 rounded-lg overflow-hidden shadow-lg"
            style={{
              backgroundColor: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border)',
            }}
          >
            <div className="px-4 py-3 text-sm text-center" style={{ color: 'var(--color-text-muted)' }}>
              Nenhum jogador encontrado
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
