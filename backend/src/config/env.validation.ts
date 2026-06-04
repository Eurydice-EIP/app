import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString, validateSync } from 'class-validator';
import type { StringValue } from 'ms';

class EnvConfig {
    @IsString()
    @IsNotEmpty()
    DB_NAME: string;

    @IsString()
    @IsNotEmpty()
    DB_HOST: string;

    @IsString()
    @IsNotEmpty()
    DB_PORT: string;

    @IsString()
    @IsNotEmpty()
    DB_USER: string;

    @IsString()
    @IsNotEmpty()
    DB_PASS: string;

    @IsString()
    @IsNotEmpty()
    API_PORT: string;

    @IsString()
    @IsNotEmpty()
    JWT_SECRET: string;

    @IsString()
    @IsNotEmpty()
    JWT_EXPIRES_IN: StringValue;

    @IsString()
    @IsNotEmpty()
    UPLOADS_DIR: string;
}

export function validate(config: Record<string, unknown>): EnvConfig {
    const validateConfig = plainToInstance(EnvConfig, config, {
        enableImplicitConversion: true,
    });
    const errors = validateSync(validateConfig, {
        skipMissingProperties: false,
    });

    if (errors.length > 0) {
        throw new Error(errors.toString());
    }
    return validateConfig;
}
