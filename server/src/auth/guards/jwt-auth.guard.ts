import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';

/**
 * AuthGuard for JWT
 * @description JWT를 사용하는 인증 방식에 사용
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  /**
   * @param context
   * @returns GraphQL context or HTTP request
   */
  public override getRequest(context: ExecutionContext): Request {
    if (context.getType<GqlContextType>() === 'graphql') {
      const ctx = GqlExecutionContext.create(context).getContext<{ req: Request }>();
      return ctx.req;
    }

    return context.switchToHttp().getRequest<Request>();
  }
}
