import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import cookieParse from 'cookie-parser';
import { UserService } from '../../user/user.service';

@Injectable()
export class WsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
    private readonly userService: UserService
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient();
    const cookies: string[] = client.handshake.headers.cookie.split('; ');

    try {
      const authToken = cookies
        .find(cookie =>
          cookie.startsWith(this.configService.get('COOKIE_NAME') || 'nest')
        )
        ?.split('=')[1];
      const userId = cookieParse.signedCookie(
        authToken!,
        this.configService.get('COOKIE_SECRET') || 'test'
      );
      const user = await this.userService.findOne({ id: Number(userId) });
      context.switchToWs().getData().user = user;
      return true;
    } catch {
      return false;
    }
  }
}
