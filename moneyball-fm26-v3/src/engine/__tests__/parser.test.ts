import { describe, it, expect } from 'vitest'
import { smartParse, parseCSVLine } from '../parser.ts'

describe('parseCSVLine', () => {
  it('splits by separator', () => {
    expect(parseCSVLine('a;b;c', ';')).toEqual(['a', 'b', 'c'])
  })

  it('handles quoted fields with embedded separator', () => {
    expect(parseCSVLine('"hello, world",b,c', ',')).toEqual(['hello, world', 'b', 'c'])
  })

  it('handles escaped quotes', () => {
    expect(parseCSVLine('"say ""hi""",b', ',')).toEqual(['say "hi"', 'b'])
  })

  it('handles empty fields', () => {
    expect(parseCSVLine('a;;c', ';')).toEqual(['a', '', 'c'])
  })
})

describe('smartParse', () => {
  it('returns null for less than 2 lines', () => {
    expect(smartParse('header only')).toBeNull()
    expect(smartParse('')).toBeNull()
  })

  it('detects tab separator', () => {
    const input = 'Jogador\tIdade\tClube\tMinutos\nMessi\t36\tInter Miami\t2700'
    const result = smartParse(input)!
    expect(result.separator).toBe('\t')
    expect(result.headers).toEqual(['Jogador', 'Idade', 'Clube', 'Minutos'])
    expect(result.data).toHaveLength(1)
    expect(result.data[0]['Jogador']).toBe('Messi')
    expect(result.data[0]['Idade']).toBe('36')
  })

  it('detects semicolon separator', () => {
    const input = 'Jogador;Idade;Clube;Minutos\nNeymar;32;Santos;1800'
    const result = smartParse(input)!
    expect(result.separator).toBe(';')
    expect(result.data[0]['Jogador']).toBe('Neymar')
  })

  it('detects comma separator', () => {
    const input = 'Jogador,Idade,Clube,Minutos\nVini Jr,24,Real Madrid,2500'
    const result = smartParse(input)!
    expect(result.separator).toBe(',')
    expect(result.data[0]['Jogador']).toBe('Vini Jr')
  })

  it('strips quotes from headers and values', () => {
    const input = '"Jogador"\t"Idade"\t"Clube"\t"Min"\n"Messi"\t"36"\t"Inter"\t"2700"'
    const result = smartParse(input)!
    expect(result.headers).toEqual(['Jogador', 'Idade', 'Clube', 'Min'])
    expect(result.data[0]['Jogador']).toBe('Messi')
  })

  it('skips rows with less than 3 fields', () => {
    const input = 'A\tB\tC\tD\n1\t2\t3\t4\nx\ny'
    const result = smartParse(input)!
    expect(result.data).toHaveLength(1)
  })

  it('handles multiple data rows', () => {
    const input = 'Jogador\tIdade\tClube\tMin\nA\t20\tX\t900\nB\t25\tY\t1800\nC\t30\tZ\t2700'
    const result = smartParse(input)!
    expect(result.data).toHaveLength(3)
  })
})
