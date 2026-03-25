import { useState, useCallback } from 'react'
import { smartParse } from '@/engine/parser.ts'
import { deriveAll } from '@/engine/derive.ts'
import { detectPosition } from '@/engine/positionDetector.ts'
import { setPlayersForPosition } from '@/db/playerStore.ts'
import { useAppStore } from '@/store/appStore.ts'
import type { PositionKey } from '@/types/position.ts'
import type { PositionConfig } from '@/config/positions/types.ts'

interface ImportState {
  loading: boolean
  error: string | null
  lastResult: {
    position: PositionKey
    playerCount: number
    separatorName: string
  } | null
}

export function useImport(positionConfigs: Record<PositionKey, PositionConfig>) {
  const [state, setState] = useState<ImportState>({
    loading: false,
    error: null,
    lastResult: null,
  })
  const currentPosition = useAppStore((s) => s.currentPosition)
  const setImportPanelOpen = useAppStore((s) => s.setImportPanelOpen)

  const importData = useCallback(
    async (rawText: string, targetPosition?: PositionKey) => {
      setState({ loading: true, error: null, lastResult: null })

      try {
        const parsed = smartParse(rawText)
        if (!parsed) {
          setState({ loading: false, error: 'Dados insuficientes. Precisa de cabeçalho + pelo menos 1 linha.', lastResult: null })
          return
        }

        // Determine position
        let position = targetPosition || currentPosition
        if (!targetPosition) {
          // Auto-detect if no target specified
          const detected = detectPosition(parsed.headers, positionConfigs)
          if (detected) {
            position = detected.position
          }
        }

        const config = positionConfigs[position]
        if (!config) {
          setState({ loading: false, error: `Configuração não encontrada para posição: ${position}`, lastResult: null })
          return
        }

        // Derive all players
        const derivedPlayers = deriveAll(parsed.data, config)

        if (derivedPlayers.length === 0) {
          setState({ loading: false, error: 'Nenhum jogador válido encontrado. Verifique se os dados têm pelo menos 90 minutos jogados.', lastResult: null })
          return
        }

        // Store in IndexedDB
        await setPlayersForPosition(position, derivedPlayers)

        // Collapse import panel on success
        setImportPanelOpen(false)

        setState({
          loading: false,
          error: null,
          lastResult: {
            position,
            playerCount: derivedPlayers.length,
            separatorName: parsed.separatorName,
          },
        })
      } catch (err) {
        setState({
          loading: false,
          error: `Erro ao processar dados: ${err instanceof Error ? err.message : String(err)}`,
          lastResult: null,
        })
      }
    },
    [currentPosition, positionConfigs, setImportPanelOpen],
  )

  return { ...state, importData }
}
