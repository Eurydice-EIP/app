import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { GameEvents } from '../../common/constants/game-events';
import { XpService } from '../xp/xp-service/xp.service';

@Controller()
export class XpConsumer {
    constructor(private readonly xpService: XpService) {
        console.log('[XP] Consumer initialized');
    }

    @EventPattern(GameEvents.TASK_COMPLETED)
    async handleTaskCompleted(
        @Payload() data: {
            userId: string;
            taskId: string;
            completedAt: string;
        }
    ) {
        console.log('[XP] Task completed event received:', data);

        await this.xpService.handleTaskCompleted(data);
    }

    @EventPattern(GameEvents.PROJECT_COMPLETED)
    async handleProjectCompleted(
        @Payload() data: {
            userId: string;
            projectId: string;
        }
    ) {
        console.log('[XP] Project completed event received:', data);

        await this.xpService.handleProjectCompleted(data);
    }
}