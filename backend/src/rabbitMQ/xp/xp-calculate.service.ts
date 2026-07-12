import { Injectable } from '@nestjs/common';

@Injectable()
export class XpCalculatorService {
    public calculateTaskXp(task: {
        importance: number;
        estimatedTime: number;
        dueAt: Date;
        completedAt?: Date | null;
        isMainProject?: boolean;
    }): number {
        let xp = 10 + task.importance * 10 + task.estimatedTime * 2;

        if (task.isMainProject) {
            xp *= 2;
        }

        const completionDate = task.completedAt ?? new Date();

        if (completionDate <= task.dueAt) {
            xp = Math.floor(xp * 1.2);
        }

        return xp;
    }

    public getBaseProjectXp(project: {
        importance: number;
        estimatedTime: number;
    }): number {
        return 50 + project.importance * 25 + project.estimatedTime * 5;
    }

    public xpToNextLevel(level: number): number {
        return 100 * level * level;
    }
}
