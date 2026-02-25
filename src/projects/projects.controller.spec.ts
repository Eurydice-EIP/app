import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project, ProjectType, Task, TaskStatus } from '@prisma/client';
import { ProjectResponseDto } from './dto/project-response.dto';
import { plainToInstance } from 'class-transformer';
import { CurrentUser } from 'src/common/decorators/user.decorator';

describe('ProjectsController', () => {
    let controller: ProjectsController;
    let service: ProjectsService;
    let user: CurrentUser;
    const now = new Date('2026-02-25T12:00:00Z');

    const buildProject = (overrides: Partial<Project> = {}): Project => ({
        id: 1,
        title: 'Project',
        dueAt: now,
        userId: 1,
        type: ProjectType.MAIN,
        importance: 1,
        estimatedTime: 1,
        createdAt: now,
        lastUpdate: now,
        ...overrides,
    });

    const buildTask = (overrides: Partial<Task> = {}): Task => ({
        id: 1,
        title: 'Task',
        dueAt: now,
        status: TaskStatus.PENDING,
        userId: 1,
        projectId: null,
        importance: 1,
        estimatedTime: 1,
        createdAt: now,
        lastUpdate: now,
        ...overrides,
    });

    const toProjectResponse = (project: Project): ProjectResponseDto =>
        plainToInstance(ProjectResponseDto, project, {
            excludeExtraneousValues: true,
        });

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
        user = { sub: 1, email: 'user@example.com' };
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

            const result = buildProject({
                id: 1,
                title: dto.title,
                dueAt: dto.dueAt,
                type: ProjectType.MAIN,
                importance: dto.importance,
                estimatedTime: dto.estimatedTime ?? 0,
            });

            jest.spyOn(service, 'create').mockResolvedValue(result);

            expect(await controller.create(user, dto)).toEqual(
                toProjectResponse(result)
            );
        });
    });

    // ---------------- FIND ALL ----------------
    describe('findAll', () => {
        it('should return all projects', async () => {
            const result = [
                buildProject({ id: 1, title: 'Project 1' }),
                buildProject({
                    id: 2,
                    title: 'Project 2',
                    type: ProjectType.SIDE,
                }),
            ];

            jest.spyOn(service, 'findAll').mockResolvedValue(result);

            expect(await controller.findAll(user)).toEqual(
                result.map(toProjectResponse)
            );
        });
    });

    // ---------------- FIND ONE ----------------
    describe('findOne', () => {
        it('should return one project', async () => {
            const result = buildProject({ id: 1, title: 'Project' });

            jest.spyOn(service, 'findOne').mockResolvedValue(result);

            expect(await controller.findOne(user, 1)).toEqual(
                toProjectResponse(result)
            );
        });
    });

    // ---------------- UPDATE ----------------
    describe('update', () => {
        it('should update and return a project', async () => {
            const dto: UpdateProjectDto = {
                title: 'Updated Project',
            };

            const result = buildProject({
                id: 1,
                title: 'Updated Project',
            });

            jest.spyOn(service, 'update').mockResolvedValue(result);

            expect(await controller.update(user, 1, dto)).toEqual(
                toProjectResponse(result)
            );
        });
    });

    // ---------------- DELETE ----------------
    describe('delete', () => {
        it('should delete a project and return it with its tasks', async () => {
            const result = buildProject({ id: 1, title: 'Deleted Project' });

            jest.spyOn(service, 'delete').mockResolvedValue(result);

            expect(await controller.delete(user, 1)).toEqual(
                toProjectResponse(result)
            );
        });
    });

    // ---------------- ADD TASK ----------------
    describe('addTask', () => {
        it('should add a task to a project', async () => {
            const result = buildTask({ id: 5, title: 'Task 1' });

            jest.spyOn(service, 'addTask').mockResolvedValue(result);

            const expected = plainToInstance(ProjectResponseDto, result, {
                excludeExtraneousValues: true,
            });

            expect(await controller.addTaskToProject(user, 1, 5)).toEqual(
                expected
            );
        });
    });

    // ---------------- REMOVE TASK ----------------
    describe('removeTask', () => {
        it('should remove a task from a project', async () => {
            const result = buildTask({ id: 5, title: 'Task 1' });

            jest.spyOn(service, 'removeTask').mockResolvedValue(result);

            const expected = plainToInstance(ProjectResponseDto, result, {
                excludeExtraneousValues: true,
            });

            expect(await controller.removeTaskFromProject(user, 1, 5)).toEqual(
                expected
            );
        });
    });
});
