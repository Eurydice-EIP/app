import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Timer as PrismaTimer } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TimerService {
    constructor(private readonly prisma: PrismaService) {}

    async start(userId: number, taskId: number): Promise<PrismaTimer> {
        const task = await this.prisma.task.findUnique({
            where: { id: taskId, userId },
            include: { timer: true },
        });

        if (!task) {
            throw new NotFoundException('Task not found');
        }

        if (!task.timer) {
            const result = await this.prisma.$transaction(async (prisma) => {
                const timer = await prisma.timer.create({});

                await prisma.task.update({
                    where: { id: taskId, userId },
                    data: { timerId: timer.id },
                });
                return timer;
            });

            return result;
        }

        if (task.timer.running) {
            throw new BadRequestException('Timer is already running for this task');
        }

        await this.prisma.timer.update({
            where: { id: task.timer.id },
            data: {
                startTime: new Date(),
                running: true,
            },
        });

        return task.timer;
    }

    async stop(userId: number, taskId: number): Promise<PrismaTimer> {
        const task = await this.prisma.task.findUnique({
            where: { id: taskId, userId },
            include: { timer: true },
        });

        if (!task) {
            throw new NotFoundException('Task not found');
        }

        if (!task.timer) {
            throw new BadRequestException('No timer found for this task');
        }

        if (!task.timer.running) {
            throw new BadRequestException('Timer is not running for this task');
        }

        const endTime = new Date();
        const duration = task.timer.duration + (endTime.getTime() - task.timer.startTime.getTime()) / 1000;

        const timer = await this.prisma.timer.update({
            where: { id: task.timer.id },
            data: {
                endTime: endTime,
                duration: duration,
                running: false,
            },
        });

        return timer;
    }
}
