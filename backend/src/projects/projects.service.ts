import {
    Injectable,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Project } from '@prisma/client';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class ProjectsService {
    constructor(private readonly prisma: PrismaService) {}

    // ---------------- CREATE ----------------
    async create(dto: CreateProjectDto): Promise<Project> {
        return this.prisma.project.create({
            data: {
                title: dto.title,
                dueAt: new Date(dto.dueAt),
                userId: dto.userId ?? null,
                type: dto.type,
                importance: dto.importance,
                estimatedTime: dto.estimatedTime ?? 0,
            },
        });
    }

    // ---------------- FIND ALL ----------------
    async findAll(): Promise<Project[]> {
        return this.prisma.project.findMany({
            include: {
                tasks: true,
            },
        });
    }

    // ---------------- FIND ONE ----------------
    async findOne(id: number): Promise<Project> {
        const project = await this.prisma.project.findUnique({
            where: { id },
            include: {
                tasks: true,
            },
        });

        if (!project) {
            throw new NotFoundException('Project not found');
        }

        return project;
    }

    // ---------------- UPDATE ----------------
    async update(id: number, dto: UpdateProjectDto): Promise<Project> {
        try {
            return await this.prisma.project.update({
                where: { id },
                data: {
                    ...(dto.title !== undefined && { title: dto.title }),
                    ...(dto.dueAt !== undefined && {
                        dueAt: new Date(dto.dueAt),
                    }),
                    ...(dto.type !== undefined && { type: dto.type }),
                    ...(dto.importance !== undefined && {
                        importance: dto.importance,
                    }),
                    ...(dto.estimatedTime !== undefined && {
                        estimatedTime: dto.estimatedTime,
                    }),
                },
            });
        } catch (err) {
            if (
                err instanceof PrismaClientKnownRequestError &&
                err.code === 'P2025'
            ) {
                throw new NotFoundException('Project not found');
            }
            throw err;
        }
    }

    // ---------------- DELETE ----------------
    async delete(id: number): Promise<Project> {
        return this.prisma.$transaction(async (prisma) => {
            const project = await prisma.project.findUnique({
                where: { id },
                include: { tasks: true },
            });

            if (!project) {
                throw new NotFoundException('Project not found');
            }

            await prisma.task.deleteMany({
                where: { projectId: id },
            });

            await prisma.project.delete({
                where: { id },
            });

            // Retourner le projet avec les tâches supprimées
            return project;
        });
    }

    // ---------------- ADD TASK TO PROJECT ----------------
    async addTask(projectId: number, taskId: number) {
        return this.prisma.$transaction(async (prisma) => {
            const project = await prisma.project.findUnique({
                where: { id: projectId },
            });

            if (!project) {
                throw new NotFoundException('Project not found');
            }

            const task = await prisma.task.findUnique({
                where: { id: taskId },
            });

            if (!task) {
                throw new NotFoundException('Task not found');
            }

            if (task.projectId === projectId) {
                throw new BadRequestException(
                    'Task already belongs to this project'
                );
            }

            return prisma.task.update({
                where: { id: taskId },
                data: { projectId },
            });
        });
    }

    // ---------------- REMOVE TASK FROM PROJECT ----------------
    async removeTask(projectId: number, taskId: number) {
        return this.prisma.$transaction(async (prisma) => {
            const task = await prisma.task.findUnique({
                where: { id: taskId },
            });

            if (!task || task.projectId !== projectId) {
                throw new NotFoundException(
                    'Task not associated with this project'
                );
            }

            return prisma.task.update({
                where: { id: taskId },
                data: { projectId: null },
            });
        });
    }
}
