import {
    Body,
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Version,
    ParseIntPipe,
    HttpStatus,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectResponseDto } from './dto/project-response.dto';
import { plainToInstance } from 'class-transformer';
import { CurrentUser, User } from 'src/common/decorators/user.decorator';
import { TaskResponseDto } from 'src/tasks/dto/task-response.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.gard';

@Controller({
    path: 'projects',
    version: '1',
})
@UseGuards(JwtAuthGuard)
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}

    // ---------------- CREATE ----------------
    @ApiBearerAuth('Authorization')
    @ApiOperation({ summary: 'Create a new project' })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Project successfully created',
        type: ProjectResponseDto,
    })
    @Version('1')
    @Post()
    async create(
        @User() user: CurrentUser,
        @Body() dto: CreateProjectDto
    ): Promise<ProjectResponseDto> {
        const project = await this.projectsService.create(user.sub, dto);
        return plainToInstance(ProjectResponseDto, project, {
            excludeExtraneousValues: true,
        });
    }

    // ---------------- FIND ALL ----------------
    @ApiBearerAuth('Authorization')
    @ApiOperation({ summary: 'Get all projects for a user' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Projects successfully retrieved',
        type: [ProjectResponseDto],
    })
    @Version('1')
    @Get()
    async findAll(@User() user: CurrentUser): Promise<ProjectResponseDto[]> {
        const projects = await this.projectsService.findAll(user.sub);
        return plainToInstance(ProjectResponseDto, projects, {
            excludeExtraneousValues: true,
        });
    }

    // ---------------- FIND ONE ----------------
    @ApiBearerAuth('Authorization')
    @ApiOperation({ summary: 'Get a project by ID' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Project successfully retrieved',
        type: ProjectResponseDto,
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Project not found',
    })
    @Version('1')
    @Get(':id')
    async findOne(
        @User() user: CurrentUser,
        @Param('id', ParseIntPipe) id: number
    ): Promise<ProjectResponseDto> {
        const project = await this.projectsService.findOne(user.sub, id);
        return plainToInstance(ProjectResponseDto, project, {
            excludeExtraneousValues: true,
        });
    }

    // ---------------- UPDATE ----------------
    @ApiBearerAuth('Authorization')
    @ApiOperation({ summary: 'Update a project by ID' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Project successfully updated',
        type: ProjectResponseDto,
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Project not found',
    })
    @Version('1')
    @Patch(':id')
    async update(
        @User() user: CurrentUser,
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateProjectDto
    ): Promise<ProjectResponseDto> {
        const project = await this.projectsService.update(user.sub, id, dto);
        return plainToInstance(ProjectResponseDto, project, {
            excludeExtraneousValues: true,
        });
    }

    // ---------------- DELETE ----------------
    @ApiBearerAuth('Authorization')
    @ApiOperation({ summary: 'Delete a project and all its tasks' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Project successfully deleted',
        type: ProjectResponseDto,
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Project not found',
    })
    @Version('1')
    @Delete(':id')
    async delete(
        @User() user: CurrentUser,
        @Param('id', ParseIntPipe) id: number
    ): Promise<ProjectResponseDto> {
        const project = await this.projectsService.delete(user.sub, id);
        return plainToInstance(ProjectResponseDto, project, {
            excludeExtraneousValues: true,
        });
    }

    // ---------------- ADD TASK TO PROJECT ----------------
    @ApiBearerAuth('Authorization')
    @ApiOperation({ summary: 'Attach a task to a project' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Task successfully added to project',
    })
    @Version('1')
    @Post(':id/tasks/:taskId')
    async addTaskToProject(
        @User() user: CurrentUser,
        @Param('id', ParseIntPipe) projectId: number,
        @Param('taskId', ParseIntPipe) taskId: number
    ) {
        const project = await this.projectsService.addTask(
            user.sub,
            projectId,
            taskId
        );
        return plainToInstance(ProjectResponseDto, project, {
            excludeExtraneousValues: true,
        });
    }

    // ---------------- REMOVE TASK FROM PROJECT ----------------
    @ApiBearerAuth('Authorization')
    @ApiOperation({ summary: 'Remove a task from a project' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Task successfully removed from project',
    })
    @Version('1')
    @Delete(':id/tasks/:taskId')
    async removeTaskFromProject(
        @User() user: CurrentUser,
        @Param('id', ParseIntPipe) projectId: number,
        @Param('taskId', ParseIntPipe) taskId: number
    ) {
        const project = await this.projectsService.removeTask(
            user.sub,
            projectId,
            taskId
        );
        return plainToInstance(ProjectResponseDto, project, {
            excludeExtraneousValues: true,
        });
    }

    // ---------------- GET ALL TASKS IN PROJECT ----------------
    @ApiBearerAuth('Authorization')
    @ApiOperation({ summary: 'Get all tasks in a project' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Tasks successfully retrieved',
        type: [ProjectResponseDto],
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Project not found',
    })
    @Version('1')
    @Get(':id/tasks')
    async getTasksInProject(
        @User() user: CurrentUser,
        @Param('id', ParseIntPipe) projectId: number
    ): Promise<TaskResponseDto[]> {
        const project = await this.projectsService.getTasksInProject(
            user.sub,
            projectId
        );
        return plainToInstance(TaskResponseDto, project, {
            excludeExtraneousValues: true,
        });
    }
}
