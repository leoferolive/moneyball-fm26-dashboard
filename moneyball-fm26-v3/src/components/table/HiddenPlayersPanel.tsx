import { useState } from 'react'
import type { DerivedPlayer } from '@/types/player.ts'

interface HiddenPlayersPanelProps {
  hiddenPlayers: DerivedPlayer[]
  onRestore: (ids: number[]) => void
}

export function HiddenPlayersPanel({ hiddenPlayers, onRestore }: HiddenPlayersPanelProps) {
  const [isOpen, setIsOpen] = useState(false)

  if (hiddenPlayers.length === 0) return null

  return (
    <div className="py-2">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-sm cursor-pointer"
        style={{ color: 'var(--color-text-muted)' }}
      >
        {isOpen ? '▾' : '▸'} Jogadores ocultos ({hiddenPlayers.length})
      </button>

      {isOpen && (
        <div
          className="mt-2 rounded-lg p-3 max-h-60 overflow-y-auto"
          style={{ backgroundColor: 'var(--color-bg-primary)', border: '1px solid var(--color-border)' }}
        >
          <div className="flex justify-end mb-2">
            <button
              onClick={() => onRestore(hiddenPlayers.map((p) => p._id).filter((id): id is number => id != null))}
              className="text-xs px-3 py-1.5 rounded cursor-pointer"
              style={{ backgroundColor: 'var(--color-accent)', color: '#fff' }}
            >
              Restaurar todos
            </button>
          </div>
          <div className="space-y-1">
            {hiddenPlayers.map((p) => (
              <div
                key={p._id}
                className="flex items-center justify-between text-xs px-2 py-1.5 rounded"
                style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
              >
                <span style={{ color: 'var(--color-text-secondary)' }}>
                  {p.Jogador}{p.Clube ? ` · ${p.Clube}` : ''}{p.NotaFM > 0 ? ` · ${p.NotaFM.toFixed(2)}` : ''}
                </span>
                <button
                  onClick={() => p._id != null && onRestore([p._id])}
                  className="cursor-pointer"
                  style={{ color: 'var(--color-accent)' }}
                >
                  Restaurar
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
