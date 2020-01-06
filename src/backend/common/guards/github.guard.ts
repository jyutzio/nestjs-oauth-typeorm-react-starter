import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GithubGuard extends AuthGuard('github') implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);
    return result;
  }

  handleRequest<UserEntity>(err: Error, user: UserEntity): UserEntity {
    if (err) {
      throw err;
    }
    return user;
  }
}
