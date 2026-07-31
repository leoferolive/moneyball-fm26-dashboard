import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ChipButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  tone?: 'default' | 'accent' | 'danger'
}

// Mesma receita visual do botão de tema no Header (borda + fundo sutil),
// para que ações de nível equivalente (abrir import, filtros, colunas,
// scoring) parem de parecer links de texto soltos.
export function ChipButton({ children, tone = 'default', style, className, ...props }: ChipButtonProps) {
  const toneColor = tone === 'accent'
    ? 'var(--color-accent)'
    : tone === 'danger'
      ? 'var(--color-score-c)'
      : 'var(--color-text-secondary)'

  return (
    <button
      {...props}
      className={`cursor-pointer transition-colors inline-flex items-center gap-1.5 ${className ?? ''}`}
      style={{
        fontSize: '0.75rem',
        fontWeight: 500,
        padding: '0.375rem 0.75rem',
        borderRadius: '4px',
        backgroundColor: 'var(--color-bg-tertiary)',
        color: toneColor,
        border: '1px solid var(--color-border)',
        ...style,
      }}
    >
      {children}
    </button>
  )
}
