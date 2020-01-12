import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../common/guards';
import { User } from '../common/decorators';
import { UserEntity } from './user.entity';

@Controller()
export class UserController {
  @Get('profile')
  @UseGuards(AuthGuard)
  public getProfile(@User() user: UserEntity): UserEntity {
    return user;
  }
}
