import { useState, useCallback, type DragEvent } from 'react'
import { useAppStore } from '@/store/appStore.ts'
import { ChipButton } from '@/components/ui/ChipButton.tsx'

interface ImportPanelProps {
  onImport: (rawText: string) => void
  onClearData: () => void | Promise<void>
  loading: boolean
  clearing: boolean
  error: string | null
  playerCount: number
}

export function ImportPanel({
  onImport,
  onClearData,
  loading,
  clearing,
  error,
  playerCount,
}: ImportPanelProps) {
  const [text, setText] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const importPanelOpen = useAppStore((s) => s.importPanelOpen)
  const setImportPanelOpen = useAppStore((s) => s.setImportPanelOpen)

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault()
      setDragOver(false)
      const file = e.dataTransfer.files[0]
      if (!file) return
      if (!/\.(csv|tsv|txt)$/i.test(file.name)) return
      const reader = new FileReader()
      reader.onload = (ev) => {
        const content = ev.target?.result as string
        if (content) {
          setText(content)
          onImport(content)
        }
      }
      reader.readAsText(file)
    },
    [onImport],
  )

  const handleProcess = useCallback(() => {
    if (text.trim()) onImport(text)
  }, [text, onImport])

  const handleClearData = useCallback(() => {
    const confirmed = window.confirm(
      `Remover os ${playerCount} jogadores importados desta aba?`,
    )
    if (confirmed) void onClearData()
  }, [onClearData, playerCount])

  if (!importPanelOpen) {
    return (
      <div className="py-2 flex items-center gap-2">
        <ChipButton onClick={() => setImportPanelOpen(true)} tone="accent">
          + Importar dados
        </ChipButton>
        {playerCount > 0 && (
          <ChipButton onClick={handleClearData} disabled={clearing} tone="danger" className="disabled:opacity-50">
            {clearing ? 'Limpando...' : `Limpar dados da aba (${playerCount})`}
          </ChipButton>
        )}
      </div>
    )
  }

  return (
    <div className="py-4" style={{ borderBottom: '1px solid var(--color-border)' }}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
          Importar Dados FM26
        </h3>
        <button
          onClick={() => setImportPanelOpen(false)}
          className="text-xs cursor-pointer"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Fechar
        </button>
      </div>

      <p className="text-xs mb-3" style={{ color: 'var(--color-text-muted)' }}>
        Cole dados do FM26 (Ctrl+V) ou arraste um arquivo .csv/.tsv
      </p>

      <div
        className="rounded-lg p-4 mb-3 transition-colors"
        style={{
          border: `2px dashed ${dragOver ? 'var(--color-accent)' : 'var(--color-border)'}`,
          backgroundColor: dragOver ? 'var(--color-bg-tertiary)' : 'var(--color-bg-primary)',
        }}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Cole os dados aqui ou arraste um arquivo..."
          rows={6}
          className="w-full bg-transparent resize-none outline-none text-sm font-mono"
          style={{ color: 'var(--color-text-primary)' }}
        />
      </div>

      {error && (
        <p className="text-xs mb-3" style={{ color: 'var(--color-score-c)' }}>
          {error}
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleProcess}
          disabled={loading || !text.trim()}
          className="px-4 py-2 rounded text-sm font-medium transition-colors cursor-pointer disabled:opacity-50"
          style={{
            backgroundColor: 'var(--color-accent)',
            color: '#fff',
          }}
        >
          {loading ? 'Processando...' : 'Processar'}
        </button>
        {text && (
          <button
            onClick={() => setText('')}
            className="px-4 py-2 rounded text-sm cursor-pointer"
            style={{
              backgroundColor: 'var(--color-bg-tertiary)',
              color: 'var(--color-text-secondary)',
            }}
          >
            Limpar texto
          </button>
        )}
        {playerCount > 0 && (
          <button
            onClick={handleClearData}
            disabled={clearing || loading}
            className="px-4 py-2 rounded text-sm cursor-pointer disabled:opacity-50"
            style={{
              backgroundColor: 'var(--color-bg-tertiary)',
              color: 'var(--color-score-c)',
            }}
          >
            {clearing ? 'Limpando...' : `Limpar dados da aba (${playerCount})`}
          </button>
        )}
      </div>
    </div>
  )
}
