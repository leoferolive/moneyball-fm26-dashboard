import { describe, it, expect } from 'vitest'
import { pf, rnd, sDiv, pct, clamp } from '../numbers.ts'

describe('pf (parse float)', () => {
  it('returns 0 for empty/null/undefined', () => {
    expect(pf(undefined)).toBe(0)
    expect(pf(null)).toBe(0)
    expect(pf('')).toBe(0)
    expect(pf('-')).toBe(0)
  })

  it('parses PT-BR format: 1.234,56', () => {
    expect(pf('1.234,56')).toBe(1234.56)
    expect(pf('6,4')).toBe(6.4)
    expect(pf('6,80')).toBe(6.8)
    // "1.000" is ambiguous — pf treats it as EN decimal (1.0), not PT-BR thousands
    // PT-BR thousands separator only detected when comma is also present
    expect(pf('1.000')).toBe(1)
    expect(pf('1.000,50')).toBe(1000.5)
  })

  it('parses EN format: 1,234.56', () => {
    expect(pf('1,234.56')).toBe(1234.56)
    expect(pf('6.4')).toBe(6.4)
  })

  it('parses integers', () => {
    expect(pf('42')).toBe(42)
    expect(pf('0')).toBe(0)
    expect(pf('1000')).toBe(1000)
  })

  it('strips FM26 units', () => {
    expect(pf('9,4M €')).toBe(9.4)
    expect(pf('177m €')).toBe(177)
    expect(pf('12.5 km')).toBe(12.5)
    expect(pf('198 cm')).toBe(198)
    expect(pf('100€')).toBe(100)
  })

  it('handles numeric input directly', () => {
    expect(pf(6.8)).toBe(6.8)
    expect(pf(0)).toBe(0)
  })

  it('handles negative numbers', () => {
    expect(pf('-5')).toBe(-5)
    expect(pf('-1,5')).toBe(-1.5)
  })
})

describe('rnd (round)', () => {
  it('rounds to 2 decimal places by default', () => {
    expect(rnd(3.14159)).toBe(3.14)
    expect(rnd(6.005)).toBe(6.01)
  })

  it('rounds to specified decimal places', () => {
    expect(rnd(3.14159, 0)).toBe(3)
    expect(rnd(3.14159, 1)).toBe(3.1)
    expect(rnd(3.14159, 3)).toBe(3.142)
  })
})

describe('sDiv (safe division)', () => {
  it('returns 0 when divisor is 0', () => {
    expect(sDiv(10, 0)).toBe(0)
  })

  it('divides normally', () => {
    expect(sDiv(10, 3)).toBe(3.33)
    expect(sDiv(100, 4)).toBe(25)
  })
})

describe('pct (percentage)', () => {
  it('returns 0 when divisor is 0', () => {
    expect(pct(10, 0)).toBe(0)
  })

  it('calculates percentage', () => {
    expect(pct(1, 4)).toBe(25)
    expect(pct(3, 10)).toBe(30)
  })
})

describe('clamp', () => {
  it('clamps below min', () => {
    expect(clamp(-5, 0, 100)).toBe(0)
  })

  it('clamps above max', () => {
    expect(clamp(150, 0, 100)).toBe(100)
  })

  it('passes through values in range', () => {
    expect(clamp(50, 0, 100)).toBe(50)
  })
})
