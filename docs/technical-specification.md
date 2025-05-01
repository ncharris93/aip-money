# Money Library Technical Specification

## Overview

The Money Library is a TypeScript utility designed for precise financial calculations. This document outlines the technical requirements, architecture, and implementation details to guide both human developers and AI agents working on this project.

## Core Types

### Money

```typescript
interface Money {
  amount: number
  currency: Currency
}
```

### Currency

```typescript
type Currency = string // ISO 4217 currency codes (e.g., 'USD', 'EUR', 'GBP')
```

## API Specification

### Constructor

```typescript
function createMoney(amount: number, currency: Currency): Money
```

Example:

```typescript
const tenDollars = createMoney(10, 'USD')
```

### Basic Operations

#### Addition

```typescript
function add(a: Money, b: Money): Money
```

Requirements:

- Both operands must have the same currency
- Throws `IncompatibleCurrencyError` if currencies don't match

Example:

```typescript
const fiveDollars = createMoney(5, 'USD')
const tenDollars = createMoney(10, 'USD')
const fifteenDollars = add(fiveDollars, tenDollars) // { amount: 15, currency: 'USD' }
```

#### Subtraction

```typescript
function subtract(a: Money, b: Money): Money
```

Requirements:

- Both operands must have the same currency
- Throws `IncompatibleCurrencyError` if currencies don't match

Example:

```typescript
const tenDollars = createMoney(10, 'USD')
const fiveDollars = createMoney(5, 'USD')
const fiveDollarsRemaining = subtract(tenDollars, fiveDollars) // { amount: 5, currency: 'USD' }
```

### Comparison Operations

```typescript
function equals(a: Money, b: Money): boolean
function greaterThan(a: Money, b: Money): boolean
function lessThan(a: Money, b: Money): boolean
```

### Formatting

```typescript
function format(money: Money, locale?: string): string
```

Example:

```typescript
format(createMoney(10.5, 'USD')) // "$10.50"
format(createMoney(10.5, 'EUR'), 'de-DE') // "10,50 €"
```

## Error Handling

Custom error types:

```typescript
class MoneyError extends Error {}
class IncompatibleCurrencyError extends MoneyError {}
class InvalidAmountError extends MoneyError {}
```

## Decimal Precision

All monetary calculations must avoid floating-point errors by:

- Using integer arithmetic internally (multiplying by a factor of 10^n)
- Converting to/from decimal representation only at inputs/outputs
- Rounding consistently (using banker's rounding / half to even)

## Future Extensions (Planned for Later Phases)

- Currency conversion with exchange rates
- Allocation and distribution methods
- Percentage calculations
- Money ranges and sets
- Integration with common financial APIs

## Implementation Guidelines

- Use pure functions where possible
- Ensure immutability (no operations should modify input objects)
- Minimize external dependencies
- Thoroughly test edge cases and precision issues
- Document all public APIs with JSDoc comments
- Maintain 100% test coverage

This specification serves as the reference for both initial implementation and future enhancements to the Money library.
