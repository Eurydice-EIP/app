# Testing

The testing story is centered on the backend today. The frontend currently relies on linting, builds, and manual validation, so keep backend coverage strong and treat UI test automation as a follow-up improvement when it lands.

## Backend test commands

```bash
npm run test
npm run test:watch
npm run test:cov
npm run test:e2e
```

## What to verify

- services that touch Prisma data should have focused unit coverage
- controller-level behavior should have at least one integration-style test path
- RabbitMQ-facing logic should be mocked, not called directly in unit tests
- E2E tests should protect critical route contracts and request validation

## Frontend validation

For the frontend, the current baseline is:

```bash
npm run lint
npm run build
```

Use these checks before merging changes that affect layout, routing, or shared UI components.

## Docs validation

```bash
cd docs
npm run build
```

This catches broken sidebar references, invalid Markdown, and missing assets in the documentation site.