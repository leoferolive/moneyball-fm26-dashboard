import type { CSSProperties } from 'react'
import { useAppStore } from '@/store/appStore.ts'
import type { DerivedPlayer } from '@/types/player.ts'
import type { MetricDefinition } from '@/config/positions/types.ts'
import type { ColumnStats } from '@/engine/statistics.ts'
import { normalizedPosition, colorScaleColor, excelIcon, colorblindSafeScale, CB_SAFE_DATA_BAR } from '@/engine/statistics.ts'
import { scoreColor } from '@/config/constants.ts'
import { EXCEL_CONDITIONAL_FORMATS } from '@/config/excelConditionalFormats.generated.ts'
import { ScoreBadge } from './ScoreBadge.tsx'
import { InfoIcon } from './InfoIcon.tsx'

// Colunas travadas à esquerda ao rolar horizontalmente: checkbox, # (posição
// no ranking) e Jogador. Offsets calculados a partir da largura fixa de cada
// coluna anterior, para que "left" seja previsível.
const STICKY_CHECKBOX = { left: 0, width: 32 }
const STICKY_RANK = { left: STICKY_CHECKBOX.width, width: 40 }
const STICKY_JOGADOR = { left: STICKY_CHECKBOX.width + STICKY_RANK.width, width: 170 }

interface PlayerTableProps {
  players: DerivedPlayer[]
  displayMetrics: MetricDefinition[]
  columnStats: Record<string, ColumnStats>
  onPlayerClick: (player: DerivedPlayer) => void
  selectedIds: Set<number>
  onToggleSelect: (id: number, index: number, shiftKey: boolean) => void
}

