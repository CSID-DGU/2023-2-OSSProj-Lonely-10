import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';

/**
 * AuthGuard for local login
 */
@Injectable()
export class LocalLoginGuard extends AuthGuard('local') implements CanActivate {
  /**
   * @param context
   * @returns true if request is authenticated
   */
  public override async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = <boolean>await super.canActivate(context);
    const request = context.switchToHttp().getRequest<Request>();
    await super.logIn(request);

    return result;
  }
}
