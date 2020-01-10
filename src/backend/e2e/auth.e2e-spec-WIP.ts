import request from 'supertest';
import { Test } from '@nestjs/testing';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

describe('Auth', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        AuthModule,
        UsersModule,
        ConfigModule.forRoot({
          envFilePath: '.development.env',
          isGlobal: true,
        }),
      ],
    }).compile();
    app = module.createNestApplication();
    await app.init();
  });

  it('/GET google', () => {
    return request(app.getHttpServer())
      .get('/google')
      .expect(202);
    // .expect({
    //   data: usersService.findOne(),
    // });
  });

  it('/GET google', () => {
    return request(app.getHttpServer())
      .get('/github')
      .expect(202);
    // .expect({
    //   data: usersService.findOne(),
    // });
  });

  afterAll(async () => {
    await app.close();
  });
});
