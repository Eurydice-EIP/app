import {Body, Controller, Get, Param, Post, Patch, Delete, Version, ParseIntPipe, HttpStatus} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task as TaskModel } from '@prisma/client';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Task } from './entities/task.entity';

@Controller({
    path: 'tasks',
    version: '1',
})
export class TasksController {
    constructor(private tasksService: TasksService) {}

    // ---------------- CREATE ----------------
    @ApiOperation({ summary: 'Create a new task' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'The task has been successfully created.', type: Task })
    @Version('1')
    @Post()
    async create(@Body() createTaskDto: CreateTaskDto): Promise<TaskModel> {
        return this.tasksService.create(createTaskDto);
    }

    // ---------------- FIND ONE ----------------
    @ApiOperation({ summary: 'Get a task by ID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'The task has been successfully retrieved.', type: Task })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Task not found.' })
    @Version('1')
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number ): Promise<TaskModel | null> {
        return this.tasksService.findOne(id);
    }

    // ---------------- FIND ALL ----------------
    @ApiOperation({ summary: 'Get all tasks' })
    @ApiResponse({ status: HttpStatus.OK, description: 'The tasks have been successfully retrieved.', type: [Task] })
    @Version('1')
    @Get()
    async findAll(): Promise<TaskModel[]> {
        return this.tasksService.findAll();
    }

    // ---------------- UPDATE ----------------
    @ApiOperation({ summary: 'Update a task by ID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'The task has been successfully updated.', type: Task })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Task not found.' })
    @Version('1')
    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number,
        @Body() updateTaskDto: UpdateTaskDto
    ): Promise<TaskModel> {
        return this.tasksService.update(id, updateTaskDto);
    }

    // ---------------- DELETE ----------------
    @ApiOperation({ summary: 'Delete a task by ID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'The task has been successfully deleted.', type: Task })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Task not found.' })
    @Version('1')
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<TaskModel> {
        return this.tasksService.delete(id);
    }
}
