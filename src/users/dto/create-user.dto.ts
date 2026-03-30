import { Gender } from '../../common/enums';
import {
  IsDefined,
  IsEmail,
  IsEnum,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsDefined()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsString()
  @MinLength(8)
  @MaxLength(16)
  @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/, {
    message:
      'password must contain at least one uppercase letter and one special character !@#$%^&*',
  })
  password: string;

  @IsDefined()
  @IsString()
  @MaxLength(40)
  firstName: string;

  @IsDefined()
  @IsString()
  @MaxLength(40)
  lastName: string;

  @IsDefined()
  @IsEnum(Gender)
  gender: Gender;
}
