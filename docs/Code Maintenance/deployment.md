# Deployment Guide

This document describes how the Eurydice repository is set up for deployment, including the CI/CD pipelines for building, testing, and deploying the project.

---

## Repository Structure

The repository is organized as a monorepo with the following main directories:

- `backend/`: NestJS backend application
- `frontend/`: Next.js frontend application
- `mobile/`: Flutter mobile application
- `docs/`: Docusaurus documentation

---

## CI/CD Overview

We use **GitHub Actions** for continuous integration and deployment. Each main part of the project has its own workflow:

- **Backend:** `.github/workflows/CI-CD.yml` and `.github/workflows/delivery.yml`
- **Frontend:** `.github/workflows/CI-CD.yml` and `.github/workflows/delivery.yml`
- **Mobile:** `.github/workflows/CI-CD.yml` and `.github/workflows/delivery.yml`
- **Docs:** `.github/workflows/delivery.yml`

---

## Build & Test

### Backend

- On every push or pull request, the backend workflow:
  - Installs dependencies (`npm install`)
  - Builds the project (`npm run build`)
  - Runs tests (`npm run test`)

### Frontend

- On every push or pull request, the frontend workflow:
  - Installs dependencies (`npm install`)
  - Builds the project (`npm run build`)
  - Runs tests (`npm run test`)

### Mobile

- On every push or pull request, the mobile workflow:
  - Installs Flutter and dependencies
  - Optionally builds the APK (commented in workflow)
  - Cleans the build

### Docs

- On every push or pull request, the docs workflow:
  - Installs dependencies (`npm install`)
  - Builds the documentation (`npm run start`)

---

## Deployment

### Automatic Delivery

After a successful build on the main branch, a delivery workflow is triggered for each part of the project. This workflow:

- Clones the central `app` repository
- Adds or updates the relevant subtree (backend, frontend, mobile, or docs)
- Pushes changes to the central repository

### Example: Backend Delivery Workflow

```yaml
# .github/workflows/delivery.yml
on:
  workflow_run:
    workflows: ["CI-CD Nest.js"]
    types:
      - completed

jobs:
  push-main:
    if: ${{ github.event.workflow_run.conclusion == 'success' }}
    runs-on: ubuntu-latest
    steps:
      - name: Setup Git
        run: |
          git config --global user.email "action@github.com"
          git config --global user.name "GitHub Action"
      - name: Clone the central repository
        run: |
          git clone https://<token>@github.com/Eurydice-EIP/app.git _app
      - name: Pull/Add Backend as subtree
        working-directory: _app
        run: |
          if [ -d "backend" ]; then
            git subtree pull --prefix=backend https://<token>@github.com/Eurydice-EIP/backend.git main --squash
          else
            git subtree add --prefix=backend https://<token>@github.com/Eurydice-EIP/backend.git main --squash
          fi
      - name: Push changes
        working-directory: _app
        run: |
          git push origin main
```

---

## Environment Variables & Secrets

- Sensitive data (tokens, API keys) are stored as GitHub Secrets and referenced in workflows.
- Each workflow uses secrets for authentication and deployment.

---

## Manual Deployment

You can also deploy manually by running the build and delivery steps locally and pushing to the central repository.

---

## Monitoring

- All workflow runs and deployments can be monitored in the **Actions** tab on GitHub.

---

## Troubleshooting

- Check the Actions logs for errors.
- Ensure all required secrets are set in the repository settings.
- For memory issues during build, increase the Node.js memory limit using `NODE_OPTIONS`.

---

For more details, see the individual workflow files in each project directory.
