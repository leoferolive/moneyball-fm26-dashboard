import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useAppStore } from '@/store/appStore.ts'
import { ImportPanel } from '../ImportPanel.tsx'

function renderPanel(playerCount = 11, onClearData = vi.fn()) {
  render(
    <ImportPanel
      onImport={vi.fn()}
      onClearData={onClearData}
      loading={false}
      clearing={false}
      error={null}
      playerCount={playerCount}
    />,
  )

  return onClearData
}

describe('ImportPanel', () => {
  beforeEach(() => {
    useAppStore.setState({ importPanelOpen: false })
    vi.restoreAllMocks()
  })

  it('expõe o equivalente do macro Limpa_TEstatisticas quando há dados', () => {
    const onClearData = renderPanel()
    vi.spyOn(window, 'confirm').mockReturnValue(true)

    fireEvent.click(screen.getByRole('button', { name: 'Limpar dados da aba (11)' }))

    expect(window.confirm).toHaveBeenCalledWith(
      'Remover os 11 jogadores importados desta aba?',
    )
    expect(onClearData).toHaveBeenCalledOnce()
  })

  it('não apaga os dados quando a confirmação é cancelada', () => {
    const onClearData = renderPanel()
    vi.spyOn(window, 'confirm').mockReturnValue(false)

    fireEvent.click(screen.getByRole('button', { name: 'Limpar dados da aba (11)' }))

    expect(onClearData).not.toHaveBeenCalled()
  })

  it('não mostra o comando de limpeza quando a aba está vazia', () => {
    renderPanel(0)

    expect(screen.queryByRole('button', { name: /Limpar dados da aba/ })).toBeNull()
  })
})
