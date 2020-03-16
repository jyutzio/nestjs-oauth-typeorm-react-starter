import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile } from 'passport';
import { OAuth2Strategy as Strategy } from 'passport-google-oauth';
import { UserService } from '../../user/user.service';
import { UserEntity } from '../../user/user.entity';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService
  ) {
    super({
      clientID: configService.get('GOOGLE_ID'),
      clientSecret: configService.get('GOOGLE_SECRET'),
      callbackURL: configService.get('GOOGLE_CALLBACK'),
      scope: [
        // I don't think I need the line below
        // 'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
      ],
    });
  }

  public async validate(
    _accessToken: string,
    _refreshToken: string,
    { provider, id, displayName }: Profile
  ): Promise<UserEntity> {
    const user = await this.userService.findOrCreate(provider, id, displayName);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
