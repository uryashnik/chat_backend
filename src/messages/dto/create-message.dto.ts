import { IsDefined, IsInt, MaxLength, MinLength } from 'class-validator';

class IdEntryDto {
  @IsDefined()
  @IsInt()
  id: number;
}

export class CreateMessageDto {
  @IsDefined()
  @MinLength(6)
  @MaxLength(240)
  text: string;

  @IsDefined()
  tag: IdEntryDto;
}
