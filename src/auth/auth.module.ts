import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import type { StringValue } from 'ms';
import { AuthGuard } from '../common/guards/auth.gard';
import { APP_GUARD } from '@nestjs/core';

@Module({
    imports: [
        UsersModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            global: true,
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('jwt.secret'),
                signOptions: {
                    expiresIn:
                        configService.get<StringValue>('jwt.expiresIn') ||
                        '3600s',
                },
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
    exports: [AuthService],
})
export class AuthModule {}
