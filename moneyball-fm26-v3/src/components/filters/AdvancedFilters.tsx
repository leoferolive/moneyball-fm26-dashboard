import { useState } from 'react'
import type { FilterState } from '@/types/filters.ts'
import { RangeSlider } from './RangeSlider.tsx'

interface AdvancedFiltersProps {
  filters: FilterState
  onUpdate: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void
  onReset: () => void
  clubs: string[]
  nationalities: string[]
}

export function AdvancedFilters({ filters, onUpdate, onReset, clubs, nationalities }: AdvancedFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)

  const activeCount = [
    filters.ageRange,
    filters.minutesMin,
    filters.scoreRange,
    filters.clubs.length > 0 ? true : null,
    filters.nationalities.length > 0 ? true : null,
    filters.fmRatingMin,
  ].filter(Boolean).length

  if (!isOpen) {
    return (
      <div className="py-1">
        <button
          onClick={() => setIsOpen(true)}
          className="text-xs cursor-pointer flex items-center gap-1"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Filtros avançados
          {activeCount > 0 && (
            <span className="px-1.5 rounded-full text-xs" style={{ backgroundColor: 'var(--color-accent)', color: '#fff' }}>
              {activeCount}
            </span>
          )}
        </button>
      </div>
    )
  }

  return (
    <div className="py-3" style={{ borderBottom: '1px solid var(--color-border)' }}>
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xs font-semibold" style={{ color: 'var(--color-text-primary)' }}>
          Filtros Avançados
        </h4>
        <div className="flex gap-2">
          {activeCount > 0 && (
            <button onClick={onReset} className="text-xs cursor-pointer" style={{ color: 'var(--color-score-c)' }}>
              Limpar filtros
            </button>
          )}
          <button onClick={() => setIsOpen(false)} className="text-xs cursor-pointer" style={{ color: 'var(--color-text-muted)' }}>
            Fechar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Age Range */}
        <RangeSlider
          label="Idade"
          min={15}
          max={45}
          value={filters.ageRange}
          onChange={(v) => onUpdate('ageRange', v)}
          formatValue={(v) => `${v}`}
        />

        {/* Min Minutes */}
        <div className="flex flex-col gap-1">
          <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Minutos mínimos</span>
          <input
            type="number"
            value={filters.minutesMin ?? ''}
            onChange={(e) => onUpdate('minutesMin', e.target.value ? Number(e.target.value) : null)}
            placeholder="ex: 900"
            className="text-xs px-2 py-1.5 rounded outline-none"
            style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
          />
        </div>

        {/* FM Rating Min */}
        <div className="flex flex-col gap-1">
          <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Nota FM mínima</span>
          <input
            type="number"
            step="0.1"
            value={filters.fmRatingMin ?? ''}
            onChange={(e) => onUpdate('fmRatingMin', e.target.value ? Number(e.target.value) : null)}
            placeholder="ex: 6.5"
            className="text-xs px-2 py-1.5 rounded outline-none"
            style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
          />
        </div>

        {/* Score Range */}
        <RangeSlider
          label="Faixa de Score"
          min={0}
          max={100}
          value={filters.scoreRange}
          onChange={(v) => onUpdate('scoreRange', v)}
          formatValue={(v) => `${v}`}
        />

        {/* Clubs */}
        {clubs.length > 0 && (
          <div className="flex flex-col gap-1">
            <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
              Clubes {filters.clubs.length > 0 && `(${filters.clubs.length})`}
            </span>
            <select
              multiple
              value={filters.clubs}
              onChange={(e) => onUpdate('clubs', Array.from(e.target.selectedOptions, (o) => o.value))}
              className="text-xs rounded outline-none max-h-20"
              style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
            >
              {clubs.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        )}

        {/* Nationalities */}
        {nationalities.length > 0 && (
          <div className="flex flex-col gap-1">
            <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
              Nacionalidades {filters.nationalities.length > 0 && `(${filters.nationalities.length})`}
            </span>
            <select
              multiple
              value={filters.nationalities}
              onChange={(e) => onUpdate('nationalities', Array.from(e.target.selectedOptions, (o) => o.value))}
              className="text-xs rounded outline-none max-h-20"
              style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
            >
              {nationalities.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  )
}
