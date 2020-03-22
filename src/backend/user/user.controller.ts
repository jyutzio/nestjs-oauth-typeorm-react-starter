import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '../common/guards';
import { UserService } from './user.service';
import { User } from '../common/decorators';
import { UserEntity } from './user.entity';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';

@Controller('user')
@UseGuards(AuthGuard)
@UseInterceptors(LoggingInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public getUser(@User() user: UserEntity): UserEntity {
    return user;
  }
}
