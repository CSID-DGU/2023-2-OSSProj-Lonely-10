import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import type { Request } from 'express';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  /**
   * @param context
   * @returns true if request is authenticated
   * @description public일 경우 authentication을 거치지 않고 통과
   */
  public canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
    if (isPublic) {
      return true;
    }

    const request = this.getRequest(context);
    return request.isAuthenticated();
  }

  /**
   * @param context
   * @returns GraphQL context or HTTP request
   * @description GraplQL context is used for GraphQL requests, HTTP request is used for REST requests
   */
  public getRequest(context: ExecutionContext): Request {
    if (context.getType<GqlContextType>() === 'graphql') {
      const ctx = GqlExecutionContext.create(context).getContext<{ req: Request }>();
      return ctx.req;
    }

    return context.switchToHttp().getRequest<Request>();
  }
}
