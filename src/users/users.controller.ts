import { Body, Controller, Patch, Version } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { plainToInstance } from 'class-transformer';
import { CurrentUser, User } from 'src/common/decorators/user.decorator';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller({
    path: 'users',
    version: '1',
})
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
}
