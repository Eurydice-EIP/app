import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { logger } from './common/middleware/logger.middleware';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { exit } from 'process';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });
    const configService = app.get(ConfigService);
    const port = configService.get<number>('api.port');
    const swaggerConfig = new DocumentBuilder()
        .setTitle('API Documentation')
        .setDescription('The Eurydice API description')
        .setVersion('1.0')
        .addServer('/v1')
        .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);

    SwaggerModule.setup('api', app, document);
    app.enableVersioning({ type: VersioningType.URI });
    app.use(logger);
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.useGlobalInterceptors(
        new LoggingInterceptor(),
        new TimeoutInterceptor()
    );
    await app.listen(port || 3000);
}

bootstrap().catch((err) => {
    console.error('Bootstrap error', err);
    exit(1);
});
