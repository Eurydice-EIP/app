---
sidebar_position: 5
---

# Prisma

Prisma is a next-generation ORM (Object-Relational Mapping) for TypeScript and Node.js. It simplifies database access by providing a type-safe and auto-generated query builder that's tailored to your database schema.

## Key Features

- **Type-Safety**: Prisma generates TypeScript types based on your database schema, ensuring type-safe database access and eliminating runtime errors related to data types.

- **Auto-Generated Queries**: Prisma generates efficient SQL queries based on your database schema and provides a fluent API for querying, updating, and deleting data.

- **Database Migrations**: Prisma supports database migrations, allowing you to evolve your database schema over time without losing data or manually writing migration scripts.

- **Real-Time Data Sync**: Prisma Client supports real-time data synchronization, enabling you to subscribe to changes in the database and receive updates in real-time.

- **Performance**: Prisma optimizes database queries and provides tools for monitoring query performance, making it suitable for high-performance applications.

## Simple Example

Here's an example of using Prisma to query data from a `User` table:

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getUsers() {
  const users = await prisma.user.findMany();
  return users;
}

getUsers().then((users) => {
  console.log(users);
});
```

In this example, we import the `PrismaClient` from the `@prisma/client` package and create an instance of it. We define an `async` function `getUsers` that uses the `prisma.user.findMany()` method to retrieve all users from the `User` table. Finally, we call the `getUsers` function and log the results to the console.

## Advanced Example

Prisma supports complex queries, filtering, sorting, pagination, and aggregation. Here's an example of querying users with filtering and sorting:

```typescript
async function getUsersWithFilterAndSort() {
  const users = await prisma.user.findMany({
    where: {
      age: {
        gte: 18,
      },
    },
    orderBy: {
      name: 'asc',
    },
  });
  return users;
}

getUsersWithFilterAndSort().then((users) => {
  console.log(users);
});
```

In this example, we use the `prisma.user.findMany()` method with filtering and sorting options. We filter users based on the `age` field (greater than or equal to 18) and sort the results by the `name` field in ascending order.

## Comparison with TypeORM

**Prisma:**
- Generates TypeScript types based on the database schema, ensuring type safety.
- Provides a fluent API for querying, updating, and deleting data.
- Supports database migrations and real-time data synchronization.

**TypeORM:**
- Supports multiple databases (MySQL, PostgreSQL, SQLite, etc.) and provides a flexible query builder.
- Offers a rich set of features for defining entities, relationships, and custom queries.
- Supports TypeScript and JavaScript, but may require additional type annotations for full type safety.

**Comparison:**
- **Prisma:** Prioritizes type safety, auto-generation, and real-time data synchronization, providing a more streamlined and efficient developer experience with built-in support for TypeScript without the need for manual annotations.

- **TypeORM:** While it offers greater flexibility for database support and custom queries, it requires more manual configuration for type safety and can be more complex to manage in larger, more intricate data models.


## Comparison with SQL 

**Prisma:**
- Abstracts away raw SQL queries and provides a type-safe query builder.
- Generates efficient SQL queries based on your database schema.
- Supports database migrations and real-time data synchronization.

**SQL:**
- Requires writing raw SQL queries for database operations.
- Provides full control over query optimization and performance tuning.
- May require manual schema changes and data migrations.

**Comparison:**
- **Prisma:** Simplifies database access by providing a type-safe and auto-generated query builder, reducing the need for manual SQL queries and enhancing developer productivity.

- **SQL:** While offering more control over query optimization and schema management, it demands more expertise and manual work, making it more suitable for advanced and highly customized database operations.

## Conclusion

Prisma is a powerful ORM that simplifies database access and management in TypeScript and Node.js applications. By leveraging its type-safe query builder, auto-generated types, and real-time data synchronization, developers can build scalable and efficient applications with ease. Prisma's support for database migrations and performance monitoring makes it a valuable tool for modern web development projects.