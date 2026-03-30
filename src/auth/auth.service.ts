import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../common/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUser(
    email: string,
    password: string,
  ): Promise<UserEntity | null> {
    const user = await this.usersService.getFullUserByEmail(email);

    if (!user) {
      return null;
    }

    const hasMatched = await bcrypt.compare(password, user.password);
    return hasMatched ? user : null;
  }

  public async register(createAuthDto: CreateUserDto) {
    const user = await this.usersService.getFullUserByEmail(
      createAuthDto.email,
    );
    if (user) {
      throw new BadRequestException(
        `User with email ${user.email} already exists`,
      );
    }

    await this.usersService.create(createAuthDto);
    return { message: `User successfully created!` };
  }

  public login(email: string): string {
    return this.jwtService.sign({ email });
  }
}
