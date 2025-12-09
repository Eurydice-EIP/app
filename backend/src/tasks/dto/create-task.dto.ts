import { Type } from 'class-transformer';
import {
    ArrayUnique,
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
    @Min(1)
    @IsOptional()
    userId?: number;

    @IsInt()
    @Min(1)
    @IsOptional()
    projectId?: number;

    @IsInt()
    @Min(1)
    @Max(5)
    importance: number;

    @IsInt()
    @Min(1)
    @Max(5)
    estimatedTime: number;

    @ArrayUnique()
    @IsInt({ each: true })
    @IsOptional()
    blocks?: number[];
}
