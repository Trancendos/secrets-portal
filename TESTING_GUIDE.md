# 🧪 Testing Guide

## Quick Start

```bash
# Install dependencies
npm install

# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test -- src/services/oauth.test.ts
```

## Test Structure

```
src/
├─┠ __tests__/
│  ├─┠ unit/                    # Unit tests
│  ├─┠ integration/            # Integration tests
│  ├─┠ fixtures/               # Test data
│  ├─┠ mocks/                  # Mock objects
│  ├─┠ setup.ts                # Test setup
│  ├─┠ auth.test.ts
│  ├─┠ secrets.test.ts
│  ├─┠ utils.test.ts
│  └─┠ ...
└─┠ services/
└─┠ components/
```

## Writing Tests

### Unit Test Template

```typescript
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { myFunction } from '../myFunction';

describe('myFunction', () => {
  beforeEach(() => {
    // Setup before each test
  });

  afterEach(() => {
    // Cleanup after each test
  });

  it('should do something', () => {
    const result = myFunction();
    expect(result).toBe(expected);
  });

  it('should handle errors', () => {
    expect(() => myFunction()).toThrow();
  });
});
```

### React Component Test Template

```typescript
import { render, screen } from '@testing-library/react';
import { MyComponent } from '../MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  it('should handle user interaction', () => {
    render(<MyComponent />);
    const button = screen.getByRole('button');
    // Simulate click
    // Assert result
  });
});
```

## Coverage Requirements

- **Statements**: > 80%
- **Branches**: > 75%
- **Functions**: > 80%
- **Lines**: > 80%

```bash
# Check coverage
npm test -- --coverage

# View HTML report
open coverage/lcov-report/index.html
```

## E2E Tests (Playwright)

```bash
# Run E2E tests
npm run test:e2e

# Debug mode
npm run test:e2e -- --debug

# UI mode
npm run test:e2e -- --ui
```

## CI/CD Testing

All tests run automatically on:
- PR creation
- Push to any branch
- Push to main

Check results: https://github.com/Trancendos/secrets-portal/actions
