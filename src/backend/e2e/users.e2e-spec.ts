import request from 'supertest';
import { Test } from '@nestjs/testing';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../common/guards/auth.guard';

describe('Users', () => {
  let app: INestApplication;
  const usersService = { findOne: (): string => 'test' };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(UsersService)
      .useValue(usersService)
      // .overrideGuard(AuthGuard)
      // .useValue({ canActivate: () => true })
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('/GET profile', () => {
    return request(app.getHttpServer())
      .get('/profile')
      .expect(403);
    // .expect({
    //   data: usersService.findOne(),
    // });
  });

  afterAll(async () => {
    await app.close();
  });
});
