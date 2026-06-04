export const rabbitMQConfig = {
    transport: 'RMQ',
    urls: [
        `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}` +
            `@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`,
    ],
    queue: 'game.events',
    queueOptions: {
        durable: true,
    },
};
