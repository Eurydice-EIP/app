import {Body, Controller, Get, Param, Post, Patch, Delete, Version, ParseIntPipe} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task as TaskModel } from '@prisma/client';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller({
    path: 'tasks',
    version: '1',
})
export class TasksController {
    constructor(private tasksService: TasksService) {}

    // ---------------- CREATE ----------------
    @Version('1')
    @Post()
    async create(@Body() createTaskDto: CreateTaskDto): Promise<TaskModel> {
        return this.tasksService.create(createTaskDto);
    }

    // ---------------- FIND ONE ----------------
    @Version('1')
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number ): Promise<TaskModel | null> {
        return this.tasksService.findOne(id);
    }

    // ---------------- FIND ALL ----------------
    @Version('1')
    @Get()
    async findAll(): Promise<TaskModel[]> {
        return this.tasksService.findAll();
    }

    // ---------------- UPDATE ----------------
    @Version('1')
    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number,
        @Body() updateTaskDto: UpdateTaskDto
    ): Promise<TaskModel> {
        return this.tasksService.update(id, updateTaskDto);
    }

    // ---------------- DELETE ----------------
    @Version('1')
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<TaskModel> {
        return this.tasksService.delete(id);
    }
}
