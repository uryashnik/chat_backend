import { IsDefined, MaxLength, MinLength } from 'class-validator';

export class CreateMessageDto {
  @IsDefined()
  @MinLength(6)
  @MaxLength(240)
  text: string;
}
