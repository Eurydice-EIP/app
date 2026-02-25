import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserResponseDto {
    @ApiProperty({
        example: 'john_doe',
        description: 'The username of the user',
    })
    @Expose()
    username?: string;

    @ApiProperty({
        example: 'john.doe@example.com',
        description: 'The email of the user',
    })
    @Expose()
    email?: string;
}
