---
sibar_position: 3
---

# Docker

Docker is a platform for developing, shipping, and running applications in containers. It allows you to package your application and its dependencies into a standardized unit for software development.

## Key Features

- **Containerization**: Docker uses container technology to create isolated environments for applications. Containers are lightweight, portable, and efficient, enabling consistent deployment across different environments.

- **Image Management**: Docker images are used to create containers and contain everything needed to run an application, including the code, runtime, libraries, and dependencies. Images can be versioned, shared, and reused, making it easy to manage application dependencies.

- **Dockerfile**: Docker uses a Dockerfile to define the steps needed to create a Docker image. This file specifies the base image, dependencies, environment variables, and commands to run when the container starts. Dockerfiles promote reproducibility and consistency in building images.

- **Container Orchestration**: Docker provides tools like Docker Compose and Docker Swarm to manage multiple containers and services. These tools simplify the deployment, scaling, and monitoring of containerized applications.

## Use Cases

Docker can be useful in various scenarios, for exemple when you are building a full-stack application with a frontend, backend, and database. You can use Docker to create separate containers for each component and define the network connections between them.

Here's an example of a `docker-compose.yml` file that defines a multi-container for different part of the backend (Databse, Server and Admin Panel):

```yml
services:
  postgres:
    image: postgres:15
    container_name: my_postgres_container
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: password
      POSTGRES_DB: database
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U admin -d database"]
      interval: 10s
      timeout: 5s
      retries: 5

  pgadmin:
    image: dpage/pgadmin4
    container_name: my_pgadmin
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@example.com
      PGADMIN_DEFAULT_PASSWORD: admin
    ports:
      - "5050:80"
    depends_on:
      - postgres
    volumes:
      - pgadmin_data:/var/lib/pgadmin

  server:
    build: ./area_back
    ports:
      - "8080:8080"
    depends_on:
      postgres:
        condition: service_healthy
    env_file:
      - ./area_back/.env
    command: >
      sh -c "npx prisma migrate deploy &&
             npm start"

volumes:
  postgres_data:
  pgadmin_data:
```