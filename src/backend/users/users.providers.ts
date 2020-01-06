import { Connection, Repository } from 'typeorm';
import { UserEntity } from './users.entity';

export const usersProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (connection: Connection): Repository<UserEntity> =>
      connection.getRepository(UserEntity),
    inject: ['DATABASE_CONNECTION'],
  },
];
