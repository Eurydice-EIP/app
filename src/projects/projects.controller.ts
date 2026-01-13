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
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectResponseDto } from './dto/project-response.dto';
import { plainToInstance } from 'class-transformer';

@Controller({
    path: 'projects',
    version: '1',
})
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}

    // ---------------- CREATE ----------------
    @ApiOperation({ summary: 'Create a new project' })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Project successfully created',
        type: ProjectResponseDto,
    })
    @Version('1')
    @Post()
    async create(@Body() dto: CreateProjectDto): Promise<ProjectResponseDto> {
        const project = await this.projectsService.create(dto);
        return plainToInstance(ProjectResponseDto, project);
    }

    // ---------------- FIND ALL ----------------
    @ApiOperation({ summary: 'Get all projects' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Projects successfully retrieved',
        type: [ProjectResponseDto],
    })
    @Version('1')
    @Get()
    async findAll(): Promise<ProjectResponseDto[]> {
        const projects = await this.projectsService.findAll();
        return plainToInstance(ProjectResponseDto, projects);
    }

    // ---------------- FIND ONE ----------------
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
        @Param('id', ParseIntPipe) id: number
    ): Promise<ProjectResponseDto> {
        const project = await this.projectsService.findOne(id);
        return plainToInstance(ProjectResponseDto, project);
    }

    // ---------------- UPDATE ----------------
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
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateProjectDto
    ): Promise<ProjectResponseDto> {
        const project = await this.projectsService.update(id, dto);
        return plainToInstance(ProjectResponseDto, project);
    }

    // ---------------- DELETE ----------------
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
        @Param('id', ParseIntPipe) id: number
    ): Promise<ProjectResponseDto> {
        const project = await this.projectsService.delete(id);
        return plainToInstance(ProjectResponseDto, project);
    }

    // ---------------- ADD TASK TO PROJECT ----------------
    @ApiOperation({ summary: 'Attach a task to a project' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Task successfully added to project',
    })
    @Version('1')
    @Post(':id/tasks/:taskId')
    async addTaskToProject(
        @Param('id', ParseIntPipe) projectId: number,
        @Param('taskId', ParseIntPipe) taskId: number
    ) {
        return this.projectsService.addTask(projectId, taskId);
    }

    // ---------------- REMOVE TASK FROM PROJECT ----------------
    @ApiOperation({ summary: 'Remove a task from a project' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Task successfully removed from project',
    })
    @Version('1')
    @Delete(':id/tasks/:taskId')
    async removeTaskFromProject(
        @Param('id', ParseIntPipe) projectId: number,
        @Param('taskId', ParseIntPipe) taskId: number
    ) {
        return this.projectsService.removeTask(projectId, taskId);
    }
}
