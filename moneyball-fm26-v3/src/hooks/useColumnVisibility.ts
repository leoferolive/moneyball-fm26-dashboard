import { useState, useEffect, useMemo, useCallback } from 'react'
import type { PositionKey } from '@/types/position.ts'
import type { MetricDefinition } from '@/config/positions/types.ts'
import { getSetting, setSetting, deleteSetting } from '@/db/settingsStore.ts'

const settingKey = (positionKey: PositionKey) => `columns:${positionKey}`

export function useColumnVisibility(positionKey: PositionKey, metrics: MetricDefinition[]) {
  const [override, setOverride] = useState<string[] | null>(null)

  useEffect(() => {
    let cancelled = false
    getSetting(settingKey(positionKey)).then((raw) => {
      if (cancelled) return
      if (!raw) {
        setOverride(null)
        return
      }
      try {
        const keys = JSON.parse(raw)
        setOverride(Array.isArray(keys) ? keys : null)
      } catch {
        setOverride(null)
      }
    })
    return () => { cancelled = true }
  }, [positionKey])

  const visibleKeys = useMemo(() => {
    if (override === null) return new Set(metrics.map((m) => m.key))
    const validKeys = new Set(metrics.map((m) => m.key))
    return new Set(override.filter((key) => validKeys.has(key)))
  }, [override, metrics])

  const setVisibleKeys = useCallback((keys: string[]) => {
    setOverride(keys)
    void setSetting(settingKey(positionKey), JSON.stringify(keys))
  }, [positionKey])

  const showAll = useCallback(() => {
    setOverride(null)
    void deleteSetting(settingKey(positionKey))
  }, [positionKey])

  const showOnlyDefault = useCallback(() => {
    setVisibleKeys(metrics.filter((m) => m.displayInTable).map((m) => m.key))
  }, [metrics, setVisibleKeys])

  const showNone = useCallback(() => {
    setVisibleKeys([])
  }, [setVisibleKeys])

  return {
    visibleKeys,
    isCustomized: override !== null,
    setVisibleKeys,
    showAll,
    showOnlyDefault,
    showNone,
  }
}
