import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Type(() => Number)
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;
}