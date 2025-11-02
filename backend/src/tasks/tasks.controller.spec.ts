import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

describe('TasksController', () => {
    let tasksController: TasksController;
    let tasksService: TasksService;

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            controllers: [TasksController],
            providers: [
                {
                    provide: TasksService,
                    useValue: {
                        findOne: jest.fn(),
                        create: jest.fn(),
                    },
                },
            ],
        }).compile();

        tasksController = moduleRef.get<TasksController>(TasksController);
        tasksService = moduleRef.get<TasksService>(TasksService);
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    describe('findOne', () => {
        it('should return a task', async () => {
            const result = {
                id: 1,
                title: 'test',
                dueAt: new Date('2025-10-16T16:30:00.000Z'),
                userId: null,
                projectId: null,
                importance: 0,
                estimatedMin: 0,
                createdAt: new Date('2025-11-02T16:51:06.721Z'),
            };

            jest.spyOn(tasksService, 'findOne').mockResolvedValue(result);
            const task = await tasksController.findOne(1);
            expect(task).toEqual(result);
        });
    });

    describe('create', () => {
        it('should create and return a task', async () => {
            const createTaskDto = {
                title: 'New Task',
                dueAt: new Date('2025-11-10T12:00:00.000Z'),
            };
            const result = {
                id: 2,
                ...createTaskDto,
                userId: null,
                projectId: null,
                importance: 0,
                estimatedMin: 0,
                createdAt: new Date(),
            };

            jest.spyOn(tasksService, 'create').mockResolvedValue(result);
            const task = await tasksController.create(createTaskDto);
            expect(task).toEqual(result);
        });
    });
});
