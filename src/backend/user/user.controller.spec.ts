import { Test } from '@nestjs/testing';
import { UserModule } from './user.module';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
// import { UserService } from './user.service';

describe('User Controller', () => {
  let userController: UserController;
  // let userService: UserService;

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
      imports: [UserModule],
    }).compile();

    userController = module.get<UserController>(UserController);
    // userService = module.get<UserService>(UserService);
  });

  describe('getUser', () => {
    it('should return the users profile', async () => {
      expect(userController.getUser(user)).toBe(user);
    });
  });
});
