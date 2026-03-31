import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Res,
  HttpCode,
  HttpStatus,
  Get,
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from './decorators/public.decoretor';
import { ConfigService } from '@nestjs/config';
import { AuthRequest } from '../common/types';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('register')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  register(@Body() createAuthDto: CreateUserDto) {
    return this.authService.register(createAuthDto);
  }

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  login(@Req() req: AuthRequest, @Res({ passthrough: true }) res: Response) {
    const token = this.authService.login(req.user.email);

    res.cookie(this.configService.getOrThrow<string>('COOKIE_NAME'), token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: +this.configService.getOrThrow<string>('COOKIE_MAX_AGE_MS'),
    });
    const { password, ...user } = req.user;
    return { ...user };
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  profile(@Req() req) {
    const { password, ...user } = req.user;
    return { ...user };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(this.configService.getOrThrow<string>('COOKIE_NAME'));
    return { message: 'Logout successful' };
  }
}
