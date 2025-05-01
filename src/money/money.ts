/**
 * Core Money operations implementation
 */

import { Currency, isValidCurrency } from '../currency'
import { IncompatibleCurrencyError, InvalidAmountError } from '../errors'
import { Money } from './money.types'

/**
 * Creates a new Money object
 *
 * @param amount The monetary amount
 * @param currency The currency code (ISO 4217)
 * @returns A new Money object
 * @throws {InvalidAmountError} If the amount is not a valid number
 */
export function createMoney(amount: number, currency: Currency): Money {
  if (typeof amount !== 'number' || isNaN(amount)) {
    throw new InvalidAmountError('Amount must be a valid number')
  }

  if (!isValidCurrency(currency)) {
    throw new InvalidAmountError(`Invalid currency code: ${currency}`)
  }

  return { amount, currency }
}

/**
 * Adds two Money objects together
 *
 * @param a First Money object
 * @param b Second Money object
 * @returns A new Money object with the sum
 * @throws {IncompatibleCurrencyError} If currencies don't match
 */
export function add(a: Money, b: Money): Money {
  if (a.currency !== b.currency) {
    throw new IncompatibleCurrencyError(
      `Cannot add money with different currencies: ${a.currency} and ${b.currency}`,
    )
  }

  return {
    amount: a.amount + b.amount,
    currency: a.currency,
  }
}

/**
 * Subtracts one Money object from another
 *
 * @param a Money object to subtract from
 * @param b Money object to subtract
 * @returns A new Money object with the difference
 * @throws {IncompatibleCurrencyError} If currencies don't match
 */
export function subtract(a: Money, b: Money): Money {
  if (a.currency !== b.currency) {
    throw new IncompatibleCurrencyError(
      `Cannot subtract money with different currencies: ${a.currency} and ${b.currency}`,
    )
  }

  return {
    amount: a.amount - b.amount,
    currency: a.currency,
  }
}

/**
 * Checks if two Money objects are equal
 *
 * @param a First Money object
 * @param b Second Money object
 * @returns True if both objects have the same amount and currency
 */
export function equals(a: Money, b: Money): boolean {
  return a.currency === b.currency && a.amount === b.amount
}

/**
 * Formats a Money object as a localized currency string
 *
 * @param money The Money object to format
 * @param locale The locale to use for formatting (defaults to system locale)
 * @returns A formatted string representation of the money
 */
export function format(money: Money, locale?: string): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: money.currency,
  }).format(money.amount)
}
