import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '@prisma/client';
import { Expose } from 'class-transformer';

export class TaskResponseDto {
    @ApiProperty({
        example: 1,
        description: 'The unique identifier of the task',
    })
    @Expose()
    id!: number;

    @ApiProperty({
        example: 'Finish the report',
        description: 'The title of the task',
    })
    @Expose()
    title!: string;

    @ApiProperty({
        example: 'Complete the quarterly report for the finance department',
        description: 'A detailed description of the task',
    })
    @Expose()
    description!: string | null;

    @ApiProperty({
        example: '2024-12-31T23:59:59Z',
        description: 'The due date of the task',
    })
    @Expose()
    dueAt!: Date;

    @ApiProperty({
        example: 'PENDING',
        description: 'The status of the task',
    })
    @Expose()
    status!: TaskStatus;

    @ApiProperty({
        nullable: true,
        example: 1,
        description: 'The ID of the project associated with the task',
    })
    @Expose()
    projectId!: number | null;

    @ApiProperty({
        example: 3,
        description: 'The importance level of the task, on a scale from 1 to 5',
    })
    @Expose()
    importance!: number;

    @ApiProperty({
        example: 3,
        description:
            'Estimated time to complete the task, on a scale from 1 to 5',
    })
    @Expose()
    estimatedTime!: number;

    @ApiProperty({
        example: [2, 3],
        description: 'IDs of tasks that this task blocks',
    })
    @Expose()
    blocks!: number[];

    @ApiProperty({
        example: [4, 5],
        description: 'IDs of tasks that block this task',
    })
    @Expose()
    blockedBy!: number[];

    @ApiProperty({
        example: '2024-01-01T12:00:00Z',
        description: 'The creation date of the task',
    })
    @Expose()
    createdAt!: Date;

    @ApiProperty({
        example: '2024-01-02T12:00:00Z',
        description: 'The last update date of the task',
    })
    @Expose()
    lastUpdate!: Date;

    @Expose()
    @ApiProperty({
        required: false,
    })
    completedAt?: Date;
}
