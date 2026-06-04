# Base stage
FROM node:25.0-alpine3.21 AS base

WORKDIR /app
COPY package*.json ./

RUN npm ci --omit=dev

# Build stage
FROM node:25.0-alpine3.21 AS build

WORKDIR /app
COPY . .

RUN npm ci

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

RUN npm run build

# Production stage
FROM node:25.0-alpine3.21 AS production

WORKDIR /app

COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package*.json ./
COPY --from=build /app/.next ./.next

CMD ["npm", "run", "start"]
