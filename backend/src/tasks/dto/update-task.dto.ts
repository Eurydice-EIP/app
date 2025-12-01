import { IsOptional, IsString, IsInt, IsDateString } from 'class-validator';

export class UpdateTaskDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsDateString()
    dueAt?: string;

    @IsOptional()
    @IsInt()
    userId?: number;

    @IsOptional()
    @IsInt()
    projectId?: number;

    @IsOptional()
    @IsInt()
    importance?: number;

    @IsOptional()
    @IsInt()
    estimatedMin?: number;
}
