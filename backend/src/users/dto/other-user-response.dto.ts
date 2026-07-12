import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UserFriendState } from '@prisma/client';

export class OtherUserResponseDto {
    @ApiProperty({
        example: 2,
        description: 'The unique identifier of the user',
    })
    @Expose()
    id?: number;

    @ApiProperty({
        example: 'john_doe',
        description: 'The username of the user',
    })
    @Expose()
    username?: string;

    @ApiProperty({
        example: 1500,
        description: 'The experience points of the user',
    })
    @Expose()
    xp?: number;

    @ApiProperty({
        example: 5,
        description: 'The level of the user',
    })
    @Expose()
    level?: number;

    @ApiProperty({
        example: '/uploads/avatar-1234.png',
        description: "The path to the user's avatar image",
    })
    @Expose()
    avatarPath?: string;

    @ApiProperty({
        example: 'image/png',
        description: "The MIME type of the user's avatar image",
    })
    @Expose()
    avatarMime?: string;

    @ApiProperty({
        example: 204800,
        description: "The size of the user's avatar image in bytes",
    })
    @Expose()
    avatarSize?: number;

    @ApiProperty({
        example: 'PENDING',
        description: 'The state of the friendship',
    })
    @Expose()
    friendState?: UserFriendState | null;
}
