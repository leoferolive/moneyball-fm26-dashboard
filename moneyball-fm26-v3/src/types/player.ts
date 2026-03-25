import type { PositionKey } from './position.ts'

export interface RawPlayer {
  [columnName: string]: string
}

export interface DerivedPlayer {
  _id?: number
  _position: PositionKey
  _importedAt: number
  _customScore?: number

  Jogador: string
  Nação?: string
  Clube?: string
  Idade: number
  Salário?: string
  Valor?: string
  NotaFM: number
  Jogos90: number

  [metricKey: string]: string | number | undefined
}
