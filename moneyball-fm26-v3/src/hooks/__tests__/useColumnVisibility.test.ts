import { act, renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { MetricDefinition } from '@/config/positions/types.ts'
import { getSetting, setSetting, deleteSetting } from '@/db/settingsStore.ts'
import { useColumnVisibility } from '../useColumnVisibility.ts'

vi.mock('@/db/settingsStore.ts', () => ({
  getSetting: vi.fn(),
  setSetting: vi.fn(),
  deleteSetting: vi.fn(),
}))

function metric(key: string, displayInTable: boolean): MetricDefinition {
  return {
    key,
    label: key,
    category: 'general',
    formula: () => 0,
    displayInTable,
    lowerIsBetter: false,
    format: 'number',
  }
}

const metrics: MetricDefinition[] = [
  metric('a', true),
  metric('b', false),
  metric('c', true),
]

describe('useColumnVisibility', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(getSetting).mockResolvedValue(undefined)
    vi.mocked(setSetting).mockResolvedValue(undefined)
    vi.mocked(deleteSetting).mockResolvedValue(undefined)
  })

  it('mostra todas as colunas por padrão quando não há preferência salva', async () => {
    const { result } = renderHook(() => useColumnVisibility('zagueiros', metrics))

    await waitFor(() => {
      expect(result.current.visibleKeys.size).toBe(3)
    })
    expect(result.current.isCustomized).toBe(false)
  })

  it('restaura apenas o subconjunto salvo quando existe preferência persistida', async () => {
    vi.mocked(getSetting).mockResolvedValue(JSON.stringify(['a']))

    const { result } = renderHook(() => useColumnVisibility('zagueiros', metrics))

    await waitFor(() => {
      expect(result.current.isCustomized).toBe(true)
    })
    expect([...result.current.visibleKeys]).toEqual(['a'])
  })

  it('showOnlyDefault seleciona só as métricas com displayInTable=true e persiste', async () => {
    const { result } = renderHook(() => useColumnVisibility('zagueiros', metrics))
    await waitFor(() => expect(result.current.visibleKeys.size).toBe(3))

    act(() => {
      result.current.showOnlyDefault()
    })

    await waitFor(() => {
      expect([...result.current.visibleKeys].sort()).toEqual(['a', 'c'])
    })
    expect(setSetting).toHaveBeenCalledWith('columns:zagueiros', JSON.stringify(['a', 'c']))
  })

  it('showAll limpa a preferência persistida e volta a mostrar todas', async () => {
    vi.mocked(getSetting).mockResolvedValue(JSON.stringify(['a']))
    const { result } = renderHook(() => useColumnVisibility('zagueiros', metrics))
    await waitFor(() => expect(result.current.isCustomized).toBe(true))

    act(() => {
      result.current.showAll()
    })

    await waitFor(() => {
      expect(result.current.isCustomized).toBe(false)
    })
    expect(result.current.visibleKeys.size).toBe(3)
    expect(deleteSetting).toHaveBeenCalledWith('columns:zagueiros')
  })

  it('setVisibleKeys persiste a seleção via setSetting', async () => {
    const { result } = renderHook(() => useColumnVisibility('zagueiros', metrics))
    await waitFor(() => expect(result.current.visibleKeys.size).toBe(3))

    act(() => {
      result.current.setVisibleKeys(['b'])
    })

    await waitFor(() => {
      expect([...result.current.visibleKeys]).toEqual(['b'])
    })
    expect(setSetting).toHaveBeenCalledWith('columns:zagueiros', JSON.stringify(['b']))
  })
})
