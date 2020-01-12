/* eslint jest/expect-expect: ["error", { "assertFunctionNames": ["expect", "request"] }] */
import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ExecutionContext } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { AuthGuard } from '../common/guards';
import { UserDto } from '../user/user.entity';
import { AppModule } from '../app.module';

const mockUser = {
  id: 1,
  username: 'Anonymous',
  provider: 'test',
  providerId: 'test',
  dateCreated: new Date().toString(),
  dateModified: new Date().toString(),
};

const authGuard = jest.fn().mockImplementation((context: ExecutionContext) => {
  context.switchToHttp().getRequest().user = mockUser;
  return true;
});
const usersService = { findOne: (): UserDto => mockUser };

describe('User Controller', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [UserModule],
    })
      .overrideProvider(UserService)
      .useValue(usersService)
      .overrideGuard(AuthGuard)
      .useValue(authGuard)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });
  afterAll(async () => {
    await app.close();
  });

  it('/GET profile', () => {
    return request(app.getHttpServer())
      .get('/profile')
      .expect(200)
      .expect(usersService.findOne());
  });
});