export function PlayerTable({ players, displayMetrics, columnStats, onPlayerClick, selectedIds, onToggleSelect }: PlayerTableProps) {
  const sortColumn = useAppStore((s) => s.sortColumn)
  const sortDirection = useAppStore((s) => s.sortDirection)
  const setSort = useAppStore((s) => s.setSort)

  const rankDisplay = (i: number) => String(i + 1)

  // Regras reais de formatação condicional do Excel pra posição atual
  // (extraídas do .xlsm), por metric.key. Colunas sem entrada aqui não
  // recebem cor nenhuma — igual à planilha original.
  const positionFormats = players[0] ? EXCEL_CONDITIONAL_FORMATS[players[0]._position] : undefined

  const formatValue = (val: unknown, metric: MetricDefinition) => {
    if (val == null || val === '') return '-'
    if (typeof val !== 'number') return String(val)
    if (metric.format === 'integer') return Math.round(val).toString()
    if (metric.format === 'percentage') return `${val.toFixed(metric.decimals ?? 1)}%`
    return val.toFixed(metric.decimals ?? 2)
  }

  if (players.length === 0) {
    return (
      <div className="text-center py-12" style={{ color: 'var(--color-text-muted)' }}>
        <p className="text-lg mb-2">Nenhum jogador encontrado</p>
        <p className="text-sm">Importe dados do FM26 para começar a análise.</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto" style={{ borderRadius: '4px', border: '1px solid var(--slate)' }}>
      <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--color-border)', backgroundColor: 'var(--color-bg-secondary)' }}>
            <th
              className="text-center sticky-col"
              style={{
                width: STICKY_CHECKBOX.width,
                padding: '0.625rem 0.5rem',
                position: 'sticky',
                left: STICKY_CHECKBOX.left,
                zIndex: 3,
                backgroundColor: 'var(--color-bg-secondary)',
              }}
            >
              <input
                type="checkbox"
                checked={players.length > 0 && players.every((p) => p._id != null && selectedIds.has(p._id))}
                onChange={() => {}}
                onClick={(e) => {
                  e.stopPropagation()
                  const allSelected = players.length > 0 && players.every((p) => p._id != null && selectedIds.has(p._id))
                  players.forEach((p, i) => {
                    if (p._id == null) return
                    const isSelected = selectedIds.has(p._id)
                    if (allSelected && isSelected) onToggleSelect(p._id, i, false)
                    else if (!allSelected && !isSelected) onToggleSelect(p._id, i, false)
                  })
                }}
              />
            </th>
            <th
              className="text-left text-xs font-semibold sticky-col"
              style={{
                color: 'var(--color-text-muted)',
                width: STICKY_RANK.width,
                padding: '0.625rem 0.75rem',
                position: 'sticky',
                left: STICKY_RANK.left,
                zIndex: 3,
                backgroundColor: 'var(--color-bg-secondary)',
              }}
            >
              #
            </th>
            <th
              className="text-left text-xs font-semibold sticky-col"
              style={{
                color: 'var(--color-text-muted)',
                width: STICKY_JOGADOR.width,
                padding: '0.625rem 0.75rem',
                position: 'sticky',
                left: STICKY_JOGADOR.left,
                zIndex: 3,
                backgroundColor: 'var(--color-bg-secondary)',
                boxShadow: '2px 0 4px -2px rgba(0, 0, 0, 0.35)',
              }}
            >
              Jogador
            </th>
            <th className="text-left text-xs font-semibold" style={{ color: 'var(--color-text-muted)', padding: '0.625rem 0.75rem' }}>Clube</th>
            <th className="text-center text-xs font-semibold" style={{ color: 'var(--color-text-muted)', width: '40px', padding: '0.625rem 0.75rem' }}>Idade</th>
            {players[0]?._customScore !== undefined && (
              <th
                className="text-center text-xs font-semibold cursor-pointer select-none"
                style={{ color: sortColumn === '_customScore' ? 'var(--color-accent)' : 'var(--color-text-muted)', width: '60px', padding: '0.625rem 0.75rem' }}
                onClick={() => setSort('_customScore')}
              >
                Score {sortColumn === '_customScore' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
              </th>
            )}
            {displayMetrics.map((metric) => (
              <th
                key={metric.key}
                className="text-right cursor-pointer select-none whitespace-nowrap"
                style={{
                  color: sortColumn === metric.key ? 'var(--color-accent)' : 'var(--color-text-muted)',
                  padding: '0.625rem 0.75rem',
                  fontSize: '0.6875rem',
                  fontWeight: sortColumn === metric.key ? 700 : 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.02em',
                }}
                onClick={() => setSort(metric.key)}
                title={!metric.description ? metric.label : undefined}
              >
                {metric.label}
                {sortColumn === metric.key ? (sortDirection === 'asc' ? ' ↑' : ' ↓') : ''}
                {metric.description && (
                  <span onClick={(e) => e.stopPropagation()}>
                    <InfoIcon description={metric.description} />
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => {
            const isEven = index % 2 === 0
            const isSelected = player._id != null && selectedIds.has(player._id)
            const tierColor = player._customScore !== undefined ? scoreColor(player._customScore) : null
            // As 3 colunas travadas precisam de um fundo 100% opaco: como
            // elas ficam sobre outras colunas ao rolar horizontalmente, um
            // fundo transparente deixa o conteúdo por baixo vazar (era o bug
            // visto no screenshot). Por isso zebraBg nunca usa 'transparent'
            // — mistura-se a cor do tier/seleção sempre sobre uma base opaca.
            const zebraBg = isEven ? 'var(--color-bg-primary)' : 'var(--color-bg-secondary)'
            const rowBg = isSelected
              ? `color-mix(in srgb, var(--color-accent) 14%, ${zebraBg})`
              : tierColor
                ? `color-mix(in srgb, ${tierColor} 9%, ${zebraBg})`
                : zebraBg
            // box-shadow em <tr> não é confiável entre navegadores (display:
            // table-row); a faixa de cor do tier fica na primeira célula fixa.
            const stripeShadow = tierColor ? `inset 3px 0 0 0 ${tierColor}` : undefined

            return (
              <tr
                key={`${player.Jogador}-${index}`}
                className="transition-colors cursor-pointer"
                style={{
                  borderBottom: '1px solid var(--color-border)',
                  backgroundColor: rowBg,
                }}
                onClick={() => onPlayerClick(player)}
                onMouseEnter={(e) => {
                  const row = e.currentTarget as HTMLElement
                  row.style.backgroundColor = 'var(--color-bg-hover)'
                  row.querySelectorAll<HTMLElement>('.sticky-col').forEach((el) => { el.style.backgroundColor = 'var(--color-bg-hover)' })
                }}
                onMouseLeave={(e) => {
                  const row = e.currentTarget as HTMLElement
                  row.style.backgroundColor = rowBg
                  row.querySelectorAll<HTMLElement>('.sticky-col').forEach((el) => { el.style.backgroundColor = rowBg })
                }}
              >
                <td
                  className="text-center sticky-col"
                  style={{
                    padding: '0.625rem 0.5rem',
                    position: 'sticky',
                    left: STICKY_CHECKBOX.left,
                    zIndex: 2,
                    backgroundColor: rowBg,
                    boxShadow: stripeShadow,
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => {}}
                    onClick={(e) => {
                      e.stopPropagation()
                      if (player._id != null) onToggleSelect(player._id, index, e.shiftKey)
                    }}
                  />
                </td>
                <td
                  className="text-center font-mono text-xs sticky-col"
                  style={{
                    color: index < 3 ? 'var(--pitch)' : 'var(--color-text-muted)',
                    fontWeight: index < 3 ? 700 : 400,
                    padding: '0.625rem 0.75rem',
                    position: 'sticky',
                    left: STICKY_RANK.left,
                    zIndex: 2,
                    backgroundColor: rowBg,
                  }}
                >
                  {rankDisplay(index)}
                </td>
                <td
                  className="font-medium sticky-col"
                  style={{
                    color: 'var(--color-text-primary)',
                    padding: '0.625rem 0.75rem',
                    position: 'sticky',
                    left: STICKY_JOGADOR.left,
                    zIndex: 2,
                    backgroundColor: rowBg,
                    boxShadow: '2px 0 4px -2px rgba(0, 0, 0, 0.35)',
                    width: STICKY_JOGADOR.width,
                    maxWidth: STICKY_JOGADOR.width,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                  title={player.Jogador}
                >
                  {player.Jogador}
                </td>
                <td style={{ color: 'var(--color-text-secondary)', padding: '0.625rem 0.75rem' }}>
                  {player.Clube}
                </td>
                <td className="text-center font-mono" style={{ color: 'var(--color-text-secondary)', padding: '0.625rem 0.75rem' }}>
                  {player.Idade}
                </td>
                {player._customScore !== undefined && (
                  <td className="text-center" style={{ padding: '0.625rem 0.75rem' }}>
                    <ScoreBadge score={player._customScore} />
                  </td>
                )}
                {displayMetrics.map((metric) => {
                  const val = player[metric.key]
                  const numVal = typeof val === 'number' ? val : undefined
                  const stats = columnStats[metric.key]
                  const normalized = numVal !== undefined && stats && stats.count > 0
                    ? normalizedPosition(numVal, stats, metric.lowerIsBetter)
                    : null
                  // Formatação condicional forte (ícone + cor cheia / barra)
                  // só na coluna que está ordenando a tabela agora — é ela
                  // que o usuário está de fato comparando. As demais ganham
                  // só uma tinta bem sutil, pra não virar um tabuleiro de
                  // cores competindo por atenção em 100+ colunas.
                  const isFocused = sortColumn === metric.key
                  const excelFormat = positionFormats?.[metric.key]

                  const cellStyle: CSSProperties = {
                    padding: '0.625rem 0.75rem',
                    color: 'var(--color-text-primary)',
                  }
                  let icon: ReturnType<typeof excelIcon> | null = null

                  // Sem regra na planilha original = sem cor aqui também,
                  // igual à célula em branco do Excel (não inventamos
                  // formatação pra coluna que nunca teve nenhuma). As cores
                  // em si são trocadas pela paleta colorblind-safe (ver
                  // colorblindSafeScale/CB_SAFE_DATA_BAR): mantém qual
                  // coluna recebe qual regra do Excel, troca só os tons.
                  if (normalized !== null && excelFormat) {
                    if (excelFormat.dataBar) {
                      const pct = normalized * 100
                      const barOpacity = isFocused ? 65 : 26
                      const barColor = `color-mix(in srgb, ${CB_SAFE_DATA_BAR} ${barOpacity}%, transparent)`
                      cellStyle.backgroundImage = `linear-gradient(to right, ${barColor} ${pct}%, transparent ${pct}%)`
                    }
                    const safeColors = excelFormat.colorScale
                      ? colorblindSafeScale(excelFormat.colorScale.colors.length)
                      : undefined
                    if (safeColors) {
                      const color = colorScaleColor(safeColors, normalized)
                      const tintOpacity = isFocused ? 28 : 10
                      cellStyle.backgroundColor = `color-mix(in srgb, ${color} ${tintOpacity}%, transparent)`
                    }
                    if (isFocused && excelFormat.iconSet) {
                      icon = excelIcon(
                        normalized,
                        excelFormat.iconSet.bands,
                        excelFormat.iconSet.variant,
                        safeColors,
                      )
                    }
                  }

                  return (
                    <td
                      key={metric.key}
                      className="text-right font-mono text-xs"
                      style={cellStyle}
                    >
                      {icon && (
                        <span style={{ color: icon.color, marginRight: '0.3rem' }}>{icon.symbol}</span>
                      )}
                      {formatValue(val, metric)}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
