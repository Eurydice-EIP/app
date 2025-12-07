import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Task as PrismaTask } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
    constructor(private readonly prisma: PrismaService) {}

    // ---------------- CREATE ----------------
    async create(task: Prisma.TaskCreateInput): Promise<PrismaTask> {
        return this.prisma.task.create({
            data: task,
        });
    }

    // ---------------- FIND ONE ----------------
    async findOne(id: number): Promise<PrismaTask | null> {
        return this.prisma.task.findUnique({
            where: { id },
        });
    }

    // ---------------- FIND ALL ----------------
    async findAll(): Promise<PrismaTask[]> {
        return this.prisma.task.findMany();
    }

    // ---------------- UPDATE ----------------
    async update(
        id: number,
        updateTaskDto: UpdateTaskDto
    ): Promise<PrismaTask> {
        const existingTask = await this.prisma.task.findUnique({
            where: { id },
        });

        if (!existingTask) {
            throw new NotFoundException(`Aucune tâche trouvée avec l'id ${id}`);
        }

        return this.prisma.task.update({
            where: { id },
            data: {
                ...(updateTaskDto.title !== undefined && {
                    title: updateTaskDto.title,
                }),
                ...(updateTaskDto.dueAt !== undefined && {
                    due_at: new Date(updateTaskDto.dueAt),
                }),
                ...(updateTaskDto.userId !== undefined && {
                    user_id: updateTaskDto.userId,
                }),
                ...(updateTaskDto.projectId !== undefined && {
                    project_id: updateTaskDto.projectId,
                }),
                ...(updateTaskDto.importance !== undefined && {
                    importance: updateTaskDto.importance,
                }),
                ...(updateTaskDto.estimatedMin !== undefined && {
                    estimated_min: updateTaskDto.estimatedMin,
                }),
            },
        });
    }

    // ---------------- DELETE ----------------
    async delete(id: number): Promise<PrismaTask> {
        const existingTask = await this.prisma.task.findUnique({
            where: { id },
        });

        if (!existingTask) {
            throw new NotFoundException(`Aucune tâche trouvée avec l'id ${id}`);
        }

        return this.prisma.task.delete({
            where: { id },
        });
    }
}
