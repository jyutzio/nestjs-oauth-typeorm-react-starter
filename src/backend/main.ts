import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import session from 'express-session';
import passport from 'passport';
import helmet from 'helmet';
import { AppModule } from './app.module';
import dotenv from 'dotenv';

dotenv.config({ path: '.development.env' });
const cookieName = process.env.COOKIE_NAME || 'nest';
const cookieSecret = process.env.COOKIE_SECRET || 'default';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(helmet());
  app.enableCors({ origin: 'http://localhost:4200', credentials: true });
  app.use(
    session({
      cookie: {
        path: '/',
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
        signed: false,
      },
      name: cookieName,
      resave: false,
      secret: cookieSecret,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  await app.listen(3000);
}
bootstrap();
