import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/users.entity';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  public serializeUser(
    user: UserEntity,
    done: (err: Error | null, user: number) => void
  ): void {
    done(null, user.id);
  }

  public deserializeUser(
    id: number,
    done: (err: Error | null, payload?: UserEntity) => void
  ): void {
    this.usersService
      .findOne({ id })
      .then(user => done(null, user))
      .catch(error => done(error));
  }
}
