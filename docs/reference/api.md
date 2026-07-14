# API Reference

The backend exposes a versioned REST API and publishes Swagger at `/api`.

## Base conventions

- URI versioning is enabled, with the current API served under `/v1`.
- Authentication uses bearer JWTs.
- Request validation is enforced globally.
- Response shapes are documented in Swagger and should be treated as the source of truth.

## Main domains

| Domain | Notes |
| --- | --- |
| Auth | Login, registration, and token-protected access |
| Users | Profile data, avatar updates, and social features |
| Projects | Project CRUD and project-level state |
| Tasks | Task CRUD, status changes, and blocking relations |
| Timer | Timer start and stop endpoints |
| Level | Current user level and XP progress |

## How to use this page

Do not duplicate the full route catalog here. Use Swagger when you need the exact request and response contract, and keep this page focused on how the API is organized.

## Environment expectations

- the API needs database, JWT, and upload settings from config
- RabbitMQ must be reachable for event-driven XP updates
- the frontend should target the same base API version that Swagger describes