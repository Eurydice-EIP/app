import {
    Controller,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    UseGuards,
    Version,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.gard';
import { TimerService } from './timer.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CurrentUser, User } from 'src/common/decorators/user.decorator';
import { TimerResponseDto } from './dto/timer-response.dto';
import { plainToInstance } from 'class-transformer';

@Controller({
    path: 'timer',
    version: '1',
})
@UseGuards(JwtAuthGuard)
export class TimerController {
    constructor(private timerService: TimerService) {}

    @ApiBearerAuth('Authorization')
    @ApiOperation({ summary: 'Start a timer for the specified task.' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'The timer has been successfully started.',
        type: TimerResponseDto,
    })
    @Version('1')
    @Post('start/:taskId')
    async start(
        @User() user: CurrentUser,
        @Param('taskId', ParseIntPipe) taskId: number
    ): Promise<TimerResponseDto> {
        const duration = await this.timerService.start(user.sub, taskId);
        return plainToInstance(TimerResponseDto, duration, {
            excludeExtraneousValues: true,
        });
    }

    @ApiBearerAuth('Authorization')
    @ApiOperation({ summary: 'Stop the timer of the specified task.' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'The timer has been successfully stopped.',
        type: TimerResponseDto,
    })
    @Version('1')
    @Post('stop/:taskId')
    async stop(
        @User() user: CurrentUser,
        @Param('taskId', ParseIntPipe) taskId: number
    ): Promise<TimerResponseDto> {
        const duration = await this.timerService.stop(user.sub, taskId);
        return plainToInstance(TimerResponseDto, duration, {
            excludeExtraneousValues: true,
        });
    }
}
