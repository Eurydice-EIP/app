# Backend Architecture

The backend is a NestJS 11 application that exposes the Eurydice API, coordinates persistence, and publishes game-related events for downstream consumers.

## Runtime shape

- `main.ts` enables CORS, URI versioning, Swagger at `/api`, global validation, and request logging/timeout interceptors.
- `AppModule` wires the feature modules and central config.
- Configuration is loaded from typed config slices for API, database, JWT, and uploads.

## Feature modules

| Module | Responsibility |
| --- | --- |
| Auth | Sign-in, sign-up, JWT guard setup |
| Users | User profile data, avatars, and social features |
| Projects | Project lifecycle, task coordination, and completion flow |
| Tasks | Task CRUD, blocking relations, and task status updates |
| Timer | Start and stop timer sessions attached to tasks |
| Level | XP-to-level calculation for the current user |
| RabbitMQ | Game event emission and XP consumer processing |

## Data and events

- Prisma is the primary data access layer.
- PostgreSQL stores users, projects, tasks, timers, and progression data.
- RabbitMQ carries task and project completion events so XP logic can stay isolated from the main request flow.
- The XP service uses the task and project services, the calculator, and Prisma to persist progression changes.

## What this backend currently exposes

- authenticated project and task CRUD
- timer session start and stop endpoints
- user profile and account operations
- level lookup for the current account
- Swagger-generated API docs for the full route surface

## Helpful scripts

```bash
npm run start:dev
npm run build
npm run test
npm run test:e2e
npm run prisma:generate
npm run prisma:migrate
npm run prisma:deploy
```

## Implementation note

When adding new backend behavior, keep the API layer thin and push business rules into the feature service that owns the domain object.