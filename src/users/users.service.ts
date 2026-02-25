import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User as PrismaUser } from '@prisma/client';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    async create(dto: SignUpDto): Promise<PrismaUser> {
        return this.prisma.user.create({
            data: {
                username: dto.username,
                email: dto.email,
                password: dto.password,
            },
        });
    }

    async findOne(email: string): Promise<PrismaUser | null> {
        return this.prisma.user.findUnique({
            where: {
                email: email,
            },
        });
    }

    async update(userId: number, dto: UpdateUserDto): Promise<PrismaUser> {
        if (dto.password) {
            if (dto.password.length < 10) {
                throw new Error('Password must be at least 10 characters long');
            }

            if (dto.password !== dto.confirmPassword) {
                throw new Error('Passwords do not match');
            }

            dto.password = await bcrypt.hash(
                dto.password,
                await bcrypt.genSalt()
            );
        }

        return this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                ...(dto.username !== undefined && { username: dto.username }),
                ...(dto.email !== undefined && { email: dto.email }),
                ...(dto.password !== undefined && { password: dto.password }),
            },
        });
    }
}
