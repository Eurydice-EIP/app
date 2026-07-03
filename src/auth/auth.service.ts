import {
    Injectable,
    BadRequestException,
    UnauthorizedException,
    ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async signIn(dto: SignInDto): Promise<{ accessToken: string }> {
        const user = await this.usersService.findOne(dto.email);

        if (!user || !(await bcrypt.compare(dto.password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { sub: user.id, email: user.email };

        return {
            accessToken: await this.jwtService.signAsync(payload),
        };
    }

    async signUp(dto: SignUpDto): Promise<{ accessToken: string }> {
        const existingUser = await this.usersService.findOne(
            dto.email,
            dto.username
        );

        if (existingUser) {
            if (existingUser.email === dto.email) {
                throw new ConflictException('Email already in use');
            }
            if (existingUser.username === dto.username) {
                throw new ConflictException('Username already in use');
            }
        }

        if (dto.password.length < 10) {
            throw new BadRequestException(
                'Password must be at least 10 characters long'
            );
        }

        if (dto.password !== dto.confirmPassword) {
            throw new BadRequestException('Passwords do not match');
        }

        dto.password = await bcrypt.hash(dto.password, await bcrypt.genSalt());
        const newUser = await this.usersService.create(dto);
        const payload = { sub: newUser.id, email: newUser.email };

        return {
            accessToken: await this.jwtService.signAsync(payload),
        };
    }
}
