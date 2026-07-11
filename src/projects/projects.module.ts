import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { PrismaService } from 'src/prisma.service';
import { RabbitMQModule } from 'src/rabbitMQ/rabbitmq.module';
import { TasksModule } from 'src/tasks/tasks.module';
import { XpModule } from 'src/rabbitMQ/xp/xp-service/xp.module';

@Module({
    imports: [RabbitMQModule, TasksModule, XpModule],
    controllers: [ProjectsController],
    providers: [PrismaService, ProjectsService],
})
export class ProjectsModule {}
