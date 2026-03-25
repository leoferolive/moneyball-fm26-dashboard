import { useState, useCallback, useMemo } from 'react'
import type { MetricDefinition } from '@/config/positions/types.ts'
import type { ScoringProfile, WeightedMetric } from '@/types/scoring.ts'
import type { PositionKey } from '@/types/position.ts'
import { WeightSlider } from './WeightSlider.tsx'
import { saveProfile, getProfilesForPosition, deleteProfile } from '@/db/profileStore.ts'

interface ScoringPanelProps {
  positionKey: PositionKey
  metrics: MetricDefinition[]
  onProfileChange: (weights: WeightedMetric[]) => void
}

export function ScoringPanel({ positionKey, metrics, onProfileChange }: ScoringPanelProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [weights, setWeights] = useState<WeightedMetric[]>([])
  const [savedProfiles, setSavedProfiles] = useState<ScoringProfile[]>([])
  const [profileName, setProfileName] = useState('')
  const [showMetricPicker, setShowMetricPicker] = useState(false)

  // Load saved profiles
  const loadProfiles = useCallback(async () => {
    const profiles = await getProfilesForPosition(positionKey)
    setSavedProfiles(profiles)
  }, [positionKey])

  // Available metrics (not yet selected)
  const availableMetrics = useMemo(
    () => metrics.filter((m) => !weights.some((w) => w.metricKey === m.key)),
    [metrics, weights],
  )

  // Grouped available metrics by category
  const groupedAvailable = useMemo(() => {
    const map = new Map<string, MetricDefinition[]>()
    for (const m of availableMetrics) {
      if (!map.has(m.category)) map.set(m.category, [])
      map.get(m.category)!.push(m)
    }
    return map
  }, [availableMetrics])

  const categoryLabels: Record<string, string> = {
    general: 'Geral', attacking: 'Ataque', defending: 'Defesa',
    passing: 'Passes', pressing: 'Pressão', aerial: 'Aéreo',
    physical: 'Físico', creation: 'Criação', shooting: 'Finalização',
    goalkeeping: 'Goleiro', discipline: 'Disciplina', setpiece: 'Bola Parada',
  }

  const handleAddMetric = useCallback((key: string) => {
    const newWeights = [...weights, { metricKey: key, weight: 50 }]
    setWeights(newWeights)
    onProfileChange(newWeights)
  }, [weights, onProfileChange])

  const handleWeightChange = useCallback((key: string, weight: number) => {
    const newWeights = weights.map((w) => w.metricKey === key ? { ...w, weight } : w)
    setWeights(newWeights)
    onProfileChange(newWeights)
  }, [weights, onProfileChange])

  const handleRemoveMetric = useCallback((key: string) => {
    const newWeights = weights.filter((w) => w.metricKey !== key)
    setWeights(newWeights)
    onProfileChange(newWeights)
  }, [weights, onProfileChange])

  const handleSaveProfile = useCallback(async () => {
    if (!profileName.trim() || weights.length === 0) return
    const profile: ScoringProfile = {
      id: `${positionKey}-${Date.now()}`,
      name: profileName.trim(),
      positionKey,
      weights,
      isBuiltIn: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    await saveProfile(profile)
    setProfileName('')
    await loadProfiles()
  }, [profileName, weights, positionKey, loadProfiles])

  const handleLoadProfile = useCallback((profile: ScoringProfile) => {
    setWeights(profile.weights)
    onProfileChange(profile.weights)
  }, [onProfileChange])

  const handleDeleteProfile = useCallback(async (id: string) => {
    await deleteProfile(id)
    await loadProfiles()
  }, [loadProfiles])

  const handleClear = useCallback(() => {
    setWeights([])
    onProfileChange([])
  }, [onProfileChange])

  if (!isOpen) {
    return (
      <div className="py-2">
        <button
          onClick={() => { setIsOpen(true); loadProfiles() }}
          className="text-sm cursor-pointer flex items-center gap-1"
          style={{ color: 'var(--color-accent)' }}
        >
          ⚙ Scoring Personalizado
          {weights.length > 0 && (
            <span className="text-xs px-1.5 rounded-full" style={{ backgroundColor: 'var(--color-accent)', color: '#fff' }}>
              {weights.length}
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
          ⚙ Scoring Personalizado
        </h3>
        <button onClick={() => setIsOpen(false)} className="text-xs cursor-pointer" style={{ color: 'var(--color-text-muted)' }}>
          Fechar
        </button>
      </div>

      {/* Saved profiles */}
      {savedProfiles.length > 0 && (
        <div className="mb-3">
          <p className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Perfis salvos:</p>
          <div className="flex flex-wrap gap-1">
            {savedProfiles.map((p) => (
              <div key={p.id} className="flex items-center gap-1">
                <button
                  onClick={() => handleLoadProfile(p)}
                  className="text-xs px-2 py-1 rounded cursor-pointer"
                  style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-secondary)' }}
                >
                  {p.name} ({p.weights.length})
                </button>
                {!p.isBuiltIn && (
                  <button
                    onClick={() => handleDeleteProfile(p.id)}
                    className="text-xs cursor-pointer"
                    style={{ color: 'var(--color-score-c)' }}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Current weights */}
      {weights.length > 0 && (
        <div className="space-y-1 mb-3">
          {weights.map((w) => {
            const metric = metrics.find((m) => m.key === w.metricKey)
            return (
              <WeightSlider
                key={w.metricKey}
                metricKey={w.metricKey}
                label={metric?.label || w.metricKey}
                weight={w.weight}
                onChange={handleWeightChange}
                onRemove={handleRemoveMetric}
              />
            )
          })}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-wrap gap-2 mb-3">
        <button
          onClick={() => setShowMetricPicker(!showMetricPicker)}
          className="text-xs px-3 py-1.5 rounded cursor-pointer"
          style={{ backgroundColor: 'var(--color-accent)', color: '#fff' }}
        >
          + Adicionar Métrica
        </button>
        {weights.length > 0 && (
          <>
            <button
              onClick={handleClear}
              className="text-xs px-3 py-1.5 rounded cursor-pointer"
              style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-secondary)' }}
            >
              Limpar
            </button>
            <div className="flex items-center gap-1">
              <input
                type="text"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                placeholder="Nome do perfil..."
                className="text-xs px-2 py-1.5 rounded outline-none"
                style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)', width: '140px' }}
              />
              <button
                onClick={handleSaveProfile}
                disabled={!profileName.trim()}
                className="text-xs px-3 py-1.5 rounded cursor-pointer disabled:opacity-40"
                style={{ backgroundColor: 'var(--color-score-s)', color: '#fff' }}
              >
                Salvar
              </button>
            </div>
          </>
        )}
      </div>

      {/* Metric picker */}
      {showMetricPicker && (
        <div
          className="rounded-lg p-3 max-h-60 overflow-y-auto"
          style={{ backgroundColor: 'var(--color-bg-primary)', border: '1px solid var(--color-border)' }}
        >
          {[...groupedAvailable.entries()].map(([cat, catMetrics]) => (
            <div key={cat} className="mb-2">
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-muted)' }}>
                {categoryLabels[cat] || cat}
              </p>
              <div className="flex flex-wrap gap-1">
                {catMetrics.map((m) => (
                  <button
                    key={m.key}
                    onClick={() => { handleAddMetric(m.key); setShowMetricPicker(false) }}
                    className="text-xs px-2 py-1 rounded cursor-pointer transition-colors"
                    style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-secondary)' }}
                    title={m.description || m.label}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
