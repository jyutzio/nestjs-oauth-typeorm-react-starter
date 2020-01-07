import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserEntity } from './users.entity';
import { AuthGuard } from '../common/guards';
import { User } from '../common/decorators/user.decorator';

@Controller()
export class UsersController {
  @Get('profile')
  @UseGuards(AuthGuard)
  public getProfile(@User() user: UserEntity): UserEntity {
    return user;
  }
}
