import { Injectable, Inject } from '@nestjs/common';
import { Repository, FindConditions } from 'typeorm';
import { UserEntity } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<UserEntity>
  ) {}

  private async create(
    provider: string,
    providerId: string,
    username = 'Anonymous'
  ): Promise<UserEntity> {
    const user = await this.userRepository.create({
      provider,
      providerId,
      username,
    });
    await this.userRepository.save(user);
    return user;
  }

  /** Used for session serializer. */
  async findOne(
    where: FindConditions<UserEntity>
  ): Promise<UserEntity | undefined> {
    return await this.userRepository.findOneOrFail({ where });
  }

  /** Used for strategies. */
  async findOrCreate(
    provider: string,
    providerId: string,
    username?: string
  ): Promise<UserEntity | void> {
    try {
      return await this.findOne({ provider, providerId });
    } catch {
      return await this.create(provider, providerId, username);
    }
  }
}
