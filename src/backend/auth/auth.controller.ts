import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { GoogleGuard, GithubGuard } from '../common/guards';
import dotenv from 'dotenv';

dotenv.config({ path: '.development.env' });
const publicURL = process.env.PUBLIC_URL || 'http://localhost';

@Controller('auth')
export class AuthController {
  @Get('google')
  @UseGuards(GoogleGuard)
  googleLogin(): void {
    // ...
  }

  @Get('google/callback')
  @UseGuards(GoogleGuard)
  googleCallback(@Res() res: Response): void {
    return res.redirect(publicURL);
  }

  @Get('github')
  @UseGuards(GithubGuard)
  githubLogin(): void {
    // ...
  }

  @Get('github/callback')
  @UseGuards(GithubGuard)
  githubCallback(@Res() res: Response): void {
    return res.redirect(publicURL);
  }

  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response): void {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    req.session!.destroy((): void => undefined);
    req.logout();
    res.clearCookie('nest');
    return res.redirect(publicURL);
  }
}
