import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';

describe('User Service', () => {
  let userService: UserService;

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
      ],
      providers: [UserService],
    }).compile();

    userService = module.get<UserService>(UserService);
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
