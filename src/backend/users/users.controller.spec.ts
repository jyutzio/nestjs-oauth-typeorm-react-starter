/* eslint jest/expect-expect: ["error", { "assertFunctionNames": ["expect", "request"] }] */
import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { UsersModule } from './users.module';

describe('User Controller', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [UsersModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });
  afterAll(async () => {
    await app.close();
  });

  it('/GET profile', () => {
    return request(app.getHttpServer())
      .get('/profile')
      .expect({
        statusCode: 403,
        error: 'Forbidden',
        message: 'Forbidden resource',
      });
  });
});
