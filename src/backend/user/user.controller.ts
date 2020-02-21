import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../common/guards';
import { UserService } from './user.service';
import { User } from '../common/decorators';
import { UserEntity } from './user.entity';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public getUser(@User() user: UserEntity): UserEntity {
    return user;
  }
}
