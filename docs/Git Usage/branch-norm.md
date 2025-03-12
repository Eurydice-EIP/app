---
sidebar_position: 2
---

# Branch Naming Conventions

## Introduction

Branch naming conventions provide a structured approach to organizing branches in a Git repository. By following these norms, we ensure a clear and efficient workflow that enhances collaboration, traceability, and maintainability.

---

## Format

Each branch name must follow this structure:

```
<branch-type>/<short-description>
```

### Breakdown:

1. **Branch Type**: Describes the purpose of the branch (e.g., feature, fix, hotfix).
2. **Short Description**: Provides a brief summary of the branch's purpose, using hyphen-separated words.

---

## Branch Types

Here is a list of commonly used branch types:

- **feat**: For developing new features.

  - Example: `feature/user-authentication`

- **fix**: For resolving bugs.

  - Example: `fix/login-error`

- **refactor**: For code refactoring without adding new features or fixing bugs.

  - Example: `refactor/improve-login-module`

- **test**: For adding or updating tests.

  - Example: `test/add-login-tests`

- **build**: For maintenance tasks like dependency updates or CI configuration.

  - Example: `chore/update-dependencies`

---

## Best Practices

1. **Be descriptive**: Use meaningful names that convey the branch's purpose.
2. **Use lowercase and hyphens**: Keep branch names lowercase and separate words with hyphens for readability.
3. **Link to tasks or issues**: When possible, include task or issue IDs to improve traceability.

---

## Benefits

- **Organization**: Maintain a well-structured repository.
- **Clarity**: Easily identify the purpose of each branch.
- **Collaboration**: Simplify the process of merging, reviewing, and tracking changes.

By adhering to these branch naming conventions, we ensure a consistent and professional workflow that benefits the entire team.
