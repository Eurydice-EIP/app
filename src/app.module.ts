import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/env.validation';
import databaseConfig from './config/database.config';
import apiConfig from './config/api.config';
import { TasksModule } from './tasks/tasks.module';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import jwtConfig from './config/jwt.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            validate: validate,
            load: [apiConfig, databaseConfig, jwtConfig],
            isGlobal: true,
            cache: true,
        }),
        ProjectsModule,
        TasksModule,
        AuthModule,
        UsersModule,
    ],
})
export class AppModule {}
