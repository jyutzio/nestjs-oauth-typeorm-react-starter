import {
  Controller,
  Get,
  UseGuards,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { GoogleGuard, GithubGuard } from '../common/guards';
import { LoggingInterceptor } from '../common/interceptors';

@Controller('auth')
@UseInterceptors(LoggingInterceptor)
export class AuthController {
  private readonly frontendURL: string;
  private readonly cookieName: string;

  constructor(private readonly configService: ConfigService) {
    this.frontendURL = configService.get('FRONTEND_URL') || 'http://localhost';
    this.cookieName = configService.get('COOKIE_NAME') || 'nest';
  }

  @Get('google')
  @UseGuards(GoogleGuard)
  public googleLogin(): void {
    // ...
  }

  @Get('google/callback')
  @UseGuards(GoogleGuard)
  public googleCallback(@Res() res: Response): void {
    return res.redirect(this.frontendURL);
  }

  @Get('github')
  @UseGuards(GithubGuard)
  public githubLogin(): void {
    // ...
  }

  @Get('github/callback')
  @UseGuards(GithubGuard)
  public githubCallback(@Res() res: Response): void {
    return res.redirect(this.frontendURL);
  }

  @Get('logout')
  public logout(@Req() req: Request, @Res() res: Response): void {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    req.session!.destroy((): void => undefined);
    req.logout();
    res.clearCookie(this.cookieName);
    return res.redirect(this.frontendURL);
  }
}
