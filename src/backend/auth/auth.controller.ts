import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { GoogleGuard, GithubGuard } from '../common/guards';

@Controller('auth')
export class AuthController {
  private readonly publicUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.publicUrl =
      configService.get<string>('PUBLIC_URL') || 'http://localhost';
  }

  @Get('google')
  @UseGuards(GoogleGuard)
  googleLogin(): void {
    // ...
  }

  @Get('google/callback')
  @UseGuards(GoogleGuard)
  googleCallback(@Res() res: Response): void {
    return res.redirect(this.publicUrl);
  }

  @Get('github')
  @UseGuards(GithubGuard)
  githubLogin(): void {
    // ...
  }

  @Get('github/callback')
  @UseGuards(GithubGuard)
  githubCallback(@Res() res: Response): void {
    return res.redirect(this.publicUrl);
  }

  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response): void {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    req.session!.destroy((): void => undefined);
    req.logout();
    res.clearCookie('nest');
    return res.redirect(this.publicUrl);
  }
}
