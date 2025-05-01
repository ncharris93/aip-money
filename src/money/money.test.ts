import { describe, expect, it } from 'vitest'

import { CURRENCIES } from '../currency'
import { IncompatibleCurrencyError, InvalidAmountError } from '../errors'
import { add, createMoney, equals, format, subtract } from './money'

describe('Money', () => {
  describe('createMoney', () => {
    it('should create a money object with the specified amount and currency', () => {
      const money = createMoney(10, CURRENCIES.USD)
      expect(money.amount).toBe(10)
      expect(money.currency).toBe(CURRENCIES.USD)
    })

    it('should throw an error if amount is not a number', () => {
      // @ts-expect-error Testing invalid input
      expect(() => createMoney('10', CURRENCIES.USD)).toThrow(InvalidAmountError)
      expect(() => createMoney(NaN, CURRENCIES.USD)).toThrow(InvalidAmountError)
    })

    it('should throw an error for invalid currency code', () => {
      expect(() => createMoney(10, 'INVALID')).toThrow(InvalidAmountError)
    })
  })

  describe('add', () => {
    it('should add two money objects with the same currency', () => {
      const a = createMoney(10, CURRENCIES.USD)
      const b = createMoney(20, CURRENCIES.USD)
      const result = add(a, b)

      expect(result.amount).toBe(30)
      expect(result.currency).toBe(CURRENCIES.USD)
    })

    it('should throw error when adding different currencies', () => {
      const a = createMoney(10, CURRENCIES.USD)
      const b = createMoney(20, CURRENCIES.EUR)

      expect(() => add(a, b)).toThrow(IncompatibleCurrencyError)
    })
  })

  describe('subtract', () => {
    it('should subtract two money objects with the same currency', () => {
      const a = createMoney(30, CURRENCIES.USD)
      const b = createMoney(10, CURRENCIES.USD)
      const result = subtract(a, b)

      expect(result.amount).toBe(20)
      expect(result.currency).toBe(CURRENCIES.USD)
    })

    it('should throw error when subtracting different currencies', () => {
      const a = createMoney(30, CURRENCIES.USD)
      const b = createMoney(10, CURRENCIES.EUR)

      expect(() => subtract(a, b)).toThrow(IncompatibleCurrencyError)
    })
  })

  describe('equals', () => {
    it('should return true for equal money objects', () => {
      const a = createMoney(10, CURRENCIES.USD)
      const b = createMoney(10, CURRENCIES.USD)

      expect(equals(a, b)).toBe(true)
    })

    it('should return false for money objects with different amounts', () => {
      const a = createMoney(10, CURRENCIES.USD)
      const b = createMoney(20, CURRENCIES.USD)

      expect(equals(a, b)).toBe(false)
    })

    it('should return false for money objects with different currencies', () => {
      const a = createMoney(10, CURRENCIES.USD)
      const b = createMoney(10, CURRENCIES.EUR)

      expect(equals(a, b)).toBe(false)
    })
  })

  describe('format', () => {
    it('should format money object using default locale', () => {
      const money = createMoney(1234.56, CURRENCIES.USD)
      const formatted = format(money)

      // The exact format depends on the system locale, but should include the amount and currency symbol
      expect(formatted).toMatch(/1,234\.56/)
    })

    it('should format money object using specified locale', () => {
      const money = createMoney(1234.56, CURRENCIES.EUR)
      const formatted = format(money, 'de-DE')

      // German format uses comma as decimal separator
      expect(formatted).toMatch(/1\.234,56/)
    })
  })
})
