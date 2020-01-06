import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './common/guards';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  routes(): string {
    return this.appService.routes();
  }

  @Get('public')
  publicRoute(): string {
    return this.appService.publicRoute();
  }

  @Get('private')
  @UseGuards(AuthGuard)
  privateRoute(): string {
    return this.appService.privateRoute();
  }
}
