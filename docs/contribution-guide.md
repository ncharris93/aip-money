# Contribution Guide

## Introduction

Thank you for considering contributing to the Money Library! This guide explains how to contribute to this project while working with our automated workflows.

## Issue Template

When opening a new issue for feature requests or bug fixes, please use the provided issue template. The automated workflow depends on correctly formatted issues to trigger the AI-assisted development process.

### Issue Format Example

```
Title: [Feature/Bug] Brief description

## Description
Detailed explanation of the feature or bug

## Expected Behavior
What you expect to happen

## Technical Requirements
- Requirement 1
- Requirement 2

## Acceptance Criteria
- [ ] Criteria 1
- [ ] Criteria 2
```

## The Automated Process

Once you submit a properly formatted issue:

1. An AI agent will analyze your issue
2. A new branch will be created automatically
3. Tests will be written for the feature/bug fix
4. Code will be implemented following TDD principles
5. Documentation will be updated
6. A PR will be created and reviewed
7. Upon approval, the changes will be merged, versioned, and released

## Manual Contributions

If you prefer to contribute manually:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Write tests first, then implement your changes
4. Update documentation as necessary
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## Code Style and Standards

- Use TypeScript for all code
- Write unit tests for all functionality
- Follow TDD principles
- Document all public APIs
- Use ESLint and Prettier for formatting

## Testing

All contributions must include appropriate tests that:

1. Verify the functionality works as expected
2. Cover edge cases
3. Maintain or improve overall test coverage

## Documentation

Update relevant documentation when:

- Adding new features
- Modifying existing functionality
- Fixing bugs with behavior changes
- Improving or updating APIs

## Questions?

If you have any questions about contributing, please open an issue with the tag [Question].
