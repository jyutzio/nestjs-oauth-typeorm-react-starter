/* eslint jest/expect-expect: ["error", { "assertFunctionNames": ["expect", "request"] }] */
import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ExecutionContext } from '@nestjs/common';
import { UsersModule } from './users.module';
import { UsersService } from './users.service';
import { AuthGuard } from '../common/guards';
import { UserDto } from './users.entity';

const mockUser = {
  id: 1,
  username: 'Anonymous',
  provider: 'test',
  providerId: 'test',
  dateCreated: new Date(),
  dateModified: new Date(),
};

const authGuard = jest.fn().mockImplementation((context: ExecutionContext) => {
  context.switchToHttp().getRequest().user = mockUser;
  return true;
});

describe('User Controller', () => {
  let app: INestApplication;
  const usersService = { findOne: (): UserDto => mockUser };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(UsersService)
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
      .expect({ data: mockUser });
  });
});
