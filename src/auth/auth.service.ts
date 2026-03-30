import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  public async register(createAuthDto: CreateUserDto) {
    const user = await this.usersService.getUserByEmail(createAuthDto.email);
    if (user) {
      throw new BadRequestException(
        `User with email ${user.email} already exists`,
      );
    }

    await this.usersService.create(createAuthDto);
    return { message: `User successfully created!` };
  }

  findAll() {
    return `This action returns all auth`;
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
