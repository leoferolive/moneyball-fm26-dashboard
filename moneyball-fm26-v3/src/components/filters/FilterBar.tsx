interface FilterBarProps {
  search: string
  onSearchChange: (value: string) => void
  playerCount: number
  totalCount: number
}

export function FilterBar({ search, onSearchChange, playerCount, totalCount }: FilterBarProps) {
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="relative flex-1 max-w-sm">
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar jogador ou clube..."
          className="w-full px-3 py-1.5 rounded text-sm outline-none"
          style={{
            backgroundColor: 'var(--color-bg-tertiary)',
            color: 'var(--color-text-primary)',
            border: '1px solid var(--color-border)',
          }}
        />
      </div>
      {search && playerCount !== totalCount && (
        <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
          {playerCount} de {totalCount}
        </span>
      )}
    </div>
  )
}
