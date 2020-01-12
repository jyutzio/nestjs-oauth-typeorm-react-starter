import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.development.env',
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
