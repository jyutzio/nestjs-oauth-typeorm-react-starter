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
        // We just need the username
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
      ],
    });
  }

  public async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile
  ): Promise<UserEntity> {
    const user = await this.userService.findOrCreate(
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
