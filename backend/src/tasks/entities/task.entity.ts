import { IsDate, IsInt, IsString } from 'class-validator';

export class Task {
    @IsInt()
    id: number;

    @IsString()
    title: string;

    @IsDate()
    dueAt: Date;

    @IsInt()
    userId?: number;

    @IsInt()
    projectId?: number;

    @IsInt()
    importance?: number;

    @IsInt()
    estimatedMin?: number;

    @IsDate()
    createdAt: Date;

    @IsDate()
    updatedAt: Date;
}
