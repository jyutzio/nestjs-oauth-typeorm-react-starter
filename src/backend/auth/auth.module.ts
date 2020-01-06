import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { GithubStrategy, GoogleStrategy } from './strategies';
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [UsersModule, PassportModule.register({ session: true })],
  providers: [GoogleStrategy, GithubStrategy, SessionSerializer],
  controllers: [AuthController],
})
export class AuthModule {}
