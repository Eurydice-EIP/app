import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Version,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SignInDto } from './dto/sign-in.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { plainToInstance } from 'class-transformer';
import { Public } from 'src/common/decorators/public.decorator';
import { SignUpDto } from './dto/sign-up.dto';

@Controller({
    path: 'auth',
    version: '1',
})
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({ summary: 'Sign in a user' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'The user has been successfully signed in.',
        type: AuthResponseDto,
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Invalid credentials.',
    })
    @Version('1')
    @Public()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async signIn(@Body() dto: SignInDto): Promise<AuthResponseDto> {
        const accessToken = await this.authService.signIn(dto);
        return plainToInstance(AuthResponseDto, accessToken);
    }

    @ApiOperation({ summary: 'Sign up a new user' })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'The user has been successfully signed up.',
        type: AuthResponseDto,
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Email already in use.',
    })
    @Version('1')
    @Public()
    @Post('register')
    async signUp(@Body() dto: SignUpDto): Promise<AuthResponseDto> {
        const accessToken = await this.authService.signUp(dto);
        return plainToInstance(AuthResponseDto, accessToken);
    }
}
