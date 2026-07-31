import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { BulkActionBar } from '../BulkActionBar.tsx'

describe('BulkActionBar', () => {
  it('mostra a contagem de selecionados', () => {
    render(<BulkActionBar count={3} onHide={vi.fn()} onClear={vi.fn()} />)
    expect(screen.getByText('3 selecionados')).toBeInTheDocument()
  })

  it('usa singular quando há apenas 1 selecionado', () => {
    render(<BulkActionBar count={1} onHide={vi.fn()} onClear={vi.fn()} />)
    expect(screen.getByText('1 selecionado')).toBeInTheDocument()
  })

  it('chama onHide ao clicar em Ocultar selecionados', () => {
    const onHide = vi.fn()
    render(<BulkActionBar count={2} onHide={onHide} onClear={vi.fn()} />)

    fireEvent.click(screen.getByRole('button', { name: 'Ocultar selecionados' }))

    expect(onHide).toHaveBeenCalledOnce()
  })

  it('chama onClear ao clicar em Limpar seleção', () => {
    const onClear = vi.fn()
    render(<BulkActionBar count={2} onHide={vi.fn()} onClear={onClear} />)

    fireEvent.click(screen.getByRole('button', { name: 'Limpar seleção' }))

    expect(onClear).toHaveBeenCalledOnce()
  })
})
