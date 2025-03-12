---
sidebar_position: 1
---

# Karma Commit Norm

## Introduction

Karma is a structured commit message convention that ensures clear and meaningful commit messages. By adhering to this norm, our team can maintain a clean and understandable Git history, making it easier to track changes, identify issues, and collaborate efficiently.

---

## Format

Each commit message must follow this structure:

```
<type>(<scope>): <subject>

```

### Breakdown:

1. **Type**: Describes the category of the change.
2. **Scope**: Specifies the part of the codebase affected (optional but recommended).
3. **Subject**: A brief summary of the change in imperative form (e.g., "add", "fix").

---

## Commit Types

Here is a list of commonly used commit types:

- **feat**: A new feature.

  - Example: `feat(auth): add login functionality`

- **fix**: A bug fix.

  - Example: `fix(ui): resolve button alignment issue`

- **refactor**: Code changes that neither fix a bug nor add a feature.

  - Example: `refactor(api): improve error handling`

- **docs**: Documentation changes.

  - Example: `docs(readme): add installation instructions`

- **style**: Changes that do not affect the meaning of the code (e.g., formatting).

  - Example: `style(prettier): update header margin`

- **test**: Adding or modifying tests.

  - Example: `test(services): add unit tests for user service`

- **ci**: Continuous Integration configuration or scripts.

  - Example: `ci(actions): add caching for npm dependencies`

- **build**: Changes that affect the build system or external dependencies.
  - Example: `build(webpack): update to Webpack 5`

---

## Best Practices

1. **Be concise and precise**: Keep the subject line under 50 characters and use the body to provide details if necessary.
2. **Use imperative mood**: Write the subject as a command, e.g., "add", "fix", "update".
3. **Avoid vague terms**: Be specific about what has been changed and why.

---

## Benefits

- **Clarity**: Understand what each commit does at a glance.
- **History**: Maintain a clean and searchable commit log.
- **Collaboration**: Simplify code reviews and onboarding for new team members.

By adopting the Karma commit norm, we ensure a professional and organized approach to version control that benefits the entire team. Let's commit to better commits!
