import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { PrismaService } from 'src/prisma.service';
import { RabbitMQModule } from 'src/rabbitMQ/rabbitmq.module';

@Module({
    imports: [RabbitMQModule],
    controllers: [TasksController],
    providers: [PrismaService, TasksService],
    exports: [TasksService],
})
export class TasksModule {}
