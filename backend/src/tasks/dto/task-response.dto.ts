import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TaskResponseDto {
    @ApiProperty({
        example: 1,
        description: 'The unique identifier of the task',
    })
    @Expose()
    id: number;

    @ApiProperty({
        example: 'Finish the report',
        description: 'The title of the task',
    })
    @Expose()
    title: string;

    @ApiProperty({
        example: '2024-12-31T23:59:59Z',
        description: 'The due date of the task',
    })
    @Expose()
    dueAt: Date;

    @ApiProperty({
        nullable: true,
        example: 1,
        description: 'The ID of the user assigned to the task',
    })
    @Expose()
    userId: number | null;

    @ApiProperty({
        nullable: true,
        example: 1,
        description: 'The ID of the project associated with the task',
    })
    @Expose()
    projectId: number | null;

    @ApiProperty({
        nullable: true,
        example: 3,
        description: 'The importance level of the task, on a scale from 1 to 5',
    })
    @Expose()
    importance: number | null;

    @ApiProperty({
        nullable: true,
        example: 60,
        description: 'Estimated time to complete the task in minutes',
    })
    @Expose()
    estimatedMin: number | null;

    @ApiProperty({
        example: '2024-01-01T12:00:00Z',
        description: 'The creation date of the task',
    })
    @Expose()
    createdAt: Date;

    @ApiProperty({
        example: '2024-01-02T12:00:00Z',
        description: 'The last update date of the task',
    })
    @Expose()
    lastUpdate: Date;
}
