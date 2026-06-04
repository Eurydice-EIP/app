import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { LevelResponseDto } from './dto/level.dto';

@Injectable()
export class LevelService {
    constructor(private readonly prisma: PrismaService) {}

    async getUserLevel(userId: number): Promise<LevelResponseDto> {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const xpToNextLevel = 100 * user.level * user.level;

        return {
            level: user.level,
            xp: user.xp,
            xpToNextLevel,
        };
    }
}
