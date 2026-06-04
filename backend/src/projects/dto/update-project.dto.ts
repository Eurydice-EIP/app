import { CreateProjectDto } from './create-project.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { ProjectStatus } from '@prisma/client';
import { PartialType } from '@nestjs/swagger';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
    @IsOptional()
    @IsEnum(ProjectStatus)
    status?: ProjectStatus;
}
