import { Injectable } from '@nestjs/common';
import { Repository, FindConditions } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  /**
   * Creates a user
   */
  private async createUser(
    provider: string,
    providerId: string,
    username = 'Anonymous'
  ): Promise<UserEntity> {
    const user = this.userRepository.create({
      provider,
      providerId,
      username,
    });
    return this.userRepository.save(user);
  }

  /**
   * Find a user or throw an exception.
   * Used by session serializer.
   */
  public async findOne(where: FindConditions<UserEntity>): Promise<UserEntity> {
    return await this.userRepository.findOneOrFail({ where });
  }

  /**
   * Find or create a user.
   * Used by auth strategies.
   */
  public async findOrCreate(
    provider: string,
    providerId: string,
    username?: string
  ): Promise<UserEntity> {
    try {
      return await this.findOne({ provider, providerId });
    } catch {
      return await this.createUser(provider, providerId, username);
    }
  }
}
