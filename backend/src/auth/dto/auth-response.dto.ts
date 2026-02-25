import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
    @ApiProperty({
        description: 'The JWT access token for the authenticated user',
    })
    accessToken: string;
}
