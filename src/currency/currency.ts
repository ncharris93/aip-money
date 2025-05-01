/**
 * Currency utilities for the Money Library
 */

import { Currency } from './currency.types'

/**
 * Validates if a string is a valid ISO 4217 currency code
 *
 * @param code The currency code to validate
 * @returns True if the code is a valid currency code
 */
export function isValidCurrency(code: string): boolean {
  // Simple validation for ISO 4217 currency codes
  // In a real implementation, this would be more comprehensive
  return /^[A-Z]{3}$/.test(code)
}

/**
 * Common currency codes
 */
export const CURRENCIES = {
  USD: 'USD' as Currency,
  EUR: 'EUR' as Currency,
  GBP: 'GBP' as Currency,
  JPY: 'JPY' as Currency,
  CAD: 'CAD' as Currency,
}
