# Money Library Style Guide

## Introduction

This document outlines the coding standards and development practices for the Money Library project. Following these guidelines ensures code consistency, maintainability, and deterministic behavior across the codebase. Both human developers and AI agents should adhere to these standards.

## General Principles

1. **Deterministic Code**: Prefer deterministic approaches wherever possible. Code should produce the same output given the same input, regardless of environment or execution context.
2. **Immutability**: Use immutable data structures and pure functions when possible.
3. **Type Safety**: Leverage TypeScript's type system to catch errors at compile time.
4. **Simplicity**: Write simple, readable code. Prefer clarity over cleverness.
5. **Colocation**: Keep related files together. Tests, interfaces, and implementation should be colocated in the same directory.

## Code Organization

### Colocation

We prefer colocation of related files rather than separation by file type. This means:

- Place test files next to the files they test, not in a separate `/test` directory
- Keep interfaces and their implementations together
- Store utility functions close to where they're used
- Group by feature or domain, not by technical role

Example of preferred structure:
```
src/
  money/
    money.ts
    money.test.ts
    money.types.ts
    index.ts
  currency/
    currency.ts
    currency.test.ts
    currency.types.ts
    index.ts
```

Rather than:
```
src/
  models/
    money.ts
    currency.ts
  interfaces/
    money.types.ts
    currency.types.ts
tests/
  money.test.ts
  currency.test.ts
```

## Code Style

### Function Parameters

- For functions with 3 or more parameters, use an object parameter:

```typescript
// Bad
function formatMoney(amount: number, currency: string, decimals: number, locale: string): string {
  // Implementation
}

// Good
function formatMoney(options: {
  amount: number;
  currency: string;
  decimals: number;
  locale: string;
}): string {
  // Implementation
}
```

### Naming Conventions

- Use `PascalCase` for interface, type, and class names
- Use `camelCase` for variable and function names
- Use `UPPER_SNAKE_CASE` for constants

### File Structure

- One class/interface per file when possible
- Group related functionality in directories
- Index files should export public APIs

## Testing

### Test Organization

- Tests should be organized in a mirrored structure to source code
- Name test files with `.test.ts` suffix

### Test Determinism

- Tests must be deterministic and not rely on external state
- Use fixed seeds for any random number generation
- Mock timestamps and dates to fixed values
- Avoid dependencies on environment variables in tests

### Test Coverage

- All public APIs must have 100% test coverage
- Test edge cases and error conditions
- Include both unit and integration tests

## CI/CD Pipeline

### Deterministic Builds

- Lock dependencies with a lockfile
- Specify exact Node.js version in `.nvmrc` file
- Use containerized builds with fixed base images

### Pipeline Stages

1. **Lint**: Enforce code style
2. **Test**: Run the test suite
3. **Build**: Generate distributable artifacts
4. **Document**: Update API documentation if needed
5. **Release**: Version and publish the library

## Documentation

- Document all public APIs with JSDoc comments
- Include examples for non-obvious functionality
- Keep the README.md updated with current features and usage

## Error Handling

- Use custom error classes for different error types
- Include informative error messages
- Handle edge cases explicitly

## Git Workflow

- Use feature branches for all changes
- Write descriptive commit messages following conventional commits
- Squash commits before merging to maintain a clean history

## Automated Workflow Rules

- AI agents must follow all style guide rules
- Generated code must pass all linters and tests
- CI/CD pipeline should fail if style guidelines are not met

By following these guidelines, we ensure that our codebase remains maintainable, predictable, and of high quality whether contributions come from human developers or AI agents.
