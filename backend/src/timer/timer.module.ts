import { Module } from '@nestjs/common';
import { TimerController } from './timer.controller';
import { TimerService } from './timer.service';
import { PrismaService } from 'src/prisma.service';

@Module({
    controllers: [TimerController],
    providers: [PrismaService, TimerService],
    exports: [TimerService],
})
export class TimerModule {}
