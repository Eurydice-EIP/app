import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { rabbitMQConfig } from './rabbitmq.config';
import { GameEventProducer } from './game-event.producer';
import { XpConsumer } from './consumers/xp.consumer';
import { XpModule } from './xp/xp-service/xp.module';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'RABBITMQ_CLIENT',
                transport: Transport.RMQ,
                options: rabbitMQConfig,
            },
        ]),
        XpModule,
    ],
    controllers: [XpConsumer],
    providers: [GameEventProducer],
    exports: [GameEventProducer],
})
export class RabbitMQModule {}
