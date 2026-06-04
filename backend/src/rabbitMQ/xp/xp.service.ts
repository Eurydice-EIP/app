import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { TasksService } from 'src/tasks/tasks.service';

@Injectable()
export class XpService {
    constructor(
        private readonly usersService: UsersService,
        private readonly tasksService: TasksService
    ) {}

    private xpToNextLevel(level: number): number {
        return 100 * level * level;
    }

    async handleTaskCompleted(data: {
        userId: string;
        taskId: string;
        completedAt: string;
        isBonus?: boolean;
    }) {
        const userId = Number(data.userId);
        console.log('userId = ', userId);
        const taskId = Number(data.taskId);

        const [user, task] = await Promise.all([
            this.usersService.findById(userId),
            this.tasksService.findById(taskId),
        ]);
        console.log('user = ', user);

        if (!user) {
            console.error('[XP] User not found:', userId);
            return;
        }

        if (!task) {
            console.error('[XP] Task not found:', taskId);
            return;
        }

        const baseXp = 10 + task.importance * 10 + task.estimatedTime * 2;
        const scaledXp = Math.floor(baseXp * (1 / (1 + user.level * 0.1)));
        const completedAt = new Date(data.completedAt);

        const isOnTime = completedAt <= task.dueAt;

        let finalXp = scaledXp;

        if (data.isBonus) {
            finalXp *= 2;
        }

        if (isOnTime) {
            finalXp = Math.floor(finalXp * 1.2);
        }

        let newXp = user.xp + finalXp;
        let newLevel = user.level;

        let xpNeeded = this.xpToNextLevel(newLevel);

        while (newXp >= xpNeeded) {
            newXp -= xpNeeded;
            newLevel += 1;
            xpNeeded = this.xpToNextLevel(newLevel);

            console.log(`[XP] LEVEL UP ! User ${userId} => level ${newLevel}`);
        }

        await this.usersService.updateXpAndLevel(userId, newXp, newLevel);

        console.log(
            `[XP] User ${userId} gained ${finalXp} XP` +
                `${data.isBonus ? ' (MAIN x2)' : ''}` +
                `${isOnTime ? ' (ONTIME +20%)' : ''}` +
                ` (lvl ${user.level} → ${newLevel})`
        );
    }
}
