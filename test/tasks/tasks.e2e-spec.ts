import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TasksModule } from 'src/tasks/tasks.module';
import { TasksService } from 'src/tasks/tasks.service';
import { Server } from 'http';

describe('Tasks', () => {
    let app: INestApplication;
    const tasksService = {
        create: () => ({ id: 1, title: 'Mock Task' }),
        findOne: (id: number) => ({ id, title: 'Mock Task' }),
    };

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [TasksModule],
        })
            .overrideProvider(TasksService)
            .useValue(tasksService)
            .compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('/tasks (POST)', () => {
        return request(app.getHttpServer() as unknown as Server)
            .post('/tasks')
            .send({ title: 'New Task' })
            .expect(201)
            .expect({
                id: 1,
                title: 'Mock Task',
            });
    });

    it('/tasks/:id (GET)', () => {
        return request(app.getHttpServer() as unknown as Server)
            .get('/tasks/1')
            .expect(200)
            .expect({
                id: '1',
                title: 'Mock Task',
            });
    });
});
