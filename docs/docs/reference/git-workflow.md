# Git Workflow

The repository works best when git history stays small, readable, and aligned with the actual change.

## Branch naming

- `feature/<scope>` for product work
- `fix/<scope>` for bug fixes
- `docs/<scope>` for documentation-only changes
- `chore/<scope>` for maintenance

## Commit style

Use short imperative messages with a consistent prefix:

```text
feat: add project timer widget docs
fix: correct task completion flow
docs: refresh deployment guide
```

## Review checklist

- keep the change focused on one concern
- update docs when behavior or configuration changes
- run the relevant build or test command before opening a review
- avoid mixing generated output with source changes unless the generator is part of the task

## Merge expectation

Prefer pull requests that explain what changed, why it changed, and how the new behavior was validated.