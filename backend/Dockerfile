# Base stage
FROM node:25.0-alpine3.21 AS base

WORKDIR /app
COPY package*.json ./

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

RUN if [ "$NODE_ENV" = "production" ]; then \
        npm ci --omit=dev; \
    else \
        npm ci; \
    fi


# Production build stage
FROM base AS build

COPY . .

RUN if [ "$NODE_ENV" = "production" ]; then \
        npm run build; \
    fi


# Production runtime stage
FROM node:25.0-alpine3.21 AS production

WORKDIR /app

COPY --from=base /app/package*.json ./
COPY --from=base /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

CMD ["npm", "run", "start:prod"]


# Development runtime stage
FROM base AS development

WORKDIR /app

COPY . .

CMD ["npm", "run", "start:dev"]
