interface RangeSliderProps {
  label: string
  min: number
  max: number
  value: [number, number] | null
  onChange: (value: [number, number] | null) => void
  step?: number
  formatValue?: (v: number) => string
}

export function RangeSlider({ label, min, max, value, onChange, step = 1, formatValue }: RangeSliderProps) {
  const currentMin = value ? value[0] : min
  const currentMax = value ? value[1] : max
  const fmt = formatValue || String

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{label}</span>
        {value && (
          <button
            onClick={() => onChange(null)}
            className="text-xs cursor-pointer"
            style={{ color: 'var(--color-score-c)' }}
          >
            ✕
          </button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs font-mono w-12" style={{ color: 'var(--color-text-secondary)' }}>
          {fmt(currentMin)}
        </span>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={currentMin}
          onChange={(e) => onChange([Number(e.target.value), currentMax])}
          className="flex-1 accent-blue-500"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={currentMax}
          onChange={(e) => onChange([currentMin, Number(e.target.value)])}
          className="flex-1 accent-blue-500"
        />
        <span className="text-xs font-mono w-12 text-right" style={{ color: 'var(--color-text-secondary)' }}>
          {fmt(currentMax)}
        </span>
      </div>
    </div>
  )
}
