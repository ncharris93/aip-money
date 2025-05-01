/**
 * Type definitions for Money handling
 */

import { Currency } from '../currency'

/**
 * Represents a monetary value with a specific currency
 */
export interface Money {
  readonly amount: number
  readonly currency: Currency
}
