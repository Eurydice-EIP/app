---
sidebar_position: 2
---

# Organization

This page describes how the Eurydice project is organized from a team and delivery perspective. It keeps work consistent across code, documentation, reviews, and releases.

## Project structure

- `frontend/` contains the Next.js application used by end users.
- `backend/` contains the NestJS API, database access, and event-driven services.
- `docs/` contains the Docusaurus knowledge base used by the team.

## Team responsibilities

| Area             | Responsibility                                                                |
| ---------------- | ----------------------------------------------------------------------------- |
| Product changes  | Implement the feature in the owning app and update docs when behavior changes |
| Backend changes  | Keep API contracts, Prisma models, and RabbitMQ events aligned                |
| Frontend changes | Preserve the current visual language, routing, and localization patterns      |
| Documentation    | Keep onboarding, architecture, and operational notes current                  |

## Working rules

- Keep branches focused on one concern whenever possible.
- Prefer small pull requests with a clear scope and validation note.
- Update documentation in the same change when the workflow, route contract, or deployment path changes.
- Avoid mixing unrelated refactors with product work unless they are necessary to complete the task.

## Communication

- The development team should coordinate in the private Discord server used by the Eurydice team.
- The community can join the public server here: [Eurydice Community Discord](https://discord.gg/VRgWUTJzmC).
- Keep important decisions and follow-ups documented in the repository so they do not live only in chat.

## Delivery flow

1. Start from the owning area of the change.
2. Validate locally with the narrowest useful command.
3. Open a review with a concise summary of what changed and why.
4. Merge only after the documented behavior matches the implementation.

## Maintenance expectations

- Keep environment variables and secrets documented in the right package.
- Treat Prisma migrations as part of the backend delivery process.
- Rebuild the docs site whenever the sidebar or content structure changes.
- Revisit the organization guide when the team process changes so it does not drift into stale advice.
