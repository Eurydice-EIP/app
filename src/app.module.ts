import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/env.validation';
import databaseConfig from './config/database.config';
import apiConfig from './config/api.config';

@Module({
    imports: [ConfigModule.forRoot({
        validate: validate,
        load: [apiConfig, databaseConfig],
        isGlobal: true,
        cache: true,
    })],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
