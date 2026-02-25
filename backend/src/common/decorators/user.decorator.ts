import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export interface CurrentUser {
    sub: number;
    email: string;
}

export const User = createParamDecorator(
    (data: unknown, context: ExecutionContext): CurrentUser => {
        const req = context
            .switchToHttp()
            .getRequest<Request & { user: CurrentUser }>();
        return req.user;
    }
);
