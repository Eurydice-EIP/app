import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

describe('ProjectsController', () => {
    let controller: ProjectsController;
    let service: ProjectsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProjectsController],
            providers: [
                {
                    provide: ProjectsService,
                    useValue: {
                        create: jest.fn(),
                        findAll: jest.fn(),
                        findOne: jest.fn(),
                        update: jest.fn(),
                        delete: jest.fn(),
                        addTask: jest.fn(),
                        removeTask: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<ProjectsController>(ProjectsController);
        service = module.get<ProjectsService>(ProjectsService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    // ---------------- CREATE ----------------
    describe('create', () => {
        it('should create and return a project', async () => {
            const dto: CreateProjectDto = {
                title: 'New Project',
                dueAt: new Date('2026-03-01T23:59:59Z'),
                type: 'MAIN',
                importance: 3,
                estimatedTime: 4,
            };

            const result = {
                id: 1,
                ...dto,
                userId: null,
                estimatedMin: 0,
                createdAt: new Date(),
                lastUpdate: new Date(),
                tasks: [],
            };

            jest.spyOn(service, 'create').mockResolvedValue(result as any);

            expect(await controller.create(dto)).toEqual(result);
        });
    });

    // ---------------- FIND ALL ----------------
    describe('findAll', () => {
        it('should return all projects', async () => {
            const result = [
                { id: 1, title: 'Project 1' },
                { id: 2, title: 'Project 2' },
            ];

            jest.spyOn(service, 'findAll').mockResolvedValue(result as any);

            expect(await controller.findAll()).toEqual(result);
        });
    });

    // ---------------- FIND ONE ----------------
    describe('findOne', () => {
        it('should return one project', async () => {
            const result = {
                id: 1,
                title: 'Project',
                tasks: [],
            };

            jest.spyOn(service, 'findOne').mockResolvedValue(result as any);

            expect(await controller.findOne(1)).toEqual(result);
        });
    });

    // ---------------- UPDATE ----------------
    describe('update', () => {
        it('should update and return a project', async () => {
            const dto: UpdateProjectDto = {
                title: 'Updated Project',
            };

            const result = {
                id: 1,
                title: 'Updated Project',
            };

            jest.spyOn(service, 'update').mockResolvedValue(result as any);

            expect(await controller.update(1, dto)).toEqual(result);
        });
    });

    // ---------------- DELETE ----------------
    describe('delete', () => {
        it('should delete a project and return it with its tasks', async () => {
            const result = {
                id: 1,
                title: 'Deleted Project',
                tasks: [
                    { id: 10, title: 'Task 1' },
                    { id: 11, title: 'Task 2' },
                ],
            };

            jest.spyOn(service, 'delete').mockResolvedValue(result as any);

            expect(await controller.delete(1)).toEqual(result);
        });
    });

    // ---------------- ADD TASK ----------------
    describe('addTask', () => {
        it('should add a task to a project', async () => {
            const result = {
                id: 1,
                tasks: [{ id: 5 }],
            };

            jest.spyOn(service, 'addTask').mockResolvedValue(result as any);

            expect(await controller.addTaskToProject(1, 5)).toEqual(result);
        });
    });

    // ---------------- REMOVE TASK ----------------
    describe('removeTask', () => {
        it('should remove a task from a project', async () => {
            const result = {
                id: 1,
                tasks: [],
            };

            jest.spyOn(service, 'removeTask').mockResolvedValue(result as any);

            expect(await controller.removeTaskFromProject(1, 5)).toEqual(
                result
            );
        });
    });
});
