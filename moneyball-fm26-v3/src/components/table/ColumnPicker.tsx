import { useState, useMemo, useCallback } from 'react'
import type { MetricDefinition } from '@/config/positions/types.ts'
import { CATEGORY_LABELS } from '@/config/categoryLabels.ts'

interface ColumnPickerProps {
  metrics: MetricDefinition[]
  visibleKeys: Set<string>
  isCustomized: boolean
  onSetVisibleKeys: (keys: string[]) => void
  onShowAll: () => void
  onShowOnlyDefault: () => void
  onShowNone: () => void
}

export function ColumnPicker({
  metrics,
  visibleKeys,
  isCustomized,
  onSetVisibleKeys,
  onShowAll,
  onShowOnlyDefault,
  onShowNone,
}: ColumnPickerProps) {
  const [isOpen, setIsOpen] = useState(false)

  const grouped = useMemo(() => {
    const map = new Map<string, MetricDefinition[]>()
    for (const m of metrics) {
      if (!map.has(m.category)) map.set(m.category, [])
      map.get(m.category)!.push(m)
    }
    return map
  }, [metrics])

  const handleToggleKey = useCallback((key: string, checked: boolean) => {
    const next = checked
      ? [...visibleKeys, key]
      : [...visibleKeys].filter((k) => k !== key)
    onSetVisibleKeys(next)
  }, [visibleKeys, onSetVisibleKeys])

  if (!isOpen) {
    return (
      <div className="py-2">
        <button
          onClick={() => setIsOpen(true)}
          className="text-sm cursor-pointer flex items-center gap-1"
          style={{ color: 'var(--color-accent)' }}
        >
          ▦ Colunas ({visibleKeys.size}/{metrics.length})
          {isCustomized && (
            <span className="text-xs px-1.5 rounded-full" style={{ backgroundColor: 'var(--color-accent)', color: '#fff' }}>
              personalizado
            </span>
          )}
        </button>
      </div>
    )
  }

  return (
    <div className="py-4" style={{ borderBottom: '1px solid var(--color-border)' }}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
          ▦ Colunas visíveis ({visibleKeys.size}/{metrics.length})
        </h3>
        <button onClick={() => setIsOpen(false)} className="text-xs cursor-pointer" style={{ color: 'var(--color-text-muted)' }}>
          Fechar
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        <button
          onClick={onShowAll}
          className="text-xs px-3 py-1.5 rounded cursor-pointer"
          style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-secondary)' }}
        >
          Todas
        </button>
        <button
          onClick={onShowOnlyDefault}
          className="text-xs px-3 py-1.5 rounded cursor-pointer"
          style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-secondary)' }}
        >
          Somente padrão
        </button>
        <button
          onClick={onShowNone}
          className="text-xs px-3 py-1.5 rounded cursor-pointer"
          style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-secondary)' }}
        >
          Nenhuma
        </button>
      </div>

      <div
        className="rounded-lg p-3 max-h-72 overflow-y-auto"
        style={{ backgroundColor: 'var(--color-bg-primary)', border: '1px solid var(--color-border)' }}
      >
        {[...grouped.entries()].map(([cat, catMetrics]) => (
          <div key={cat} className="mb-2">
            <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-muted)' }}>
              {CATEGORY_LABELS[cat as keyof typeof CATEGORY_LABELS] || cat}
            </p>
            <div className="flex flex-wrap gap-2">
              {catMetrics.map((m) => (
                <label
                  key={m.key}
                  className="text-xs px-2 py-1 rounded cursor-pointer flex items-center gap-1"
                  style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-secondary)' }}
                  title={m.description || m.label}
                >
                  <input
                    type="checkbox"
                    checked={visibleKeys.has(m.key)}
                    onChange={(e) => handleToggleKey(m.key, e.target.checked)}
                  />
                  {m.label}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
