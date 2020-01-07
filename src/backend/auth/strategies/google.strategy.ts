import { OAuth2Strategy } from 'passport-google-oauth';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Profile } from 'passport';
import { UsersService } from '../../users/users.service';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from '../../users/users.entity';

@Injectable()
export class GoogleStrategy extends PassportStrategy(OAuth2Strategy, 'google') {
  constructor(
    private readonly usersService: UsersService,
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
