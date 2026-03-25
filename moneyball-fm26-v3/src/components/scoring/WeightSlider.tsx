interface WeightSliderProps {
  metricKey: string
  label: string
  weight: number
  onChange: (key: string, weight: number) => void
  onRemove: (key: string) => void
}

export function WeightSlider({ metricKey, label, weight, onChange, onRemove }: WeightSliderProps) {
  return (
    <div
      className="flex items-center gap-3 px-3 py-2 rounded"
      style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
    >
      <button
        onClick={() => onRemove(metricKey)}
        className="text-xs cursor-pointer shrink-0"
        style={{ color: 'var(--color-score-c)' }}
        title="Remover métrica"
      >
        ✕
      </button>
      <span
        className="text-xs truncate min-w-0 flex-1"
        style={{ color: 'var(--color-text-secondary)' }}
        title={label}
      >
        {label}
      </span>
      <input
        type="range"
        min={0}
        max={100}
        value={weight}
        onChange={(e) => onChange(metricKey, Number(e.target.value))}
        className="w-24 shrink-0 accent-blue-500"
      />
      <span
        className="text-xs font-mono w-8 text-right shrink-0"
        style={{ color: 'var(--color-text-primary)' }}
      >
        {weight}
      </span>
    </div>
  )
}
