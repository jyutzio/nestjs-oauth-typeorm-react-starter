import { Strategy } from 'passport-github2';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Profile } from 'passport';
import { UsersService } from '../../users/users.service';
import { UserEntity } from '../../users/users.entity';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private readonly usersService: UsersService) {
    super({
      clientID: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: process.env.BASE_URL + 'auth/github/callback',
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
