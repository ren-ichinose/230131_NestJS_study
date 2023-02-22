import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CredentialsDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(32)
  password: string;
}
