import { Injectable, Inject } from '@nestjs/common';
import { Repository, FindConditions } from 'typeorm';
import { UserEntity } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<UserEntity>
  ) {}

  private createUser(
    provider: string,
    providerId: string,
    username = 'Anonymous'
  ): Promise<UserEntity> {
    return this.userRepository.save(
      this.userRepository.create({
        provider,
        providerId,
        username,
      })
    );
  }

  /** Used for session serializer. */
  findOne(where: FindConditions<UserEntity>): Promise<UserEntity | undefined> {
    return this.userRepository.findOneOrFail({ where });
  }

  /** Used for strategies. */
  findOrCreate(
    provider: string,
    providerId: string,
    username?: string
  ): Promise<UserEntity | void> {
    return this.userRepository
      .findOneOrFail({
        where: { provider, providerId },
      })
      .catch(() => {
        this.createUser(provider, providerId, username);
      })
      .catch(e => console.error(e));
  }
}
