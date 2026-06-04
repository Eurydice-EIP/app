import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { rabbitMQConfig } from './rabbitmq.config';
import { GameEventProducer } from './game-event.producer';
import { XpConsumer } from './consumers/xp.consumer';
import { XpService } from './xp/xp.service';
import { UsersModule } from 'src/users/users.module';
import { TasksModule } from 'src/tasks/tasks.module';
import { forwardRef } from '@nestjs/common';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'RABBITMQ_CLIENT',
                transport: Transport.RMQ,
                options: rabbitMQConfig,
            },
        ]),
        forwardRef(() => UsersModule),
        forwardRef(() => TasksModule),
    ],
    controllers: [XpConsumer],
    providers: [XpService, GameEventProducer],
    exports: [GameEventProducer],
})
export class RabbitMQModule {}
