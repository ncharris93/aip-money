import { describe, expect, it } from 'vitest'

import { CURRENCIES, isValidCurrency } from './currency'

describe('Currency', () => {
  describe('isValidCurrency', () => {
    it('should return true for valid ISO 4217 currency codes', () => {
      expect(isValidCurrency('USD')).toBe(true)
      expect(isValidCurrency('EUR')).toBe(true)
      expect(isValidCurrency('GBP')).toBe(true)
    })

    it('should return false for invalid currency codes', () => {
      expect(isValidCurrency('us')).toBe(false)
      expect(isValidCurrency('EURO')).toBe(false)
      expect(isValidCurrency('123')).toBe(false)
      expect(isValidCurrency('')).toBe(false)
    })
  })

  describe('CURRENCIES constant', () => {
    it('should contain common currency codes', () => {
      expect(CURRENCIES.USD).toBe('USD')
      expect(CURRENCIES.EUR).toBe('EUR')
      expect(CURRENCIES.GBP).toBe('GBP')
      expect(CURRENCIES.JPY).toBe('JPY')
      expect(CURRENCIES.CAD).toBe('CAD')
    })
  })
})
