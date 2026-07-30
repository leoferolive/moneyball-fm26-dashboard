import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { positionConfigs } from '@/config/positions/index.ts'
import { clearPosition } from '@/db/playerStore.ts'
import { useAppStore } from '@/store/appStore.ts'
import { useImport } from '../useImport.ts'

vi.mock('@/db/playerStore.ts', () => ({
  clearPosition: vi.fn(),
  setPlayersForPosition: vi.fn(),
}))

describe('useImport.clearData', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useAppStore.setState({ currentPosition: 'time' })
  })

  it('remove somente os jogadores da aba ativa', async () => {
    const { result } = renderHook(() => useImport(positionConfigs))
    let cleared = false

    await act(async () => {
      cleared = await result.current.clearData()
    })

    expect(cleared).toBe(true)
    expect(clearPosition).toHaveBeenCalledOnce()
    expect(clearPosition).toHaveBeenCalledWith('time')
    expect(result.current.clearing).toBe(false)
  })

  it('mantém os dados visíveis quando o armazenamento falha', async () => {
    vi.mocked(clearPosition).mockRejectedValueOnce(new Error('IndexedDB indisponível'))
    const { result } = renderHook(() => useImport(positionConfigs))
    let cleared = true

    await act(async () => {
      cleared = await result.current.clearData()
    })

    expect(cleared).toBe(false)
    expect(result.current.error).toBe('Erro ao limpar dados: IndexedDB indisponível')
  })
})
