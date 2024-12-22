import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateStockDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @IsString()
  @MaxLength(3)
  @IsNotEmpty()
  readonly symbol: string;
}
