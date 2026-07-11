import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { TasksService } from 'src/tasks/tasks.service';
import { XpCalculatorService } from 'src/rabbitMQ/xp/xp-calculate.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class XpService {
    constructor(
        private readonly usersService: UsersService,
        private readonly tasksService: TasksService,
        private readonly xpCalculator: XpCalculatorService,
        private readonly prisma: PrismaService,
    ) {}

    async handleTaskCompleted(data: {
        userId: string;
        taskId: string;
        completedAt: string;
        isBonus?: boolean;
    }) {
        const userId = Number(data.userId);
        const taskId = Number(data.taskId);

        const [user, task] = await Promise.all([
            this.usersService.findById(userId, userId),
            this.tasksService.findById(taskId),
        ]);

        if (!user) {
            console.error('[XP] User not found:', userId);
            return;
        }

        if (!task) {
            console.error('[XP] Task not found:', taskId);
            return;
        }

        const completedAt = new Date(data.completedAt);

        const earnedXp = this.xpCalculator.calculateTaskXp({
            ...task,
            completedAt,
            isMainProject: data.isBonus,
        });

        let newXp = user.xp + earnedXp;
        let newLevel = user.level;

        let xpNeeded = this.xpCalculator.xpToNextLevel(newLevel);

        while (newXp >= xpNeeded) {
          newXp -= xpNeeded;
            newLevel += 1;
            xpNeeded = this.xpCalculator.xpToNextLevel(newLevel);

          console.log(
            `[XP] LEVEL UP ! User ${userId} => level ${newLevel}`,
          );
        }

        await this.usersService.updateXpAndLevel(userId, newXp, newLevel);

        console.log(
          `[XP] User ${userId} gained ${earnedXp} XP (lvl ${user.level} -> ${newLevel})`,
        );
    }

    async handleProjectCompleted(data: {
        userId: string;
        projectId: string;
    }) {
        const userId = Number(data.userId);
        const projectId = Number(data.projectId);

        const [user, project] = await Promise.all([
            this.usersService.findById(userId, userId),
            this.prisma.project.findUnique({
                where: {
                    id: projectId,
                },
            }),
        ]);

        if (!user || !project) {
            console.error('[XP] Project or user not found');
            return;
        }

        const earnedXp = this.xpCalculator.getBaseProjectXp(project);

        const newXp = user.xp + earnedXp;

        await this.usersService.updateXpAndLevel(
            userId,
            newXp,
            user.level,
        );

        console.log(
            `[XP] User ${userId} gained ${earnedXp} XP from project ${projectId}`,
        );
    }
}