import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './users.entity';
import { AuthGuard } from '../common/guards';
import { User } from '../common/decorators/user.decorator';

@Controller()
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('profile')
  @UseGuards(AuthGuard)
  public getProfile(@User() user: UserEntity): UserEntity {
    return user;
  }
}
