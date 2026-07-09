import {
    Injectable,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Project, Task } from '@prisma/client';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { GameEventProducer } from 'src/rabbitMQ/game-event.producer';
import { ProjectStatus, TaskStatus } from '@prisma/client';
import { TasksService } from 'src/tasks/tasks.service';

@Injectable()
export class ProjectsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly tasksService: TasksService,
        private readonly gameEventProducer: GameEventProducer
    ) {}

    // ---------------- CREATE ----------------
    async create(userId: number, dto: CreateProjectDto): Promise<Project> {
        return this.prisma.project.create({
            data: {
                title: dto.title,
                description: dto.description,
                dueAt: new Date(dto.dueAt),
                userId: userId,
                type: dto.type,
                importance: dto.importance,
                estimatedTime: dto.estimatedTime ?? 0,
            },
        });
    }

    // ---------------- FIND ALL ----------------
    async findAll(
        userId: number
    ): Promise<(Project & { totalTasks: number; completedTasks: number })[]> {
        const projects = await this.prisma.project.findMany({
            where: { userId },
            select: {
                id: true,
                title: true,
                description: true,
                dueAt: true,
                userId: true,
                type: true,
                importance: true,
                estimatedTime: true,
                createdAt: true,
                lastUpdate: true,
                status: true,
                _count: {
                    select: {
                        tasks: true,
                    },
                },
                tasks: {
                    where: {
                        status: TaskStatus.COMPLETED,
                    },
                    select: {
                        id: true,
                    },
                },
            },
        });

        return projects.map(({ _count, tasks, ...project }) => ({
            ...project,
            totalTasks: _count.tasks,
            completedTasks: tasks.length,
        }));
    }

    // ---------------- FIND ONE ----------------
    async findOne(
        userId: number,
        id: number
    ): Promise<Project & { totalTasks: number; completedTasks: number }> {
        const project = await this.prisma.project.findUnique({
            where: { id, userId },
            select: {
                id: true,
                title: true,
                description: true,
                dueAt: true,
                userId: true,
                type: true,
                importance: true,
                estimatedTime: true,
                createdAt: true,
                lastUpdate: true,
                status: true,
                _count: {
                    select: {
                        tasks: true,
                    },
                },
                tasks: {
                    where: {
                        status: TaskStatus.COMPLETED,
                    },
                    select: {
                        id: true,
                    },
                },
            },
        });

        if (!project) {
            throw new NotFoundException('Project not found');
        }

        const { _count, tasks, ...projectData } = project;

        return {
            ...projectData,
            totalTasks: _count.tasks,
            completedTasks: tasks.length,
        };
    }

    // ---------------- UPDATE ----------------
    async update(
        userId: number,
        id: number,
        dto: UpdateProjectDto
    ): Promise<Project> {
        const existingProject = await this.prisma.project.findUnique({
            where: { id, userId },
            include: { tasks: true },
        });

        if (!existingProject) {
            throw new NotFoundException('Project not found');
        }

        if (
            dto.status === ProjectStatus.COMPLETED &&
            existingProject.status !== ProjectStatus.COMPLETED
        ) {
            if (existingProject.tasks.length === 0) {
                throw new BadRequestException('Project has no tasks');
            }

            for (const task of existingProject.tasks) {
                if (task.status !== TaskStatus.COMPLETED) {
                    await this.tasksService.update(userId, task.id, {
                        status: TaskStatus.COMPLETED,
                    });
                }
            }
        }

        try {
            return await this.prisma.project.update({
                where: { id, userId },
                data: {
                    ...(dto.title !== undefined && { title: dto.title }),
                    ...(dto.description !== undefined && {
                        description: dto.description,
                    }),
                    ...(dto.dueAt !== undefined && {
                        dueAt: new Date(dto.dueAt),
                    }),
                    ...(dto.type !== undefined && { type: dto.type }),
                    ...(dto.status !== undefined && { status: dto.status }),
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
    async delete(userId: number, id: number): Promise<Project> {
        return this.prisma.$transaction(async (prisma) => {
            const project = await prisma.project.findUnique({
                where: { id, userId },
                include: { tasks: true },
            });

            if (!project) {
                throw new NotFoundException('Project not found');
            }

            await prisma.task.deleteMany({
                where: { projectId: id },
            });

            await prisma.project.delete({
                where: { id, userId },
            });

            // Retourner le projet avec les tâches supprimées
            return project;
        });
    }

    // ---------------- ADD TASK TO PROJECT ----------------
    async addTask(userId: number, projectId: number, taskId: number) {
        return this.prisma.$transaction(async (prisma) => {
            const project = await prisma.project.findUnique({
                where: { id: projectId, userId },
            });

            if (!project) {
                throw new NotFoundException('Project not found');
            }

            if (project.status == ProjectStatus.COMPLETED)
                throw new NotFoundException(
                    "Project is completed, it can't anymore task"
                );

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
                where: { id: taskId, userId: userId },
                data: { projectId },
            });
        });
    }

    // ---------------- REMOVE TASK FROM PROJECT ----------------
    async removeTask(userId: number, projectId: number, taskId: number) {
        return this.prisma.$transaction(async (prisma) => {
            const task = await prisma.task.findUnique({
                where: { id: taskId, userId: userId },
            });

            if (!task || task.projectId !== projectId) {
                throw new NotFoundException(
                    'Task not associated with this project'
                );
            }

            return prisma.task.update({
                where: { id: taskId, userId: userId },
                data: { projectId: null },
            });
        });
    }

    // ---------------- GET ALL TASKS IN PROJECT ----------------
    async getTasksInProject(
        userId: number,
        projectId: number
    ): Promise<(Task & { blocks: number[]; blockedBy: number[] })[]> {
        const project = await this.prisma.project.findUnique({
            where: { id: projectId, userId },
            include: {
                tasks: {
                    include: {
                        blocks: { select: { blockedId: true } },
                        blockedBy: { select: { blockerId: true } },
                    },
                },
            },
        });

        if (!project) {
            throw new NotFoundException('Project not found');
        }

        return project.tasks.map((task) => ({
            ...task,
            blocks: task.blocks.map((b) => b.blockedId),
            blockedBy: task.blockedBy.map((b) => b.blockerId),
        }));
    }
}
