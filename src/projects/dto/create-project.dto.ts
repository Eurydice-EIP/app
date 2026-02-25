import { Type } from 'class-transformer';
import {
    IsString,
    IsNotEmpty,
    IsEnum,
    IsInt,
    IsOptional,
    Min,
    Max,
    IsDate,
} from 'class-validator';
import { ProjectType } from '@prisma/client';

export class CreateProjectDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @Type(() => Date)
    @IsDate()
    @IsNotEmpty()
    dueAt: Date;

    @IsEnum(ProjectType)
    type: ProjectType;

    @IsInt()
    @Min(1)
    @Max(5)
    importance: number;

    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(5)
    estimatedTime: number;
}
