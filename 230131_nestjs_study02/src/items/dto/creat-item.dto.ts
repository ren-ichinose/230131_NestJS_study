import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from "class-validator";

export class CreatItemDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(32)
    name: string;

    @IsInt()
    @Min(1)
    @Type(() => Number)
    price: number;

    @IsString()
    @IsNotEmpty()
    description: string;
}