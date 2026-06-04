import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/env.validation';
import databaseConfig from './config/database.config';
import apiConfig from './config/api.config';
import { TasksModule } from './tasks/tasks.module';
import { ProjectsModule } from './projects/projects.module';
import { RabbitMQModule } from './rabbitMQ/rabbitmq.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import jwtConfig from './config/jwt.config';
import { LevelModule } from './level/level.module';
import uploadsConfig from './config/uploads.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            validate: validate,
            load: [apiConfig, databaseConfig, jwtConfig, uploadsConfig],
            isGlobal: true,
            cache: true,
        }),
        ProjectsModule,
        TasksModule,
        RabbitMQModule,
        AuthModule,
        UsersModule,
        LevelModule,
    ],
})
export class AppModule {}
