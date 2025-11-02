import { Body, Controller, Get, Param, Post, Version } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task as TaskModel } from '@prisma/client';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller({
    path: 'tasks',
    version: '1',
})
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Version('1')
    @Post()
    async create(@Body() createTaskDto: CreateTaskDto): Promise<TaskModel> {
        return this.tasksService.create(createTaskDto);
    }

    @Version('1')
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<TaskModel | null> {
        return this.tasksService.findOne(id);
    }
}
