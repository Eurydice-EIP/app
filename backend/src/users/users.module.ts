import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma.service';
import { UsersController } from './users.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

@Module({
    imports: [
        MulterModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                storage: diskStorage({
                    destination: (_req, _file, cb) => {
                        const uploadDir =
                            configService.get<string>('uploads.dir') ?? '';
                        cb(null, uploadDir);
                    },
                    filename: (_req, file, cb) => {
                        cb(null, `${uuidv4()}${extname(file.originalname)}`);
                    },
                }),
                fileFilter: (_req, file, cb) => {
                    cb(
                        null,
                        ['image/jpeg', 'image/png', 'image/webp'].includes(
                            file.mimetype
                        )
                    );
                },
                limits: { fileSize: 2 * 1024 * 1024 },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [PrismaService, UsersService],
    exports: [UsersService],
    controllers: [UsersController],
})
export class UsersModule {}
