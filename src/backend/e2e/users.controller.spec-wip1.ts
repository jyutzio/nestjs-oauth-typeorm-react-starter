/* eslint jest/expect-expect: ["error", { "assertFunctionNames": ["expect", "request"] }] */
import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ExecutionContext } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthGuard } from '../common/guards';
import { UserDto } from '../user/user.entity';
import { AppModule } from '../app.module';
import passport from 'passport';
import session from 'express-session';
import { SessionSerializer } from '../auth/session.serializer';

const mockUser = {
  id: 1,
  username: 'Anonymous',
  provider: 'test',
  providerId: 'test',
  dateCreated: new Date().toString(),
  dateModified: new Date().toString(),
};

const mockInterceptor = { deserializeUser: (): UserDto => mockUser };

const authGuard = jest.fn().mockImplementation((context: ExecutionContext) => {
  context.switchToHttp().getRequest().user = mockUser;
  return true;
});
const userService = { findOne: (): UserDto => mockUser };

describe('User Controller', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UserService)
      .useValue(userService)
      .overrideGuard(AuthGuard)
      .useValue(authGuard)
      .overrideInterceptor(SessionSerializer)
      .useValue(mockInterceptor)
      .compile();

    app = module.createNestApplication();
    app.use(
      session({
        cookie: {
          path: '/',
          httpOnly: true,
          secure: false,
          maxAge: 24 * 60 * 60 * 1000,
          signed: false,
        },
        name: 'cookie',
        resave: false,
        secret: 'test',
        saveUninitialized: false,
      })
    );
    app.use(passport.initialize());
    app.use(passport.session());
    await app.init();
  });
  afterAll(async () => {
    await app.close();
  });

  it('/GET profile', () => {
    return request(app.getHttpServer())
      .get('/profile')
      .expect(200)
      .expect(userService.findOne());
  });
});
