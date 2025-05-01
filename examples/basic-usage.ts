/**
 * Money Library - Basic Usage Example
 */

import { add, createMoney, CURRENCIES, format, subtract } from '../src'

// Create money instances
const tenDollars = createMoney(10, CURRENCIES.USD)
const twentyDollars = createMoney(20, CURRENCIES.USD)
const fiftyEuros = createMoney(50, CURRENCIES.EUR)

console.log('Money instances:')
console.log(`Ten dollars: ${format(tenDollars)}`)
console.log(`Twenty dollars: ${format(twentyDollars)}`)
console.log(`Fifty euros: ${format(fiftyEuros, 'de-DE')}`)
console.log()

// Addition
try {
  const thirtyDollars = add(tenDollars, twentyDollars)
  console.log(
    `Addition: ${format(tenDollars)} + ${format(twentyDollars)} = ${format(thirtyDollars)}`,
  )
} catch (error) {
  console.error('Addition error:', error.message)
}

// Incompatible currency addition
try {
  // This will throw an error because the currencies are different
  const incompatibleAdd = add(tenDollars, fiftyEuros)
  console.log(`Incompatible addition result: ${format(incompatibleAdd)}`)
} catch (error) {
  console.error('Incompatible addition error:', error.message)
}

console.log()

// Subtraction
try {
  const tenDollarsRemaining = subtract(twentyDollars, tenDollars)
  console.log(
    `Subtraction: ${format(twentyDollars)} - ${format(tenDollars)} = ${format(tenDollarsRemaining)}`,
  )
} catch (error) {
  console.error('Subtraction error:', error.message)
}

console.log()

// Different currency formats
const bigAmount = createMoney(1234567.89, CURRENCIES.USD)
console.log('Formatting options:')
console.log(`US format: ${format(bigAmount, 'en-US')}`)
console.log(`UK format: ${format(bigAmount, 'en-GB')}`)
console.log(`German format: ${format(bigAmount, 'de-DE')}`)
console.log(`Japanese format: ${format(bigAmount, 'ja-JP')}`)
