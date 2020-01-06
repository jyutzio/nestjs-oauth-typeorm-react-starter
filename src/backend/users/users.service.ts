import { Injectable, Inject } from '@nestjs/common';
import { Repository, FindConditions } from 'typeorm';
import { UserEntity } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<UserEntity>
  ) {}

  /** Used for session serializer. */
  async findOne(
    where: FindConditions<UserEntity>
  ): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ where });
  }

  /** Used for strategies. */
  async findOrCreate(
    provider: string,
    providerId: string,
    username = 'Unknown'
  ): Promise<UserEntity | void> {
    return await this.userRepository
      .findOneOrFail({
        where: { provider, providerId },
      })
      .catch(() => {
        this.userRepository.save(
          this.userRepository.create({
            provider,
            providerId,
            username,
          })
        );
      })
      .catch(e => console.error(e));
  }
}
