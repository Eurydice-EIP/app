# Local Setup

The repository is split into separate apps, so install and run each package from its own directory.

## Prerequisites

- Node.js 18 or newer
- npm
- PostgreSQL for the backend
- RabbitMQ for the event pipeline

## Backend

```bash
cd backend
npm install
npm run start:dev
```

Use the Prisma scripts whenever the schema changes:

```bash
npm run prisma:generate
npm run prisma:migrate
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend expects its API and upload URLs through environment variables such as `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_UPLOAD_API_URL`.

## Docs site

```bash
cd docs
npm install
npm run start
```

## Recommended order

1. Start PostgreSQL and RabbitMQ.
2. Run the backend in development mode.
3. Run the frontend against the backend API.
4. Open the docs site once the content you are checking is in place.