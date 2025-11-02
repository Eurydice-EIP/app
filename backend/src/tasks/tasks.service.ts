import { Injectable } from '@nestjs/common';
import { Prisma, Task } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TasksService {
    constructor(private readonly prisma: PrismaService) {}

    async create(task: Prisma.TaskCreateInput): Promise<Task> {
        return this.prisma.task.create({
            data: task,
        });
    }

    async findOne(id: number): Promise<Task | null> {
        return this.prisma.task.findUnique({
            where: { id },
        });
    }
}
