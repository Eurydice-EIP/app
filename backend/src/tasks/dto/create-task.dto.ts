import { Type } from 'class-transformer';
import {
    IsDate,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
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
    @IsOptional()
    importance?: number;

    @IsInt()
    @IsOptional()
    estimatedMin?: number;
}
