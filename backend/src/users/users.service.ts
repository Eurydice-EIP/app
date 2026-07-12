import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
    Prisma,
    User as PrismaUser,
    UserFriends as PrismaUserFriends,
} from '@prisma/client';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { AddFriendDto } from './dto/add-friend.dto';

@Injectable()
export class UsersService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly configService: ConfigService
    ) {}

    async create(dto: SignUpDto): Promise<PrismaUser> {
        return this.prisma.user.create({
            data: {
                username: dto.username,
                email: dto.email,
                password: dto.password,
            },
        });
    }

    async findOne(
        email: string,
        username?: string
    ): Promise<PrismaUser | null> {
        const orConditions: Prisma.UserWhereInput[] = [{ email: email }];

        if (username) {
            orConditions.push({ username: username });
        }

        return this.prisma.user.findFirst({
            where: {
                OR: orConditions,
            },
        });
    }

    async update(userId: number, dto: UpdateUserDto): Promise<PrismaUser> {
        if (dto.password || dto.email) {
            if (!dto.currentPassword) {
                throw new BadRequestException(
                    'Current password is required to update email or password'
                );
            }

            const user = await this.prisma.user.findUnique({
                where: { id: userId },
            });

            if (!user) {
                throw new BadRequestException('User not found');
            }

            const isPasswordValid = await bcrypt.compare(
                dto.currentPassword,
                user.password
            );

            if (!isPasswordValid) {
                throw new BadRequestException('Current password is incorrect');
            }
        }

        if (dto.password) {
            if (dto.password.length < 10) {
                throw new BadRequestException(
                    'Password must be at least 10 characters long'
                );
            }

            if (dto.password !== dto.confirmPassword) {
                throw new BadRequestException('Passwords do not match');
            }

            dto.password = await bcrypt.hash(
                dto.password,
                await bcrypt.genSalt()
            );
        }

        if (dto.username) {
            const existingUser = await this.prisma.user.findFirst({
                where: {
                    username: dto.username,
                    NOT: { id: userId },
                },
            });

            if (existingUser) {
                throw new BadRequestException('Username is already taken');
            }
        }

        return this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                ...(dto.username !== undefined && { username: dto.username }),
                ...(dto.email !== undefined && { email: dto.email }),
                ...(dto.password !== undefined && { password: dto.password }),
                ...(dto.language !== undefined && { language: dto.language }),
                ...(dto.theme !== undefined && { theme: dto.theme }),
            },
        });
    }

    async updateXpAndLevel(userId: number, xp: number, level: number) {
        return this.prisma.user.update({
            where: { id: userId },
            data: {
                xp,
                level,
            },
        });
    }

    async findById(
        userId: number,
        id: number
    ): Promise<PrismaUser | (PrismaUser & { friendState: string }) | null> {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: {
                friends: {
                    select: {
                        friendId: true,
                        state: true,
                    },
                },
            },
        });

        if (!user) {
            return null;
        }
        if (userId === id) {
            return user;
        }

        const friendState = await this.prisma.userFriends.findFirst({
            select: { state: true },
            where: {
                userId: userId,
                friendId: id,
            },
        });

        if (friendState?.state) {
            return { ...user, friendState: friendState.state };
        }
        return user;
    }

    async uploadAvatar(
        userId: number,
        avatarData: {
            avatarPath: string;
            avatarMime: string;
            avatarSize: number;
        }
    ): Promise<PrismaUser> {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new BadRequestException('User not found');
        }

        const oldAvatarPath = user.avatarPath;
        const updatedUser = await this.prisma.user.update({
            where: { id: userId },
            data: {
                avatarPath: avatarData.avatarPath,
                avatarMime: avatarData.avatarMime,
                avatarSize: avatarData.avatarSize,
            },
        });

        if (oldAvatarPath && oldAvatarPath !== avatarData.avatarPath) {
            const oldAvatarName = oldAvatarPath.split('/').pop();
            const uploadDir =
                this.configService.get<string>('uploads.dir') ?? '';
            const oldAvatarFullPath = `${uploadDir}/${oldAvatarName}`;

            try {
                await fs.promises.unlink(oldAvatarFullPath);
            } catch (err) {
                console.error(
                    `Failed to delete old avatar at ${oldAvatarFullPath}:`,
                    err
                );
            }
        }

        return updatedUser;
    }

    async getFriends(
        userId: number
    ): Promise<
        (PrismaUser & { friendState: string })[] | Promise<PrismaUser[]>
    > {
        const userFriends = await this.prisma.userFriends.findMany({
            where: { userId },
        });
        const friendIds = userFriends.map((friend) => friend.friendId);

        if (friendIds.length === 0) {
            return [];
        }
        const friends = await this.prisma.user.findMany({
            where: { id: { in: friendIds } },
        });

        return friends.map((friend) => {
            return {
                ...friend,
                friendState: userFriends.find((f) => f.friendId === friend.id)
                    ?.state,
            };
        });
    }

    async addFriend(
        userId: number,
        friendDto: AddFriendDto
    ): Promise<PrismaUserFriends> {
        if (!friendDto.friendUsername && !friendDto.friendId) {
            throw new BadRequestException(
                'Either friendUsername or friendId must be provided'
            );
        }

        const friend = await this.prisma.user.findUnique({
            where: {
                username: friendDto.friendUsername,
                id: friendDto.friendId,
            },
        });

        if (!friend) {
            throw new BadRequestException('Friend not found');
        }

        if (friend.id === userId) {
            throw new BadRequestException(
                'You cannot add yourself as a friend'
            );
        }

        const existingFriendship = await this.prisma.userFriends.findFirst({
            where: {
                userId: userId,
                friendId: friend.id,
            },
        });

        if (existingFriendship) {
            if (existingFriendship.state === 'REQUESTED') {
                const result = await this.prisma.$transaction(
                    async (prisma) => {
                        const userToFriend = await prisma.userFriends.update({
                            data: { state: 'CONFIRMED' },
                            where: {
                                userId_friendId: {
                                    userId: userId,
                                    friendId: friend.id,
                                },
                            },
                        });
                        const friendToUser = await prisma.userFriends.update({
                            data: { state: 'CONFIRMED' },
                            where: {
                                userId_friendId: {
                                    userId: friend.id,
                                    friendId: userId,
                                },
                            },
                        });

                        return { userToFriend, friendToUser };
                    }
                );

                return result.userToFriend;
            }

            throw new BadRequestException(
                'User is already a friend or has a pending friend request'
            );
        }

        const result = await this.prisma.$transaction(async (prisma) => {
            const userToFriend = await prisma.userFriends.create({
                data: {
                    userId: userId,
                    friendId: friend.id,
                    state: 'PENDING',
                },
            });
            const friendToUser = await prisma.userFriends.create({
                data: {
                    userId: friend.id,
                    friendId: userId,
                    state: 'REQUESTED',
                },
            });

            return { userToFriend, friendToUser };
        });

        return result.userToFriend;
    }

    async removeFriend(userId: number, friendId: number): Promise<void> {
        await this.prisma.userFriends.deleteMany({
            where: {
                OR: [
                    { userId: userId, friendId: friendId },
                    { userId: friendId, friendId: userId },
                ],
            },
        });
    }

    async searchUsers(userId: number, query: string) {
        const foundUsers = await this.prisma.user.findMany({
            where: {
                username: {
                    contains: query,
                    mode: 'insensitive',
                },
                id: {
                    not: userId,
                },
            },
        });

        const userIds = foundUsers.map((user) => user.id);
        if (userIds.length === 0) {
            return [];
        }

        const friends = await this.prisma.userFriends.findMany({
            where: {
                userId: userId,
                friendId: { in: userIds },
            },
        });

        return foundUsers.filter((user) => {
            return !friends.find((friend) => friend.friendId === user.id);
        });
    }
}
