import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { Task as PrismaTask } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class TasksService {
    constructor(private readonly prisma: PrismaService) {}

    private mapTask(
        task: PrismaTask & {
            blocks: { blockedId: number }[];
            blockedBy: { blockerId: number }[];
        }
    ): PrismaTask & { blocks: number[]; blockedBy: number[] } {
        return {
            ...task,
            blocks: task.blocks.map((b) => b.blockedId),
            blockedBy: task.blockedBy.map((b) => b.blockerId),
        };
    }

    // ---------------- CREATE ----------------
    async create(
        dto: CreateTaskDto
    ): Promise<PrismaTask & { blocks: number[]; blockedBy: number[] }> {
        // Start a transaction to ensure data integrity
        const result = await this.prisma.$transaction(async (prisma) => {
            // Create the task
            const task = await prisma.task.create({
                data: {
                    title: dto.title,
                    dueAt: new Date(dto.dueAt),
                    userId: dto.userId ?? null,
                    projectId: dto.projectId ?? null,
                    importance: dto.importance,
                    estimatedTime: dto.estimatedTime,
                },
            });

            // Handle blocked tasks if any
            if (dto.blocks?.length) {
                if (dto.blocks.includes(task.id)) {
                    throw new BadRequestException('A task cannot block itself');
                }

                const blockedTasks = await prisma.task.findMany({
                    where: { id: { in: dto.blocks } },
                    select: { id: true },
                });

                if (blockedTasks.length !== dto.blocks.length) {
                    throw new BadRequestException(
                        'Some specified blocked tasks do not exist'
                    );
                }

                await prisma.taskBlock.createMany({
                    data: dto.blocks.map((blockedId) => ({
                        blockerId: task.id,
                        blockedId,
                    })),
                });
            }

            return {
                ...task,
                blocks: dto.blocks ?? [],
                blockedBy: [],
            };
        });

        return result;
    }

    // ---------------- FIND ONE ----------------
    async findOne(
        id: number
    ): Promise<
        (PrismaTask & { blocks: number[]; blockedBy: number[] }) | null
    > {
        const task = await this.prisma.task.findUnique({
            where: { id },
            include: {
                blocks: { select: { blockedId: true } },
                blockedBy: { select: { blockerId: true } },
            },
        });

        if (!task) {
            return null;
        }

        return this.mapTask(task);
    }

    // ---------------- FIND ALL ----------------
    async findAll(): Promise<
        (PrismaTask & { blocks: number[]; blockedBy: number[] })[]
    > {
        const tasks = await this.prisma.task.findMany({
            include: {
                blocks: { select: { blockedId: true } },
                blockedBy: { select: { blockerId: true } },
            },
        });

        return tasks.map((task) => this.mapTask(task));
    }

    // ---------------- UPDATE ----------------
    async update(
        id: number,
        dto: UpdateTaskDto
    ): Promise<PrismaTask & { blocks: number[]; blockedBy: number[] }> {
        // Start a transaction to ensure data integrity
        const result = await this.prisma.$transaction(async (prisma) => {
            // Update the task
            try {
                await prisma.task.update({
                    where: { id },
                    data: {
                        ...(dto.title !== undefined && {
                            title: dto.title,
                        }),
                        ...(dto.dueAt !== undefined && {
                            dueAt: new Date(dto.dueAt),
                        }),
                        ...(dto.status !== undefined && {
                            status: dto.status,
                        }),
                        ...(dto.userId !== undefined && {
                            userId: dto.userId,
                        }),
                        ...(dto.projectId !== undefined && {
                            projectId: dto.projectId,
                        }),
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
                    throw new NotFoundException('Task not found');
                }
                throw err;
            }

            // Handle blocked tasks if any
            if (dto.blocks !== undefined) {
                if (dto.blocks.includes(id)) {
                    throw new BadRequestException('A task cannot block itself');
                }

                const blockedTasks = await prisma.task.findMany({
                    where: { id: { in: dto.blocks } },
                    select: { id: true },
                });

                if (blockedTasks.length !== dto.blocks.length) {
                    throw new BadRequestException(
                        'Some specified blocked tasks do not exist'
                    );
                }

                const existingBlocks = await prisma.taskBlock.findMany({
                    where: { blockerId: id },
                    select: { blockedId: true },
                });
                const existingBlocksIds = existingBlocks.map(
                    (t) => t.blockedId
                );
                const toDelete = existingBlocksIds.filter(
                    (id) => !dto.blocks!.includes(id)
                );
                const toAdd = dto.blocks.filter(
                    (id) => !existingBlocksIds.includes(id)
                );

                // Delete obsolete block relationships
                if (toDelete.length > 0) {
                    await prisma.taskBlock.deleteMany({
                        where: {
                            blockerId: id,
                            blockedId: { in: toDelete },
                        },
                    });
                }

                // Create new block relationships
                if (toAdd.length > 0) {
                    await prisma.taskBlock.createMany({
                        data: toAdd.map((blockedId) => ({
                            blockerId: id,
                            blockedId,
                        })),
                    });
                }
            }

            const fullTask = await prisma.task.findUnique({
                where: { id },
                include: {
                    blocks: { select: { blockedId: true } },
                    blockedBy: { select: { blockerId: true } },
                },
            });

            return {
                ...fullTask!,
                blocks: fullTask!.blocks.map((b) => b.blockedId),
                blockedBy: fullTask!.blockedBy.map((b) => b.blockerId),
            };
        });

        return result;
    }

    // ---------------- DELETE ----------------
    async delete(
        id: number
    ): Promise<PrismaTask & { blocks: number[]; blockedBy: number[] }> {
        // Start a transaction to ensure data integrity
        const result = await this.prisma.$transaction(async (prisma) => {
            // Delete related block relationships
            await prisma.taskBlock.deleteMany({
                where: {
                    OR: [{ blockerId: id }, { blockedId: id }],
                },
            });

            // Delete task
            let task: PrismaTask;
            try {
                task = await prisma.task.delete({
                    where: { id },
                });
            } catch (err) {
                if (
                    err instanceof PrismaClientKnownRequestError &&
                    err.code === 'P2025'
                ) {
                    throw new NotFoundException('Task not found');
                }
                throw err;
            }

            return {
                ...task,
                blocks: [],
                blockedBy: [],
            };
        });

        return result;
    }
}
