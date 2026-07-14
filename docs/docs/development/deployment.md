# Deployment

Eurydice is deployed from the package that owns the code you are shipping. The backend and frontend each have their own build and runtime commands, while the docs site is built separately.

## Backend deployment path

The backend supports container-based delivery through its Dockerfile and compose files.

Typical flow:

```bash
cd backend
docker compose up -d --build
```

Before promoting a schema change, run the Prisma deployment step:

```bash
npm run prisma:deploy
```

## Frontend deployment path

The frontend is a standard Next.js application.

```bash
cd frontend
npm run build
npm run start
```

If the frontend is containerized, build the image from the frontend Dockerfile and keep the environment variables in sync with the backend URL and upload URL.

## Docs deployment path

```bash
cd docs
npm run build
npm run serve
```

## Production checklist

- confirm environment variables are present for API, database, JWT, RabbitMQ, and uploads
- verify migrations are deployed before traffic moves
- ensure the frontend points at the correct API base URL
- rebuild the docs site after any navigation or content change