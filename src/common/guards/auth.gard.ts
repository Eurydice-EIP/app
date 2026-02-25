import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';
import { CurrentUser } from 'src/common/decorators/user.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [context.getHandler(), context.getClass()]
        );

        if (isPublic) {
            return true;
        }

        const request = context
            .switchToHttp()
            .getRequest<Request & { user?: CurrentUser }>();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            const payload =
                await this.jwtService.verifyAsync<Record<string, unknown>>(
                    token
                );
            const user = this.validateUserPayload(payload);

            request.user = user;
        } catch {
            throw new UnauthorizedException();
        }

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] =
            request.headers['authorization']?.split(' ') ?? [];

        return type === 'Bearer' ? token : undefined;
    }

    private validateUserPayload(payload: Record<string, unknown>): CurrentUser {
        if (!payload || typeof payload !== 'object') {
            throw new UnauthorizedException();
        }

        const candidate = payload as Partial<CurrentUser>;

        if (
            typeof candidate.sub !== 'number' ||
            !Number.isFinite(candidate.sub) ||
            candidate.sub <= 0
        ) {
            throw new UnauthorizedException();
        }

        if (
            typeof candidate.email !== 'string' ||
            candidate.email.length === 0
        ) {
            throw new UnauthorizedException();
        }

        return {
            sub: candidate.sub,
            email: candidate.email,
        };
    }
}
