import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile } from 'passport';
import { Strategy } from 'passport-github2';
import { UserService } from '../../user/user.service';
import { UserEntity } from '../../user/user.entity';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService
  ) {
    super({
      clientID: configService.get('GITHUB_ID'),
      clientSecret: configService.get('GITHUB_SECRET'),
      callbackURL: configService.get('GITHUB_CALLBACK'),
    });
  }

  public async validate(
    _accessToken: string,
    _refreshToken: string,
    { provider, id, username }: Profile
  ): Promise<UserEntity> {
    const user = await this.userService.findOrCreate(provider, id, username);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
