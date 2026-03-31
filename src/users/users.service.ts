import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../common/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
  ) {}

  private getUserByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }

  public async getFullUserByEmail(email: string) {
    return this.usersRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .addSelect('user.password')
      .getOne();
  }

  public async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      parseInt(this.configService.getOrThrow('PASSWORD_SALT_ROUNDS'), 10),
    );

    return await this.usersRepository.save({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  findAll() {
    return this.usersRepository.find();
  }

  public findOne(email: string) {
    return this.getUserByEmail(email);
  }
}
