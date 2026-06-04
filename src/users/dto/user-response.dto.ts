import { ApiProperty } from '@nestjs/swagger';
import { UserFriendState, UserLanguage, UserTheme } from '@prisma/client';
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
        example: 'ENGLISH',
        description: 'The language preference of the user',
    })
    @Expose()
    language?: UserLanguage;

    @ApiProperty({
        example: 'LIGHT',
        description: 'The theme preference of the user',
    })
    @Expose()
    theme?: UserTheme;

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
        example: '2024-06-01T12:00:00Z',
        description:
            "The date and time when the user's avatar was last updated",
    })
    @Expose()
    avatarUpdatedAt?: Date;

    @ApiProperty({
        example: [2, 3],
        description: "IDs of the user's friends",
    })
    @Expose()
    friends: { id: number; state: UserFriendState }[];
}
