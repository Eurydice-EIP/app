import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Patch,
    Delete,
    Version,
    ParseIntPipe,
    HttpStatus,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskResponseDto } from './dto/task-response.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

@Controller({
    path: 'tasks',
    version: '1',
})
export class TasksController {
    constructor(private tasksService: TasksService) {}

    // ---------------- CREATE ----------------
    @ApiOperation({ summary: 'Create a new task' })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'The task has been successfully created.',
        type: TaskResponseDto,
    })
    @Version('1')
    @Post()
    async create(
        @Body() createTaskDto: CreateTaskDto
    ): Promise<TaskResponseDto> {
        const task = await this.tasksService.create(createTaskDto);
        return plainToInstance(TaskResponseDto, task);
    }

    // ---------------- FIND ONE ----------------
    @ApiOperation({ summary: 'Get a task by ID' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'The task has been successfully retrieved.',
        type: TaskResponseDto,
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Task not found.',
    })
    @Version('1')
    @Get(':id')
    async findOne(
        @Param('id', ParseIntPipe) id: number
    ): Promise<TaskResponseDto | null> {
        const task = await this.tasksService.findOne(id);
        return plainToInstance(TaskResponseDto, task);
    }

    // ---------------- FIND ALL ----------------
    @ApiOperation({ summary: 'Get all tasks' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'The tasks have been successfully retrieved.',
        type: [TaskResponseDto],
    })
    @Version('1')
    @Get()
    async findAll(): Promise<TaskResponseDto[]> {
        const tasks = await this.tasksService.findAll();
        return plainToInstance(TaskResponseDto, tasks);
    }

    // ---------------- UPDATE ----------------
    @ApiOperation({ summary: 'Update a task by ID' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'The task has been successfully updated.',
        type: TaskResponseDto,
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Task not found.',
    })
    @Version('1')
    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateTaskDto: UpdateTaskDto
    ): Promise<TaskResponseDto> {
        const task = await this.tasksService.update(id, updateTaskDto);
        return plainToInstance(TaskResponseDto, task);
    }

    // ---------------- DELETE ----------------
    @ApiOperation({ summary: 'Delete a task by ID' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'The task has been successfully deleted.',
        type: TaskResponseDto,
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Task not found.',
    })
    @Version('1')
    @Delete(':id')
    async delete(
        @Param('id', ParseIntPipe) id: number
    ): Promise<TaskResponseDto> {
        const task = await this.tasksService.delete(id);
        return plainToInstance(TaskResponseDto, task);
    }
}
