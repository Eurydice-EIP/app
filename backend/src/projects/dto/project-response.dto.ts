import { ApiProperty } from '@nestjs/swagger';
import { ProjectType } from '@prisma/client';

export class ProjectResponseDto {
    @ApiProperty({
        example: 1,
        description: 'The unique identifier of the project',
    })
    id: number;

    @ApiProperty({
        example: 'Refonte du site',
        description: 'The title of the project',
    })
    title: string;

    @ApiProperty({
        example: '2026-03-01T23:59:59Z',
        description: 'The due date of the project',
    })
    dueAt: Date;

    @ApiProperty({
        nullable: true,
        example: 1,
        description: 'The ID of the user associated with the project',
    })
    userId: number | null;

    @ApiProperty({
        example: 'MAIN',
        enum: ProjectType,
        description: 'The type of the project (MAIN or SIDE)',
    })
    type: ProjectType;

    @ApiProperty({
        example: 4,
        description:
            'The importance level of the project, on a scale from 1 to 5',
    })
    importance: number;

    @ApiProperty({
        example: 2,
        description:
            'Estimated time to complete the task, on a scale from 1 to 5',
    })
    estimatedTime: number;

    @ApiProperty({
        example: '2026-01-04T15:07:40Z',
        description: 'The creation date of the project',
    })
    createdAt: Date;

    @ApiProperty({
        example: '2026-01-10T09:22:11Z',
        description: 'The last update date of the project',
    })
    lastUpdate: Date;
}
