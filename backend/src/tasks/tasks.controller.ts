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
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { CurrentUser, User } from 'src/common/decorators/user.decorator';

@Controller({
    path: 'tasks',
    version: '1',
})
export class TasksController {
    constructor(private tasksService: TasksService) {}

    // ---------------- CREATE ----------------
    @ApiBearerAuth('Authorization')
    @ApiOperation({ summary: 'Create a new task' })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'The task has been successfully created.',
        type: TaskResponseDto,
    })
    @Version('1')
    @Post()
    async create(
        @User() user: CurrentUser,
        @Body() dto: CreateTaskDto
    ): Promise<TaskResponseDto> {
        const task = await this.tasksService.create(user.sub, dto);
        return plainToInstance(TaskResponseDto, task, {
            excludeExtraneousValues: true,
        });
    }

    // ---------------- FIND ONE ----------------
    @ApiBearerAuth('Authorization')
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
        @User() user: CurrentUser,
        @Param('id', ParseIntPipe) id: number
    ): Promise<TaskResponseDto | null> {
        const task = await this.tasksService.findOne(user.sub, id);
        return plainToInstance(TaskResponseDto, task, {
            excludeExtraneousValues: true,
        });
    }

    // ---------------- FIND ALL ----------------
    @ApiBearerAuth('Authorization')
    @ApiOperation({ summary: 'Get all tasks' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'The tasks have been successfully retrieved.',
        type: [TaskResponseDto],
    })
    @Version('1')
    @Get()
    async findAll(@User() user: CurrentUser): Promise<TaskResponseDto[]> {
        const tasks = await this.tasksService.findAll(user.sub);
        return plainToInstance(TaskResponseDto, tasks, {
            excludeExtraneousValues: true,
        });
    }

    // ---------------- UPDATE ----------------
    @ApiBearerAuth('Authorization')
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
        @User() user: CurrentUser,
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateTaskDto
    ): Promise<TaskResponseDto> {
        const task = await this.tasksService.update(user.sub, id, dto);
        return plainToInstance(TaskResponseDto, task, {
            excludeExtraneousValues: true,
        });
    }

    // ---------------- DELETE ----------------
    @ApiBearerAuth('Authorization')
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
        @User() user: CurrentUser,
        @Param('id', ParseIntPipe) id: number
    ): Promise<TaskResponseDto> {
        const task = await this.tasksService.delete(user.sub, id);
        return plainToInstance(TaskResponseDto, task, {
            excludeExtraneousValues: true,
        });
    }
}
