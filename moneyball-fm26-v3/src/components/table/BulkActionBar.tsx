interface BulkActionBarProps {
  count: number
  onHide: () => void
  onClear: () => void
}

export function BulkActionBar({ count, onHide, onClear }: BulkActionBarProps) {
  return (
    <div
      className="py-2 px-3 mb-2 rounded flex items-center gap-3"
      style={{ backgroundColor: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border)' }}
    >
      <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
        {count} selecionado{count === 1 ? '' : 's'}
      </span>
      <button
        onClick={onHide}
        className="text-xs px-3 py-1.5 rounded cursor-pointer"
        style={{ backgroundColor: 'var(--color-score-c)', color: '#fff' }}
      >
        Ocultar selecionados
      </button>
      <button
        onClick={onClear}
        className="text-xs px-3 py-1.5 rounded cursor-pointer"
        style={{ backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-text-secondary)' }}
      >
        Limpar seleção
      </button>
    </div>
  )
}
