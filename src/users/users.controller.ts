import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
    Version,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { plainToInstance } from 'class-transformer';
import { CurrentUser, User } from 'src/common/decorators/user.decorator';
import {
    ApiBearerAuth,
    ApiBody,
    ApiConsumes,
    ApiOperation,
    ApiResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.gard';
import { FileInterceptor } from '@nestjs/platform-express';
import { AddFriendDto } from './dto/add-friend.dto';
import { RemoveFriendDto } from './dto/remove-friend.dto';
import { OtherUserResponseDto } from './dto/other-user-response.dto';

@Controller({
    path: 'users',
    version: '1',
})
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private usersService: UsersService) {}

    @ApiBearerAuth('Authorization')
    @ApiOperation({ summary: 'Update user information' })
    @ApiResponse({
        status: 200,
        description: 'The user information has been successfully updated.',
        type: UserResponseDto,
    })
    @Version('1')
    @Patch()
    async update(
        @User() user: CurrentUser,
        @Body() dto: UpdateUserDto
    ): Promise<UserResponseDto> {
        const updatedUser = await this.usersService.update(user.sub, dto);
        return plainToInstance(UserResponseDto, updatedUser, {
            excludeExtraneousValues: true,
        });
    }

    @ApiBearerAuth('Authorization')
    @ApiOperation({ summary: 'Get current user profile' })
    @ApiResponse({
        status: 200,
        description:
            'The current user profile has been successfully retrieved.',
        type: UserResponseDto,
    })
    @Version('1')
    @Get('profile')
    async getProfile(@User() user: CurrentUser): Promise<UserResponseDto> {
        const foundUser = await this.usersService.findById(user.sub);
        return plainToInstance(UserResponseDto, foundUser, {
            excludeExtraneousValues: true,
        });
    }

    @ApiBearerAuth('Authorization')
    @ApiOperation({ summary: 'Get friend requests' })
    @ApiResponse({
        status: 200,
        description: 'The friend requests have been successfully retrieved.',
        type: UserResponseDto,
    })
    @Version('1')
    @Get('friend-requests')
    async getFriendRequests(
        @User() user: CurrentUser
    ): Promise<UserResponseDto> {
        const friendRequests = await this.usersService.getFriendRequests(
            user.sub
        );
        return plainToInstance(
            UserResponseDto,
            { friends: friendRequests },
            {
                excludeExtraneousValues: true,
            }
        );
    }

    @ApiBearerAuth('Authorization')
    @ApiOperation({ summary: 'Get user profile by ID' })
    @ApiResponse({
        status: 200,
        description: 'The user profile has been successfully retrieved.',
        type: UserResponseDto,
    })
    @Version('1')
    @Get(':id')
    async getProfileById(
        @Param('id', ParseIntPipe) id: number
    ): Promise<OtherUserResponseDto> {
        const foundUser = await this.usersService.findById(id);
        return plainToInstance(OtherUserResponseDto, foundUser, {
            excludeExtraneousValues: true,
        });
    }

    @ApiBearerAuth('Authorization')
    @ApiOperation({ summary: 'Upload user avatar' })
    @ApiBody({
        required: true,
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @ApiConsumes('multipart/form-data')
    @ApiResponse({
        status: 200,
        description: 'The user avatar has been successfully uploaded.',
        type: UserResponseDto,
    })
    @Version('1')
    @Post('avatar')
    @UseInterceptors(FileInterceptor('file'))
    async uploadAvatar(
        @User() user: CurrentUser,
        @UploadedFile() avatar: Express.Multer.File
    ): Promise<UserResponseDto> {
        if (!avatar) {
            throw new BadRequestException('No file uploaded');
        }

        const avatarPath = `uploads/${avatar.filename}`;
        const updatedUser = await this.usersService.uploadAvatar(user.sub, {
            avatarPath: avatarPath,
            avatarMime: avatar.mimetype,
            avatarSize: avatar.size,
        });
        return plainToInstance(UserResponseDto, updatedUser, {
            excludeExtraneousValues: true,
        });
    }

    @ApiBearerAuth('Authorization')
    @ApiOperation({ summary: 'Add a friend' })
    @ApiResponse({
        status: 200,
        description: 'The friend has been successfully added.',
        type: UserResponseDto,
    })
    @Version('1')
    @Post('friends')
    async addFriend(
        @User() user: CurrentUser,
        @Body() dto: AddFriendDto
    ): Promise<UserResponseDto> {
        const friendShip = await this.usersService.addFriend(user.sub, dto);
        return plainToInstance(
            UserResponseDto,
            { friends: [friendShip] },
            {
                excludeExtraneousValues: true,
            }
        );
    }

    @ApiBearerAuth('Authorization')
    @ApiOperation({ summary: 'Remove a friend' })
    @ApiResponse({
        status: 200,
        description: 'The friend has been successfully removed.',
    })
    @Version('1')
    @Delete('friends')
    async removeFriend(
        @User() user: CurrentUser,
        @Body() dto: RemoveFriendDto
    ): Promise<void> {
        await this.usersService.removeFriend(user.sub, dto.friendId);
    }

    @ApiBearerAuth('Authorization')
    @ApiOperation({ summary: 'Search users' })
    @ApiResponse({
        status: 200,
        description: 'The search results have been successfully retrieved.',
        type: [OtherUserResponseDto],
    })
    @Version('1')
    @Get('search/:query')
    async searchUsers(
        @User() user: CurrentUser,
        @Param('query') query: string
    ): Promise<OtherUserResponseDto[]> {
        const foundUsers = await this.usersService.searchUsers(user.sub, query);
        return foundUsers.map((fUser) =>
            plainToInstance(OtherUserResponseDto, fUser, {
                excludeExtraneousValues: true,
            })
        );
    }
}
