import { Type } from 'class-transformer';
import {
    IsDate,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    Max,
    Min,
} from 'class-validator';

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @Type(() => Date)
    @IsDate()
    @IsNotEmpty()
    dueAt: Date;

    @IsInt()
    @IsOptional()
    userId?: number;

    @IsInt()
    @IsOptional()
    projectId?: number;

    @IsInt()
    @Min(1)
    @Max(5)
    @IsOptional()
    importance?: number;

    @IsInt()
    @Min(0)
    @IsOptional()
    estimatedMin?: number;
}
