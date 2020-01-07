import { Strategy } from 'passport-github2';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Profile } from 'passport';
import { UsersService } from '../../users/users.service';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from '../../users/users.entity';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    private readonly usersService: UsersService,
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
    profile: Profile
  ): Promise<UserEntity> {
    const user = await this.usersService.findOrCreate(
      profile.provider,
      profile.id,
      profile.username
    );
    if (user) {
      return user;
    }
    throw new UnauthorizedException();
  }
}
