/**
 * Custom error classes for the Money Library
 */

/**
 * Base error class for all Money Library errors
 */
export class MoneyError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'MoneyError'
    Object.setPrototypeOf(this, MoneyError.prototype)
  }
}

/**
 * Error thrown when operations are attempted on money with different currencies
 */
export class IncompatibleCurrencyError extends MoneyError {
  constructor(
    message: string = 'Operations can only be performed on money with the same currency',
  ) {
    super(message)
    this.name = 'IncompatibleCurrencyError'
    Object.setPrototypeOf(this, IncompatibleCurrencyError.prototype)
  }
}

/**
 * Error thrown when an invalid amount is provided
 */
export class InvalidAmountError extends MoneyError {
  constructor(message: string = 'Invalid monetary amount') {
    super(message)
    this.name = 'InvalidAmountError'
    Object.setPrototypeOf(this, InvalidAmountError.prototype)
  }
}
