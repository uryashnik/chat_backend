import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../common/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  public async validateUser(
    email: string,
    passHash: string,
  ): Promise<UserEntity | null> {
    const user = await this.usersService.getFullUserByEmail(email);

    if (!user) {
      return null;
    }

    const hasMatched = await bcrypt.compare(passHash, user.password);
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

  login(email: string) {
    return this.usersService.findOne(email);
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: any) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
