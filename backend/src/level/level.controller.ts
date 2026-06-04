import {
    Controller,
    Get,
    HttpStatus,
    Version,
    UseGuards,
} from '@nestjs/common';
import { LevelService } from './level.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CurrentUser, User } from 'src/common/decorators/user.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.gard';
import { LevelResponseDto } from './dto/level.dto';

@Controller({
    path: 'level',
    version: '1',
})
@UseGuards(JwtAuthGuard)
export class LevelController {
    constructor(private readonly levelService: LevelService) {}

    @ApiBearerAuth('Authorization')
    @ApiOperation({ summary: 'Get information level for a user' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'User level retrieved successfully',
        type: LevelResponseDto,
    })
    @Version('1')
    @Get()
    getUserLevel(@User() user: CurrentUser) {
        console.log("ID actuelle de l'utilisateur : ", user.sub);
        return this.levelService.getUserLevel(user.sub);
    }
}
