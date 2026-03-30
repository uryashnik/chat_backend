import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UserEntity } from '../../common/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
  ) {
    super({
      // jwtFromRequest: (req: Request): string | null => {
      //   console.log('req?.cookies: ', req?.cookies);
      //   return req?.cookies?.access_token ?? null;
      // },
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          console.log('token: ', req?.cookies);
          return req?.cookies?.['access_token'];
        }, // токен берем из cookie 'jwt'
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('JWT_SECRET_PHRASE'),
    });
  }

  async validate(payload: { email: string }): Promise<UserEntity | null> {
    return await this.userService.findOne(payload.email);
  }
}
