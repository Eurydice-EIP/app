import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { GameEvents } from '../common/constants/game-events';

@Injectable()
export class GameEventProducer {
    constructor(
        @Inject('RABBITMQ_CLIENT')
        private readonly client: ClientProxy
    ) {}

    async onModuleInit() {
        await this.client.connect();
        console.log('[GameEventProducer] RMQ client connected');
    }

    taskCompleted(payload: {
        userId: string;
        taskId: string;
        completedAt: Date;
        isBonus?: boolean;
    }) {
        return this.client.emit(GameEvents.TASK_COMPLETED, payload);
    }

    projectCompleted(data: {
        userId: string;
        projectId: string;
    }) {
        return this.client.emit(GameEvents.PROJECT_COMPLETED, data);
    }
}
