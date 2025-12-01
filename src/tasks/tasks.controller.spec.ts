import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

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
                        findAll: jest.fn(),
                        create: jest.fn(),
                        update: jest.fn(),
                        delete: jest.fn(),
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

    // ---------------- FIND ONE ----------------
    describe('findOne', () => {
        it('should return one task', async () => {
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

    // ---------------- FIND ALL ----------------
    describe('findAll', () => {
        it('should return an array of tasks', async () => {
            const result = [
                {
                    id: 1,
                    title: 'Task 1',
                    dueAt: new Date(),
                    userId: 1,
                    projectId: 1,
                    importance: 1,
                    estimatedMin: 30,
                    createdAt: new Date(),
                },
                {
                    id: 2,
                    title: 'Task 2',
                    dueAt: new Date(),
                    userId: 1,
                    projectId: 2,
                    importance: 2,
                    estimatedMin: 45,
                    createdAt: new Date(),
                },
            ];

            jest.spyOn(tasksService, 'findAll').mockResolvedValue(result);
            const tasks = await tasksController.findAll();

            expect(tasks).toEqual(result);
        });
    });

    // ---------------- CREATE ----------------
    describe('create', () => {
        it('should create and return a task', async () => {
            const dto: CreateTaskDto = {
                title: 'New Task',
                dueAt: new Date('2025-12-01T12:00:00Z'),
                userId: 1,
                projectId: 1,
                importance: 3,
                estimatedMin: 60,
            };

            const result = {
                id: 1,
                title: 'Test task',
                dueAt: new Date('2025-12-01T12:00:00.000Z'),
                createdAt: new Date('2025-11-18T09:02:51.312Z'),
                userId: 1,
                projectId: 1,
                importance: 3,
                estimatedMin: 60,
            };

            jest.spyOn(tasksService, 'create').mockResolvedValue(result);
            const task = await tasksController.create(dto);

            expect(task).toEqual(result);
        });
    });

    // ---------------- UPDATE ----------------
    describe('update', () => {
        it('should update and return a task', async () => {
            const dto: UpdateTaskDto = {
                title: 'Updated Task Title',
            };

            const result = {
                id: 1,
                title: 'Updated Task Title',
                dueAt: new Date(),
                userId: 1,
                projectId: 1,
                importance: 2,
                estimatedMin: 50,
                createdAt: new Date(),
            };

            jest.spyOn(tasksService, 'update').mockResolvedValue(result);
            const task = await tasksController.update(1, dto);

            expect(task).toEqual(result);
        });
    });

    // ---------------- DELETE ----------------
    describe('delete', () => {
        it('should delete and return a task', async () => {
            const result = {
                id: 1,
                title: 'Task To Delete',
                dueAt: new Date(),
                userId: 1,
                projectId: 1,
                importance: 2,
                estimatedMin: 30,
                createdAt: new Date(),
            };

            jest.spyOn(tasksService, 'delete').mockResolvedValue(result);
            const deleted = await tasksController.delete(1);

            expect(deleted).toEqual(result);
        });
    });
});
