import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { LoggerModule } from '../logger/logger.module';

describe('User Controller', () => {
  let userController: UserController;

  const user: UserEntity = {
    id: 1,
    username: 'Anonymous',
    provider: 'test',
    providerId: 'test',
    dateCreated: Date.now().toString(),
    dateModified: Date.now().toString(),
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          synchronize: true,
          logging: false,
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        }),
        TypeOrmModule.forFeature([UserEntity]),
        LoggerModule,
      ],
      providers: [UserService],
      controllers: [UserController],
    }).compile();

    userController = module.get<UserController>(UserController);
  });

  describe('getUser', () => {
    it('should return the users profile', async () => {
      expect(userController.getUser(user)).toBe(user);
    });
  });
});
