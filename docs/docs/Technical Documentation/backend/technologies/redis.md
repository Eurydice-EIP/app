---
sidebar_position: 1
---

# Redis

Redis is an open-source, in-memory data structure store that can be used as a database, cache, and message broker. It supports various data structures such as strings, lists, sets, sorted sets, hashes, bitmaps, and hyperloglogs, making it versatile for a wide range of use cases.

## Key Features

- **In-Memory Database**: Redis stores data in memory, which allows for fast read and write operations. It can persist data to disk for durability or use a combination of memory and disk storage for performance and reliability.

- **Data Structures**: Redis supports a variety of data structures, including strings, lists, sets, sorted sets, hashes, bitmaps, and hyperloglogs. These data structures enable complex operations and data manipulation.

## Setup

Here's an example of using setting up a Redis cache in a Nest.js application:

```typescript
import { Injectable } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PassportModule.register({ session: true }),
    OauthModule,
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      socket: {
        host: 'my_redis',
        port: 6379,
      },
      ttl: 3600,
    })
  ],
  controllers: [],
  providers: [],
}) 
```

## Example

In this example, we configure a Redis cache using the `cache-manager-redis-store` package in a Nest.js application. The cache is set to expire after 3600 seconds (1 hour) and uses a Redis server running on `my_redis` host and port `6379`.

Here's an exemple of using Caching with Redis in a Nest.js service:

```typescript
async login({ authBody }: { authBody: LogUserDto }) {

    const cacheKey = `user:${authBody.email}`;
    const { email, password } = authBody;

    /** Check if the user exist in the cache */
    let userExist = await this.cacheManager.get<any>(cacheKey);

    /** If not */
    if (!userExist) {
        userExist = await this.prismaService.user.findUnique({
            where: {
                email: email,
            },
        });
        console.log('userExist', userExist);
        /** Set the user into the cache to avoid requesting the database all the time */
        if (userExist) {
            await this.cacheManager.set(cacheKey, userExist, 3600);
        }
    }
    if (!userExist) {
        throw new BadRequestException(['Invalid email or password']);
    }

    const isPasswordValid = await this.isPasswordValid({
        password,
        hashedPassword: userExist.password
    });
    if (!isPasswordValid) {
        throw new BadRequestException(['Invalid email or password']);
    }
    return this.authenticateUser({ userId: userExist.id });
}
```

In this example, we use the `cache-manager` package to store and retrieve user data from a Redis cache. When a user logs in, we first check if the user exists in the cache using a unique cache key based on the user's email. If the user is not found in the cache, we query the database to fetch the user data and store it in the cache for future requests. This caching mechanism helps reduce the number of database queries and improves the performance of the application.
