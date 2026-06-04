import { UserLanguage, UserTheme } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    username?: string;

    @IsString()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    password?: string;

    @IsString()
    @IsOptional()
    confirmPassword?: string;

    @IsString()
    @IsOptional()
    currentPassword?: string;

    @IsEnum(UserLanguage)
    @IsOptional()
    language?: UserLanguage;

    @IsEnum(UserTheme)
    @IsOptional()
    theme?: UserTheme;
}
