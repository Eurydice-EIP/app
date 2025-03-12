---
sidebar_position: 3
---

# PR Review Process

## Overview

This document outlines the process for reviewing Pull Requests (PRs) in our repository. A PR review is an important part of our workflow to ensure quality and maintain consistency in the codebase. Here's how we do it:

## Steps for Reviewing a PR

1. **Check the PR Description**:

   - Ensure the PR description is clear and explains the purpose of the changes.
   - The description should include relevant information like the issue it addresses or the feature being added.

2. **Review the Code**:

   - Look through the code changes for correctness, readability, and adherence to our coding standards.
   - Make sure there are no obvious bugs, vulnerabilities, or performance issues.
   - Leave comments if you suggest any improvements or have questions.

3. **Test the Changes**:

   - If applicable, pull down the PR branch locally and test the changes to verify that they work as intended.
   - Run any relevant tests to confirm nothing is broken.

4. **Check GitHub Actions (Build and Linter)**:

   - Ensure that all **GitHub Actions** (like build and linter) have passed successfully. You can check the status of the checks at the bottom of the PR page.
   - If the build or linter fails, do not approve the PR until the issues are resolved.

5. **Approve or Request Changes**:

   - If the PR is good to go, approve it.
   - If there are issues or improvements needed, request changes and provide feedback in the comments.

6. **Required Reviews**:
   - **2 reviews are required** before a PR can be merged. Ensure that you are not the only one reviewing a PR.
   - Once the required number of reviews (2) is achieved, the PR can be merged.

## Merging a PR

- After 2 approvals are received, the PR can be merged.
- Only merge the PR once all discussions are resolved, the code is ready for production, and the build/linter checks have passed.

## Checklist

Before merging, ensure the following:

- [ ] Code follows the project’s coding style and best practices.
- [ ] PR has a clear description with context.
- [ ] All required tests have passed.
- [ ] All GitHub Actions (build, linter, etc.) are passing.
- [ ] Two approvals are received.
- [ ] Any comments or suggestions have been addressed.

---

This is a simple guide to help our team stay on the same page during the PR review process. Let's work together to maintain high-quality code and effective collaboration!

---
