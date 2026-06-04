import { ApiProperty } from '@nestjs/swagger';
import { ProjectType, ProjectStatus } from '@prisma/client';
import { Expose } from 'class-transformer';

export class ProjectResponseDto {
    @ApiProperty({
        example: 1,
        description: 'The unique identifier of the project',
    })
    @Expose()
    id!: number;

    @ApiProperty({
        example: 'Refonte du site',
        description: 'The title of the project',
    })
    @Expose()
    title!: string;

    @ApiProperty({
        example:
            "Refonte complète du site web pour améliorer l'expérience utilisateur.",
        description: 'A detailed description of the project',
    })
    @Expose()
    description!: string | null;

    @ApiProperty({
        example: '2026-03-01T23:59:59Z',
        description: 'The due date of the project',
    })
    @Expose()
    dueAt!: Date;

    @ApiProperty({
        example: 'MAIN',
        enum: ProjectType,
        description: 'The type of the project (MAIN or SIDE)',
    })
    @Expose()
    type!: ProjectType;

    @ApiProperty({
        example: 4,
        description:
            'The importance level of the project, on a scale from 1 to 5',
    })
    @Expose()
    importance!: number;

    @ApiProperty({
        example: 2,
        description:
            'Estimated time to complete the project, on a scale from 1 to 5',
    })
    @Expose()
    estimatedTime!: number;

    @ApiProperty({
        example: '2026-01-04T15:07:40Z',
        description: 'The creation date of the project',
    })
    @Expose()
    createdAt!: Date;

    @ApiProperty({
        example: '2026-01-10T09:22:11Z',
        description: 'The last update date of the project',
    })
    @Expose()
    lastUpdate!: Date;

    @ApiProperty({
        example: 'ACTIVE',
        enum: ProjectStatus,
        description: 'The status of the project (ACTIVE or COMPLETED)',
    })
    @Expose()
    status!: ProjectStatus;
}
