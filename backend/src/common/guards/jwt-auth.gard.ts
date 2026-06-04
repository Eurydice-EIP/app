import {
    Injectable,
    UnauthorizedException,
    ExecutionContext,
} from '@nestjs/common';
import { CanActivate } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { Request } from 'express';
import { CurrentUser } from 'src/common/decorators/user.decorator';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private prismaService: PrismaService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context
            .switchToHttp()
            .getRequest<Request & { user: CurrentUser }>();
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw new UnauthorizedException('No token provided');
        }

        const token = authHeader.split(' ')[1];

        try {
            const payload =
                await this.jwtService.verifyAsync<Record<string, unknown>>(
                    token
                );
            const candidate = payload as Partial<CurrentUser>;

            if (
                typeof candidate.sub !== 'number' ||
                !Number.isFinite(candidate.sub) ||
                candidate.sub <= 0
            ) {
                throw new UnauthorizedException();
            }

            const user = await this.prismaService.user.findUnique({
                where: { id: candidate.sub },
            });

            if (!user) {
                throw new UnauthorizedException('User not found');
            }

            req.user = { ...user, sub: user.id };

            return true;
        } catch {
            throw new UnauthorizedException('Invalid token');
        }
    }
}
