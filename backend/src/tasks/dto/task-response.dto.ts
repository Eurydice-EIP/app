import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '@prisma/client';

export class TaskResponseDto {
    @ApiProperty({
        example: 1,
        description: 'The unique identifier of the task',
    })
    id: number;

    @ApiProperty({
        example: 'Finish the report',
        description: 'The title of the task',
    })
    title: string;

    @ApiProperty({
        example: '2024-12-31T23:59:59Z',
        description: 'The due date of the task',
    })
    dueAt: Date;

    @ApiProperty({
        example: 'PENDING',
        description: 'The status of the task',
    })
    status: TaskStatus;

    @ApiProperty({
        nullable: true,
        example: 1,
        description: 'The ID of the user assigned to the task',
    })
    userId: number | null;

    @ApiProperty({
        nullable: true,
        example: 1,
        description: 'The ID of the project associated with the task',
    })
    projectId: number | null;

    @ApiProperty({
        example: 3,
        description: 'The importance level of the task, on a scale from 1 to 5',
    })
    importance: number;

    @ApiProperty({
        example: 3,
        description:
            'Estimated time to complete the task, on a scale from 1 to 5',
    })
    estimatedTime: number;

    @ApiProperty({
        example: [2, 3],
        description: 'IDs of tasks that this task blocks',
    })
    blocks: number[];

    @ApiProperty({
        example: [4, 5],
        description: 'IDs of tasks that block this task',
    })
    blockedBy: number[];

    @ApiProperty({
        example: '2024-01-01T12:00:00Z',
        description: 'The creation date of the task',
    })
    createdAt: Date;

    @ApiProperty({
        example: '2024-01-02T12:00:00Z',
        description: 'The last update date of the task',
    })
    lastUpdate: Date;
}
