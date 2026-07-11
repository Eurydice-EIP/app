import { Module, forwardRef } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { PrismaService } from 'src/prisma.service';
import { RabbitMQModule } from 'src/rabbitMQ/rabbitmq.module';
import { XpModule } from 'src/rabbitMQ/xp/xp-service/xp.module';

@Module({
    imports: [
        RabbitMQModule,
        forwardRef(() => XpModule),
    ],
    controllers: [TasksController],
    providers: [PrismaService, TasksService],
    exports: [TasksService],
})
export class TasksModule {}