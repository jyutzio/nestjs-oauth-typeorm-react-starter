import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import session from 'express-session';
import rateLimit from 'express-rate-limit';
import passport from 'passport';
import helmet from 'helmet';
import redis from 'ioredis';
import connect from 'connect-redis';
import { AppModule } from './app.module';
import { Logger } from './logger';

const RedisStore = connect(session);

async function bootstrap(): Promise<void> {
  // Create instance and apply logger
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: new Logger(),
  });

  // Get env variables
  const configService: ConfigService = app.get(ConfigService);

  // Development settings
  // https://github.com/expressjs/cors
  if (configService.get('NODE_ENV') === 'development') {
    app.enableCors({
      origin: configService.get('FRONTEND_URL'),
      credentials: true,
    });
  }

  // Production settings
  // limit each IP to 100 requests per 5 minutes
  // https://github.com/nfriedly/express-rate-limit
  // for secure cookies
  // https://github.com/expressjs/session/issues/281
  // https://expressjs.com/en/guide/behind-proxies.html
  if (configService.get('NODE_ENV') === 'production') {
    app.use(
      rateLimit({
        windowMs: 5 * 60 * 1000,
        max: 100,
      })
    );

    app.set('trust proxy', true);
  }

  // Apply headers to increase security
  // https://github.com/helmetjs/helmet
  app.use(helmet());

  // express session
  // https://github.com/expressjs/session
  app.use(
    session({
      cookie: {
        path: '/',
        httpOnly: true,
        secure: configService.get('NODE_ENV') === 'production',
        maxAge: 24 * 60 * 60 * 1000,
        signed: true,
      },
      proxy: true,
      name: configService.get('COOKIE_NAME'),
      resave: false,
      secret: configService.get('COOKIE_SECRET') || 'secret',
      saveUninitialized: false,
      store: new RedisStore({
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
        client: new redis({ keyPrefix: configService.get('REDIS_PREFIX') }),
        ttl: configService.get('REDIS_TTL'),
      }),
    })
  );

  // passportjs
  app.use(passport.initialize());
  app.use(passport.session());

  // Apply validation
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  // Apply class serializer
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(configService.get('BACKEND_PORT') || 3000);
}
bootstrap();
