import { Test } from '@nestjs/testing';
import { DatabaseModule } from '../database/database.module';
import { UserService } from './user.service';
import { userProvidersMock } from './user.providers';

describe('User Service', () => {
  let userService: UserService;
  // let userRepository: UserRepository;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [...userProvidersMock, UserService],
    }).compile();

    userService = module.get<UserService>(UserService);
    // userRepository = module.get<Repository<UserEntity>>('USER_REPOSITORY');
  });

  it('should create a new user', async () => {
    const mockUser = {
      username: 'Anonymous',
      provider: 'test',
      providerId: 'test',
    };

    const newUser = await userService.findOrCreate(
      mockUser.provider,
      mockUser.providerId
    );
    expect(newUser).toMatchObject(mockUser);
  });

  it('should create a new user with a specified username', async () => {
    const mockUser = {
      username: 'mockUser',
      provider: 'test2',
      providerId: 'test2',
    };

    const newUser = await userService.findOrCreate(
      mockUser.provider,
      mockUser.providerId,
      mockUser.username
    );
    expect(newUser).toMatchObject(mockUser);
  });
});
