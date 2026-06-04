import { Module } from '@nestjs/common';
import { LevelController } from './level.controller';
import { LevelService } from './level.service';
import { PrismaService } from '../prisma.service';

@Module({
    controllers: [LevelController],
    providers: [LevelService, PrismaService],
    exports: [LevelService],
})
export class LevelModule {}
