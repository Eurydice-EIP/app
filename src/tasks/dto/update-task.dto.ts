import { Type } from 'class-transformer';
import {
    IsOptional,
    IsString,
    IsInt,
    IsDate,
} from 'class-validator';

export class UpdateTaskDto {
    @IsString()
    @IsOptional()
    title?: string;

    @Type(() => Date)
    @IsDate()
    @IsOptional()
    dueAt?: Date;

    @IsInt()
    @IsOptional()
    userId?: number;

    @IsInt()
    @IsOptional()
    projectId?: number;

    @IsInt()
    @IsOptional()
    importance?: number;

    @IsInt()
    @IsOptional()
    estimatedMin?: number;
}
