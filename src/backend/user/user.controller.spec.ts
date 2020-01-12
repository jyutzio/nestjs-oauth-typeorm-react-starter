import { Test } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';

describe('User Controller', () => {
  let userController: UserController;
  const user: UserEntity = {
    id: 1,
    username: 'Anonymous',
    provider: 'test',
    providerId: 'test',
    dateCreated: new Date(),
    dateModified: new Date(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UserController],
    }).compile();

    userController = module.get<UserController>(UserController);
  });

  describe('getProfile', () => {
    it('should return the users profile', async () => {
      expect(await userController.getProfile(user)).toBe(user);
    });
  });
});
